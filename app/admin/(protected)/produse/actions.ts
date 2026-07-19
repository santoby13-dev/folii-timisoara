"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ColorOption, SpecRow } from "@/lib/supabase/types";

/** "eticheta: valoare" pe fiecare linie → [{label, value}]. Linii goale ignorate. */
function parseKeyValueLines(raw: string): SpecRow[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: line, value: "" };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
}

/** "Nume: SUFIX" pe fiecare linie → [{name, skuSuffix}]. */
function parseColorLines(raw: string): ColorOption[] {
  return parseKeyValueLines(raw).map((r) => ({
    name: r.label,
    skuSuffix: r.value,
  }));
}

function parseLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function numberOrNull(raw: FormDataEntryValue | null): number | null {
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function productFromFormData(formData: FormData) {
  return {
    category_id: String(formData.get("category_id") ?? ""),
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    short_description: String(formData.get("short_description") ?? ""),
    price: numberOrNull(formData.get("price")) ?? 0,
    price_before_discount: numberOrNull(formData.get("price_before_discount")),
    price_unit: String(formData.get("price_unit") ?? "RON"),
    unit_label: String(formData.get("unit_label") ?? "") || null,
    thicknesses: parseLines(String(formData.get("thicknesses") ?? "")),
    widths: parseLines(String(formData.get("widths") ?? "")),
    lengths: parseLines(String(formData.get("lengths") ?? "")),
    description: parseLines(String(formData.get("description") ?? "")),
    use_cases: parseLines(String(formData.get("use_cases") ?? "")),
    has_cart: formData.get("has_cart") === "on",
    images: parseLines(String(formData.get("images") ?? "")),
    sku: String(formData.get("sku") ?? "") || null,
    weight: String(formData.get("weight") ?? "") || null,
    colors: parseColorLines(String(formData.get("colors") ?? "")),
    colors_label: String(formData.get("colors_label") ?? "") || null,
    width_label: String(formData.get("width_label") ?? "") || null,
    length_label: String(formData.get("length_label") ?? "") || null,
    specs: parseKeyValueLines(String(formData.get("specs") ?? "")),
    sort_order: numberOrNull(formData.get("sort_order")) ?? 0,
  };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const values = productFromFormData(formData);

  const { error } = await supabase.from("products").insert(values);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produse");
  redirect("/admin/produse");
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createClient();
  const values = productFromFormData(formData);

  const { error } = await supabase
    .from("products")
    .update(values)
    .eq("id", productId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produse");
  revalidatePath(`/admin/produse/${productId}`);
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produse");
  redirect("/admin/produse");
}

export async function addVariant(productId: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("product_variants").insert({
    product_id: productId,
    thickness: String(formData.get("thickness") ?? ""),
    width: String(formData.get("width") ?? ""),
    length: String(formData.get("length") ?? ""),
    price: numberOrNull(formData.get("price")) ?? 0,
    old_price: numberOrNull(formData.get("old_price")),
    sku: String(formData.get("sku") ?? "") || null,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/produse/${productId}`);
}

export async function deleteVariant(productId: string, variantId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", variantId);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/produse/${productId}`);
}
