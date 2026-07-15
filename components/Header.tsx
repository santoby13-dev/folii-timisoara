"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/products";
import CartLink from "@/components/CartLink";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90">
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
                d="M4 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

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
            <a href="/#despre" className="hover:text-blue-600">
              Despre noi
            </a>
            <a href="/#contact" className="hover:text-blue-600">
              Contact
            </a>
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

        {/* Right column: cart */}
        <div className="flex justify-end">
          <CartLink />
        </div>
      </div>

      {/* Mobile: secondary menu bar under the header */}
      {menuOpen && (
        <nav className="border-t border-black/10 bg-white px-4 py-3 sm:hidden dark:border-white/10 dark:bg-black">
          <Link
            href="/produse"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Produse
          </Link>
          <a
            href="/#despre"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Despre noi
          </a>
          <a
            href="/#contact"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Contact
          </a>
          <div className="mt-2 border-t border-black/10 pt-2 dark:border-white/10">
            <a
              href={siteConfig.phoneHref}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Sună-ne: {siteConfig.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
