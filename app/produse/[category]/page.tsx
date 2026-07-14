import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: `${category.name} | Folii Timișoara`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(categorySlug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {category.name}
      </h1>

      {categoryProducts.length === 0 ? (
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Produsele din această categorie vor fi disponibile în curând. Sună-ne
          pentru informații și disponibilitate.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => {
            const hasVariants =
              product.thicknesses.length > 1 ||
              product.widths.length > 1 ||
              product.lengths.length > 1;
            return (
              <Link
                key={product.slug}
                href={`/produse/${category.slug}/${product.slug}`}
                className="flex flex-col rounded-2xl border border-black/10 p-4 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
              >
                {product.images[0] && (
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      src={product.images[0]}
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
                    {hasVariants ? "Selectează opțiuni" : "Adaugă în coș"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
