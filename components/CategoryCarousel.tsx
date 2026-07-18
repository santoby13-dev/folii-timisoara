"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/products";

const slideBackgrounds = [
  "from-blue-700 to-blue-950",
  "from-zinc-700 to-zinc-950",
  "from-indigo-700 to-indigo-950",
  "from-slate-600 to-slate-950",
];

/**
 * Crossfade automat între mai multe poze reale, pentru categorii fără o
 * singură poză de fundal reprezentativă (ex. Unelte). Prima poză pornește
 * invizibilă și se arată abia după ce s-a încărcat efectiv (`onLoad`) — fără
 * asta, textul de deasupra (randat instant) apărea vizibil înaintea pozei,
 * care „pocnea" brusc odată încărcată. Titlul/textul rămân neschimbate,
 * randate instant, fără nicio tranziție.
 */
function SlideshowBackground({ images, priority }: { images: string[]; priority: boolean }) {
  const [active, setActive] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 2500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active && (i !== 0 || firstLoaded) ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={priority && i === 0}
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
            onLoad={i === 0 ? () => setFirstLoaded(true) : undefined}
          />
        </div>
      ))}
    </>
  );
}

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
              className={`relative flex h-64 w-full shrink-0 flex-col items-center justify-center gap-3 overflow-hidden px-6 text-center sm:h-80 ${
                category.image || category.images
                  ? "bg-black"
                  : `bg-gradient-to-br ${slideBackgrounds[i % slideBackgrounds.length]}`
              }`}
            >
              {category.images ? (
                <SlideshowBackground images={category.images} priority={i === 0} />
              ) : (
                category.image && (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                  />
                )
              )}
              {(category.image || category.images) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              )}
              <span className="relative text-2xl font-bold text-white sm:text-3xl">
                {category.name}
              </span>
              {category.status === "coming-soon" && (
                <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  în curând
                </span>
              )}
              <span className="relative text-sm font-semibold text-white/80">
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
