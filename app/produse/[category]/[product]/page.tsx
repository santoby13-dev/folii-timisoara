import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getCategory, getProduct, products } from "@/lib/products";

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

  const discountPercent = Math.round(
    (1 - product.price / product.priceBeforeDiscount) * 100
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {category.name}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="text-2xl font-bold text-blue-600">
          {product.price.toFixed(2).replace(".", ",")} {product.priceUnit}
        </span>
        {discountPercent > 0 && (
          <>
            <span className="text-lg text-zinc-400 line-through">
              {product.priceBeforeDiscount.toFixed(2).replace(".", ",")} RON
            </span>
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Prețul final variază în funcție de grosimea, lățimea și lungimea
        alese. Se confirmă la comandă, telefonic sau prin email.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Grosime folie
          </h2>
          <p className="mt-2 text-base font-medium">
            {product.thicknesses.join(" · ")}
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Lățime folie
          </h2>
          <p className="mt-2 text-base font-medium">
            {product.widths.join(" · ")}
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Lungime rolă
          </h2>
          <p className="mt-2 text-base font-medium">
            {product.lengths.join(" · ")}
          </p>
        </div>
      </div>

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
