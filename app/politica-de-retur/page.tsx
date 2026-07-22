import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Politica de retur | ${siteConfig.name}`,
};

export default function PoliticaDeReturPage() {
  return (
    <LegalPage title="Politica de retur" updated="15 iulie 2026">
      <Section title="1. Dreptul de retur">
        <p>
          Conform OUG 34/2014 privind drepturile consumatorilor în cadrul
          contractelor încheiate cu profesioniștii, ai dreptul de a te
          retrage dintr-o comandă în termen de 14 zile calendaristice de la
          data primirii produselor, fără a fi nevoie să justifici decizia și
          fără costuri suplimentare, cu excepția costului de returnare a
          produsului.
        </p>
      </Section>

      <Section title="2. Cum soliciți un retur">
        <p>
          Contactează-ne telefonic la{" "}
          <a href={siteConfig.phoneHref} className="text-blue-600 dark:text-blue-400 hover:underline">
            {siteConfig.phone}
          </a>{" "}
          sau pe email la{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {siteConfig.email}
          </a>{" "}
          în interiorul termenului de 14 zile, menționând numărul comenzii și
          produsul pe care dorești să îl returnezi. Îți vom comunica adresa și
          modalitatea de returnare.
        </p>
      </Section>

      <Section title="3. Condițiile produsului returnat">
        <p>
          Produsul trebuie returnat în ambalajul original, nedeteriorat, fără
          urme de folosire sau montaj (ex. capse, adezivi, tăieturi
          personalizate). Deoarece o parte din produsele noastre (folie,
          prelată) sunt tăiate la dimensiune la cerere, dreptul de retur nu se
          aplică produselor personalizate, confecționate după specificațiile
          clientului, conform art. 16 lit. c) din OUG 34/2014.
        </p>
      </Section>

      <Section title="4. Rambursarea">
        <p>
          După primirea și verificarea produsului returnat, rambursarea se
          face în maximum 14 zile de la data la care am fost informați despre
          decizia de retragere, folosind aceeași metodă de plată utilizată la
          comandă, cu excepția cazului în care conveniți altfel.
        </p>
      </Section>

      <Section title="5. Produse defecte sau livrare greșită">
        <p>
          Dacă produsul primit este deteriorat sau nu corespunde comenzii,
          contactează-ne imediat — costurile de retur și înlocuire cad în
          sarcina noastră.
        </p>
      </Section>
    </LegalPage>
  );
}
