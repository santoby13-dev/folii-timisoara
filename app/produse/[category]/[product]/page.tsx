import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { getCategory, getProduct, getProductsByCategory, products } from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductTrustBadges from "@/components/ProductTrustBadges";
import TrackViewItem from "@/components/TrackViewItem";

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
  const url = `${siteConfig.url}/produse/${category}/${productSlug}`;
  return {
    title: `${product.name} | Folii Timișoara`,
    description: product.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url,
      images: product.images,
      type: "website",
    },
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

  const similarProducts = getProductsByCategory(categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => `${siteConfig.url}${img}`),
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "RON",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/produse/${categorySlug}/${productSlug}`,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TrackViewItem
        id={product.sku ?? product.slug}
        name={product.name}
        price={product.price}
        category={category.name}
      />
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/produse" className="hover:text-blue-600">
          Produse
        </Link>
        <span>/</span>
        <Link href={`/produse/${category.slug}`} className="hover:text-blue-600">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {product.images.length > 0 && (
          <ProductGallery images={product.images} alt={product.name} />
        )}

        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {category.name}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          {product.hasCart && product.variants ? (
            <div className="mt-6">
              <AddToCart
                productSlug={product.slug}
                categorySlug={category.slug}
                productName={product.name}
                variants={product.variants}
                unitLabel={product.unitLabel}
                sku={product.sku}
                colors={product.colors}
              />
            </div>
          ) : (
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              de la{" "}
              <span className="font-bold text-blue-600">
                {product.price.toFixed(2).replace(".", ",")} RON / rolă
              </span>{" "}
              (TVA inclus)
            </p>
          )}

          <ProductTrustBadges />

          {((product.sku && !(product.colors && product.colors.length > 1)) ||
            product.weight) && (
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-black/10 pt-6 text-sm dark:border-white/10">
              {product.sku && !(product.colors && product.colors.length > 1) && (
                <>
                  <dt className="text-zinc-500 dark:text-zinc-400">Cod produs</dt>
                  <dd className="font-medium">{product.sku}</dd>
                </>
              )}
              {product.weight && (
                <>
                  <dt className="text-zinc-500 dark:text-zinc-400">Greutate</dt>
                  <dd className="font-medium">{product.weight}</dd>
                </>
              )}
            </dl>
          )}
        </div>
      </div>

      <div className="mt-16">
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

      {similarProducts.length > 0 && (
        <div className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
          <h2 className="text-xl font-semibold">Produse similare</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((similar) => (
              <Link
                key={similar.slug}
                href={`/produse/${category.slug}/${similar.slug}`}
                className="flex flex-col rounded-2xl border border-black/10 p-4 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
              >
                {similar.images[0] && (
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      src={similar.images[0]}
                      alt={similar.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <h3 className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {similar.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-blue-600">
                  de la {similar.price.toFixed(2).replace(".", ",")} RON
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
