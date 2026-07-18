import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/products";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import NewsletterSignup from "@/components/NewsletterSignup";

const heroImages = [
  "/products/cristal-flex-catalog/87.jpg",
  "/products/cristal-flex-catalog/88.jpg",
];

const trustPoints = [
  {
    title: "Livrare expres",
    subtitle: "În aceeași zi în Timișoara și limitrofe",
    href: null,
    icon: (
      <>
        <path d="M14 17V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11h2" />
        <path d="M14 17h-4" />
        <path d="M14 8h4.3a1 1 0 0 1 .8.4l2.7 3.4a1 1 0 0 1 .2.6V17h-2" />
        <circle cx="7.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </>
    ),
  },
  {
    title: "Retur produse",
    subtitle: "Drept de retur 14 zile",
    href: "/politica-de-retur",
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 2.8-6.5" />
        <path d="M3 4v5h5" />
      </>
    ),
  },
  {
    title: "Plată la livrare",
    subtitle: "Cash sau POS · factură pentru firme",
    href: null,
    icon: (
      <>
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </>
    ),
  },
  {
    title: "Montaj disponibil",
    subtitle: "În Timișoara și localitățile limitrofe",
    href: null,
    icon: (
      <>
        <path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 6.4l-5 5a1.5 1.5 0 0 0 2 2.2l5.2-4.8a4.5 4.5 0 0 0 6.4-6.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z" />
      </>
    ),
  },
  {
    title: "Suport telefonic",
    subtitle: siteConfig.phone,
    href: siteConfig.phoneHref,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
];

const advantages = [
  {
    title: "Prețuri avantajoase",
    description:
      "Lucrăm direct cu producătorii, fără intermediari — prețul afișat pe site este prețul final al produsului, cu TVA inclus.",
  },
  {
    title: "Consultanță gratuită",
    description:
      "Ne spui dimensiunile terasei sau ale remorcii și îți recomandăm telefonic grosimea și varianta potrivită, fără niciun cost.",
  },
  {
    title: "Montaj în zona Timișoara",
    description:
      "Pentru Timișoara și localitățile limitrofe oferim și montaj — stabilim termenul împreună, la confirmarea telefonică a comenzii.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-black/10 px-6 py-24 sm:py-32 dark:border-white/10">
        <HeroCarousel images={heroImages} />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Terasa ta, protejată de vânt, ploaie și frig — cu folie
            transparentă livrată în {siteConfig.city}
          </h1>
          <p className="max-w-xl text-lg text-zinc-200">
            Folii PVC transparente Cristal Flex® și prelate PVC pentru terase,
            foișoare și remorci. Livrare expres în aceeași zi în{" "}
            {siteConfig.city} și localitățile limitrofe, montaj disponibil,
            plată la livrare.
          </p>
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/produse/folii-transparente-terase"
              className="rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Vezi foliile disponibile
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="text-sm font-medium text-zinc-200 underline underline-offset-4 hover:text-white"
            >
              Nu știi ce dimensiune îți trebuie? Sună-ne pentru consultanță
              gratuită
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 px-6 py-8 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustPoints.map((point) => {
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {point.icon}
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {point.title}
                  </span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                    {point.subtitle}
                  </span>
                </span>
              </>
            );
            const boxClasses =
              "flex items-center gap-3 rounded-2xl border border-black/10 p-4 dark:border-white/10";
            return point.href ? (
              <a
                key={point.title}
                href={point.href}
                className={`${boxClasses} transition-colors hover:border-blue-600 dark:hover:border-blue-500`}
              >
                {content}
              </a>
            ) : (
              <div key={point.title} className={boxClasses}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section id="produse" className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Categorii de produse
            </h2>
            <Link
              href="/produse"
              className="text-sm font-semibold text-blue-400 hover:underline"
            >
              Vezi toate &rarr;
            </Link>
          </div>
          <CategoryCarousel categories={categories} />
        </div>
      </section>

      <section
        id="despre"
        className="border-y border-black/10 bg-zinc-50 px-6 py-20 dark:border-white/10 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            De ce să alegi {siteConfig.name}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {advantages.map((advantage) => (
              <div key={advantage.title}>
                <h3 className="text-lg font-semibold">{advantage.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Contactează-ne
              </h2>
              <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
                Trimite-ne un mesaj sau sună-ne direct pentru o ofertă
                personalizată.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-lg">
                <a
                  href={siteConfig.phoneHref}
                  className="font-semibold text-blue-600"
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-blue-600"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
