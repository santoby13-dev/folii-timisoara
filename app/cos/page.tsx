"use client";

import Link from "next/link";
import { useCart, formatPrice } from "@/lib/cart";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalPrice } = useCart();

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
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Coș de cumpărături
      </h1>

      <div className="mt-10 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
          >
            <div className="flex-1">
              <Link
                href={`/produse/${item.categorySlug}/${item.productSlug}`}
                className="font-semibold hover:text-blue-600"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Grosime {item.thickness} · Lățime {item.width} · Lungime{" "}
                {item.length}
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-600">
                {formatPrice(item.unitPrice)} / {item.unitLabel ?? "rolă"}
              </p>
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
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-xl font-bold">
          Total: <span className="text-blue-600">{formatPrice(totalPrice)}</span>
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Transportul se stabilește telefonic, în funcție de greutate și
          adresa de livrare.
        </p>
        <Link
          href="/comanda"
          className="rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Plasează comanda
        </Link>
      </div>
    </div>
  );
}
