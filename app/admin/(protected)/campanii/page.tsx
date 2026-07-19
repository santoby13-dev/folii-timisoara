import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteCampaign } from "@/app/admin/(protected)/campanii/actions";

const statusLabels: Record<string, string> = {
  scheduled: "Programată",
  active: "Activă",
  ended: "Încheiată",
  cancelled: "Anulată",
};

export default async function AdminCampaignsPage() {
  const supabase = await createClient();
  const { data: campaigns, error } = await supabase
    .from("campaigns")
    .select("*, promotions(name)")
    .order("starts_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Campanii</h1>
        <Link
          href="/admin/campanii/nou"
          className="rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2"
        >
          + Campanie nouă
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-left">
            <tr>
              <th className="px-4 py-2">Nume</th>
              <th className="px-4 py-2">Promoție</th>
              <th className="px-4 py-2">Perioadă</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {campaigns?.map((c) => (
              <tr key={c.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2 text-neutral-500">
                  {(c.promotions as unknown as { name: string } | null)?.name ?? "—"}
                </td>
                <td className="px-4 py-2 text-neutral-500">
                  {new Date(c.starts_at).toLocaleDateString("ro-RO")} –{" "}
                  {new Date(c.ends_at).toLocaleDateString("ro-RO")}
                </td>
                <td className="px-4 py-2">{statusLabels[c.status] ?? c.status}</td>
                <td className="px-4 py-2 text-right space-x-3">
                  <Link
                    href={`/admin/campanii/${c.id}`}
                    className="text-neutral-600 dark:text-neutral-300 underline"
                  >
                    Editează
                  </Link>
                  <form action={deleteCampaign.bind(null, c.id)} className="inline">
                    <button type="submit" className="text-red-600 underline">
                      Șterge
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {campaigns?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                  Nicio campanie încă.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
