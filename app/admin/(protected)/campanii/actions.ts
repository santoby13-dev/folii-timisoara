"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function campaignFromFormData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? ""),
    promotion_id: String(formData.get("promotion_id") || "") || null,
    starts_at: new Date(String(formData.get("starts_at"))).toISOString(),
    ends_at: new Date(String(formData.get("ends_at"))).toISOString(),
    status: String(formData.get("status") ?? "scheduled") as
      | "scheduled"
      | "active"
      | "ended"
      | "cancelled",
  };
}

export async function createCampaign(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("campaigns")
    .insert(campaignFromFormData(formData));
  if (error) throw new Error(error.message);

  revalidatePath("/admin/campanii");
  redirect("/admin/campanii");
}

export async function updateCampaign(campaignId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("campaigns")
    .update(campaignFromFormData(formData))
    .eq("id", campaignId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/campanii");
  redirect("/admin/campanii");
}

export async function deleteCampaign(campaignId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("campaigns").delete().eq("id", campaignId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/campanii");
  redirect("/admin/campanii");
}
