import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, slug, price, has_cart, categories(name)")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Produse</h1>
        <Link
          href="/admin/produse/nou"
          className="rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2"
        >
          + Produs nou
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-left">
            <tr>
              <th className="px-4 py-2">Nume</th>
              <th className="px-4 py-2">Categorie</th>
              <th className="px-4 py-2">Preț</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr
                key={p.id}
                className="border-t border-neutral-200 dark:border-neutral-800"
              >
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-neutral-500">
                  {(p.categories as unknown as { name: string } | null)?.name ?? "—"}
                </td>
                <td className="px-4 py-2">{Number(p.price).toFixed(2)} RON</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/produse/${p.id}`}
                    className="text-neutral-600 dark:text-neutral-300 underline"
                  >
                    Editează
                  </Link>
                </td>
              </tr>
            ))}
            {products?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-neutral-500">
                  Niciun produs încă.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
