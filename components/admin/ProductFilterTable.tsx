"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Row = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  categoryId: string;
  categoryName: string;
};

export default function ProductFilterTable({
  products,
  categories,
}: {
  products: Row[];
  categories: { id: string; name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = categoryId === "all" || p.categoryId === categoryId;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.sku ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, categoryId]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="search"
          placeholder="Caută după nume sau SKU…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[200px] rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        >
          <option value="all">Toate categoriile</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-left">
            <tr>
              <th className="px-4 py-2">Nume</th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Categorie</th>
              <th className="px-4 py-2">Preț</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-neutral-500">{p.sku ?? "—"}</td>
                <td className="px-4 py-2 text-neutral-500">{p.categoryName}</td>
                <td className="px-4 py-2">{p.price.toFixed(2)} RON</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/produse/${p.id}`}
                    className="text-neutral-600 dark:text-neutral-300 underline"
                  >
                    Editează
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                  Niciun produs găsit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
