import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/products";
import CartLink from "@/components/CartLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
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
        <div className="flex items-center gap-3">
          <CartLink />
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
