"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart, formatPrice, cartItemDetailLine } from "@/lib/cart";
import { useCatalog } from "@/components/CatalogProvider";
import { shippingZones, shippingNote, paymentMethods } from "@/lib/shipping";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalPrice } = useCart();
  const { products } = useCatalog();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Coșul tău este gol
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Adaugă produse din catalog pentru a plasa o comandă.
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
      <div className="mb-8">
        <CheckoutSteps current={0} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Coș de cumpărături
      </h1>

      <div className="mt-10 flex flex-col gap-4">
        {items.map((item) => {
          const image = products.find(
            (p) => p.categorySlug === item.categorySlug && p.slug === item.productSlug
          )?.image;
          return (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
            >
              <div className="flex flex-1 items-center gap-4">
                {image && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10">
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div>
                  <Link
                    href={`/produse/${item.categorySlug}/${item.productSlug}`}
                    className="font-semibold hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                  {cartItemDetailLine(item) && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {cartItemDetailLine(item)}
                    </p>
                  )}
                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    {formatPrice(item.unitPrice)} / {item.unitLabel ?? "rolă"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-black/10 dark:border-white/10">
                  <button
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center text-lg hover:text-blue-600"
                    aria-label="Scade cantitatea"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center text-lg hover:text-blue-600"
                    aria-label="Crește cantitatea"
                  >
                    +
                  </button>
                </div>

                <p className="w-28 text-right font-semibold">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-zinc-400 hover:text-red-600"
                  aria-label="Șterge produsul"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {shippingZones.map((zone) => (
          <div
            key={zone.id}
            className="rounded-2xl border border-black/10 p-5 dark:border-white/10"
          >
            <div className="flex items-center gap-2">
              <TruckIcon />
              <h2 className="font-semibold">{zone.methodLabel}</h2>
              {zone.deliveryTime && (
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                  {zone.deliveryTime}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {zone.zoneLabel}
            </p>
            <p className="mt-2 font-semibold text-blue-600">
              de la {zone.priceFrom} RON
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        {shippingNote}
      </p>

      <div className="mt-6 rounded-2xl border border-black/10 p-5 dark:border-white/10">
        <h2 className="font-semibold">Metode de plată</h2>
        <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
          {paymentMethods.map((method) => (
            <li
              key={method.id}
              className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <PaymentIcon method={method.id} />
              {method.label}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Nu se face nicio plată online — plătești doar la livrare.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-end gap-2">
        <p className="text-xl font-bold">
          Subtotal produse:{" "}
          <span className="text-blue-600">{formatPrice(totalPrice)}</span>
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          + transport de la {shippingZones[0].priceFrom} RON (expres local) sau
          de la {shippingZones[1].priceFrom} RON (restul țării)
        </p>
        <Link
          href="/comanda"
          className="mt-3 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Continuă spre livrare
        </Link>
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg
      className="h-5 w-5 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function PaymentIcon({ method }: { method: string }) {
  if (method === "cash") {
    return (
      <svg
        className="h-5 w-5 shrink-0 text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    );
  }
  if (method === "pos") {
    return (
      <svg
        className="h-5 w-5 shrink-0 text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    );
  }
  return (
    <svg
      className="h-5 w-5 shrink-0 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  );
}
