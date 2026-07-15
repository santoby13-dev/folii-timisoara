export type FolieVariant = {
  thickness: string;
  width: string;
  length: string;
  /** Current price, RON per roll, VAT included */
  price: number;
  /** Pre-discount price, if the variant is discounted */
  oldPrice?: number;
  /** SKU for this exact thickness×width×length combo, shown/used when selected. */
  sku?: string;
};

/**
 * Real purchasable variants with prices (RON / rolă, TVA inclus).
 * Sursa inițială: catalogul furnizorului, iul. 2026. De actualizat aici
 * când se schimbă prețurile.
 *
 * `sku` e preluat de la produsul individual Cristal Flex cu aceeași
 * combinație (`lib/catalog-cristal-flex.ts`) acolo unde există unul real de
 * la furnizor. 3 combinații nu au niciun cod real de la furnizor (0.4 mm în
 * ambele lungimi, și 0.5 mm | 1.50 m x 30 m) — codurile lor sunt inventate de
 * noi, doar pentru uz intern, urmând același format vizual (CF + grosime×100
 * + lățime×10 + lungime).
 */
export const folieVariants: FolieVariant[] = [
  // 0.4 mm
  { thickness: "0.4 mm", width: "1.50 m", length: "30 m", price: 838.53, sku: "CF40015030" },
  { thickness: "0.4 mm", width: "1.50 m", length: "50 m", price: 1397.55, sku: "CF40015050" },

  // 0.5 mm
  { thickness: "0.5 mm", width: "1.50 m", length: "10 m", price: 309.83, oldPrice: 317.63, sku: "CF50015010-" },
  { thickness: "0.5 mm", width: "1.50 m", length: "30 m", price: 928.35, sku: "CF50015030" },
  { thickness: "0.5 mm", width: "1.50 m", length: "50 m", price: 1361.25, oldPrice: 1587.24, sku: "CF50015050-" },
  { thickness: "0.5 mm", width: "2.00 m", length: "10 m", price: 412.61, sku: "CF50020010-" },
  { thickness: "0.5 mm", width: "2.00 m", length: "15 m", price: 618.92, oldPrice: 635.25, sku: "CF50020015-" },

  // 0.8 mm
  { thickness: "0.8 mm", width: "1.37 m", length: "30 m", price: 1070.12, oldPrice: 1206.37, sku: "CF80015037-" },
  { thickness: "0.8 mm", width: "1.50 m", length: "10 m", price: 495.13, sku: "CF80015010-" },
  { thickness: "0.8 mm", width: "1.50 m", length: "15 m", price: 742.68, sku: "CF80015015-" },
  { thickness: "0.8 mm", width: "1.50 m", length: "30 m", price: 1170.4, oldPrice: 1321.32, sku: "CF80015030-" },
  { thickness: "0.8 mm", width: "1.80 m", length: "30 m", price: 1455.45, oldPrice: 1611.64, sku: "CF80018030-" },
  { thickness: "0.8 mm", width: "2.00 m", length: "10 m", price: 550.63, oldPrice: 648.56, sku: "CF80020010-" },
  { thickness: "0.8 mm", width: "2.00 m", length: "15 m", price: 825.95, oldPrice: 972.84, sku: "CF80020015-" },
  { thickness: "0.8 mm", width: "2.00 m", length: "30 m", price: 1617.17, oldPrice: 1760.55, sku: "CF80020030-" },
  { thickness: "0.8 mm", width: "2.20 m", length: "15 m", price: 1177.14, sku: "CF80022015-" },
  { thickness: "0.8 mm", width: "2.20 m", length: "30 m", price: 2130.93, sku: "CF80022030-" },
  { thickness: "0.8 mm", width: "2.40 m", length: "15 m", price: 1284.15, sku: "CF80024015-" },
  { thickness: "0.8 mm", width: "2.40 m", length: "30 m", price: 2568.3, sku: "CF80024030-" },
  { thickness: "0.8 mm", width: "2.60 m", length: "15 m", price: 1391.16, sku: "CF80026015-" },
  { thickness: "0.8 mm", width: "2.60 m", length: "30 m", price: 2622.85, sku: "CF80026030-" },

  // 1.0 mm
  { thickness: "1.0 mm", width: "1.50 m", length: "10 m", price: 587.2, oldPrice: 635.25, sku: "CF100015010" },
  { thickness: "1.0 mm", width: "2.00 m", length: "10 m", price: 782.94, oldPrice: 847.0, sku: "CF100020010" },
];

export function cheapestFolieVariant() {
  return folieVariants.reduce(
    (min, v) => (v.price < min.price ? v : min),
    folieVariants[0]
  );
}
