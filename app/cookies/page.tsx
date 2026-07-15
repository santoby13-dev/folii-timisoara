import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Politica de cookies | ${siteConfig.name}`,
};

export default function CookiesPage() {
  return (
    <LegalPage title="Politica de cookies" updated="15 iulie 2026">
      <Section title="1. Ce folosim">
        <p>
          Site-ul {siteConfig.name} nu folosește cookie-uri de urmărire sau de
          marketing. Coșul de cumpărături este salvat direct în browserul tău
          (localStorage), nu prin cookie-uri, și este șters dacă golești
          datele browserului sau schimbi dispozitivul.
        </p>
      </Section>

      <Section title="2. Cookie-uri tehnice">
        <p>
          Este posibil ca serviciul de găzduire (Vercel) să folosească
          cookie-uri strict necesare pentru funcționarea site-ului (ex.
          rutare, protecție anti-abuz). Acestea nu ne identifică personal și
          nu sunt folosite în scop de marketing.
        </p>
      </Section>

      <Section title="3. Modificări viitoare">
        <p>
          Dacă vom adăuga pe viitor instrumente de analiză a traficului sau
          publicitate care folosesc cookie-uri, vom actualiza această pagină
          și vom afișa un banner de consimțământ înainte de plasarea acestor
          cookie-uri.
        </p>
      </Section>
    </LegalPage>
  );
}
