import type { Product } from "@/lib/products";

/**
 * Tabel de specificații tehnice construit exclusiv din datele reale ale
 * produsului (dimensiuni, greutate, SKU, specs din descriere) + secțiunea
 * „Ce primești" — clarifică conținutul pachetului, o sursă frecventă de
 * reclamații la produse tehnice.
 */
export default function ProductSpecs({ product }: { product: Product }) {
  const gaugeLabel = product.thicknesses.some((t) => t.includes("g/mp"))
    ? "Gramaj"
    : "Grosime";

  const rows: { label: string; value: string }[] = [
    { label: gaugeLabel, value: product.thicknesses.join(", ") },
    { label: "Lățime", value: product.widths.join(", ") },
    { label: "Lungime", value: product.lengths.join(", ") },
    ...(product.specs ?? []),
    ...(product.colors && product.colors.length > 1
      ? [
          {
            label: "Culori disponibile",
            value: product.colors.map((c) => c.name).join(", "),
          },
        ]
      : []),
    ...(product.weight ? [{ label: "Greutate", value: product.weight }] : []),
    ...(product.sku ? [{ label: "Cod produs", value: product.sku }] : []),
  ];

  return (
    <div className="mt-6 border-t border-black/10 pt-6 dark:border-white/10">
      <h2 className="text-base font-semibold">Specificații tehnice</h2>
      <table className="mt-3 w-full border-collapse text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={
                i % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-900/50" : undefined
              }
            >
              <th
                scope="row"
                className="w-2/5 px-3 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400"
              >
                {row.label}
              </th>
              <td className="px-3 py-2 text-zinc-900 dark:text-zinc-100">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-6 text-base font-semibold">Ce primești</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {packageContents(product)}
      </p>
    </div>
  );
}

function packageContents(product: Product): string {
  switch (product.unitLabel) {
    case "metru liniar":
      return "Materialul tăiat la numărul de metri comandați, pe lățimea specificată. Pachetul include doar materialul — fără accesorii de montaj sau sistem de prindere.";
    case "bucată":
      return "Produsul selectat, în cantitatea comandată, așa cum este descris mai sus.";
    default:
      return "Rola completă, la dimensiunea selectată. Pachetul include doar materialul — fără accesorii de montaj sau sistem de prindere.";
  }
}
