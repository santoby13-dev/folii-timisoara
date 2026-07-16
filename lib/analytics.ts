import { sendGAEvent } from "@next/third-parties/google";
import type { CartItem } from "@/lib/cart";

/**
 * Evenimente GA4 de e-commerce (view_item, add_to_cart, begin_checkout,
 * purchase), cu valoare monetară atașată. Se activează doar când
 * NEXT_PUBLIC_GA_MEASUREMENT_ID este setat (vezi TODO.md pentru pașii
 * de configurare) — altfel apelurile sunt no-op.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GAItem = {
  item_id: string;
  item_name: string;
  item_variant?: string;
  price: number;
  quantity: number;
};

function cartItemToGAItem(item: CartItem): GAItem {
  return {
    item_id: item.sku ?? item.productSlug,
    item_name: item.name,
    item_variant: `${item.thickness} · ${item.width} × ${item.length}`,
    price: item.unitPrice,
    quantity: item.quantity,
  };
}

function send(eventName: string, params: Record<string, unknown>) {
  if (!GA_MEASUREMENT_ID) return;
  sendGAEvent("event", eventName, params);
}

export function trackViewItem(item: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  send("view_item", {
    currency: "RON",
    value: item.price,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: 1,
      },
    ],
  });
}

export function trackAddToCart(item: CartItem | Omit<CartItem, "id">) {
  const gaItem = cartItemToGAItem(item as CartItem);
  send("add_to_cart", {
    currency: "RON",
    value: gaItem.price * gaItem.quantity,
    items: [gaItem],
  });
}

export function trackBeginCheckout(items: CartItem[], value: number) {
  send("begin_checkout", {
    currency: "RON",
    value,
    items: items.map(cartItemToGAItem),
  });
}

export function trackPurchase(
  transactionId: string,
  items: CartItem[],
  value: number
) {
  send("purchase", {
    transaction_id: transactionId,
    currency: "RON",
    value,
    items: items.map(cartItemToGAItem),
  });
}
