import { siteConfig } from "@/lib/site-config";

const products = [
  {
    title: "Folie PVC transparentă",
    description:
      "Folie PVC de înaltă claritate, rezistentă la intemperii, pentru închiderea teraselor și pergolelor.",
  },
  {
    title: "Rulouri PVC cu ghidaje",
    description:
      "Sisteme de rulouri transparente pe ghidaje, ușor de manevrat, pentru protecție rapidă împotriva vântului și ploii.",
  },
  {
    title: "Confecții metalice",
    description:
      "Structuri metalice personalizate pentru susținerea foliei, adaptate dimensiunilor terasei tale.",
  },
  {
    title: "Montaj profesional",
    description:
      "Echipă de montaj cu experiență, măsurători la fața locului și instalare rapidă în Timișoara și împrejurimi.",
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
      <section className="border-b border-black/10 bg-gradient-to-b from-blue-50 to-white px-6 py-24 dark:border-white/10 dark:from-zinc-950 dark:to-black">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Închidere terase cu folie PVC transparentă
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Bucură-te de terasă indiferent de anotimp. Oferim folie PVC de
            calitate, confecții metalice și montaj profesional, la prețuri
            avantajoase în {siteConfig.city}.
          </p>
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sună acum: {siteConfig.phone}
          </a>
        </div>
      </section>

      <section id="produse" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Produsele noastre
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.title}
                className="rounded-2xl border border-black/10 p-6 dark:border-white/10"
              >
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {product.description}
                </p>
              </div>
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
