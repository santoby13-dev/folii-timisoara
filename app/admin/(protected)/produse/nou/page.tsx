import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/app/admin/(protected)/produse/actions";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Produs nou</h1>
      <ProductForm
        action={createProduct}
        categories={categories ?? []}
        submitLabel="Creează produs"
      />
    </div>
  );
}
