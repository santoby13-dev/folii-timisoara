import { NextResponse } from "next/server";
import { appendNewsletterLead } from "@/lib/google-sheets";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { email, company } = body as Record<string, unknown>;

  // Honeypot: a real visitor never fills this hidden field.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Adresa de email nu este validă." },
      { status: 400 }
    );
  }

  try {
    await appendNewsletterLead(email.trim());
  } catch (err) {
    console.error("Newsletter signup failed:", err);
    return NextResponse.json(
      { error: "Nu am putut salva adresa. Încearcă din nou." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
