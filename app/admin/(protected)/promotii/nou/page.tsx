import { createClient } from "@/lib/supabase/server";
import PromotionForm from "@/components/admin/PromotionForm";
import { createPromotion } from "@/app/admin/(protected)/promotii/actions";

export default async function NewPromotionPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("products").select("id, name").order("name"),
  ]);

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Promoție nouă</h1>
      <PromotionForm
        action={createPromotion}
        categories={categories ?? []}
        products={products ?? []}
        submitLabel="Creează promoție"
      />
    </div>
  );
}
