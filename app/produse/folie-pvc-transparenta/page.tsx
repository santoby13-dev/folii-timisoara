import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Folie PVC transparentă | Folii Timișoara",
  description:
    "Folie PVC transparentă pentru închidere terase, foișoare și pergole, în grosimi de 0.5mm, 0.8mm și 1.0mm.",
};

const variants = [
  {
    thickness: "0.5 mm",
    price: "de la 180 RON / rolă",
    use: "Închideri sezoniere, foișoare mici (sub 10 mp), zone adăpostite de vânt. Cea mai flexibilă și economică opțiune.",
  },
  {
    thickness: "0.8 mm",
    price: "de la 260 RON / rolă",
    use: "Cea mai cerută grosime. Echilibru optim între rezistență la vânt, claritate și preț. Recomandată pentru terase medii, restaurante și cafenele.",
  },
  {
    thickness: "1.0 mm",
    price: "de la 340 RON / rolă",
    use: "Grosime premium pentru terase mari, expuse vânturilor puternice sau utilizare intensivă pe tot parcursul anului.",
  },
];

export default function FoliePvcTransparentaPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Folie PVC transparentă
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Folie PVC transparentă pentru închiderea teraselor, foișoarelor și
        pergolelor, disponibilă în mai multe grosimi. Protejează spațiul de
        vânt, ploaie și frig, păstrând vizibilitatea și lumina naturală.
      </p>

      <p className="mt-6 max-w-2xl rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
        <strong>Prețuri estimative</strong> — prețul final depinde de lățimea
        și lungimea rolei alese și se confirmă telefonic sau prin email
        înainte de comandă.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {variants.map((variant) => (
          <div
            key={variant.thickness}
            className="flex flex-col rounded-2xl border border-black/10 p-6 dark:border-white/10"
          >
            <h2 className="text-xl font-semibold">
              Folie {variant.thickness}
            </h2>
            <p className="mt-2 text-lg font-semibold text-blue-600">
              {variant.price}
            </p>
            <p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
              {variant.use}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-semibold">Lățimi și lungimi disponibile</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Role disponibile în lățimi standard, de la lățimi mici până la
          lățimi mari, pe role de diverse lungimi. Alege lățimea rolei egală
          sau mai mare decât înălțimea zonei de închis (de la șină până la
          podea) pentru a evita îmbinările.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={siteConfig.phoneHref}
          className="rounded-full bg-blue-600 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Sună pentru ofertă: {siteConfig.phone}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-black/10 px-6 py-3 text-center text-base font-semibold transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
        >
          Scrie-ne pe email
        </a>
      </div>
    </div>
  );
}
