"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart, formatPrice, type CartItem } from "@/lib/cart";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import {
  judete,
  EXPRESS_COUNTY,
  getShippingZone,
  shippingNote,
  paymentMethods,
  type PaymentMethodId,
} from "@/lib/shipping";
import CheckoutSteps from "@/components/CheckoutSteps";

type Status = "idle" | "sending" | "success" | "error";

type ConfirmedOrder = {
  items: CartItem[];
  totalPrice: number;
  county: string;
};

const inputClass =
  "mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10";
const inputErrorClass =
  "mt-1 w-full rounded-xl border border-red-400 bg-transparent px-4 py-3 outline-none focus:border-red-500 dark:border-red-700";

/** Validare per câmp — returnează mesajul de eroare sau null dacă e valid. */
function validateField(name: string, value: string): string | null {
  const v = value.trim();
  switch (name) {
    case "name":
      return v.length >= 3 ? null : "Introdu numele și prenumele.";
    case "phone":
      return /^(\+40|0040|0)[237]\d{8}$/.test(v.replace(/[\s.-]/g, ""))
        ? null
        : "Introdu un număr de telefon românesc valid (ex: 0729 123 456).";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? null
        : "Introdu o adresă de email validă.";
    case "street":
      return v.length >= 5 ? null : "Introdu strada și numărul.";
    case "city":
      return v.length >= 2 ? null : "Introdu localitatea.";
    case "postalCode":
      return /^\d{6}$/.test(v) ? null : "Codul poștal are exact 6 cifre.";
    case "companyName":
      return v.length >= 3 ? null : "Introdu denumirea firmei.";
    case "companyCui":
      return /^(RO)?\d{2,10}$/i.test(v.replace(/\s/g, ""))
        ? null
        : "Introdu un CUI valid (ex: RO12345678 sau 12345678).";
    default:
      return null;
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(
    null
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [county, setCounty] = useState<string>(EXPRESS_COUNTY);
  const [payment, setPayment] = useState<PaymentMethodId>("cash");

  const zone = getShippingZone(county);

  // begin_checkout se trimite o singură dată per vizită pe pagină, când
  // există produse în coș.
  const checkoutTracked = useRef(false);
  useEffect(() => {
    if (items.length > 0 && !checkoutTracked.current) {
      checkoutTracked.current = true;
      trackBeginCheckout(items, totalPrice);
    }
  }, [items, totalPrice]);

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const requiredFields = [
      "name",
      "phone",
      "email",
      "street",
      "city",
      "postalCode",
      ...(payment === "factura" ? ["companyName", "companyCui"] : []),
    ];
    const errors: Record<string, string> = {};
    for (const field of requiredFields) {
      const error = validateField(field, String(form.get(field) ?? ""));
      if (error) errors[field] = error;
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setErrorMessage("Verifică câmpurile marcate cu roșu.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      street: form.get("street"),
      city: form.get("city"),
      county,
      postalCode: form.get("postalCode"),
      notes: form.get("notes") || "",
      payment,
      companyName: payment === "factura" ? form.get("companyName") : "",
      companyCui: payment === "factura" ? form.get("companyCui") : "",
      items: items.map((i) => ({
        name: i.name,
        thickness: i.thickness,
        width: i.width,
        length: i.length,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
        sku: i.sku,
      })),
      totalPrice,
    };

    try {
      const res = await fetch("/api/comanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Eroare la trimiterea comenzii.");
      }
      const data = await res.json();
      setOrderId(data.orderId || "");
      setConfirmedOrder({ items, totalPrice, county });
      trackPurchase(data.orderId || "", items, totalPrice);
      clearCart();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Eroare la trimiterea comenzii."
      );
    }
  }

  if (status === "success") {
    const confirmedZone = confirmedOrder
      ? getShippingZone(confirmedOrder.county)
      : zone;
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="mb-10 flex justify-center">
          <CheckoutSteps current={2} />
        </div>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-950">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Comanda a fost trimisă!
          </h1>
          {orderId && (
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Numărul comenzii tale:{" "}
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                {orderId}
              </span>
            </p>
          )}
        </div>

        {confirmedOrder && (
          <div className="mt-8 rounded-2xl border border-black/10 p-6 text-left dark:border-white/10">
            <h2 className="text-lg font-semibold">Sumarul comenzii</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {confirmedOrder.items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} × {item.name}
                    <span className="block text-zinc-500 dark:text-zinc-400">
                      {item.thickness} · {item.width} × {item.length}
                      {item.sku && <> · Cod {item.sku}</>}
                    </span>
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
              <p className="flex justify-between font-bold">
                <span>Total produse</span>
                <span className="text-blue-600">
                  {formatPrice(confirmedOrder.totalPrice)}
                </span>
              </p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                + {confirmedZone.methodLabel.toLowerCase()} de la{" "}
                {confirmedZone.priceFrom} RON — costul exact îți este confirmat
                telefonic.
              </p>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-zinc-600 dark:text-zinc-400">
          Îți mulțumim! Te sunăm în maxim 24 de ore pentru confirmarea comenzii
          și costul exact al transportului.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Ai întrebări? Sună-ne acum: {siteConfig.phone}
          </a>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400"
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Nu ai produse în coș
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Adaugă produse în coș înainte de a plasa o comandă.
        </p>
        <Link
          href="/produse/folii-transparente-terase"
          className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Vezi produsele
        </Link>
      </div>
    );
  }

  const summaryBody = (
    <>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="text-sm">
            <span className="font-medium">
              {item.quantity} × {item.name}
            </span>
            <span className="block text-zinc-500 dark:text-zinc-400">
              {item.thickness} · {item.width} × {item.length}
              {item.sku && <> · Cod {item.sku}</>} —{" "}
              {formatPrice(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
        <p className="flex justify-between text-sm">
          <span>Subtotal produse</span>
          <span className="font-semibold">{formatPrice(totalPrice)}</span>
        </p>
        <p className="mt-2 flex justify-between text-sm">
          <span>
            Transport
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              {zone.methodLabel}
              {zone.deliveryTime && <> ({zone.deliveryTime})</>} —{" "}
              {zone.zoneLabel}
            </span>
          </span>
          <span className="shrink-0 font-semibold">
            de la {zone.priceFrom} RON
          </span>
        </p>
        <p className="mt-4 flex justify-between border-t border-black/10 pt-4 font-bold dark:border-white/10">
          <span>Total estimat</span>
          <span className="text-blue-600">
            de la {formatPrice(totalPrice + zone.priceFrom)}
          </span>
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          {shippingNote} Plata se face integral la livrare.
        </p>
      </div>
    </>
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8">
        <CheckoutSteps current={1} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Livrare și plată
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="order-first lg:hidden">
          <details className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
            <summary className="cursor-pointer font-semibold">
              Rezumatul comenzii —{" "}
              <span className="text-blue-600">{formatPrice(totalPrice)}</span>
            </summary>
            {summaryBody}
          </details>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nume contact *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              onBlur={handleBlur}
              className={fieldErrors.name ? inputErrorClass : inputClass}
              placeholder="Nume și prenume"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Număr de telefon *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                onBlur={handleBlur}
                className={fieldErrors.phone ? inputErrorClass : inputClass}
                placeholder="07xx xxx xxx"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onBlur={handleBlur}
                className={fieldErrors.email ? inputErrorClass : inputClass}
                placeholder="exemplu@email.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="street" className="block text-sm font-medium">
              Stradă și număr *
            </label>
            <input
              id="street"
              name="street"
              type="text"
              required
              onBlur={handleBlur}
              className={fieldErrors.street ? inputErrorClass : inputClass}
              placeholder="Str. Exemplu, nr. 10, bl./sc./ap. dacă e cazul"
            />
            {fieldErrors.street && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.street}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">
                Localitate *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                onBlur={handleBlur}
                className={fieldErrors.city ? inputErrorClass : inputClass}
                placeholder="Timișoara"
              />
              {fieldErrors.city && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.city}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="county" className="block text-sm font-medium">
                Județ *
              </label>
              <select
                id="county"
                name="county"
                required
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className={`${inputClass} appearance-none bg-white dark:bg-zinc-950`}
              >
                {judete.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">
                Cod poștal *
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                inputMode="numeric"
                required
                onBlur={handleBlur}
                className={
                  fieldErrors.postalCode ? inputErrorClass : inputClass
                }
                placeholder="300001"
              />
              {fieldErrors.postalCode && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {fieldErrors.postalCode}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950/40">
            <p className="font-semibold text-blue-900 dark:text-blue-200">
              {zone.methodLabel}
              {zone.deliveryTime && <> — {zone.deliveryTime}</>}
            </p>
            <p className="mt-1 text-blue-800 dark:text-blue-300">
              {zone.zoneLabel}: de la {zone.priceFrom} RON. {shippingNote}
            </p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium">
              Metoda de plată *
            </legend>
            <div className="mt-2 flex flex-col gap-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    payment === method.id
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30"
                      : "border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    className="mt-1 accent-blue-600"
                  />
                  <span>
                    <span className="block text-sm font-semibold">
                      {method.label}
                    </span>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                      {method.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {payment === "factura" && (
            <div className="grid gap-5 rounded-xl border border-black/10 p-4 sm:grid-cols-2 dark:border-white/10">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium"
                >
                  Denumire firmă *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  onBlur={handleBlur}
                  className={
                    fieldErrors.companyName ? inputErrorClass : inputClass
                  }
                  placeholder="Exemplu SRL"
                />
                {fieldErrors.companyName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.companyName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="companyCui"
                  className="block text-sm font-medium"
                >
                  CUI / CIF *
                </label>
                <input
                  id="companyCui"
                  name="companyCui"
                  type="text"
                  required
                  onBlur={handleBlur}
                  className={
                    fieldErrors.companyCui ? inputErrorClass : inputClass
                  }
                  placeholder="RO12345678"
                />
                {fieldErrors.companyCui && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.companyCui}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="notes" className="block text-sm font-medium">
              Observații (opțional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              className={inputClass}
              placeholder="Detalii pentru livrare, interval orar preferat etc."
            />
          </div>

          {status === "error" && (
            <p className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              {errorMessage} Poți încerca din nou sau ne poți suna direct la{" "}
              <a href={siteConfig.phoneHref} className="font-semibold underline">
                {siteConfig.phone}
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {status === "sending" ? "Se trimite..." : "Trimite comanda"}
          </button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            După trimiterea comenzii vei fi contactat telefonic în maxim 24 de
            ore pentru confirmare și costul exact al transportului. Nu se face
            nicio plată online — plătești doar la livrare.
          </p>
        </form>

        <aside className="hidden h-fit rounded-2xl border border-black/10 p-6 lg:sticky lg:top-24 lg:block dark:border-white/10">
          <h2 className="text-lg font-semibold">Rezumatul comenzii</h2>
          {summaryBody}
        </aside>
      </div>
    </div>
  );
}
