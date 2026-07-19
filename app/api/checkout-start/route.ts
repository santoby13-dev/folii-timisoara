import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Înregistrează momentul în care cineva ajunge pe pagina de checkout cu
 * produse în coș — folosit doar ca numitor pentru rata de conversie
 * coș → comandă din /admin. Best-effort, nu trebuie să blocheze niciodată
 * checkout-ul real.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const b = body as Record<string, unknown>;
  const totalPrice = Number(b.totalPrice);
  const itemCount = Number(b.itemCount);

  if (Number.isFinite(totalPrice) && Number.isFinite(itemCount)) {
    try {
      const supabase = createAdminClient();
      if (supabase) {
        await supabase
          .from("checkout_starts")
          .insert({ total_price: totalPrice, item_count: itemCount });
      }
    } catch (err) {
      console.error("checkout-start insert failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
