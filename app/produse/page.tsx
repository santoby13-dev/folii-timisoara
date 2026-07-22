import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Produse | Folii Timișoara",
  description: "Categoriile de produse Folii Timișoara.",
};

export default async function ProduseIndexPage() {
  const { categories } = await getCatalog();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Categorii de produse
      </h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/produse/${category.slug}`}
            className="rounded-2xl border border-black/10 p-6 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
            {category.status === "coming-soon" && (
              <span className="mt-1 inline-block text-xs text-zinc-400">
                în curând
              </span>
            )}
            <span className="mt-4 block text-sm font-semibold text-blue-600 dark:text-blue-400">
              Vezi produse &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
