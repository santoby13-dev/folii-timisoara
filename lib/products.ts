import type { FolieVariant } from "./folie-variants";
import { folieVariants, cheapestFolieVariant } from "./folie-variants";
import { cristalFlexCatalog } from "./catalog-cristal-flex";
import { prelatePvcCatalog } from "./catalog-prelate-pvc";
import { accesoriiCatalog } from "./catalog-accesorii";
import { unelteCatalog } from "./catalog-unelte";

export type Category = {
  slug: string;
  name: string;
  status: "active" | "coming-soon";
  /** Poze reale pentru slide-ul din CategoryCarousel (homepage) — un singur element pentru fundal static, mai multe pentru crossfade automat. Prima intră și în Open Graph. */
  images?: string[];
  /** Descriere scurtă, unică per categorie — folosită în meta description și sub H1. */
  description: string;
};

// Cele mai accesibile 4 produse din Accesorii (preț crescător), pentru
// slide-ul de pe homepage — nu are sens o singură poză reprezentativă,
// categoria fiind eterogenă (bandă, capse, adeziv etc.).
const cheapestAccesoriiImages = [...accesoriiCatalog]
  .sort((a, b) => a.price - b.price)
  .slice(0, 4)
  .map((p) => p.images[0])
  .filter((img): img is string => Boolean(img));

export const categories: Category[] = [
  {
    slug: "folii-transparente-terase",
    name: "Folii transparente pentru terase",
    status: "active",
    images: ["/categories/foisor-terasa.jpg"],
    description:
      "Folie PVC transparentă Cristal Flex® pentru închiderea teraselor, foișoarelor și pergolelor — grosimi de la 0.4 mm la 1.0 mm, lățimi de până la 2.60 m, la rolă completă sau tăiată la dimensiunea ta.",
  },
  {
    slug: "prelate-pvc",
    name: "Prelate din PVC",
    status: "active",
    images: ["/categories/prelata-remorca.png"],
    description:
      "Prelate din PVC CoverPlan®, țesătură poliester acoperită cu PVC pe ambele fețe, impermeabile 100% — pentru copertine, camioane, remorci și acoperiri industriale, în mai multe gramaje și culori.",
  },
  {
    slug: "accesorii",
    name: "Accesorii",
    status: "active",
    images: cheapestAccesoriiImages,
    description:
      "Accesorii pentru montajul foliei transparente și al prelatelor PVC: capse, bride, bandă de întărire, fermoare de lipit, adeziv și bandă dublu-adezivă.",
  },
  {
    slug: "unelte",
    name: "Unelte",
    status: "active",
    images: [
      "/products/unelte-catalog/01.jpg",
      "/products/unelte-catalog/04.jpg",
      "/products/unelte-catalog/06.jpg",
      "/products/unelte-catalog/09.jpg",
    ],
    description:
      "Ștanțe și preducele pentru capse ovale 42×22 mm și capse D10 mm, plus placa de protecție pentru perforare — uneltele cu care montezi singur folia transparentă sau prelata PVC.",
  },
];

export type ProductColor = {
  /** Display name shown on the color chip. */
  name: string;
  /** Appended to `sku` to form the color-specific SKU (e.g. "GALBEN"). */
  skuSuffix: string;
};

export type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  price: number;
  priceBeforeDiscount: number;
  priceUnit: string;
  /** Unit shown next to the price in the cart selector (default "rolă"). */
  unitLabel?: string;
  thicknesses: string[];
  widths: string[];
  lengths: string[];
  description: string[];
  useCases: string[];
  /** Whether the product can be added to the cart (has real variant prices) */
  hasCart?: boolean;
  images: string[];
  /** Purchasable variants (thickness × width × length combos with price). */
  variants?: FolieVariant[];
  sku?: string;
  weight?: string;
  /** Real color options, same price regardless of color. Selecting one appends `skuSuffix` to `sku`. */
  colors?: ProductColor[];
  /** Etichetă afișată deasupra chip-urilor din `colors`, când opțiunea nu e o culoare reală (ex. "Material", "Tip"). Implicit "Culoare". */
  colorsLabel?: string;
  /** Suprascrie eticheta chip-ului de lățime/lungime pentru produse non-folie (ex. "Lățime" în loc de "Lățime folie"). */
  widthLabel?: string;
  lengthLabel?: string;
  /**
   * Rânduri suplimentare pentru tabelul de specificații (material, temperatură
   * de utilizare etc.) — doar valori susținute de descrierea produsului.
   */
  specs?: { label: string; value: string }[];
};

// Derived from the variant with the lowest price, so the "de la ... RON"
// figure shown on the category grid can never drift from the real prices
// in folieVariants when they're updated.
const cheapestVariant = cheapestFolieVariant();

