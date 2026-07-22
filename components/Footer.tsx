import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const legalLinks = [
  { href: "/ghiduri", label: "Ghiduri și informații utile" },
  { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-de-retur", label: "Politica de retur" },
  { href: "/confidentialitate", label: "Confidențialitate (GDPR)" },
  { href: "/cookies", label: "Politica de cookies" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 text-sm sm:grid-cols-3">
        <div>
          <p className="text-base font-semibold tracking-tight">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-xs text-zinc-600 dark:text-zinc-400">
            Folii PVC transparente și prelate PVC pentru terase, foișoare și
            remorci. Livrare expres în aceeași zi în {siteConfig.city} și
            localitățile limitrofe, livrare prin curier în toată țara.
          </p>
          <div className="mt-4 flex flex-col gap-1 text-zinc-600 dark:text-zinc-400">
            <a href={siteConfig.phoneHref} className="hover:text-blue-600 dark:hover:text-blue-400">
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              {siteConfig.email}
            </a>
          </div>
          <p className="mt-4 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
            Plata la livrare: numerar sau card (POS) · factură pentru firme.
            Nicio plată online pe site.
          </p>
        </div>

        <div>
          <p className="font-semibold">Informații legale</p>
          <ul className="mt-3 flex flex-col gap-2 text-zinc-600 dark:text-zinc-400">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold">Protecția consumatorului</p>
          <div className="mt-3 flex flex-col gap-3 text-zinc-600 dark:text-zinc-400">
            <a
              href="https://reclamatiisal.anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit overflow-hidden rounded-lg"
            >
              <Image
                src="/legal/pictograma-sal.png"
                alt="ANPC — Soluționarea Alternativă a Litigiilor (SAL)"
                width={220}
                height={55}
              />
            </a>
            <a
              href="https://consumer-redress.ec.europa.eu/dispute-resolution-bodies"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-black/10 px-3 py-2 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 dark:border-white/10"
            >
              SOL — Organisme de soluționare a litigiilor (UE)
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-6 py-6 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        <div className="mx-auto max-w-6xl">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Toate
          drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
