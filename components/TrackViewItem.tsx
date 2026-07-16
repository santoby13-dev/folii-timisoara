"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";

/**
 * Trimite evenimentul GA4 `view_item` la afișarea paginii de produs.
 * Montat din pagina de produs (server component) cu datele produsului.
 */
export default function TrackViewItem({
  id,
  name,
  price,
  category,
}: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  useEffect(() => {
    trackViewItem({ id, name, price, category });
  }, [id, name, price, category]);

  return null;
}
