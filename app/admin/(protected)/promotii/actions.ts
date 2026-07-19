"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function datetimeOrNull(raw: FormDataEntryValue | null) {
  const value = String(raw ?? "").trim();
  return value ? new Date(value).toISOString() : null;
}

function promotionFromFormData(formData: FormData) {
  const scope = String(formData.get("scope") ?? "all") as
    | "all"
    | "category"
    | "product";

  return {
    name: String(formData.get("name") ?? "").trim(),
    discount_type: String(formData.get("discount_type") ?? "percent") as
      | "percent"
      | "fixed",
    discount_value: Number(formData.get("discount_value") ?? 0),
    scope,
    category_id: scope === "category" ? String(formData.get("category_id") || "") || null : null,
    product_id: scope === "product" ? String(formData.get("product_id") || "") || null : null,
    starts_at: datetimeOrNull(formData.get("starts_at")),
    ends_at: datetimeOrNull(formData.get("ends_at")),
    active: formData.get("active") === "on",
  };
}

export async function createPromotion(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("promotions")
    .insert(promotionFromFormData(formData));
  if (error) throw new Error(error.message);

  revalidatePath("/admin/promotii");
  redirect("/admin/promotii");
}

export async function updatePromotion(promotionId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("promotions")
    .update(promotionFromFormData(formData))
    .eq("id", promotionId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/promotii");
  redirect("/admin/promotii");
}

export async function deletePromotion(promotionId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("promotions")
    .delete()
    .eq("id", promotionId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/promotii");
  redirect("/admin/promotii");
}
