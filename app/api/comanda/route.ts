import { NextResponse } from "next/server";
import { appendOrderRow } from "@/lib/google-sheets";

type OrderItem = {
  name: string;
  thickness: string;
  width: string;
  length: string;
  unitPrice: number;
  quantity: number;
};

type OrderPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
};

function isValidPayload(body: unknown): body is OrderPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length >= 3 &&
    typeof b.phone === "string" &&
    /^[0-9+ ]{10,15}$/.test(b.phone.trim()) &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()) &&
    typeof b.address === "string" &&
    b.address.trim().length >= 10 &&
    Array.isArray(b.items) &&
    b.items.length > 0 &&
    b.items.length <= 50 &&
    b.items.every(
      (i: unknown) =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as OrderItem).name === "string" &&
        typeof (i as OrderItem).quantity === "number" &&
        (i as OrderItem).quantity >= 1 &&
        (i as OrderItem).quantity <= 999
    ) &&
    typeof b.totalPrice === "number"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Verifică datele introduse și încearcă din nou." },
      { status: 400 }
    );
  }

  const order = body;
  const orderId = `FT-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toLocaleString("ro-RO", {
    timeZone: "Europe/Bucharest",
  });

  const itemsSummary = order.items
    .map(
      (i) =>
        `${i.quantity} x ${i.name} (${i.thickness} / ${i.width} / ${i.length}) @ ${i.unitPrice.toFixed(2)} RON`
    )
    .join("\n");

  try {
    await appendOrderRow([
      orderId,
      date,
      order.name.trim(),
      order.phone.trim(),
      order.email.trim(),
      order.address.trim(),
      itemsSummary,
      order.totalPrice.toFixed(2),
      "Noua",
    ]);
  } catch (err) {
    console.error("Order submission failed:", err);
    return NextResponse.json(
      { error: "Comanda nu a putut fi înregistrată. Te rugăm să ne suni." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, orderId });
}
