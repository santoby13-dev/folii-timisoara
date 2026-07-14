export type Category = {
  slug: string;
  name: string;
  status: "active" | "coming-soon";
};

export const categories: Category[] = [
  { slug: "folii-transparente-terase", name: "Folii transparente pentru terase", status: "active" },
  { slug: "prelate-pvc", name: "Prelate din PVC", status: "coming-soon" },
  { slug: "accesorii", name: "Accesorii", status: "coming-soon" },
  { slug: "scule", name: "Scule", status: "coming-soon" },
];

export type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  price: number;
  priceBeforeDiscount: number;
  priceUnit: string;
  thicknesses: string[];
  widths: string[];
  lengths: string[];
  description: string[];
  useCases: string[];
  /** Whether the product can be added to the cart (has real variant prices) */
  hasCart?: boolean;
};

export const products: Product[] = [
  {
    slug: "folie-transparenta-cristal-flex",
    categorySlug: "folii-transparente-terase",
    name: "Folie transparentă pentru închidere terasă, foișoare Cristal Flex®",
    shortDescription:
      "Folie PVC transparentă de claritate premium, pentru închiderea teraselor, foișoarelor și pergolelor, disponibilă în mai multe grosimi și lățimi până la 2.60 m.",
    price: 309.83,
    priceBeforeDiscount: 317.63,
    priceUnit: "RON / rolă (TVA inclus)",
    thicknesses: ["0.4 mm", "0.5 mm", "0.8 mm", "1.0 mm"],
    widths: ["1.37 m", "1.50 m", "1.80 m", "2.00 m", "2.20 m", "2.40 m", "2.60 m"],
    lengths: ["10 m", "15 m", "30 m", "50 m"],
    hasCart: true,
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
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProduct(categorySlug: string, productSlug: string) {
  return products.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );
}
