"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type CategoryGridVariant = {
  thickness: string;
  width: string;
  length: string;
};

export type CategoryGridProduct = {
  slug: string;
  name: string;
  price: number;
  priceBeforeDiscount: number;
  image: string | undefined;
  variants: CategoryGridVariant[];
  hasVariants: boolean;
  /** Preț pe m² al celei mai ieftine variante, pentru comparație rapidă. */
  pricePerSqm?: number;
};

type SortOrder = "recommended" | "price-asc" | "price-desc";

type Props = {
  categorySlug: string;
  products: CategoryGridProduct[];
};

function sortNumeric(values: string[]) {
  return [...values].sort((a, b) => parseFloat(a) - parseFloat(b));
}

function FilterGroup({
  label,
  hint,
  options,
  selected,
  onSelect,
  disabledOptions,
}: {
  label: string;
  hint?: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabledOptions: Set<string>;
}) {
  if (options.length <= 1) return null;
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      {hint && (
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === selected;
          const isDisabled = !isSelected && disabledOptions.has(option);
          return (
            <button
              key={option}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(isSelected ? null : option)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
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

export default function CategoryGrid({ categorySlug, products }: Props) {
  const [thickness, setThickness] = useState<string | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOrder>("recommended");

  // Every real, purchasable combination across all products in the category —
  // the same source of truth used by the product-page variant selector.
  const allVariants = useMemo(
    () => products.flatMap((p) => p.variants),
    [products]
  );

  const allThicknesses = useMemo(
    () => sortNumeric([...new Set(allVariants.map((v) => v.thickness))]),
    [allVariants]
  );
  const allWidths = useMemo(
    () => sortNumeric([...new Set(allVariants.map((v) => v.width))]),
    [allVariants]
  );
  const allLengths = useMemo(
    () => sortNumeric([...new Set(allVariants.map((v) => v.length))]),
    [allVariants]
  );

  const validWidths = useMemo(() => {
    if (!thickness) return new Set(allWidths);
    return new Set(
      allVariants.filter((v) => v.thickness === thickness).map((v) => v.width)
    );
  }, [allVariants, thickness, allWidths]);

  const validLengths = useMemo(() => {
    let pool = allVariants;
    if (thickness) pool = pool.filter((v) => v.thickness === thickness);
    if (width) pool = pool.filter((v) => v.width === width);
    return new Set(pool.map((v) => v.length));
  }, [allVariants, thickness, width]);

  function selectThickness(value: string | null) {
    setThickness(value);
    if (!value) return;
    // reset selections that are no longer valid for the new thickness
    const pool = allVariants.filter((v) => v.thickness === value);
    if (width && !pool.some((v) => v.width === width)) setWidth(null);
    if (
      length &&
      !pool.some((v) => (!width || v.width === width) && v.length === length)
    )
      setLength(null);
  }

  function selectWidth(value: string | null) {
    setWidth(value);
    if (!value) return;
    const pool = allVariants.filter(
      (v) => (!thickness || v.thickness === thickness) && v.width === value
    );
    if (length && !pool.some((v) => v.length === length)) setLength(null);
  }

  const filtered = useMemo(() => {
    const matching = products.filter((p) =>
      p.variants.some(
        (v) =>
          (!thickness || v.thickness === thickness) &&
          (!width || v.width === width) &&
          (!length || v.length === length)
      )
    );
    if (sort === "price-asc") {
      return [...matching].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      return [...matching].sort((a, b) => b.price - a.price);
    }
    return matching;
  }, [products, thickness, width, length, sort]);

  const hasActiveFilters = thickness || width || length;

  return (
    <div>
      <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Filtrează după dimensiuni</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setThickness(null);
                setWidth(null);
                setLength(null);
              }}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Resetează filtrele
            </button>
          )}
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <FilterGroup
            label="Grosime"
            hint="0.4–0.5 mm: uz sezonier, flexibilă · 0.8–1.0 mm: uz permanent, rigidă"
            options={allThicknesses}
            selected={thickness}
            onSelect={selectThickness}
            disabledOptions={new Set()}
          />
          <FilterGroup
            label="Lățime"
            hint="Alege o lățime cel puțin egală cu înălțimea închiderii"
            options={allWidths}
            selected={width}
            onSelect={selectWidth}
            disabledOptions={new Set(allWidths.filter((w) => !validWidths.has(w)))}
          />
          <FilterGroup
            label="Lungime"
            hint="Câți metri de material sunt pe rolă"
            options={allLengths}
            selected={length}
            onSelect={setLength}
            disabledOptions={new Set(allLengths.filter((l) => !validLengths.has(l)))}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {filtered.length}{" "}
          {filtered.length === 1 ? "produs" : "produse"}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Sortează:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className="rounded-lg border border-black/10 bg-white px-3 py-1.5 outline-none focus:border-blue-600 dark:border-white/10 dark:bg-zinc-950"
          >
            <option value="recommended">Recomandate</option>
            <option value="price-asc">Preț crescător</option>
            <option value="price-desc">Preț descrescător</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-zinc-600 dark:text-zinc-400">
          Niciun produs nu corespunde filtrelor selectate.
        </p>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Link
              key={product.slug}
              href={`/produse/${categorySlug}/${product.slug}`}
              className="flex flex-col rounded-2xl border border-black/10 p-4 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
            >
              {product.image && (
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {product.priceBeforeDiscount > product.price && (
                    <span className="absolute top-2 right-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      -
                      {Math.round(
                        ((product.priceBeforeDiscount - product.price) /
                          product.priceBeforeDiscount) *
                          100
                      )}
                      %
                    </span>
                  )}
                </div>
              )}
              <h2 className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {product.name}
              </h2>
              {product.pricePerSqm !== undefined && (
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  ≈{" "}
                  {product.pricePerSqm.toLocaleString("ro-RO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  RON/m²
                </p>
              )}
              <div className="group relative mt-2 h-7 overflow-hidden">
                <p className="absolute inset-0 flex items-center gap-2 text-lg font-semibold text-blue-600 transition-transform duration-200 group-hover:-translate-y-full">
                  de la {product.price.toFixed(2).replace(".", ",")} RON
                  {product.priceBeforeDiscount > product.price && (
                    <span className="text-sm font-normal text-zinc-400 line-through">
                      {product.priceBeforeDiscount.toFixed(2).replace(".", ",")} RON
                    </span>
                  )}
                </p>
                <p className="absolute inset-0 flex translate-y-full items-center text-sm font-semibold tracking-wide text-blue-600 uppercase transition-transform duration-200 group-hover:translate-y-0">
                  {product.hasVariants ? "Selectează opțiuni" : "Adaugă în coș"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
