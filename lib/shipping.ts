/**
 * Date reale de livrare și plată — sursa unică de adevăr pentru coș,
 * checkout și paginile de produs. Costul final de transport depinde de
 * volum și greutate și este confirmat telefonic înainte de expediere.
 */

export type ShippingZone = {
  id: "express-local" | "standard-national";
  zoneLabel: string;
  methodLabel: string;
  /** Tarif de pornire, în RON. */
  priceFrom: number;
  /** Termen de livrare, doar dacă este garantat (ex. same-day local). */
  deliveryTime?: string;
};

export const shippingZones: ShippingZone[] = [
  {
    id: "express-local",
    zoneLabel: "Timișoara și localitățile limitrofe",
    methodLabel: "Livrare expres",
    priceFrom: 15,
    deliveryTime: "în aceeași zi",
  },
  {
    id: "standard-national",
    zoneLabel: "Restul țării",
    methodLabel: "Livrare standard prin curier",
    priceFrom: 19,
  },
];

export const shippingNote =
  "Costul final de transport depinde de volum și greutate și îți este confirmat telefonic înainte de expediere.";

/** Județul în care este disponibilă livrarea expres (Timișoara + limitrofe). */
export const EXPRESS_COUNTY = "Timiș";

export function getShippingZone(county: string): ShippingZone {
  return county === EXPRESS_COUNTY ? shippingZones[0] : shippingZones[1];
}

export type PaymentMethodId = "cash" | "pos" | "factura";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  description: string;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "cash",
    label: "Numerar la livrare",
    description: "Plătești în numerar când primești produsele.",
  },
  {
    id: "pos",
    label: "Card (POS) la livrare",
    description: "Plătești cu cardul, direct la curier sau la livrator.",
  },
  {
    id: "factura",
    label: "Factură pentru firmă",
    description:
      "Pentru persoane juridice — completezi datele firmei la finalizarea comenzii.",
  },
];

export const paymentMethodLabel = (id: PaymentMethodId) =>
  paymentMethods.find((m) => m.id === id)?.label ?? id;

export const judete = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brașov",
  "Brăila",
  "București",
  "Buzău",
  "Caraș-Severin",
  "Călărași",
  "Cluj",
  "Constanța",
  "Covasna",
  "Dâmbovița",
  "Dolj",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Satu Mare",
  "Sălaj",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vaslui",
  "Vâlcea",
  "Vrancea",
] as const;
