import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  categories,
  cheapestPricePerSqm,
  getCategory,
  getProductsByCategory,
} from "@/lib/products";
import CategoryGrid from "@/components/CategoryGrid";
import { siteConfig } from "@/lib/site-config";

const thicknessGuide = [
  {
    range: "0.4 – 0.5 mm",
    title: "Protecție de bază",
    description:
      "Flexibilă și economică — ideală pentru pergole mici sau zone adăpostite, cu deschidere și rulare frecventă.",
  },
  {
    range: "0.8 mm",
    title: "Standardul pentru terase",
    description:
      "Cea mai folosită grosime pentru terase, foișoare și restaurante — echilibru optim între flexibilitate și rigiditate.",
    highlighted: true,
  },
  {
    range: "1.0 mm",
    title: "Rezistență maximă",
    description:
      "Rigidă și stabilă — recomandată pentru panouri fixe sau zone expuse la vânt puternic, utilizare permanentă.",
  },
];

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
  const url = `${siteConfig.url}/produse/${category.slug}`;
  return {
    title: `${category.name} | Folii Timișoara`,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.name} | Folii Timișoara`,
      description: category.description,
      url,
      images: category.images?.[0] ? [category.images[0]] : undefined,
      type: "website",
    },
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
    ],
  };

  const itemListJsonLd =
    categoryProducts.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: categoryProducts.map((product, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/produse/${category.slug}/${product.slug}`,
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/produse" className="hover:text-blue-600">
          Produse
        </Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{category.name}</span>
      </nav>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {category.description}
      </p>

      {category.slug === "folii-transparente-terase" && (
        <div className="mt-10 rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h2 className="text-lg font-semibold">Cum alegi grosimea potrivită</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Regula simplă: cu cât zona e mai expusă la vânt și folosirea mai
            permanentă, cu atât alegi o folie mai groasă.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {thicknessGuide.map((tier) => (
              <div
                key={tier.range}
                className={`rounded-xl border p-4 ${
                  tier.highlighted
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                <p className="text-xl font-bold text-blue-600">{tier.range}</p>
                <h3 className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold">
                  {tier.title}
                  {tier.highlighted && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-white">
                      cea mai aleasă
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {categoryProducts.length === 0 ? (
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Produsele din această categorie vor fi disponibile în curând. Sună-ne
          pentru informații și disponibilitate.
        </p>
      ) : (
        <div className="mt-10">
          <CategoryGrid
            categorySlug={category.slug}
            showDimensionFilters={!["accesorii", "unelte"].includes(category.slug)}
            products={categoryProducts.map((product) => ({
              slug: product.slug,
              name: product.name,
              price: product.price,
              priceBeforeDiscount: product.priceBeforeDiscount,
              image: product.images[0],
              variants: (
                product.variants ?? [
                  {
                    thickness: product.thicknesses[0],
                    width: product.widths[0],
                    length: product.lengths[0],
                  },
                ]
              ).map((v) => ({
                thickness: v.thickness,
                width: v.width,
                length: v.length,
              })),
              hasVariants:
                product.thicknesses.length > 1 ||
                product.widths.length > 1 ||
                product.lengths.length > 1,
              // Are prin m² are sens doar pentru materiale vândute la suprafață
              // (folie, prelată) — pentru accesorii (bandă, curelușă etc.) e
              // un preț derivat fără sens pentru cumpărător.
              pricePerSqm: ["accesorii", "unelte"].includes(category.slug)
                ? undefined
                : cheapestPricePerSqm(product),
            }))}
          />
        </div>
      )}
    </div>
  );
}
