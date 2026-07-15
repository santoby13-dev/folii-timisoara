export type FolieVariant = {
  thickness: string;
  width: string;
  length: string;
  /** Current price, RON per roll, VAT included */
  price: number;
  /** Pre-discount price, if the variant is discounted */
  oldPrice?: number;
};

/**
 * Real purchasable variants with prices (RON / rolă, TVA inclus).
 * Sursa inițială: catalogul furnizorului, iul. 2026. De actualizat aici
 * când se schimbă prețurile.
 */
export const folieVariants: FolieVariant[] = [
  // 0.4 mm
  { thickness: "0.4 mm", width: "1.50 m", length: "30 m", price: 838.53 },
  { thickness: "0.4 mm", width: "1.50 m", length: "50 m", price: 1397.55 },

  // 0.5 mm
  { thickness: "0.5 mm", width: "1.50 m", length: "10 m", price: 309.83, oldPrice: 317.63 },
  { thickness: "0.5 mm", width: "1.50 m", length: "30 m", price: 928.35 },
  { thickness: "0.5 mm", width: "1.50 m", length: "50 m", price: 823.77, oldPrice: 1587.24 },
  { thickness: "0.5 mm", width: "2.00 m", length: "10 m", price: 412.61 },
  { thickness: "0.5 mm", width: "2.00 m", length: "15 m", price: 618.92, oldPrice: 635.25 },

  // 0.8 mm
  { thickness: "0.8 mm", width: "1.37 m", length: "30 m", price: 1070.12, oldPrice: 1206.37 },
  { thickness: "0.8 mm", width: "1.50 m", length: "10 m", price: 495.13 },
  { thickness: "0.8 mm", width: "1.50 m", length: "15 m", price: 742.68 },
  { thickness: "0.8 mm", width: "1.50 m", length: "30 m", price: 1170.4, oldPrice: 1321.32 },
  { thickness: "0.8 mm", width: "1.80 m", length: "30 m", price: 1455.45, oldPrice: 1611.64 },
  { thickness: "0.8 mm", width: "2.00 m", length: "10 m", price: 550.63, oldPrice: 648.56 },
  { thickness: "0.8 mm", width: "2.00 m", length: "15 m", price: 825.95, oldPrice: 972.84 },
  { thickness: "0.8 mm", width: "2.00 m", length: "30 m", price: 1617.17, oldPrice: 1760.55 },
  { thickness: "0.8 mm", width: "2.20 m", length: "15 m", price: 1177.14 },
  { thickness: "0.8 mm", width: "2.20 m", length: "30 m", price: 2130.93 },
  { thickness: "0.8 mm", width: "2.40 m", length: "15 m", price: 1284.15 },
  { thickness: "0.8 mm", width: "2.40 m", length: "30 m", price: 2568.3 },
  { thickness: "0.8 mm", width: "2.60 m", length: "15 m", price: 1391.16 },
  { thickness: "0.8 mm", width: "2.60 m", length: "30 m", price: 2622.85 },

  // 1.0 mm
  { thickness: "1.0 mm", width: "1.50 m", length: "10 m", price: 587.2, oldPrice: 635.25 },
  { thickness: "1.0 mm", width: "2.00 m", length: "10 m", price: 782.94, oldPrice: 847.0 },
];

export function cheapestFolieVariant() {
  return folieVariants.reduce(
    (min, v) => (v.price < min.price ? v : min),
    folieVariants[0]
  );
}
