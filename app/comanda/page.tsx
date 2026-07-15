"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, formatPrice } from "@/lib/cart";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "success" | "error";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      address: form.get("address"),
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
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
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
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Îți mulțumim! Te sunăm în maxim 24 de ore pentru confirmarea
          comenzii și stabilirea costului de transport.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Înapoi la pagina principală
        </Link>
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Plasează comanda
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nume contact *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={3}
              className="mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
              placeholder="Nume și prenume"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Număr de telefon *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="[0-9+ ]{10,15}"
              className="mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
              placeholder="07xx xxx xxx"
            />
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
              className="mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
              placeholder="exemplu@email.com"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Adresă de livrare *
            </label>
            <textarea
              id="address"
              name="address"
              required
              minLength={10}
              rows={3}
              className="mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
              placeholder="Stradă, număr, localitate, județ"
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
            ore pentru confirmare și stabilirea detaliilor de livrare. Nu se
            face nicio plată online.
          </p>
        </form>

        <aside className="h-fit rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-lg font-semibold">Rezumatul comenzii</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="text-sm">
                <span className="font-medium">
                  {item.quantity} × {item.thickness}
                </span>
                <span className="block text-zinc-500 dark:text-zinc-400">
                  {item.width} × {item.length}
                  {item.sku && <> · Cod {item.sku}</>} —{" "}
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
            <p className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-blue-600">{formatPrice(totalPrice)}</span>
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Transportul se stabilește telefonic, în funcție de greutate și
              adresă.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
