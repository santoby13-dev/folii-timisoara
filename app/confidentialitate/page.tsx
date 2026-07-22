import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Politica de confidențialitate | ${siteConfig.name}`,
};

export default function ConfidentialitatePage() {
  return (
    <LegalPage title="Politica de confidențialitate (GDPR)" updated="15 iulie 2026">
      <Section title="1. Ce date colectăm">
        <p>
          Când plasezi o comandă pe site, colectăm datele pe care ni le
          furnizezi în formular: nume, număr de telefon, adresă de email și
          adresă de livrare. Nu colectăm date de card bancar — plata se face
          la livrare.
        </p>
      </Section>

      <Section title="2. Scopul prelucrării">
        <p>
          Folosim aceste date exclusiv pentru a procesa și confirma comanda
          ta, a te contacta telefonic în legătură cu livrarea și pentru a
          organiza transportul produselor comandate.
        </p>
      </Section>

      <Section title="3. Unde sunt stocate datele">
        <p>
          Datele comenzilor sunt stocate într-un registru intern (Google
          Sheets), accesibil doar echipei {siteConfig.name}. Nu vindem, nu
          închiriem și nu transmitem datele tale către terți în scopuri de
          marketing.
        </p>
      </Section>

      <Section title="4. Durata păstrării">
        <p>
          Păstrăm datele comenzilor atât timp cât este necesar pentru
          evidența comercială și pentru a răspunde eventualelor solicitări
          legate de garanție sau retur, conform obligațiilor legale.
        </p>
      </Section>

      <Section title="5. Drepturile tale">
        <p>
          Conform Regulamentului (UE) 2016/679 (GDPR), ai dreptul de acces,
          rectificare, ștergere a datelor, restricționare a prelucrării și
          dreptul de a te opune prelucrării. Pentru a-ți exercita oricare
          dintre aceste drepturi, scrie-ne la{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </Section>

      <Section title="6. Contact">
        <p>
          Pentru orice întrebare legată de datele tale personale, ne poți
          contacta la{" "}
          <a href={siteConfig.phoneHref} className="text-blue-600 dark:text-blue-400 hover:underline">
            {siteConfig.phone}
          </a>{" "}
          sau{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
