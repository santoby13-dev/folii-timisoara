import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, getProductsByCategory } from "@/lib/products";
import CategoryGrid from "@/components/CategoryGrid";

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
        <div className="mt-10">
          <CategoryGrid
            categorySlug={category.slug}
            products={categoryProducts.map((product) => ({
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.images[0],
              thicknesses: product.thicknesses,
              widths: product.widths,
              lengths: product.lengths,
              hasVariants:
                product.thicknesses.length > 1 ||
                product.widths.length > 1 ||
                product.lengths.length > 1,
            }))}
          />
        </div>
      )}
    </div>
  );
}
