import { shippingZones } from "./shipping";

/**
 * Întrebări frecvente reale de client — folosite de pagina FAQ și de
 * schema JSON-LD FAQPage. Răspunsurile reflectă strict condițiile reale
 * de vânzare (livrare, plată, retur) și informațiile din catalog.
 */

const [express, standard] = shippingZones;

export const faqItems: { question: string; answer: string }[] = [
  {
    question: "Ce grosime de folie aleg pentru terasa mea?",
    answer:
      "Depinde de expunere și de cât de des vrei să o manevrezi: 0.4–0.5 mm este flexibilă și economică, potrivită pentru pergole mici sau zone adăpostite, cu deschidere frecventă; 0.8 mm este standardul cel mai folosit pentru terase, foișoare și restaurante — echilibru bun între flexibilitate și rigiditate; 1.0 mm oferă rigiditate maximă și este recomandată pentru panouri fixe sau zone expuse la vânt puternic. Dacă nu ești sigur, sună-ne și îți recomandăm varianta potrivită pentru situația ta.",
  },
  {
    question: "Cât costă și cât durează livrarea?",
    answer: `În ${express.zoneLabel} livrăm expres, în aceeași zi, cu tarife de la ${express.priceFrom} RON. În ${standard.zoneLabel.toLowerCase()} livrăm prin curier, cu tarife de la ${standard.priceFrom} RON. Costul final depinde de volum și greutate și ți-l confirmăm telefonic înainte de expediere, după plasarea comenzii.`,
  },
  {
    question: "Montați voi folia sau primesc doar materialul?",
    answer:
      "Comanda standard include doar materialul. Pentru Timișoara și localitățile limitrofe oferim și montaj — menționează la comandă (sau telefonic) că vrei montaj și stabilim împreună detaliile.",
  },
  {
    question: "Cum pot plăti?",
    answer:
      "Plata se face integral la livrare: numerar sau card (POS). Pentru persoane juridice emitem factură — completezi datele firmei la finalizarea comenzii. Nu se face nicio plată online pe site.",
  },
  {
    question: "Folia sau prelata vine cu accesorii de montaj?",
    answer:
      "Nu — pachetul include doar materialul (rola sau metrii comandați), fără accesorii de montaj sau sistem de prindere. Verifică secțiunea „Ce primești” de pe pagina fiecărui produs și categoria Accesorii pentru produse complementare.",
  },
  {
    question: "Am nevoie de o dimensiune care nu apare pe site — ce fac?",
    answer:
      "Sună-ne sau scrie-ne pe WhatsApp cu dimensiunile de care ai nevoie. Verificăm disponibilitatea și îți spunem rapid dacă putem livra varianta potrivită.",
  },
  {
    question: "Pot returna produsul dacă m-am răzgândit?",
    answer:
      "Da, ai dreptul legal de retur în 14 zile de la primirea produsului, conform legislației privind contractele la distanță. Detaliile complete sunt în Politica de retur.",
  },
  {
    question:
      "Care e diferența dintre folia transparentă și prelata din PVC?",
    answer:
      "Folia transparentă (Cristal Flex®) are aspect de sticlă și se folosește pentru închideri de terase, foișoare și pergole unde contează vizibilitatea și lumina. Prelata din PVC este un material opac, țesătură de poliester acoperită cu PVC, mai grea și mai rezistentă mecanic — potrivită pentru copertine, camioane, remorci și acoperiri industriale.",
  },
];
