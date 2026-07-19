import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePromotion } from "@/app/admin/(protected)/promotii/actions";

function formatDiscount(type: string, value: number) {
  return type === "percent" ? `${value}%` : `${value} RON`;
}

export default async function AdminPromotionsPage() {
  const supabase = await createClient();
  const { data: promotions, error } = await supabase
    .from("promotions")
    .select("*, categories(name), products(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Promoții</h1>
        <Link
          href="/admin/promotii/nou"
          className="rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2"
        >
          + Promoție nouă
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-left">
            <tr>
              <th className="px-4 py-2">Nume</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Se aplică la</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {promotions?.map((p) => {
              const target =
                p.scope === "category"
                  ? (p.categories as unknown as { name: string } | null)?.name
                  : p.scope === "product"
                  ? (p.products as unknown as { name: string } | null)?.name
                  : "Tot magazinul";

              return (
                <tr key={p.id} className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">
                    {formatDiscount(p.discount_type, Number(p.discount_value))}
                  </td>
                  <td className="px-4 py-2 text-neutral-500">{target ?? "—"}</td>
                  <td className="px-4 py-2">
                    {p.active ? (
                      <span className="text-green-700 dark:text-green-400">Activă</span>
                    ) : (
                      <span className="text-neutral-500">Inactivă</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right space-x-3">
                    <Link
                      href={`/admin/promotii/${p.id}`}
                      className="text-neutral-600 dark:text-neutral-300 underline"
                    >
                      Editează
                    </Link>
                    <form action={deletePromotion.bind(null, p.id)} className="inline">
                      <button type="submit" className="text-red-600 underline">
                        Șterge
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {promotions?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                  Nicio promoție încă.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
