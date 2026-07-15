import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Termeni și condiții | ${siteConfig.name}`,
};

export default function TermeniPage() {
  return (
    <LegalPage title="Termeni și condiții" updated="15 iulie 2026">
      <Section title="1. Despre acest site">
        <p>
          Site-ul {siteConfig.name} ({siteConfig.city}) prezintă produse din
          domeniul foliilor și prelatelor PVC și permite trimiterea unei
          comenzi orientative prin formularul dedicat. Comanda plasată pe site
          nu este o vânzare finalizată automat: echipa noastră te contactează
          telefonic pentru confirmarea comenzii, a costului de transport și a
          detaliilor de livrare, înainte ca produsele să fie expediate.
        </p>
      </Section>

      <Section title="2. Comenzi">
        <p>
          Prin completarea formularului de comandă confirmi că datele
          introduse (nume, telefon, email, adresă) sunt corecte. Comanda este
          înregistrată în evidența noastră internă și urmată de un apel
          telefonic de confirmare. Comanda poate fi anulată sau modificată
          liber până la confirmarea telefonică, fără nicio penalizare.
        </p>
      </Section>

      <Section title="3. Prețuri și disponibilitate">
        <p>
          Prețurile afișate pe site sunt exprimate în lei (RON) și pot fi
          modificate fără notificare prealabilă, în funcție de prețurile
          primite de la furnizor. Prețul valabil pentru o comandă este cel
          afișat pe site în momentul plasării comenzii. Disponibilitatea
          stocului este confirmată telefonic, întrucât produsele sunt livrate
          la comandă.
        </p>
      </Section>

      <Section title="4. Transport">
        <p>
          Costul de transport nu este inclus în prețul produsului și se
          calculează în funcție de greutatea comenzii și de adresa de
          livrare. Costul final de transport îți este comunicat telefonic,
          înainte de confirmarea comenzii.
        </p>
      </Section>

      <Section title="5. Plata">
        <p>
          Plata se poate face la livrare, în numerar sau cu cardul (POS),
          conform opțiunilor disponibile pentru zona ta de livrare.
        </p>
      </Section>

      <Section title="6. Contact">
        <p>
          Pentru orice întrebare legată de acești termeni, ne poți contacta la{" "}
          <a href={siteConfig.phoneHref} className="text-blue-600 hover:underline">
            {siteConfig.phone}
          </a>{" "}
          sau{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-blue-600 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
