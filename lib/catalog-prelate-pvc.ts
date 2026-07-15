import type { Product } from "./products";

/**
 * Cele 6 produse din categoria Prelate PVC (grosime/greutate fixă, o singură
 * variantă cumpărabilă per produs), din catalogul furnizorului
 * (foliepvctransparenta.ro/catalog/prelata-tesatura-acoperita-cu-pvc-poliplan-pentru-copertine-camioane-49),
 * scrapate iul. 2026. Nu include "Banda protectie gard" — acel produs se
 * încarcă separat, în categoria Accesorii.
 *
 * Produsele 1-3 se vând la metru liniar (cantitatea = numărul de metri),
 * produsele 4-6 se vând ca rolă completă — vezi `unitLabel` per produs.
 *
 * `colors` conține nuanțele reale de la furnizor (prețul e identic indiferent
 * de culoare) — `skuSuffix` se adaugă la `sku` de bază pentru un cod unic per
 * nuanță (ex. PVC650METRU + ALBASTRU502). Pe prelata 650 g/mp de 2.5 m,
 * furnizorul are 3 perechi cu nume identic dar cod diferit (Albastru,
 * Verde, Gri) — disambiguate prin codul numeric al furnizorului în nume și
 * în skuSuffix. Prelata HDPE nu are SKU de bază la furnizor — "PVCHDPE" e
 * inventat de noi, doar pentru uz intern.
 */
