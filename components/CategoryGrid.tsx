"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type CategoryGridProduct = {
  slug: string;
  name: string;
  price: number;
  image: string | undefined;
  thicknesses: string[];
  widths: string[];
  lengths: string[];
  hasVariants: boolean;
};

type Props = {
  categorySlug: string;
  products: CategoryGridProduct[];
};

function sortNumeric(values: string[]) {
  return [...values].sort((a, b) => parseFloat(a) - parseFloat(b));
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  if (options.length <= 1) return null;
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(isSelected ? null : option)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
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

  const allThicknesses = useMemo(
    () => sortNumeric([...new Set(products.flatMap((p) => p.thicknesses))]),
    [products]
  );
  const allWidths = useMemo(
    () => sortNumeric([...new Set(products.flatMap((p) => p.widths))]),
    [products]
  );
  const allLengths = useMemo(
    () => sortNumeric([...new Set(products.flatMap((p) => p.lengths))]),
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (thickness && !p.thicknesses.includes(thickness)) return false;
      if (width && !p.widths.includes(width)) return false;
      if (length && !p.lengths.includes(length)) return false;
      return true;
    });
  }, [products, thickness, width, length]);

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
            label="Grosime folie"
            options={allThicknesses}
            selected={thickness}
            onSelect={setThickness}
          />
          <FilterGroup
            label="Lățime folie"
            options={allWidths}
            selected={width}
            onSelect={setWidth}
          />
          <FilterGroup
            label="Lungime rolă"
            options={allLengths}
            selected={length}
            onSelect={setLength}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-zinc-600 dark:text-zinc-400">
          Niciun produs nu corespunde filtrelor selectate.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                </div>
              )}
              <h2 className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {product.name}
              </h2>
              <div className="group relative mt-2 h-7 overflow-hidden">
                <p className="absolute inset-0 flex items-center text-lg font-semibold text-blue-600 transition-transform duration-200 group-hover:-translate-y-full">
                  de la {product.price.toFixed(2).replace(".", ",")} RON
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
