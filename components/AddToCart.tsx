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

function LayersIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function WidthIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h18" />
      <path d="m7 8-4 4 4 4" />
      <path d="m17 8 4 4-4 4" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-zinc-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17 17 3l4 4L7 21l-4-4Z" />
      <path d="m14.5 5.5 2 2" />
      <path d="m11.5 8.5 2 2" />
      <path d="m8.5 11.5 2 2" />
      <path d="m5.5 14.5 2 2" />
    </svg>
  );
}

function OptionChips({
  label,
  icon,
  options,
  selected,
  onSelect,
  disabledOptions,
}: {
  label: string;
  icon: React.ReactNode;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  disabledOptions: Set<string>;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === selected;
          const isDisabled = disabledOptions.has(option);
          return (
            <button
              key={option}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(option)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : isDisabled
                    ? "cursor-not-allowed border-black/10 text-zinc-300 dark:border-white/10 dark:text-zinc-700"
                    : "border-black/10 hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
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

function cheapestVariant(variants: FolieVariant[]) {
  return variants.reduce((min, v) => (v.price < min.price ? v : min), variants[0]);
}

export default function AddToCart({
  productSlug,
  categorySlug,
  productName,
  variants,
}: Props) {
  const { addItem } = useCart();
  const defaultVariant = useMemo(() => cheapestVariant(variants), [variants]);
  const [thickness, setThickness] = useState<string | null>(
    defaultVariant.thickness
  );
  const [width, setWidth] = useState<string | null>(defaultVariant.width);
  const [length, setLength] = useState<string | null>(defaultVariant.length);
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
    <div>
      {selectedVariant ? (
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl font-bold text-blue-600">
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
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Selectează grosimea, lățimea și lungimea pentru a vedea prețul.
        </p>
      )}

      <div className="mt-6 grid gap-5">
        <OptionChips
          label="Grosime folie"
          icon={<LayersIcon />}
          options={allThicknesses}
          selected={thickness}
          onSelect={selectThickness}
          disabledOptions={new Set()}
        />
        <OptionChips
          label="Lățime folie"
          icon={<WidthIcon />}
          options={allWidths}
          selected={width}
          onSelect={selectWidth}
          disabledOptions={
            new Set(allWidths.filter((w) => !validWidths.has(w)))
          }
        />
        <OptionChips
          label="Lungime rolă"
          icon={<RulerIcon />}
          options={allLengths}
          selected={length}
          onSelect={selectLength}
          disabledOptions={
            new Set(allLengths.filter((l) => !validLengths.has(l)))
          }
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-black/10 pt-6 dark:border-white/10">
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
  );
}
