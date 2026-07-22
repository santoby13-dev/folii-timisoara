"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cos"
      aria-label="Coș de cumpărături"
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
