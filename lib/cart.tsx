"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  /** Unique key: productSlug + variant combo */
  id: string;
  productSlug: string;
  categorySlug: string;
  name: string;
  /** Empty string when the product has no such dimension (e.g. accesorii fără grosime reală). */
  thickness: string;
  width: string;
  length: string;
  unitPrice: number;
  quantity: number;
  /** Unit shown next to the price (e.g. "rolă", "metru liniar"). Defaults to "rolă". */
  unitLabel?: string;
  /** Product SKU, with color suffix already applied if the product has colors. */
  sku?: string;
  /** Selected color name, for produse cu selector de culoare. */
  colorName?: string;
};

/**
 * Rând de detalii pentru o linie din coș/comandă — sare peste dimensiunile
 * care nu se aplică produsului (ex. accesorii fără grosime reală), în loc să
 * afișeze mereu fix „Grosime · Lățime · Lungime”.
 */
export function cartItemDetailLine(
  item: Pick<CartItem, "thickness" | "width" | "length" | "colorName" | "sku">
): string {
  const parts: string[] = [];
  if (item.thickness) parts.push(`Grosime ${item.thickness}`);
  if (item.width) parts.push(`Lățime ${item.width}`);
  if (item.length) parts.push(`Lungime ${item.length}`);
  if (item.colorName) parts.push(`Culoare ${item.colorName}`);
  if (item.sku) parts.push(`Cod ${item.sku}`);
  return parts.join(" · ");
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "folii-timisoara-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // corrupt storage — start with an empty cart
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.productSlug}|${item.thickness}|${item.width}|${item.length}|${item.sku ?? ""}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      drawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [items, addItem, removeItem, setQuantity, clearCart, drawerOpen, openDrawer, closeDrawer]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatPrice(value: number) {
  return (
    value.toLocaleString("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " RON"
  );
}
