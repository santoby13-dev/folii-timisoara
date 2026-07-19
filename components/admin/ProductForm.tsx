import type { Category, ProductRow } from "@/lib/supabase/types";

const inputCls =
  "w-full rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm";
const labelCls = "block text-sm font-medium mb-1 mt-4";
const hintCls = "text-xs text-neutral-500 mt-1";

function linesFrom(arr: string[] | undefined) {
  return (arr ?? []).join("\n");
}

function keyValueLinesFrom(rows: { label: string; value: string }[] | undefined) {
  return (rows ?? []).map((r) => `${r.label}: ${r.value}`).join("\n");
}

function colorLinesFrom(
  colors: { name: string; skuSuffix: string }[] | undefined
) {
  return (colors ?? []).map((c) => `${c.name}: ${c.skuSuffix}`).join("\n");
}

export default function ProductForm({
  action,
  categories,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  product?: ProductRow;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl">
      <label className={labelCls} htmlFor="category_id">
        Categorie
      </label>
      <select
        id="category_id"
        name="category_id"
        required
        defaultValue={product?.category_id ?? ""}
        className={inputCls}
      >
        <option value="" disabled>
          Alege o categorie
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className={labelCls} htmlFor="name">
        Nume produs
      </label>
      <input
        id="name"
        name="name"
        required
        defaultValue={product?.name}
        className={inputCls}
      />

      <label className={labelCls} htmlFor="slug">
        Slug (URL)
      </label>
      <input
        id="slug"
        name="slug"
        required
        pattern="[a-z0-9\-]+"
        defaultValue={product?.slug}
        className={inputCls}
      />
      <p className={hintCls}>Doar litere mici, cifre și cratimă — ex. folie-transparenta-08mm</p>

      <label className={labelCls} htmlFor="short_description">
        Descriere scurtă
      </label>
      <textarea
        id="short_description"
        name="short_description"
        rows={2}
        defaultValue={product?.short_description}
        className={inputCls}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="price">
            Preț (RON)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product?.price}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="price_before_discount">
            Preț înainte de discount
          </label>
          <input
            id="price_before_discount"
            name="price_before_discount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price_before_discount ?? undefined}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="price_unit">
            Unitate preț (afișată)
          </label>
          <input
            id="price_unit"
            name="price_unit"
            defaultValue={product?.price_unit ?? "RON / rolă (TVA inclus)"}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="unit_label">
            Etichetă unitate (cart)
          </label>
          <input
            id="unit_label"
            name="unit_label"
            defaultValue={product?.unit_label ?? undefined}
            className={inputCls}
          />
        </div>
      </div>

      <label className={labelCls} htmlFor="images">
        Imagini (o adresă URL pe linie)
      </label>
      <textarea
        id="images"
        name="images"
        rows={3}
        defaultValue={linesFrom(product?.images)}
        className={inputCls}
        placeholder={"/products/exemplu/01.jpg"}
      />

      <label className={labelCls} htmlFor="description">
        Descriere (un paragraf pe linie)
      </label>
      <textarea
        id="description"
        name="description"
        rows={4}
        defaultValue={linesFrom(product?.description)}
        className={inputCls}
      />

      <label className={labelCls} htmlFor="use_cases">
        Utilizări recomandate (o linie per utilizare)
      </label>
      <textarea
        id="use_cases"
        name="use_cases"
        rows={3}
        defaultValue={linesFrom(product?.use_cases)}
        className={inputCls}
      />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelCls} htmlFor="thicknesses">
            Grosimi (o linie fiecare)
          </label>
          <textarea
            id="thicknesses"
            name="thicknesses"
            rows={3}
            defaultValue={linesFrom(product?.thicknesses)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="widths">
            Lățimi (o linie fiecare)
          </label>
          <textarea
            id="widths"
            name="widths"
            rows={3}
            defaultValue={linesFrom(product?.widths)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="lengths">
            Lungimi (o linie fiecare)
          </label>
          <textarea
            id="lengths"
            name="lengths"
            rows={3}
            defaultValue={linesFrom(product?.lengths)}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="width_label">
            Etichetă lățime (opțional)
          </label>
          <input
            id="width_label"
            name="width_label"
            defaultValue={product?.width_label ?? undefined}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="length_label">
            Etichetă lungime (opțional)
          </label>
          <input
            id="length_label"
            name="length_label"
            defaultValue={product?.length_label ?? undefined}
            className={inputCls}
          />
        </div>
      </div>

      <label className={labelCls} htmlFor="colors">
        Culori/variante (format &quot;Nume: SUFIX&quot; pe linie)
      </label>
      <textarea
        id="colors"
        name="colors"
        rows={3}
        defaultValue={colorLinesFrom(product?.colors)}
        className={inputCls}
        placeholder={"Galben: GALBEN"}
      />

      <label className={labelCls} htmlFor="colors_label">
        Etichetă pentru culori (opțional, implicit &quot;Culoare&quot;)
      </label>
      <input
        id="colors_label"
        name="colors_label"
        defaultValue={product?.colors_label ?? undefined}
        className={inputCls}
      />

      <label className={labelCls} htmlFor="specs">
        Specificații (format &quot;Etichetă: Valoare&quot; pe linie)
      </label>
      <textarea
        id="specs"
        name="specs"
        rows={3}
        defaultValue={keyValueLinesFrom(product?.specs)}
        className={inputCls}
        placeholder={"Material: PVC transparent"}
      />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelCls} htmlFor="sku">
            SKU
          </label>
          <input id="sku" name="sku" defaultValue={product?.sku ?? undefined} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="weight">
            Greutate
          </label>
          <input
            id="weight"
            name="weight"
            defaultValue={product?.weight ?? undefined}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="sort_order">
            Ordine afișare
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={product?.sort_order ?? 0}
            className={inputCls}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 mt-4 text-sm">
        <input
          type="checkbox"
          name="has_cart"
          defaultChecked={product?.has_cart}
        />
        Poate fi adăugat în coș (are variante/preț real)
      </label>

      <button
        type="submit"
        className="mt-6 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2"
      >
        {submitLabel}
      </button>
    </form>
  );
}
