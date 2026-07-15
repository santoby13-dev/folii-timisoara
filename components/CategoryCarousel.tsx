"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/products";

const slideBackgrounds = [
  "from-blue-700 to-blue-950",
  "from-zinc-700 to-zinc-950",
  "from-indigo-700 to-indigo-950",
  "from-slate-600 to-slate-950",
];

export default function CategoryCarousel({
  categories,
}: {
  categories: Category[];
}) {
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    setActive((index + categories.length) % categories.length);
  }

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {categories.map((category, i) => (
            <Link
              key={category.slug}
              href={`/produse/${category.slug}`}
              className={`relative flex h-64 w-full shrink-0 flex-col items-center justify-center gap-3 bg-gradient-to-br px-6 text-center sm:h-80 ${
                slideBackgrounds[i % slideBackgrounds.length]
              }`}
            >
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {category.name}
              </span>
              {category.status === "coming-soon" && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  în curând
                </span>
              )}
              <span className="text-sm font-semibold text-white/80">
                Vezi produse &rarr;
              </span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Categoria anterioară"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
        >
          <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none">
            <path
              d="M8 2L4 6l4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Categoria următoare"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
        >
          <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none">
            <path
              d="M4 2l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {categories.map((category, i) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Mergi la ${category.name}`}
            aria-current={i === active}
            className={`h-2.5 w-2.5 rounded-sm transition-colors ${
              i === active ? "bg-blue-500" : "bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
