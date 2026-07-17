import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Căutare produse | ${siteConfig.name}`,
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const results = query
    ? products.filter((p) => p.name.toLowerCase().includes(query))
    : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Căutare produse
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        {query
          ? `${results.length} ${results.length === 1 ? "rezultat" : "rezultate"} pentru „${q}”`
          : "Introdu un termen de căutare."}
      </p>

      {query && results.length === 0 && (
        <p className="mt-10 text-zinc-600 dark:text-zinc-400">
          Niciun produs găsit pentru „{q}”. Sună-ne la{" "}
          <a href={siteConfig.phoneHref} className="text-blue-600 hover:underline">
            {siteConfig.phone}
          </a>{" "}
          — te ajutăm să găsești ce cauți.
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => (
            <Link
              key={`${product.categorySlug}-${product.slug}`}
              href={`/produse/${product.categorySlug}/${product.slug}`}
              className="flex flex-col rounded-2xl border border-black/10 p-4 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
            >
              {product.images[0] && (
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}
              <h2 className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {product.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-blue-600">
                de la {product.price.toFixed(2).replace(".", ",")} RON
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
