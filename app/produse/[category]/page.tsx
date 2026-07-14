import type { Metadata } from "next";
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {categoryProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/produse/${category.slug}/${product.slug}`}
              className="flex flex-col rounded-2xl border border-black/10 p-6 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {product.shortDescription}
              </p>
              <p className="mt-4 text-lg font-semibold text-blue-600">
                de la {product.price.toFixed(2).replace(".", ",")}{" "}
                {product.priceUnit}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
