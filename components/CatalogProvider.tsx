"use client";

import { createContext, useContext } from "react";
import type { Category, Product } from "@/lib/products";

type CatalogContextValue = { categories: Category[]; products: Product[] };

const CatalogContext = createContext<CatalogContextValue | null>(null);

/** Catalogul e preluat o singură dată, pe server, în app/layout.tsx. */
export default function CatalogProvider({
  categories,
  products,
  children,
}: CatalogContextValue & { children: React.ReactNode }) {
  return (
    <CatalogContext.Provider value={{ categories, products }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
