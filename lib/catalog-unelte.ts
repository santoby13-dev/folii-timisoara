import type { Product } from "./products";

/**
 * Categoria Unelte (fostă „Scule"), din catalogul furnizorului
 * (foliepvctransparenta.ro/catalog/unelte-51), scrapate iul. 2026 — preț,
 * SKU, greutate și poze stricte, identice cu sursa. Toate cele 7 produse au
 * SKU real de la furnizor (nu a fost nevoie să inventăm coduri).
 *
 * Unelte fără dimensiuni reale (ștanțe, preducele, placă) — la fel ca la
 * accesoriile fără grosime/lățime/lungime, `thicknesses`/`widths`/`lengths`
 * rămân goale, iar coșul/pagina de produs le ascund automat.
 */
export const unelteCatalog: Product[] = [
  {
    slug: "stanta-capsa-ovala-42x22mm",
    categorySlug: "unelte",
    name: "Ștanță pentru capsă ovală 42 x 22 mm",
    shortDescription:
      "Ștanță pentru capse ovale 42×22 mm, unealtă de tip hobby pentru confecționarea prelatelor și închiderilor cu folie PVC.",
    price: 608.45,
    priceBeforeDiscount: 608.45,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "SCO4222",
    weight: "2.64 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 608.45, sku: "SCO4222" }],
    images: [
      "/products/unelte-catalog/01.jpg",
      "/products/unelte-catalog/02.jpg",
    ],
    description: [
      "Ștanță pentru capse ovale 42×22 mm, folosită la confecționarea prelatelor, pereților laterali, pereților de vânt sau închiderilor laterale cu folie PVC transparentă — capsele aplicate cu ea sunt destinate închiderilor cu bride rotative sau fixe.",
      "Unealtă practică, de tip hobby, potrivită pentru utilizări ocazionale. Pentru lucrări de amploare sau utilizare intensivă, furnizorul recomandă varianta profesională.",
    ],
    useCases: [
      "Confecționarea de prelate, pereți laterali sau închideri de terasă cu folie transparentă, la capacitate ocazională.",
      "Montaj cu capse ovale, folosite împreună cu bride rotative sau fixe.",
    ],
    specs: [{ label: "Compatibilitate", value: "Capse ovale 42 × 22 mm" }],
  },
  {
    slug: "preducea-capsa-ovala-42x22mm",
    categorySlug: "unelte",
    name: "Preducea pentru capsă ovală 42 x 22 mm",
    shortDescription:
      "Preducea pentru perforarea prelatelor și foliei PVC, în vederea aplicării capselor ovale 42×22 mm.",
    price: 318.99,
    priceBeforeDiscount: 318.99,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "PCO4222",
    weight: "1.4 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 318.99, sku: "PCO4222" }],
    images: ["/products/unelte-catalog/03.jpg"],
    description: [
      "Preducea pentru perforarea prelatelor, foliilor PVC sau materialelor similare, în vederea aplicării capselor ovale 42×22 mm — potrivită pentru închideri cu bride fixe sau rotative.",
      "Unealtă de tip hobby, pentru utilizări ocazionale. Pentru o perforare precisă și protejarea suprafeței de lucru, se recomandă folosirea împreună cu placa de ștanțare. Pentru utilizare profesională sau lucrări de amploare, furnizorul are varianta Preducea profesională 42×22 mm.",
    ],
    useCases: [
      "Perforarea materialului înainte de aplicarea capselor ovale, la utilizare ocazională.",
      "Folosită împreună cu placa de ștanțare, pentru o perforare precisă.",
    ],
    specs: [{ label: "Compatibilitate", value: "Capse ovale 42 × 22 mm" }],
  },
  {
    slug: "stanta-capsa-d10mm",
    categorySlug: "unelte",
    name: "Ștanță pentru capsă D10 mm",
    shortDescription:
      "Ștanță profesională pentru capse D10 mm, din oțel rezistent — perforare și fixare rapidă și precisă.",
    price: 296.99,
    priceBeforeDiscount: 296.99,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "SCD10",
    weight: "1.5 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 296.99, sku: "SCD10" }],
    images: ["/products/unelte-catalog/04.jpg"],
    description: [
      "Ștanță profesională pentru perforarea și fixarea capselor de 10 mm pe prelate, folii PVC transparente și alte materiale flexibile — aplicare rapidă și precisă, fără riscul de deteriorare a materialului.",
      "Realizată din oțel rezistent, cu design ergonomic pentru o manevrare ușoară. Potrivită pentru montaj de prelate, copertine, corturi și închideri de terasă cu folie PVC.",
    ],
    useCases: [
      "Montaj profesional cu capse rotunde D10 mm, la utilizare intensivă.",
      "Confecționarea de prelate, copertine sau corturi.",
    ],
    specs: [
      { label: "Compatibilitate", value: "Capse rotunde D10 mm" },
      { label: "Material", value: "Oțel rezistent" },
    ],
  },
  {
    slug: "stanta-capsa-ovala-42x22mm-profesionala",
    categorySlug: "unelte",
    name: "Ștanță pentru capsă ovală 42 x 22 mm - Profesională",
    shortDescription:
      "Variantă profesională a ștanței pentru capse ovale 42×22 mm, pentru utilizare intensivă.",
    price: 732.59,
    priceBeforeDiscount: 732.59,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "SCO4222P",
    weight: "2.65 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 732.59, sku: "SCO4222P" }],
    images: [
      "/products/unelte-catalog/05.jpg",
      "/products/unelte-catalog/06.jpg",
    ],
    description: [
      "Ștanță profesională pentru capse ovale 42×22 mm, folosită la confecționarea prelatelor, pereților laterali, pereților de vânt sau închiderilor laterale cu folie PVC transparentă — capsele aplicate cu ea sunt destinate închiderilor cu bride rotative sau fixe.",
      "Recomandată pentru lucrări de amploare sau utilizare intensivă, spre deosebire de varianta standard, gândită pentru utilizare ocazională.",
    ],
    useCases: [
      "Producție continuă sau volum mare de montaj cu capse ovale.",
      "Confecționarea profesională de prelate și închideri de terasă.",
    ],
    specs: [{ label: "Compatibilitate", value: "Capse ovale 42 × 22 mm" }],
  },
  {
    slug: "preducea-capsa-d10mm",
    categorySlug: "unelte",
    name: "Preducea pentru capsă 10 mm",
    shortDescription:
      "Preducea pentru perforarea precisă a găurilor necesare fixării capselor de 10 mm.",
    price: 102.29,
    priceBeforeDiscount: 102.29,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "SCD10-2704",
    weight: "1 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 102.29, sku: "SCD10-2704" }],
    images: ["/products/unelte-catalog/07.jpg"],
    description: [
      "Preducea pentru realizarea găurilor necesare fixării capselor de 10 mm pe prelate, folii PVC transparente și alte materiale flexibile — tăieturi curate și precise, pentru o aplicare fără efort a capselor.",
      "Fabricată din oțel rezistent, cu design ergonomic. Potrivită pentru montaj și fixare în confecționarea de prelate, copertine, corturi și închideri din folie PVC.",
    ],
    useCases: [
      "Perforarea materialului înainte de aplicarea capselor rotunde D10 mm.",
      "Montaj de prelate, copertine sau corturi.",
    ],
    specs: [
      { label: "Compatibilitate", value: "Capse rotunde D10 mm" },
      { label: "Material", value: "Oțel rezistent" },
    ],
  },
  {
    slug: "preducea-capsa-ovala-42x22mm-profesionala",
    categorySlug: "unelte",
    name: "Preducea pentru capsă ovală 42 x 22 mm - Profesională",
    shortDescription:
      "Preducea profesională pentru capse ovale, din oțel rezistent pentru scule, pentru utilizare intensivă.",
    price: 587.39,
    priceBeforeDiscount: 587.39,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "PCO4222P",
    weight: "1.4 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 587.39, sku: "PCO4222P" }],
    images: ["/products/unelte-catalog/08.jpg"],
    description: [
      "Preducea profesională pentru capse ovale, confecționată din cel mai rezistent oțel pentru scule — decupează materialul la dimensiunea și forma potrivite pentru montarea capselor ovale, necesare la utilizarea bridelor rotative sau fixe.",
      "Recomandată pentru lucrări de amploare sau utilizare intensivă, spre deosebire de varianta standard, gândită pentru utilizare ocazională.",
    ],
    useCases: [
      "Producție continuă sau volum mare de montaj cu capse ovale.",
      "Confecționarea profesională de prelate și închideri de terasă.",
    ],
    specs: [
      { label: "Compatibilitate", value: "Capse ovale 42 × 22 mm" },
      { label: "Material", value: "Oțel pentru scule" },
    ],
  },
  {
    slug: "placa-perforata-prelata-folie",
    categorySlug: "unelte",
    name: "Placă perforat prelată/folie, pentru capse",
    shortDescription:
      "Placă de protecție a suprafeței de lucru, pentru utilizare împreună cu preduceaua și ștanța.",
    price: 167.19,
    priceBeforeDiscount: 167.19,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "PS25MM",
    weight: "1 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 167.19, sku: "PS25MM" }],
    images: ["/products/unelte-catalog/09.jpg"],
    description: [
      "Placă de protecție pentru lucrul cu preduceaua și ștanța — se așază sub material la perforare, pentru o perforare mai precisă și pentru protejarea suprafeței de lucru.",
    ],
    useCases: [
      "Folosită împreună cu preduceaua, la perforarea materialului înainte de aplicarea capselor.",
      "Protejarea mesei de lucru la montajul capselor ovale sau rotunde.",
    ],
    specs: [{ label: "Utilizare", value: "Împreună cu preducea și ștanță" }],
  },
];
