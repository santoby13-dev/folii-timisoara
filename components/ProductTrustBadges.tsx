import { shippingZones } from "@/lib/shipping";

/**
 * Micro-trust afișat imediat sub CTA-ul de cumpărare pe pagina de produs:
 * disponibilitate, livrare cu tarife reale, retur legal și plata la livrare.
 * Clientul ajuns aici e gata să cumpere — nu-l trimitem în footer după
 * aceste informații.
 */
export default function ProductTrustBadges() {
  const [express, standard] = shippingZones;
  return (
    <div className="mt-5 flex flex-col gap-2.5 rounded-2xl border border-black/10 p-4 text-sm dark:border-white/10">
      <p className="flex items-center gap-2 font-medium text-green-700 dark:text-green-400">
        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-green-600 dark:bg-green-400" />
        Disponibil în stoc — pregătit de expediere
      </p>
      <p className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
        <TruckIcon />
        <span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Livrare expres {express.deliveryTime}
          </span>{" "}
          în {express.zoneLabel} — de la {express.priceFrom} RON.
          Restul țării: de la {standard.priceFrom} RON.
        </span>
      </p>
      <p className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
        <ReturnIcon />
        <span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Retur în 14 zile
          </span>{" "}
          conform legislației în vigoare.
        </span>
      </p>
      <p className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
        <WalletIcon />
        <span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Plată la livrare
          </span>{" "}
          — numerar sau card (POS). Factură pentru firme.
        </span>
      </p>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 6 6v1a6 6 0 0 1-6 6h-3" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}
