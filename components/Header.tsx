"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { categories, products } from "@/lib/products";
import CartLink from "@/components/CartLink";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  // Deschis implicit — pe mobil, meniul secundar (Produse/Despre noi/Contact)
  // era ascuns și nimeni nu-l descoperea; acum e vizibil din prima, fără să
  // mai fie nevoie de un click sau de o animație care să-l semnaleze.
  const [menuOpen, setMenuOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90 relative">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6">
        {/* Left column: mobile menu toggle / desktop nav */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 sm:hidden dark:border-white/10"
          >
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Pe mobil, toggle-ul de temă stă în stânga ca header-ul să rămână
              echilibrat (2 iconițe stânga / 2 dreapta) și titlul centrat. */}
          <ThemeToggle className="ml-1 flex sm:hidden" />

          <nav className="hidden gap-8 text-sm font-medium sm:flex">
            <div className="group relative">
              <button className="flex items-center gap-1 hover:text-blue-600">
                Produse
                <svg
                  className="h-3 w-3 transition-transform group-hover:rotate-180"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full w-64 rounded-xl border border-black/10 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 dark:border-white/10 dark:bg-zinc-900">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/produse/${category.slug}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {category.name}
                    {category.status === "coming-soon" && (
                      <span className="text-xs text-zinc-400">în curând</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/#despre" className="hover:text-blue-600">
              Despre noi
            </Link>
            <Link href="/#contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>

        {/* Center column: title, always dead-centered */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-lg font-semibold tracking-tight whitespace-nowrap"
        >
          {siteConfig.name}
        </Link>

        {/* Right column: theme + search + cart */}
        <div className="flex items-center justify-end gap-1">
          <ThemeToggle className="hidden sm:flex" />
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? "Închide căutarea" : "Caută produse"}
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="9"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M14 14l4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <CartLink />
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-black/10 bg-white px-4 py-4 shadow-lg dark:border-white/10 dark:bg-black sm:px-6">
          <div className="mx-auto flex max-w-6xl items-center gap-2">
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută produse..."
              className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Închide căutarea"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              ✕
            </button>
          </div>

          {query.trim() && (
            <div className="mx-auto mt-3 max-w-6xl">
              {searchResults.length === 0 ? (
                <p className="px-1 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Niciun produs găsit.
                </p>
              ) : (
                <ul className="flex max-h-96 flex-col gap-1 overflow-y-auto">
                  {searchResults.map((product) => (
                    <li key={`${product.categorySlug}-${product.slug}`}>
                      <Link
                        href={`/produse/${product.categorySlug}/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        {product.images[0] && (
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-sm">{product.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile: secondary menu bar under the header — orizontal, ca meniul de pe desktop */}
      {menuOpen && (
        <nav className="border-t border-black/10 bg-white px-4 py-3 sm:hidden dark:border-white/10 dark:bg-black">
          <div className="flex items-center justify-center gap-6 text-sm font-medium">
            <Link
              href="/produse"
              onClick={closeMenu}
              className="rounded-lg px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Produse
            </Link>
            <Link
              href="/#despre"
              onClick={closeMenu}
              className="rounded-lg px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Despre noi
            </Link>
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="rounded-lg px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Contact
            </Link>
          </div>
          <div className="mt-2 border-t border-black/10 pt-2 text-center dark:border-white/10">
            <a
              href={siteConfig.phoneHref}
              className="inline-block rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Sună-ne: {siteConfig.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
