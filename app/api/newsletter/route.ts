import { NextResponse } from "next/server";
import { appendNewsletterLead } from "@/lib/google-sheets";
import { sendNewsletterConfirmationEmail } from "@/lib/email";

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

  // Emailul e un bonus pe lângă abonarea deja salvată în Sheets — un eșec
  // aici nu trebuie să întoarcă eroare către client.
  try {
    await sendNewsletterConfirmationEmail(email.trim());
  } catch (err) {
    console.error("Newsletter confirmation email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