const folieConfigurabila: Product = {
  slug: "folie-transparenta-cristal-flex",
  categorySlug: "folii-transparente-terase",
  name: "Folie transparentă pentru închidere terasă, foișoare Cristal Flex®",
  shortDescription:
    "Folie PVC transparentă de claritate premium, pentru închiderea teraselor, foișoarelor și pergolelor, disponibilă în mai multe grosimi și lățimi până la 2.60 m.",
  price: cheapestVariant.price,
  priceBeforeDiscount: cheapestVariant.oldPrice ?? cheapestVariant.price,
  priceUnit: "RON / rolă (TVA inclus)",
  thicknesses: ["0.4 mm", "0.5 mm", "0.8 mm", "1.0 mm"],
  widths: ["1.37 m", "1.50 m", "1.80 m", "2.00 m", "2.20 m", "2.40 m", "2.60 m"],
  lengths: ["10 m", "15 m", "30 m", "50 m"],
  hasCart: true,
  variants: folieVariants,
  images: [
    "/products/folie-cristal-flex/01.jpg",
    "/products/folie-cristal-flex/02.jpg",
    "/products/folie-cristal-flex/03.jpg",
    "/products/folie-cristal-flex/04.jpg",
    "/products/folie-cristal-flex/05.jpg",
  ],
  description: [
    "Folie PVC transparentă de calitate superioară, cu claritate ridicată și aspect de sticlă, potrivită pentru închideri rulou sau panouri fixe, atât rezidențiale cât și comerciale.",
    "Lățimile mari, de până la 2.60 m, permit realizarea unor panouri ample fără îmbinări, pentru o estetică mai bună și un risc redus de deformare în timp.",
    "Rezistentă la raze UV, flexibilă și cu un comportament stabil la temperaturi scăzute.",
  ],
  useCases: [
    "0.4–0.5 mm — flexibilă și economică, ideală pentru pergole mici sau zone adăpostite, cu deschidere frecventă.",
    "0.8 mm — standardul cel mai folosit pentru terase, foișoare și restaurante; echilibru optim între flexibilitate și rigiditate.",
    "1.0 mm — rigiditate și rezistență maximă, recomandată pentru zone expuse la vânt puternic sau panouri fixe.",
  ],
  specs: [
    { label: "Material", value: "PVC transparent, claritate ridicată" },
    { label: "Protecție UV", value: "Da, tratată anti-UV" },
    {
      label: "Comportament la frig",
      value: "Stabil la temperaturi scăzute",
    },
  ],
};

export const products: Product[] = [
  folieConfigurabila,
  ...cristalFlexCatalog,
  ...prelatePvcCatalog,
  ...accesoriiCatalog,
  ...unelteCatalog,
];

export function getCategory(categories: Category[], slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(products: Product[], slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProduct(
  products: Product[],
  categorySlug: string,
  productSlug: string
) {
  return products.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );
}

/**
 * Accesorii de montaj recomandate per categorie, pentru secțiunea „Vei avea
 * nevoie și de:” de pe pagina de produs (folie/prelată) — curatate manual,
 * nu automat, ca să rămână relevante (nu orice accesoriu se potrivește cu
 * orice produs). Slug-uri din `lib/catalog-accesorii.ts`.
 */
const crossSellByCategory: Record<string, string[]> = {
  "folii-transparente-terase": [
    "banda-intarire-margine-folie-tiv-30m",
    "capse-ovale-42x22mm-set-10",
    "bride-butoni-rotativi-set-10",
    "adeziv-special-prelata-pvc",
  ],
  "prelate-pvc": [
    "adeziv-special-prelata-pvc",
    "capse-rotunde-d10mm-1000buc",
    "capse-rotunde-d12mm-1000buc",
    "bride-butoni-rotativi-set-10",
  ],
};

export function getCrossSellProducts(
  products: Product[],
  categorySlug: string
): Product[] {
  const slugs = crossSellByCategory[categorySlug];
  if (!slugs) return [];
  return slugs
    .map((slug) => getProduct(products, "accesorii", slug))
    .filter((p): p is Product => p !== undefined);
}

/**
 * Prețul pe m² al celei mai ieftine variante reale — clientul de folie
 * compară pe m², nu doar pe preț total. Returnează undefined când
 * dimensiunile nu permit un calcul corect (ex. lățimi în cm nestandard).
 */
export function cheapestPricePerSqm(product: Product): number | undefined {
  const variants = product.variants;
  if (!variants || variants.length === 0) return undefined;
  const cheapest = variants.reduce(
    (min, v) => (v.price < min.price ? v : min),
    variants[0]
  );
  let width = parseFloat(cheapest.width.replace(",", "."));
  if (/cm/.test(cheapest.width)) width /= 100;
  // Produsele vândute la metru liniar au prețul deja per 1 m lungime.
  const length = /la metru/.test(cheapest.length)
    ? 1
    : parseFloat(cheapest.length.replace(",", "."));
  if (!Number.isFinite(width) || !Number.isFinite(length)) return undefined;
  if (width <= 0 || length <= 0) return undefined;
  return cheapest.price / (width * length);
}
