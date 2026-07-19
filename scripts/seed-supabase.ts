/**
 * Migrează catalogul hardcodat din lib/catalog-*.ts în Supabase.
 * Rulează O SINGURĂ DATĂ, după ce ai completat cheile Supabase în .env.local
 * și ai rulat supabase/migrations/0001_init.sql în SQL Editor.
 *
 *   npx tsx scripts/seed-supabase.ts
 *
 * Folosește SUPABASE_SERVICE_ROLE_KEY (ocolește RLS) — nu rula acest script
 * dintr-un context expus public.
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { categories, products } from "../lib/products";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Lipsesc NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY din .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function main() {
  console.log(`Migrez ${categories.length} categorii și ${products.length} produse…`);

  const categoryIdBySlug = new Map<string, string>();

  for (const [index, category] of categories.entries()) {
    const { data, error } = await supabase
      .from("categories")
      .upsert(
        {
          slug: category.slug,
          name: category.name,
          status: category.status,
          description: category.description,
          images: category.images ?? [],
          sort_order: index,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (error) throw new Error(`Categorie ${category.slug}: ${error.message}`);
    categoryIdBySlug.set(category.slug, data.id);
    console.log(`  ✓ categorie ${category.slug}`);
  }

  for (const [index, product] of products.entries()) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    if (!categoryId) {
      console.warn(`  ✗ produs ${product.slug}: categorie ${product.categorySlug} nu există, sar peste`);
      continue;
    }

    const { data, error } = await supabase
      .from("products")
      .upsert(
        {
          category_id: categoryId,
          slug: product.slug,
          name: product.name,
          short_description: product.shortDescription,
          price: product.price,
          price_before_discount: product.priceBeforeDiscount,
          price_unit: product.priceUnit,
          unit_label: product.unitLabel ?? null,
          thicknesses: product.thicknesses,
          widths: product.widths,
          lengths: product.lengths,
          description: product.description,
          use_cases: product.useCases,
          has_cart: product.hasCart ?? false,
          images: product.images,
          sku: product.sku ?? null,
          weight: product.weight ?? null,
          colors: product.colors ?? [],
          colors_label: product.colorsLabel ?? null,
          width_label: product.widthLabel ?? null,
          length_label: product.lengthLabel ?? null,
          specs: product.specs ?? [],
          sort_order: index,
        },
        { onConflict: "category_id,slug" }
      )
      .select("id")
      .single();

    if (error) {
      console.warn(`  ✗ produs ${product.slug}: ${error.message}`);
      continue;
    }

    console.log(`  ✓ produs ${product.slug}`);

    if (product.variants?.length) {
      // Reseed variante: șterge variantele vechi ale produsului, apoi inserează-le pe cele curente.
      await supabase.from("product_variants").delete().eq("product_id", data.id);

      const { error: variantError } = await supabase.from("product_variants").insert(
        product.variants.map((v) => ({
          product_id: data.id,
          thickness: v.thickness,
          width: v.width,
          length: v.length,
          price: v.price,
          old_price: v.oldPrice ?? null,
          sku: v.sku ?? null,
        }))
      );

      if (variantError) {
        console.warn(`    ✗ variante ${product.slug}: ${variantError.message}`);
      } else {
        console.log(`    ✓ ${product.variants.length} variante`);
      }
    }
  }

  console.log("Gata.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
