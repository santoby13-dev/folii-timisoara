import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/lib/products";
import HeroCarousel from "@/components/HeroCarousel";

const heroImages = [
  "/products/cristal-flex-catalog/87.jpg",
  "/products/cristal-flex-catalog/88.jpg",
];

const trustPoints = [
  {
    title: "Livrare rapidă",
    subtitle: "Livrare începând cu aceeași zi",
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
    href: null,
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 2.8-6.5" />
        <path d="M3 4v5h5" />
      </>
    ),
  },
  {
    title: "Plată la ramburs",
    subtitle: "Plată cash sau POS la livrare",
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
    description: "Lucrăm direct cu producătorii, fără intermediari inutili.",
  },
  {
    title: "Consultanță gratuită",
    description: "Te ajutăm să alegi soluția potrivită pentru spațiul tău.",
  },
  {
    title: "Montaj rapid",
    description: "Termene scurte de execuție, respectate cu strictețe.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-black/10 px-6 py-24 sm:py-32 dark:border-white/10">
        <HeroCarousel images={heroImages} />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Soluții complete în folii și prelate PVC
          </h1>
          <p className="max-w-xl text-lg text-zinc-200">
            Oferim soluții complete pentru înfolierea foișoarelor exterioare,
            pentru acoperirea remorcilor cu prelată și multe altele — materiale
            de calitate, la prețuri avantajoase în {siteConfig.city}.
          </p>
          <Link
            href="/produse"
            className="rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Explorează catalogul
          </Link>
        </div>
      </section>

      <section className="border-b border-black/10 px-6 py-8 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <section id="produse" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Categorii de produse
            </h2>
            <Link
              href="/produse"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Vezi toate &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/produse/${category.slug}`}
                className="rounded-2xl border border-black/10 p-6 transition-colors hover:border-blue-600 dark:border-white/10 dark:hover:border-blue-500"
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
                {category.status === "coming-soon" && (
                  <span className="mt-1 inline-block text-xs text-zinc-400">
                    în curând
                  </span>
                )}
                <span className="mt-4 block text-sm font-semibold text-blue-600">
                  Vezi produse &rarr;
                </span>
              </Link>
            ))}
          </div>
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
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Contactează-ne
          </h2>
          <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
            Trimite-ne un mesaj sau sună-ne direct pentru o ofertă
            personalizată.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-lg">
            <a href={siteConfig.phoneHref} className="font-semibold text-blue-600">
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
      </section>
    </div>
  );
}
