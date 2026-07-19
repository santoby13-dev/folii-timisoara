"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, formatPrice } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { useCatalog } from "@/components/CatalogProvider";
import { shippingZones } from "@/lib/shipping";

export default function CartDrawer() {
  const { items, totalPrice, drawerOpen, closeDrawer } = useCart();
  const { products } = useCatalog();

  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-xl dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <h2 className="text-lg font-semibold">Produs adăugat în coș</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Închide"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Coșul tău este gol.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const product = getProduct(products, item.categorySlug, item.productSlug);
                const image = product?.images[0];
                return (
                  <li key={item.id} className="flex items-center gap-3">
                    {image && (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white dark:border-white/10">
                        <Image
                          src={image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.quantity} × {formatPrice(item.unitPrice)}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 px-5 py-5 dark:border-white/10">
          <p className="flex justify-between text-base font-bold">
            <span>Subtotal</span>
            <span className="text-blue-600">{formatPrice(totalPrice)}</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            + transport de la {shippingZones[0].priceFrom} RON (expres
            Timișoara) sau de la {shippingZones[1].priceFrom} RON (restul
            țării)
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/comanda"
              onClick={closeDrawer}
              className="rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Plasează comanda
            </Link>
            <Link
              href="/cos"
              onClick={closeDrawer}
              className="rounded-full border border-black/10 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
            >
              Vezi coșul complet
            </Link>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-1 text-center text-sm font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400"
            >
              Continuă cumpărăturile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
