import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PERIODS = [
  { days: 7, label: "7 zile" },
  { days: 30, label: "30 zile" },
  { days: 90, label: "90 zile" },
  { days: 3650, label: "Tot timpul" },
];

function formatMoney(n: number) {
  return `${n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RON`;
}

/** Izolată separat — statisticile trebuie calculate la fiecare request, nu memoizate. */
function sinceIso(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const { days: daysParam } = await searchParams;
  const days = PERIODS.some((p) => String(p.days) === daysParam)
    ? Number(daysParam)
    : 30;
  const since = sinceIso(days);

  const supabase = await createClient();
  const [
    { count: productCount },
    { count: promoCount },
    { count: campaignCount },
    { data: orders },
    { count: checkoutStartCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("promotions")
      .select("*", { count: "exact", head: true })
      .eq("active", true),
    supabase
      .from("campaigns")
      .select("*", { count: "exact", head: true })
      .eq("status", "scheduled"),
    supabase
      .from("orders")
      .select("total_price, created_at")
      .gte("created_at", since),
    supabase
      .from("checkout_starts")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since),
  ]);

  const orderCount = orders?.length ?? 0;
  const totalSales = (orders ?? []).reduce((sum, o) => sum + Number(o.total_price), 0);
  const averageSpend = orderCount > 0 ? totalSales / orderCount : 0;
  const conversionRate =
    checkoutStartCount && checkoutStartCount > 0
      ? (orderCount / checkoutStartCount) * 100
      : 0;

  const statCards = [
    { label: "Vânzări", value: formatMoney(totalSales) },
    { label: "Comenzi", value: String(orderCount) },
    { label: "Valoare medie comandă", value: formatMoney(averageSpend) },
    {
      label: "Rată conversie coș → comandă",
      value: `${conversionRate.toFixed(1)}%`,
      hint: `${orderCount} din ${checkoutStartCount ?? 0} checkout-uri`,
    },
  ];

  const overviewCards = [
    { href: "/admin/produse", label: "Produse", value: productCount ?? 0 },
    { href: "/admin/promotii", label: "Promoții active", value: promoCount ?? 0 },
    { href: "/admin/campanii", label: "Campanii programate", value: campaignCount ?? 0 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Panou</h1>
        <div className="flex gap-1 text-sm">
          {PERIODS.map((p) => (
            <Link
              key={p.days}
              href={`/admin?days=${p.days}`}
              className={`rounded px-2.5 py-1 ${
                p.days === days
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <p className="text-2xl font-semibold">{c.value}</p>
            <p className="text-sm text-neutral-500">{c.label}</p>
            {c.hint && <p className="text-xs text-neutral-400 mt-1">{c.hint}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {overviewCards.map((c) => (
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
