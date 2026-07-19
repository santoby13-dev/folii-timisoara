import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductFilterTable from "@/components/admin/ProductFilterTable";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const [{ data: products, error }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, sku, price, category_id, categories(name)")
      .order("name"),
    supabase.from("categories").select("id, name").order("sort_order"),
  ]);

  const rows = (products ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    price: Number(p.price),
    categoryId: p.category_id,
    categoryName:
      (p.categories as unknown as { name: string } | null)?.name ?? "—",
  }));

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

      <ProductFilterTable products={rows} categories={categories ?? []} />
    </div>
  );
}
