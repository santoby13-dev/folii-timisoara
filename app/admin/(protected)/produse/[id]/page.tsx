import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import {
  updateProduct,
  deleteProduct,
  addVariant,
  deleteVariant,
} from "@/app/admin/(protected)/produse/actions";

const inputCls =
  "rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 text-sm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }, { data: variants }] =
    await Promise.all([
      supabase.from("products").select("*").eq("id", id).single(),
      supabase.from("categories").select("*").order("sort_order"),
      supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", id)
        .order("price"),
    ]);

  if (!product) notFound();

  const updateProductWithId = updateProduct.bind(null, id);
  const deleteProductWithId = deleteProduct.bind(null, id);
  const addVariantWithId = addVariant.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Editează: {product.name}</h1>
        <form action={deleteProductWithId}>
          <button type="submit" className="text-sm text-red-600 underline">
            Șterge produsul
          </button>
        </form>
      </div>

      <ProductForm
        action={updateProductWithId}
        categories={categories ?? []}
        product={product}
        submitLabel="Salvează modificările"
      />

      <div className="max-w-2xl mt-10 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h2 className="text-sm font-semibold mb-3">
          Variante (grosime × lățime × lungime, cu preț propriu)
        </h2>

        <table className="w-full text-sm mb-4">
          <thead className="text-left text-neutral-500">
            <tr>
              <th className="py-1">Grosime</th>
              <th className="py-1">Lățime</th>
              <th className="py-1">Lungime</th>
              <th className="py-1">Preț</th>
              <th className="py-1">Preț vechi</th>
              <th className="py-1">SKU</th>
              <th className="py-1" />
            </tr>
          </thead>
          <tbody>
            {variants?.map((v) => (
              <tr key={v.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="py-1">{v.thickness}</td>
                <td className="py-1">{v.width}</td>
                <td className="py-1">{v.length}</td>
                <td className="py-1">{Number(v.price).toFixed(2)} RON</td>
                <td className="py-1">
                  {v.old_price ? `${Number(v.old_price).toFixed(2)} RON` : "—"}
                </td>
                <td className="py-1">{v.sku ?? "—"}</td>
                <td className="py-1 text-right">
                  <form action={deleteVariant.bind(null, id, v.id)}>
                    <button type="submit" className="text-red-600 underline text-xs">
                      Șterge
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {variants?.length === 0 && (
              <tr>
                <td colSpan={7} className="py-3 text-center text-neutral-500">
                  Nicio variantă.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <form action={addVariantWithId} className="flex flex-wrap items-end gap-2">
          <div>
            <label className="block text-xs text-neutral-500">Grosime</label>
            <input name="thickness" required className={inputCls} placeholder="0.8 mm" />
          </div>
          <div>
            <label className="block text-xs text-neutral-500">Lățime</label>
            <input name="width" required className={inputCls} placeholder="2.00 m" />
          </div>
          <div>
            <label className="block text-xs text-neutral-500">Lungime</label>
            <input name="length" required className={inputCls} placeholder="10 m" />
          </div>
          <div>
            <label className="block text-xs text-neutral-500">Preț</label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              className={inputCls}
              placeholder="450"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-500">Preț vechi</label>
            <input name="old_price" type="number" step="0.01" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-neutral-500">SKU</label>
            <input name="sku" className={inputCls} />
          </div>
          <button
            type="submit"
            className="rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-3 py-1.5"
          >
            Adaugă
          </button>
        </form>
      </div>
    </div>
  );
}
