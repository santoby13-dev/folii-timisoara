"use client";

import { useState } from "react";
import type { Category, Promotion } from "@/lib/supabase/types";

const inputCls =
  "w-full rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm";
const labelCls = "block text-sm font-medium mb-1 mt-4";

/** yyyy-MM-ddThh:mm pentru <input type="datetime-local">. */
function toLocalInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function PromotionForm({
  action,
  categories,
  products,
  promotion,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  products: { id: string; name: string }[];
  promotion?: Promotion;
  submitLabel: string;
}) {
  const [scope, setScope] = useState(promotion?.scope ?? "all");

  return (
    <form action={action} className="max-w-lg">
      <label className={labelCls} htmlFor="name">
        Nume promoție
      </label>
      <input
        id="name"
        name="name"
        required
        defaultValue={promotion?.name}
        className={inputCls}
        placeholder="Reducere de vară"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="discount_type">
            Tip discount
          </label>
          <select
            id="discount_type"
            name="discount_type"
            defaultValue={promotion?.discount_type ?? "percent"}
            className={inputCls}
          >
            <option value="percent">Procent (%)</option>
            <option value="fixed">Sumă fixă (RON)</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="discount_value">
            Valoare
          </label>
          <input
            id="discount_value"
            name="discount_value"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={promotion?.discount_value}
            className={inputCls}
          />
        </div>
      </div>

      <label className={labelCls} htmlFor="scope">
        Se aplică la
      </label>
      <select
        id="scope"
        name="scope"
        value={scope}
        onChange={(e) => setScope(e.target.value as typeof scope)}
        className={inputCls}
      >
        <option value="all">Tot magazinul</option>
        <option value="category">O categorie</option>
        <option value="product">Un produs</option>
      </select>

      {scope === "category" && (
        <>
          <label className={labelCls} htmlFor="category_id">
            Categorie
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={promotion?.category_id ?? ""}
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
        </>
      )}

      {scope === "product" && (
        <>
          <label className={labelCls} htmlFor="product_id">
            Produs
          </label>
          <select
            id="product_id"
            name="product_id"
            required
            defaultValue={promotion?.product_id ?? ""}
            className={inputCls}
          >
            <option value="" disabled>
              Alege un produs
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="starts_at">
            Începe la (opțional)
          </label>
          <input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            defaultValue={toLocalInputValue(promotion?.starts_at ?? null)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="ends_at">
            Se termină la (opțional)
          </label>
          <input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            defaultValue={toLocalInputValue(promotion?.ends_at ?? null)}
            className={inputCls}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 mt-4 text-sm">
        <input
          type="checkbox"
          name="active"
          defaultChecked={promotion?.active ?? true}
        />
        Activă
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
