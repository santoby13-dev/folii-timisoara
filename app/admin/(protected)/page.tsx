import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: productCount }, { count: promoCount }, { count: campaignCount }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase
        .from("promotions")
        .select("*", { count: "exact", head: true })
        .eq("active", true),
      supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true })
        .eq("status", "scheduled"),
    ]);

  const cards = [
    { href: "/admin/produse", label: "Produse", value: productCount ?? 0 },
    { href: "/admin/promotii", label: "Promoții active", value: promoCount ?? 0 },
    { href: "/admin/campanii", label: "Campanii programate", value: campaignCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Panou</h1>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:border-neutral-400"
          >
            <p className="text-2xl font-semibold">{c.value}</p>
            <p className="text-sm text-neutral-500">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
