"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart, formatPrice } from "@/lib/cart";
import type { FolieVariant } from "@/lib/folie-variants";

type Props = {
  productSlug: string;
  categorySlug: string;
  productName: string;
  variants: FolieVariant[];
};

function OptionGroup({
  label,
  options,
  selected,
  onSelect,
  disabledOptions,
}: {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  disabledOptions: Set<string>;
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const disabled = disabledOptions.has(option);
          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(option)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected === option
                  ? "border-blue-600 bg-blue-600 text-white"
                  : disabled
                    ? "cursor-not-allowed border-black/5 text-zinc-300 dark:border-white/5 dark:text-zinc-700"
                    : "border-black/10 hover:border-blue-600 dark:border-white/10"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AddToCart({
  productSlug,
  categorySlug,
  productName,
  variants,
}: Props) {
  const { addItem } = useCart();
  const [thickness, setThickness] = useState<string | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [quantity, setQuantityState] = useState(1);
  const [added, setAdded] = useState(false);

  const allThicknesses = useMemo(
    () => [...new Set(variants.map((v) => v.thickness))],
    [variants]
  );
  const allWidths = useMemo(
    () =>
      [...new Set(variants.map((v) => v.width))].sort(
        (a, b) => parseFloat(a) - parseFloat(b)
      ),
    [variants]
  );
  const allLengths = useMemo(
    () =>
      [...new Set(variants.map((v) => v.length))].sort(
        (a, b) => parseFloat(a) - parseFloat(b)
      ),
    [variants]
  );

  const validWidths = useMemo(() => {
    if (!thickness) return new Set(allWidths);
    return new Set(
      variants.filter((v) => v.thickness === thickness).map((v) => v.width)
    );
  }, [variants, thickness, allWidths]);

  const validLengths = useMemo(() => {
    let pool = variants;
    if (thickness) pool = pool.filter((v) => v.thickness === thickness);
    if (width) pool = pool.filter((v) => v.width === width);
    return new Set(pool.map((v) => v.length));
  }, [variants, thickness, width]);

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (v) =>
          v.thickness === thickness && v.width === width && v.length === length
      ) ?? null,
    [variants, thickness, width, length]
  );

  function selectThickness(value: string) {
    setThickness(value);
    // reset selections that are no longer valid for the new thickness
    const pool = variants.filter((v) => v.thickness === value);
    if (width && !pool.some((v) => v.width === width)) setWidth(null);
    if (
      length &&
      !pool.some((v) => (!width || v.width === width) && v.length === length)
    )
      setLength(null);
    setAdded(false);
  }

  function selectWidth(value: string) {
    setWidth(value);
    const pool = variants.filter(
      (v) => (!thickness || v.thickness === thickness) && v.width === value
    );
    if (length && !pool.some((v) => v.length === length)) setLength(null);
    setAdded(false);
  }

  function selectLength(value: string) {
    setLength(value);
    setAdded(false);
  }

  function handleAdd() {
    if (!selectedVariant) return;
    addItem({
      productSlug,
      categorySlug,
      name: productName,
      thickness: selectedVariant.thickness,
      width: selectedVariant.width,
      length: selectedVariant.length,
      unitPrice: selectedVariant.price,
      quantity,
    });
    setAdded(true);
  }

  return (
    <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
      <h2 className="text-lg font-semibold">Configurează rola</h2>

      <div className="mt-5 flex flex-col gap-5">
        <OptionGroup
          label="Grosime folie"
          options={allThicknesses}
          selected={thickness}
          onSelect={selectThickness}
          disabledOptions={new Set()}
        />
        <OptionGroup
          label="Lățime folie"
          options={allWidths}
          selected={width}
          onSelect={selectWidth}
          disabledOptions={
            new Set(allWidths.filter((w) => !validWidths.has(w)))
          }
        />
        <OptionGroup
          label="Lungime rolă"
          options={allLengths}
          selected={length}
          onSelect={selectLength}
          disabledOptions={
            new Set(allLengths.filter((l) => !validLengths.has(l)))
          }
        />
      </div>

      <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/10">
        {selectedVariant ? (
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(selectedVariant.price)}
            </span>
            {selectedVariant.oldPrice && (
              <span className="text-zinc-400 line-through">
                {formatPrice(selectedVariant.oldPrice)}
              </span>
            )}
            <span className="text-sm text-zinc-500">/ rolă, TVA inclus</span>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Selectează grosimea, lățimea și lungimea pentru a vedea prețul.
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={() => setQuantityState((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-lg hover:text-blue-600"
              aria-label="Scade cantitatea"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantityState((q) => Math.min(99, q + 1))}
              className="flex h-11 w-11 items-center justify-center text-lg hover:text-blue-600"
              aria-label="Crește cantitatea"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedVariant}
            className="flex-1 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Adaugă în coș
          </button>
        </div>

        {added && (
          <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
            Produs adăugat în coș.{" "}
            <Link href="/cos" className="font-semibold underline">
              Vezi coșul
            </Link>{" "}
            sau continuă cumpărăturile.
          </p>
        )}
      </div>
    </div>
  );
}
