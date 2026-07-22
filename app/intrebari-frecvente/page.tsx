import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Întrebări frecvente | Folii Timișoara",
  description:
    "Răspunsuri la întrebările frecvente despre foliile PVC transparente și prelatele PVC: ce grosime alegi, cât costă livrarea, cum plătești, montaj și retur.",
  alternates: { canonical: `${siteConfig.url}/intrebari-frecvente` },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Întrebări frecvente
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Răspunsuri la cele mai frecvente întrebări despre produse, livrare,
        plată și retur. Nu găsești răspunsul? Sună-ne la{" "}
        <a
          href={siteConfig.phoneHref}
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {siteConfig.phone}
        </a>
        .
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-black/10 p-5 dark:border-white/10"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
              {item.question}
              <span
                className="text-zinc-400 transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-black/10 p-6 text-center dark:border-white/10">
        <p className="font-semibold">Ai altă întrebare?</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Te ajutăm cu plăcere să alegi produsul potrivit.
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
        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          Vezi și{" "}
          <Link
            href="/politica-de-retur"
            className="underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Politica de retur
          </Link>{" "}
          și{" "}
          <Link
            href="/termeni-si-conditii"
            className="underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Termenii și condițiile
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
