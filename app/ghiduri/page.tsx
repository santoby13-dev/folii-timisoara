import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Section } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Ghiduri și informații utile | ${siteConfig.name}`,
  description:
    "Cum măsori terasa pentru folie transparentă, ce grosime alegi, ce metodă de fixare ți se potrivește și cum întreții folia sau prelata pe timpul iernii.",
  alternates: { canonical: `${siteConfig.url}/ghiduri` },
};

export default function GhidPage() {
  return (
    <LegalPage title="Ghiduri și informații utile" updated="18 iulie 2026">
      <Section title="Cum măsori terasa pentru folie transparentă">
        <p>
          Ai nevoie de două dimensiuni: <strong>înălțimea închiderii</strong>{" "}
          (de la nivelul de fixare de jos până sus, unde se prinde folia de
          structură) și <strong>lungimea totală</strong> de acoperit, măsurată
          pe orizontală, de-a lungul întregului perimetru pe care vrei să-l
          închizi.
        </p>
        <p>
          Alege întotdeauna o <strong>lățime de rolă cel puțin egală</strong>{" "}
          cu înălțimea închiderii, ca panoul să nu aibă nicio îmbinare pe
          verticală — folia se vinde în lățimi de la 1.37 m până la 2.60 m.
          Dacă înălțimea ta depășește 2.60 m, ai nevoie de o îmbinare
          orizontală sau de un panou din două bucăți.
        </p>
        <p>
          Pentru lungime, adaugă câțiva centimetri de rezervă (recomandăm 5–10
          cm) pentru marginile care se prind cu bandă de întărire și capse —
          panoul montat e mereu puțin mai mic decât rola tăiată. Dacă nu ești
          sigur ce combinație de grosime/lățime/lungime se potrivește,
          calculatorul de pe{" "}
          <Link
            href="/produse/folii-transparente-terase/folie-transparenta-cristal-flex"
            className="text-blue-600 hover:underline"
          >
            pagina foliei configurabile
          </Link>{" "}
          îți recomandă automat rola potrivită, sau sună-ne direct la{" "}
          <a href={siteConfig.phoneHref} className="text-blue-600 hover:underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      </Section>

      <Section title="Ce grosime alegi">
        <p>
          <strong>0.4–0.5 mm</strong> — flexibilă și economică, ideală pentru
          pergole mici sau zone adăpostite, unde folia se deschide și se
          demontează des (de exemplu vara).
        </p>
        <p>
          <strong>0.8 mm</strong> — standardul cel mai folosit pentru terase,
          foișoare și restaurante; echilibru optim între flexibilitate și
          rigiditate, pentru utilizare permanentă.
        </p>
        <p>
          <strong>1.0 mm</strong> — rigiditate și rezistență maximă,
          recomandată pentru zone expuse la vânt puternic sau pentru panouri
          fixe, care nu se mai demontează.
        </p>
      </Section>

      <Section title="Ce metodă de fixare ți se potrivește">
        <p>
          Modul în care prinzi folia de structură decide ce accesorii
          cumperi. Cele trei sisteme cele mai folosite:
        </p>
        <p>
          <strong>Capse + bride</strong> (clasic, demontabil) — marginea
          foliei se întărește întâi cu{" "}
          <Link
            href="/produse/accesorii/banda-intarire-margine-folie-tiv-30m"
            className="text-blue-600 hover:underline"
          >
            bandă de întărire (TIV)
          </Link>
          , apoi se fixează cu{" "}
          <Link
            href="/produse/accesorii/capse-ovale-42x22mm-set-10"
            className="text-blue-600 hover:underline"
          >
            capse ovale
          </Link>{" "}
          sau{" "}
          <Link
            href="/produse/accesorii/capse-rotunde-d10mm-1000buc"
            className="text-blue-600 hover:underline"
          >
            capse rotunde
          </Link>
          . Pentru demontarea foliei vara, fără s-o tai, folosește{" "}
          <Link
            href="/produse/accesorii/bride-butoni-rotativi-set-10"
            className="text-blue-600 hover:underline"
          >
            bride rotative
          </Link>{" "}
          în loc de capse fixe.
        </p>
        <p>
          <strong>Fermoar de lipit</strong> (demontare rapidă, fără capse) —{" "}
          <Link
            href="/produse/accesorii/fermoar-lipire-3m"
            className="text-blue-600 hover:underline"
          >
            fermoarul de lipit
          </Link>{" "}
          se aplică prin sudură sau adeziv și oferă o închidere care se
          deschide și se închide ca un fermoar clasic — util pentru panouri
          demontate frecvent.
        </p>
        <p>
          <strong>Lipire fără sudură</strong> (fără unelte) — pentru cine nu
          are aparat de sudură cu aer cald,{" "}
          <Link
            href="/produse/accesorii/adeziv-special-prelata-pvc"
            className="text-blue-600 hover:underline"
          >
            adezivul special pentru PVC
          </Link>{" "}
          sau{" "}
          <Link
            href="/produse/accesorii/banda-dublu-adeziva-19mm-cristal-flex-tape"
            className="text-blue-600 hover:underline"
          >
            banda dublu-adezivă
          </Link>{" "}
          oferă o lipire rezistentă, rapidă și accesibilă pentru proiecte DIY.
        </p>
      </Section>

      <Section title="Întreținere și depozitare pe timpul iernii">
        <p>
          Curăță folia sau prelata doar cu apă și detergent neutru — fără
          solvenți, acetonă, alcool sau produse abrazive, care pot afecta
          claritatea sau stratul de protecție UV.
        </p>
        <p>
          Dacă demontezi folia pentru iarnă sau pentru o perioadă lungă,
          rulează materialul (nu-l împături, ca să eviți îndoituri care lasă
          urme permanente) și depozitează-l ferit de soare direct și de surse
          de căldură.{" "}
          <Link
            href="/produse/accesorii/curelusa-pvc-fixare"
            className="text-blue-600 hover:underline"
          >
            Curelușele din PVC
          </Link>{" "}
          țin rola strânsă și ordonată pe perioada depozitării.
        </p>
        <p>
          La exterior, o ușoară îmbătrânire a materialului în timp e normală —
          nu e un defect. Evită expunerea materialului la flacără deschisă sau
          surse directe de căldură, atât la montaj cât și la depozitare.
        </p>
      </Section>

      <div className="rounded-2xl border border-black/10 p-6 text-center dark:border-white/10">
        <p className="font-semibold">Nu ești sigur ce îți trebuie?</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Sună-ne și te ajutăm să alegi produsul și accesoriile potrivite.
        </p>
        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sună-ne: {siteConfig.phone}
          </a>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
          >
            Scrie-ne pe WhatsApp
          </a>
        </div>
      </div>
    </LegalPage>
  );
}