export const prelatePvcCatalog: Product[] = [
  {
    slug: "prelata-pvc-650gr-2-5m",
    categorySlug: "prelate-pvc",
    name: "Prelată PVC 650 g/mp, lățime 2.5 m, țesătură acoperită pe ambele fețe, impermeabilă 100%, protecție UV",
    shortDescription:
      "Prelată PVC CoverPlan® 650 g/mp, lățime 2.5 m, vândută la metru liniar.",
    price: 55.0,
    priceBeforeDiscount: 55.0,
    priceUnit: "RON / metru liniar (TVA inclus)",
    unitLabel: "metru liniar",
    thicknesses: ["650 g/mp"],
    widths: ["2.5 m"],
    lengths: ["la metru"],
    sku: "PVC650METRU",
    weight: undefined,
    hasCart: true,
    variants: [
      { thickness: "650 g/mp", width: "2.5 m", length: "la metru", price: 55.0 },
    ],
    colors: [
      { name: "Alb", skuSuffix: "ALB" },
      { name: "Bej", skuSuffix: "BEJ" },
      { name: "Crem", skuSuffix: "CREM" },
      { name: "Galben", skuSuffix: "GALBEN" },
      { name: "Portocaliu", skuSuffix: "PORTOCALIU" },
      { name: "Roșu", skuSuffix: "ROSU" },
      { name: "Albastru 502", skuSuffix: "ALBASTRU502" },
      { name: "Albastru 529", skuSuffix: "ALBASTRU529" },
      { name: "Verde 605", skuSuffix: "VERDE605" },
      { name: "Verde 636", skuSuffix: "VERDE636" },
      { name: "Gri 703", skuSuffix: "GRI703" },
      { name: "Maro", skuSuffix: "MARO" },
      { name: "Gri 807", skuSuffix: "GRI807" },
      { name: "Argintiu", skuSuffix: "ARGINTIU" },
      { name: "Negru", skuSuffix: "NEGRU" },
      { name: "Antracit", skuSuffix: "ANTRACIT" },
      { name: "Vișiniu", skuSuffix: "VISINIU" },
      { name: "Verde militar", skuSuffix: "VERDEMILITAR" },
    ],
    images: [
      "/products/prelate-pvc-catalog/01.jpg",
      "/products/prelate-pvc-catalog/02.jpg",
    ],
    description: [
      "Prelată PVC CoverPlan® 650 g/mp — țesătură din poliester acoperită cu PVC pe ambele fețe, cu finisaj de lac acrilic bilateral pentru protecție UV suplimentară și rezistență sporită la intemperii.",
      "Impermeabilă 100%, rezistentă la temperaturi între -30°C și +70°C, potrivită pentru utilizare permanentă în exterior. Se vinde la metru liniar, pe lățimea de 2.5 m.",
      "Disponibilă într-o gamă largă de culori (alb, bej, crem, galben, portocaliu, roșu, albastru, verde, gri, maro, argintiu, negru, antracit, vișiniu, verde militar) — precizează culoarea dorită la comandă.",
    ],
    useCases: [
      "Structuri industriale, hale, corturi și copertine pentru camioane sau remorci.",
      "Acoperiri pentru silozuri, utilaje, scene sau depozite în aer liber.",
    ],
  },
  {
    slug: "prelata-pvc-900gr-3m",
    categorySlug: "prelate-pvc",
    name: "Prelată PVC 900 g/mp, lățime 3 m, țesătură acoperită pe ambele fețe, impermeabilă 100%, protecție UV",
    shortDescription:
      "Prelată PVC CoverPlan® 900 g/mp, lățime 3 m, vândută la metru liniar.",
    price: 97.57,
    priceBeforeDiscount: 97.57,
    priceUnit: "RON / metru liniar (TVA inclus)",
    unitLabel: "metru liniar",
    thicknesses: ["900 g/mp"],
    widths: ["3 m"],
    lengths: ["la metru"],
    sku: "PVC900METRU",
    weight: undefined,
    hasCart: true,
    variants: [
      { thickness: "900 g/mp", width: "3 m", length: "la metru", price: 97.57 },
    ],
    colors: [
      { name: "Alb", skuSuffix: "ALB" },
      { name: "Galben", skuSuffix: "GALBEN" },
      { name: "Roșu", skuSuffix: "ROSU" },
      { name: "Albastru", skuSuffix: "ALBASTRU" },
      { name: "Verde", skuSuffix: "VERDE" },
      { name: "Argintiu", skuSuffix: "ARGINTIU" },
      { name: "Negru", skuSuffix: "NEGRU" },
    ],
    images: [
      "/products/prelate-pvc-catalog/03.jpg",
      "/products/prelate-pvc-catalog/04.jpg",
      "/products/prelate-pvc-catalog/05.jpg",
      "/products/prelate-pvc-catalog/06.jpg",
      "/products/prelate-pvc-catalog/07.jpg",
      "/products/prelate-pvc-catalog/08.jpg",
      "/products/prelate-pvc-catalog/09.jpg",
      "/products/prelate-pvc-catalog/10.jpg",
    ],
    description: [
      "Prelată PVC CoverPlan® 900 g/mp — varianta cea mai groasă din gama CoverPlan, cu țesătură din poliester acoperită cu PVC pe ambele fețe, pentru cele mai solicitante aplicații industriale și comerciale.",
      "Impermeabilă 100%, rezistentă la temperaturi între -30°C și +70°C, cu protecție UV pe ambele fețe. Se vinde la metru liniar, pe lățimea de 3 m.",
      "Disponibilă în culorile alb, galben, roșu, albastru, verde, argintiu și negru.",
    ],
    useCases: [
      "Recomandată acolo unde greutatea mare a materialului contează pentru rezistență maximă la rupere și uzură — hale, structuri industriale, acoperiri permanente.",
      "Prelate pentru camioane, remorci sau echipamente expuse continuu la intemperii.",
    ],
  },
  {
    slug: "prelata-pvc-650gr-3-2m-alba",
    categorySlug: "prelate-pvc",
    name: "Prelată PVC 650 g/mp, lățime 3.2 m, culoare albă, țesătură acoperită pe ambele fețe, impermeabilă 100%, protecție UV",
    shortDescription:
      "Prelată PVC CoverPlan® 650 g/mp, lățime 3.2 m, culoare albă, vândută la metru liniar.",
    price: 70.28,
    priceBeforeDiscount: 70.28,
    priceUnit: "RON / metru liniar (TVA inclus)",
    unitLabel: "metru liniar",
    thicknesses: ["650 g/mp"],
    widths: ["3.2 m"],
    lengths: ["la metru"],
    sku: "PVC320METRU",
    weight: undefined,
    hasCart: true,
    variants: [
      { thickness: "650 g/mp", width: "3.2 m", length: "la metru", price: 70.28 },
    ],
    images: ["/products/prelate-pvc-catalog/11.jpg"],
    description: [
      "Prelată PVC CoverPlan® 650 g/mp, culoare albă — țesătură din poliester acoperită cu PVC pe ambele fețe, cu finisaj de lac acrilic bilateral pentru protecție UV și rezistență la intemperii.",
      "Impermeabilă 100%, rezistentă la temperaturi între -30°C și +70°C. Se vinde la metru liniar, pe lățimea de 3.2 m — potrivită pentru acoperiri mai late, fără îmbinări.",
      "Poate fi livrată și în alte culori din paletar, la cerere.",
    ],
    useCases: [
      "Corturi, structuri temporare și copertine pe lățimi mari.",
      "Acoperiri pentru echipamente, depozite sau zone exterioare.",
    ],
  },
  {
    slug: "prelata-pvc-650gr-ignifugata-3x30m",
    categorySlug: "prelate-pvc",
    name: "Prelată PVC 650 g/mp ignifugată, 3 m x 30 m, țesătură acoperită pe ambele fețe, impermeabilă 100%, protecție UV",
    shortDescription:
      "Prelată PVC CoverPlan® 650 g/mp ignifugată, rolă 3 m x 30 m, culoare albă.",
    price: 2096.33,
    priceBeforeDiscount: 2096.33,
    priceUnit: "RON / rolă (TVA inclus)",
    unitLabel: "rolă",
    thicknesses: ["650 g/mp ignifugată"],
    widths: ["3 m"],
    lengths: ["30 m"],
    sku: undefined,
    weight: undefined,
    hasCart: true,
    variants: [
      { thickness: "650 g/mp ignifugată", width: "3 m", length: "30 m", price: 2096.33 },
    ],
    images: ["/products/prelate-pvc-catalog/12.jpg"],
    description: [
      "Prelată PVC CoverPlan® 650 g/mp, tratată ignifug — țesătură din poliester acoperită cu PVC pe ambele fețe, certificată B1/B2 conform DIN 4102 și clasa B,s2,d0 conform EN 13501-1.",
      "Impermeabilă 100%, rezistentă la temperaturi între -30°C și +70°C, cu protecție UV pe ambele fețe. Rolă completă, 3 m lățime x 30 m lungime, culoare albă.",
      "Recomandată pentru spații industriale sau comerciale unde normele PSI impun materiale cu tratament ignifug.",
    ],
    useCases: [
      "Corturi, copertine și structuri temporare în spații unde e obligatoriu un material ignifugat.",
      "Acoperiri industriale de lungă durată, expuse la intemperii.",
    ],
  },
  {
    slug: "prelata-pvc-hdpe-2x100m",
    categorySlug: "prelate-pvc",
    name: "Prelată HDPE (polietilenă de înaltă densitate), lățime 2 m x 100 m, impermeabilă, protecție UV",
    shortDescription:
      "Prelată PolyTarp din țesătură HDPE, rolă 2 m x 100 m, tratată anti-UV.",
    price: 2262.7,
    priceBeforeDiscount: 2262.7,
    priceUnit: "RON / rolă (TVA inclus)",
    unitLabel: "rolă",
    thicknesses: ["HDPE"],
    widths: ["2 m"],
    lengths: ["100 m"],
    sku: "PVCHDPE",
    weight: undefined,
    hasCart: true,
    variants: [{ thickness: "HDPE", width: "2 m", length: "100 m", price: 2262.7 }],
    colors: [
      { name: "Alb", skuSuffix: "ALB" },
      { name: "Albastru", skuSuffix: "ALBASTRU" },
      { name: "Verde", skuSuffix: "VERDE" },
    ],
    images: [
      "/products/prelate-pvc-catalog/13.jpg",
      "/products/prelate-pvc-catalog/14.jpg",
      "/products/prelate-pvc-catalog/15.jpg",
    ],
    description: [
      "Prelată PolyTarp din țesătură HDPE (polietilenă de înaltă densitate), tratată anti-UV pe ambele fețe — un raport rezistență-densitate ridicat, la un preț mai accesibil decât PVC-ul armat.",
      "100% impermeabilă, rezistentă la scurgeri, ulei, pete și majoritatea substanțelor chimice; îmbinări sudate termic, fără puncte de picurare. Rolă completă, 2 m lățime x 100 m lungime.",
      "Disponibilă în albastru, alb sau verde.",
    ],
    useCases: [
      "Acoperirea și protejarea materialelor, utilajelor sau recoltelor împotriva soarelui, prafului și intemperiilor.",
      "Corturi, huse pentru mobilier de grădină, pavilioane, solarii sau compartimentări temporare.",
    ],
  },
  {
    slug: "prelata-pvc-550gr-3x50m",
    categorySlug: "prelate-pvc",
    name: "Prelată PVC 550 g/mp, 3 m x 50 m, țesătură acoperită pe ambele fețe, impermeabilă 100%, protecție UV",
    shortDescription: "Prelată PVC CoverPlan® 550 g/mp, rolă 3 m x 50 m.",
    price: 2296.25,
    priceBeforeDiscount: 2296.25,
    priceUnit: "RON / rolă (TVA inclus)",
    unitLabel: "rolă",
    thicknesses: ["550 g/mp"],
    widths: ["3 m"],
    lengths: ["50 m"],
    sku: "PVC550METRU",
    weight: undefined,
    hasCart: true,
    variants: [{ thickness: "550 g/mp", width: "3 m", length: "50 m", price: 2296.25 }],
    colors: [
      { name: "Alb", skuSuffix: "ALB" },
      { name: "Albastru", skuSuffix: "ALBASTRU" },
      { name: "Verde", skuSuffix: "VERDE" },
      { name: "Gri", skuSuffix: "GRI" },
    ],
    images: [
      "/products/prelate-pvc-catalog/16.jpg",
      "/products/prelate-pvc-catalog/17.jpg",
      "/products/prelate-pvc-catalog/18.jpg",
      "/products/prelate-pvc-catalog/19.jpg",
      "/products/prelate-pvc-catalog/20.jpg",
    ],
    description: [
      "Prelată PVC CoverPlan® 550 g/mp — cea mai ușoară variantă din gama CoverPlan, țesătură din poliester acoperită cu PVC pe ambele fețe, cu protecție UV și rezistență bună la intemperii.",
      "Impermeabilă 100%, rezistentă la temperaturi între -30°C și +70°C. Rolă completă, 3 m lățime x 50 m lungime — potrivită pentru suprafețe mari, cu mai puține îmbinări.",
      "Disponibilă în culorile alb, albastru, verde și gri.",
    ],
    useCases: [
      "Acoperiri de suprafață mare — hale, depozite, structuri temporare pe șantier.",
      "Prelate pentru camioane, remorci sau utilaje expuse continuu la intemperii.",
    ],
  },
];
