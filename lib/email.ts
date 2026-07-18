import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

/**
 * Trimite emailuri via SMTP Gmail (parolă de aplicație), configurat prin
 * env vars — la migrarea pe emailul firmei se schimbă doar
 * EMAIL_SMTP_USER/EMAIL_SMTP_PASSWORD, fără nicio modificare de cod.
 */

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null =
  null;

function getTransporter() {
  const user = process.env.EMAIL_SMTP_USER;
  const password = process.env.EMAIL_SMTP_PASSWORD;
  if (!user || !password) return null;

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: password },
    });
  }
  return cachedTransporter;
}

export type ConfirmationEmailItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

export type OrderEmailData = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: ConfirmationEmailItem[];
  totalPrice: number;
  paymentLabel: string;
  notes: string;
};

function formatItemsHtml(items: ConfirmationEmailItem[]) {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 8px;border-bottom:1px solid #e5e5e5;">${i.name}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #e5e5e5;text-align:center;">${i.quantity}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #e5e5e5;text-align:right;">${i.unitPrice.toFixed(2)} RON</td>
        </tr>`
    )
    .join("");
}

/** Emailul trimis clientului, de confirmare a comenzii. */
export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const transporter = getTransporter();
  if (!transporter) return;

  const itemsHtml = formatItemsHtml(data.items);

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${process.env.EMAIL_SMTP_USER}>`,
    to: data.customerEmail,
    subject: `Comanda ta ${data.orderId} a fost înregistrată — ${siteConfig.name}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;max-width:560px;margin:0 auto;">
        <h2 style="margin-bottom:4px;">Mulțumim, ${data.customerName}!</h2>
        <p style="color:#525252;">Comanda ta <strong>${data.orderId}</strong> a fost înregistrată. Te sunăm în scurt timp pentru confirmarea comenzii și stabilirea costului de transport.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="text-align:left;">
              <th style="padding:6px 8px;border-bottom:2px solid #171717;">Produs</th>
              <th style="padding:6px 8px;border-bottom:2px solid #171717;text-align:center;">Cant.</th>
              <th style="padding:6px 8px;border-bottom:2px solid #171717;text-align:right;">Preț unitar</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <p><strong>Total estimat: ${data.totalPrice.toFixed(2)} RON</strong> (transportul se adaugă separat, în funcție de volum și greutate)</p>
        <p style="color:#525252;">Metodă de plată: ${data.paymentLabel}<br/>Adresă de livrare: ${data.address}</p>
        <p style="color:#525252;">Ai o întrebare? Sună-ne la <a href="${siteConfig.phoneHref}">${siteConfig.phone}</a> sau scrie-ne pe <a href="${siteConfig.whatsappHref}">WhatsApp</a>.</p>
      </div>
    `,
  });
}

/** Emailul trimis unchiului, de notificare a unei comenzi noi. */
export async function sendOrderNotificationEmail(data: OrderEmailData) {
  const transporter = getTransporter();
  if (!transporter) return;

  const itemsHtml = formatItemsHtml(data.items);

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${process.env.EMAIL_SMTP_USER}>`,
    to: siteConfig.email,
    subject: `Comandă nouă ${data.orderId} — ${data.customerName}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;max-width:560px;margin:0 auto;">
        <h2 style="margin-bottom:4px;">Comandă nouă: ${data.orderId}</h2>
        <p><strong>Client:</strong> ${data.customerName}<br/>
           <strong>Telefon:</strong> <a href="tel:${data.customerPhone}">${data.customerPhone}</a><br/>
           <strong>Email:</strong> ${data.customerEmail}<br/>
           <strong>Adresă:</strong> ${data.address}</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="text-align:left;">
              <th style="padding:6px 8px;border-bottom:2px solid #171717;">Produs</th>
              <th style="padding:6px 8px;border-bottom:2px solid #171717;text-align:center;">Cant.</th>
              <th style="padding:6px 8px;border-bottom:2px solid #171717;text-align:right;">Preț unitar</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <p><strong>Total: ${data.totalPrice.toFixed(2)} RON</strong></p>
        <p>Metodă de plată: ${data.paymentLabel}${data.notes ? `<br/>Observații: ${data.notes}` : ""}</p>
      </div>
    `,
  });
}

/** Emailul trimis clientului, de confirmare a abonării la newsletter. */
export async function sendNewsletterConfirmationEmail(email: string) {
  const transporter = getTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${process.env.EMAIL_SMTP_USER}>`,
    to: email,
    subject: `Te-ai abonat cu succes — ${siteConfig.name}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;max-width:560px;margin:0 auto;">
        <h2 style="margin-bottom:4px;">Mulțumim că te-ai abonat!</h2>
        <p style="color:#525252;">Te-am adăugat pe lista noastră și te vom anunța la oferte și noutăți despre folii transparente, prelate PVC și accesorii.</p>
        <p style="color:#525252;">Ai o întrebare? Sună-ne la <a href="${siteConfig.phoneHref}">${siteConfig.phone}</a> sau scrie-ne pe <a href="${siteConfig.whatsappHref}">WhatsApp</a>.</p>
      </div>
    `,
  });
}
