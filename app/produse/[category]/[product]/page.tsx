import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import {
  getCategory,
  getProduct,
  getProductsByCategory,
  getCrossSellProducts,
} from "@/lib/products";
import { getCatalog } from "@/lib/catalog";
import AddToCart from "@/components/AddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductTrustBadges from "@/components/ProductTrustBadges";
import ProductSpecs from "@/components/ProductSpecs";
import SizeCalculator from "@/components/SizeCalculator";
import TrackViewItem from "@/components/TrackViewItem";

export async function generateStaticParams() {
  const { products } = await getCatalog();
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
  const { products } = await getCatalog();
  const product = getProduct(products, category, productSlug);
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
  const { categories, products } = await getCatalog();
  const category = getCategory(categories, categorySlug);
  const product = getProduct(products, categorySlug, productSlug);
  if (!category || !product) notFound();

  const similarProducts = getProductsByCategory(products, categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const crossSellProducts = getCrossSellProducts(products, categorySlug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Produse",
        item: `${siteConfig.url}/produse`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${siteConfig.url}/produse/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/produse/${category.slug}/${product.slug}`,
      },
    ],
  };

  // Brand-ul e literal parte din numele produsului la Folii/Prelate
  // (Cristal Flex®, CoverPlan®) — nu-l afirmăm pentru Accesorii, unde nu e
  // consecvent confirmat pe toate cele 12 produse.
  const brandByCategory: Record<string, string> = {
    "folii-transparente-terase": "Cristal Flex®",
    "prelate-pvc": "CoverPlan®",
  };
  const brand = brandByCategory[categorySlug];

  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => `${siteConfig.url}${img}`),
    sku: product.sku,
    category: category.name,
    ...(brand && { brand: { "@type": "Brand", name: brand } }),
    offers: {
      "@type": "Offer",
      priceCurrency: "RON",
      price: product.price,
      priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
      itemCondition: "https://schema.org/NewCondition",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TrackViewItem
        id={product.sku ?? product.slug}
        name={product.name}
        price={product.price}
        category={category.name}
      />
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/produse" className="hover:text-blue-600 dark:hover:text-blue-400">
          Produse
        </Link>
        <span>/</span>
        <Link href={`/produse/${category.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
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
                colorsLabel={product.colorsLabel}
                widthLabel={product.widthLabel}
                lengthLabel={product.lengthLabel}
              />
            </div>
          ) : (
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              de la{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {product.price.toFixed(2).replace(".", ",")} RON / rolă
              </span>{" "}
              (TVA inclus)
            </p>
          )}

          <ProductTrustBadges />

          <ProductSpecs product={product} />
        </div>
      </div>

      {product.hasCart &&
        product.variants &&
        product.variants.length > 1 &&
        category.slug === "folii-transparente-terase" && (
          <SizeCalculator
            productSlug={product.slug}
            categorySlug={category.slug}
            productName={product.name}
            variants={product.variants}
            unitLabel={product.unitLabel}
          />
        )}

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
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      {crossSellProducts.length > 0 && (
        <div className="mt-10 border-t border-black/10 pt-10 dark:border-white/10">
          <h2 className="text-xl font-semibold">Vei avea nevoie și de:</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {crossSellProducts.map((accessory) => (
              <Link
                key={accessory.slug}
                href={`/produse/accesorii/${accessory.slug}`}
                className="flex flex-col rounded-2xl border border-black/10 p-4 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
              >
                {accessory.images[0] && (
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      src={accessory.images[0]}
                      alt={accessory.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <h3 className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {accessory.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  de la {accessory.price.toFixed(2).replace(".", ",")} RON
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

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
                <p className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
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
