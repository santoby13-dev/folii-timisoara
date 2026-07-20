import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import {
  categories as staticCategories,
  products as staticProducts,
  type Category,
  type Product,
} from "@/lib/products";

/**
 * Doar câmpurile pe care le folosesc componentele client (Header, coș) —
 * nu descrierea/specificațiile/variantele fiecărui produs. Trimis pe fiecare
 * pagină prin CatalogProvider, deci contează la mărimea payload-ului.
 */
export type ProductSummary = {
  slug: string;
  categorySlug: string;
  name: string;
  image?: string;
};

export function toProductSummaries(products: Product[]): ProductSummary[] {
  return products.map((p) => ({
    slug: p.slug,
    categorySlug: p.categorySlug,
    name: p.name,
    image: p.images[0],
  }));
}

/**
 * Sursa de date a catalogului public — citește din Supabase (populat din
 * /admin) și cade pe catalogul static din lib/catalog-*.ts dacă Supabase nu
 * e configurat sau interogarea eșuează, ca site-ul să nu pice niciodată din
 * cauza bazei de date. `cache()` deduplică apelurile în cadrul aceluiași
 * request/build — mai multe componente pot chema getCatalog() fără cereri
 * suplimentare către Supabase.
 */
export const getCatalog = cache(
  async (): Promise<{ categories: Category[]; products: Product[] }> => {
    const supabase = createPublicClient();
    if (!supabase) {
      return { categories: staticCategories, products: staticProducts };
    }

    try {
      const [
        { data: categoryRows, error: categoryError },
        { data: productRows, error: productError },
        { data: variantRows, error: variantError },
      ] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("products").select("*").order("sort_order"),
        supabase.from("product_variants").select("*"),
      ]);

      if (categoryError || productError || variantError || !categoryRows || !productRows) {
        console.error(
          "Catalog Supabase fetch failed, falling back to static catalog:",
          categoryError || productError || variantError
        );
        return { categories: staticCategories, products: staticProducts };
      }

      const categorySlugById = new Map(categoryRows.map((c) => [c.id, c.slug]));

      const variantsByProductId = new Map<string, typeof variantRows>();
      for (const v of variantRows ?? []) {
        const list = variantsByProductId.get(v.product_id) ?? [];
        list.push(v);
        variantsByProductId.set(v.product_id, list);
      }

      const categories: Category[] = categoryRows.map((c) => ({
        slug: c.slug,
        name: c.name,
        status: c.status,
        images: c.images,
        description: c.description,
      }));

      const products: Product[] = productRows.map((p) => {
        const variants = variantsByProductId.get(p.id);
        return {
          slug: p.slug,
          categorySlug: categorySlugById.get(p.category_id) ?? "",
          name: p.name,
          shortDescription: p.short_description,
          price: Number(p.price),
          priceBeforeDiscount: Number(p.price_before_discount ?? p.price),
          priceUnit: p.price_unit,
          unitLabel: p.unit_label ?? undefined,
          thicknesses: p.thicknesses,
          widths: p.widths,
          lengths: p.lengths,
          description: p.description,
          useCases: p.use_cases,
          hasCart: p.has_cart,
          images: p.images,
          variants: variants?.length
            ? variants.map((v) => ({
                thickness: v.thickness,
                width: v.width,
                length: v.length,
                price: Number(v.price),
                oldPrice: v.old_price != null ? Number(v.old_price) : undefined,
                sku: v.sku ?? undefined,
              }))
            : undefined,
          sku: p.sku ?? undefined,
          weight: p.weight ?? undefined,
          colors: p.colors?.length ? p.colors : undefined,
          colorsLabel: p.colors_label ?? undefined,
          widthLabel: p.width_label ?? undefined,
          lengthLabel: p.length_label ?? undefined,
          specs: p.specs?.length ? p.specs : undefined,
        };
      });

      return { categories, products };
    } catch (err) {
      console.error("Catalog Supabase fetch threw, falling back to static catalog:", err);
      return { categories: staticCategories, products: staticProducts };
    }
  }
);
