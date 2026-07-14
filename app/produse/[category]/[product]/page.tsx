import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getCategory, getProduct, products } from "@/lib/products";
import { folieVariants, folieMinPrice } from "@/lib/folie-variants";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.categorySlug,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category, product: productSlug } = await params;
  const product = getProduct(category, productSlug);
  if (!product) return {};
  return {
    title: `${product.name} | Folii Timișoara`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategory(categorySlug);
  const product = getProduct(categorySlug, productSlug);
  if (!category || !product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {product.images.length > 0 && (
        <div className="mb-10">
          <ProductGallery images={product.images} alt={product.name} />
        </div>
      )}

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {category.name}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
        de la{" "}
        <span className="font-bold text-blue-600">
          {folieMinPrice.toFixed(2).replace(".", ",")} RON / rolă
        </span>{" "}
        (TVA inclus)
      </p>

      {product.hasCart && (
        <div className="mt-8">
          <AddToCart
            productSlug={product.slug}
            categorySlug={category.slug}
            productName={product.name}
            variants={folieVariants}
          />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Descriere</h2>
        <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Ce grosime alegi</h2>
        <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
          {product.useCases.map((useCase) => (
            <li key={useCase} className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <a
          href={siteConfig.phoneHref}
          className="rounded-full bg-blue-600 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Sună pentru comandă: {siteConfig.phone}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-black/10 px-6 py-3 text-center text-base font-semibold transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
        >
          Scrie-ne pe email
        </a>
      </div>
    </div>
  );
}
