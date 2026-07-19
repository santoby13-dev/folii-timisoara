import { NextResponse } from "next/server";
import { appendOrderRow } from "@/lib/google-sheets";
import { paymentMethodLabel, type PaymentMethodId } from "@/lib/shipping";
import {
  sendOrderConfirmationEmail,
  sendOrderNotificationEmail,
} from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";

type OrderItem = {
  name: string;
  thickness: string;
  width: string;
  length: string;
  unitPrice: number;
  quantity: number;
  sku?: string;
};

type OrderPayload = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  county: string;
  postalCode: string;
  notes: string;
  payment: PaymentMethodId;
  companyName: string;
  companyCui: string;
  items: OrderItem[];
  totalPrice: number;
};

const PAYMENT_IDS: PaymentMethodId[] = ["cash", "pos", "factura"];

function isValidPayload(body: unknown): body is OrderPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  const paymentOk =
    typeof b.payment === "string" &&
    PAYMENT_IDS.includes(b.payment as PaymentMethodId);
  const companyOk =
    b.payment !== "factura" ||
    (typeof b.companyName === "string" &&
      b.companyName.trim().length >= 3 &&
      typeof b.companyCui === "string" &&
      /^(RO)?\d{2,10}$/i.test(b.companyCui.replace(/\s/g, "")));
  return (
    typeof b.name === "string" &&
    b.name.trim().length >= 3 &&
    typeof b.phone === "string" &&
    /^(\+40|0040|0)[237]\d{8}$/.test(b.phone.replace(/[\s.-]/g, "")) &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()) &&
    typeof b.street === "string" &&
    b.street.trim().length >= 5 &&
    typeof b.city === "string" &&
    b.city.trim().length >= 2 &&
    typeof b.county === "string" &&
    b.county.trim().length >= 3 &&
    typeof b.postalCode === "string" &&
    /^\d{6}$/.test(b.postalCode.trim()) &&
    (b.notes === undefined ||
      (typeof b.notes === "string" && b.notes.length <= 500)) &&
    paymentOk &&
    companyOk &&
    Array.isArray(b.items) &&
    b.items.length > 0 &&
    b.items.length <= 50 &&
    b.items.every(
      (i: unknown) =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as OrderItem).name === "string" &&
        typeof (i as OrderItem).thickness === "string" &&
        typeof (i as OrderItem).width === "string" &&
        typeof (i as OrderItem).length === "string" &&
        typeof (i as OrderItem).unitPrice === "number" &&
        Number.isFinite((i as OrderItem).unitPrice) &&
        typeof (i as OrderItem).quantity === "number" &&
        (i as OrderItem).quantity >= 1 &&
        (i as OrderItem).quantity <= 999 &&
        ((i as OrderItem).sku === undefined ||
          typeof (i as OrderItem).sku === "string")
    ) &&
    typeof b.totalPrice === "number" &&
    Number.isFinite(b.totalPrice)
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

  const address = `${order.street.trim()}, ${order.city.trim()}, jud. ${order.county.trim()}, ${order.postalCode.trim()}`;

  // Identified by SKU + quantity alone, for quick stock picking — falls back
  // to the product name only in the unlikely case a SKU is missing.
  const itemsSummary = order.items
    .map((i) => `${i.quantity} x ${i.sku || i.name}`)
    .join("\n");

  const company =
    order.payment === "factura"
      ? `${order.companyName.trim()} (${order.companyCui.trim()})`
      : "";

  try {
    await appendOrderRow([
      orderId,
      date,
      order.name.trim(),
      order.phone.trim(),
      order.email.trim(),
      address,
      itemsSummary,
      order.totalPrice.toFixed(2),
      "Noua",
      paymentMethodLabel(order.payment),
      company,
      (order.notes ?? "").trim(),
    ]);
  } catch (err) {
    console.error("Order submission failed:", err);
    return NextResponse.json(
      { error: "Comanda nu a putut fi înregistrată. Te rugăm să ne suni." },
      { status: 500 }
    );
  }

  // Statisticile din /admin citesc din Supabase — bonus pe lângă comanda
  // deja salvată în Sheets, un eșec aici nu blochează răspunsul către client.
  try {
    const supabase = createAdminClient();
    if (supabase) {
      await supabase.from("orders").insert({
        order_number: orderId,
        customer_name: order.name.trim(),
        customer_email: order.email.trim(),
        customer_phone: order.phone.trim(),
        address,
        items: order.items,
        total_price: order.totalPrice,
        payment_method: paymentMethodLabel(order.payment),
        notes: (order.notes ?? "").trim(),
      });
    }
  } catch (err) {
    console.error("Order Supabase insert failed:", err);
  }

  // Emailurile sunt un bonus pe lângă comanda deja salvată în Sheets — un
  // eșec aici nu trebuie să întoarcă eroare către client.
  const emailData = {
    orderId,
    customerName: order.name.trim(),
    customerEmail: order.email.trim(),
    customerPhone: order.phone.trim(),
    address,
    items: order.items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
    totalPrice: order.totalPrice,
    paymentLabel: paymentMethodLabel(order.payment),
    notes: (order.notes ?? "").trim(),
  };
  try {
    await Promise.all([
      sendOrderConfirmationEmail(emailData),
      sendOrderNotificationEmail(emailData),
    ]);
  } catch (err) {
    console.error("Order email failed:", err);
  }

  return NextResponse.json({ ok: true, orderId });
}
