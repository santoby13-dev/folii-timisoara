import type { Product } from "./products";

/**
 * Primul produs din categoria Accesorii, din catalogul furnizorului
 * (foliepvctransparenta.ro/catalog/prelata-tesatura-acoperita-cu-pvc-poliplan-pentru-copertine-camioane-49),
 * scrapat iul. 2026 — preț, SKU, greutate și poze stricte, identice cu sursa.
 */
export const accesoriiCatalog: Product[] = [
  {
    slug: "banda-protectie-gard-pvc-gri",
    categorySlug: "accesorii",
    name: "Bandă protecție gard 19 cm x 50 m - PVC gri",
    shortDescription:
      "Bandă PVC pentru gard, 19 cm lățime x 50 m lungime, culoare gri — protecție vizuală, împotriva vântului și zgomotului.",
    price: 189.02,
    priceBeforeDiscount: 189.02,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: ["0.55 mm"],
    widths: ["19 cm"],
    lengths: ["50 m"],
    sku: "BGGRI1950",
    weight: "5.66 kg",
    hasCart: true,
    variants: [{ thickness: "0.55 mm", width: "19 cm", length: "50 m", price: 189.02 }],
    images: [
      "/products/accesorii-catalog/01.jpg",
      "/products/accesorii-catalog/02.jpg",
    ],
    description: [
      "Bandă din PVC, realizată din material rezistent de 550 g/m² și 0.55 mm grosime — 100% impermeabilă, rezistentă la frig (-30°C) și la cald (+70°C).",
      "Oferă protecție vizuală pentru gard, intimitate, protecție împotriva vântului și a zgomotului. Rezistentă la intemperii și radiații UV.",
      "Instalare simplă și rapidă: se țese banda printre ochiurile gardului și se fixează cu cleme la capete sau bandă dublu adezivă/capse. Potrivită pentru garduri din sârmă standard cu înălțimea ochiului de 20 cm. Curățare facilă cu cârpă moale, apă sau furtun de grădină.",
    ],
    useCases: [
      "Delimitare și protecție vizuală pentru garduri din plasă de sârmă, la case sau curți.",
      "Protecție împotriva vântului și reducere a zgomotului pentru spații exterioare.",
    ],
    specs: [
      { label: "Material", value: "PVC 550 g/m²" },
      { label: "Temperatură de utilizare", value: "-30°C … +70°C" },
      { label: "Impermeabilitate", value: "100%" },
      { label: "Protecție UV", value: "Da" },
      { label: "Culoare", value: "Gri" },
    ],
  },
];
