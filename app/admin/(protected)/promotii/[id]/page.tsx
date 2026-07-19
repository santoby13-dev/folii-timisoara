import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PromotionForm from "@/components/admin/PromotionForm";
import { updatePromotion } from "@/app/admin/(protected)/promotii/actions";

export default async function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: promotion }, { data: categories }, { data: products }] =
    await Promise.all([
      supabase.from("promotions").select("*").eq("id", id).single(),
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("products").select("id, name").order("name"),
    ]);

  if (!promotion) notFound();

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Editează: {promotion.name}</h1>
      <PromotionForm
        action={updatePromotion.bind(null, id)}
        categories={categories ?? []}
        products={products ?? []}
        promotion={promotion}
        submitLabel="Salvează modificările"
      />
    </div>
  );
}
