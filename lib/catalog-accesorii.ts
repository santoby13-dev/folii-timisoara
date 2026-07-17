import type { Product } from "./products";

/**
 * Categoria Accesorii, din catalogul furnizorului. Primul produs (bandă
 * protecție gard) vine de pe pagina Prelate; restul (11 produse), scrapate
 * iul. 2026 de pe
 * foliepvctransparenta.ro/catalog/accesorii-inchidere-terasa-44 — preț, SKU
 * (unde există) și poze stricte, identice cu sursa.
 *
 * SKU: 4 produse au cod real de la furnizor (bandă protecție gard, adeziv,
 * bandă dublu-adezivă, capse rotunde D10/D12) — restul nu au niciun SKU
 * afișat pe site; codurile lor sunt inventate de noi, doar pentru uz intern
 * (decizie confirmată de Toby, același principiu ca la Prelata HDPE).
 *
 * Greutate: doar capsele rotunde D10/D12 au un câmp „Greutate” oficial pe
 * pagina furnizorului — pentru restul, greutatea vine din estimarea de
 * transport afișată pe pagina de produs (decizie confirmată de Toby).
 *
 * Variante fără preț diferit (lățime bandă TIV, lungime curelușă) folosesc
 * mecanismul existent de variante lățime/lungime — prețul e identic pe toate
 * combinațiile, exact ca la furnizor. Materialul la Capse Ovale (Metalice/
 * Nylon) și tipul de prindere la Bandă cu scai (adeziv/termosudabil) nu au
 * selector — preț identic la furnizor pentru ambele variante, alternativa e
 * menționată în descriere ca să nu forțăm eticheta „Culoare” pe o alegere
 * care nu e o culoare.
 *
 * „Fermoar pentru lipire – 3 m” are ambele culori (Alb, Maro) în stoc,
 * confirmat de Toby, deși pagina furnizorului arăta la scraping doar Alb ca
 * opțiune selectabilă.
 */
export const accesoriiCatalog: Product[] = [
  {
    slug: "banda-protectie-gard-pvc-gri",
    categorySlug: "accesorii",
    name: "Bandă protecție gard 19 cm x 50 m - PVC gri",
    shortDescription:
      "Bandă PVC pentru gard, 19 cm lățime x 50 m lungime, culoare gri — protecție vizuală, împotriva vântului și zgomotului.",
    price: 189.02,
    priceBeforeDiscount: 189.02,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: ["0.55 mm"],
    widths: ["19 cm"],
    lengths: ["50 m"],
    sku: "BGGRI1950",
    weight: "5.66 kg",
    hasCart: true,
    variants: [{ thickness: "0.55 mm", width: "19 cm", length: "50 m", price: 189.02 }],
    images: [
      "/products/accesorii-catalog/01.jpg",
      "/products/accesorii-catalog/02.jpg",
    ],
    description: [
      "Bandă din PVC, realizată din material rezistent de 550 g/m² și 0.55 mm grosime — 100% impermeabilă, rezistentă la frig (-30°C) și la cald (+70°C).",
      "Oferă protecție vizuală pentru gard, intimitate, protecție împotriva vântului și a zgomotului. Rezistentă la intemperii și radiații UV.",
      "Instalare simplă și rapidă: se țese banda printre ochiurile gardului și se fixează cu cleme la capete sau bandă dublu adezivă/capse. Potrivită pentru garduri din sârmă standard cu înălțimea ochiului de 20 cm. Curățare facilă cu cârpă moale, apă sau furtun de grădină.",
    ],
    useCases: [
      "Delimitare și protecție vizuală pentru garduri din plasă de sârmă, la case sau curți.",
      "Protecție împotriva vântului și reducere a zgomotului pentru spații exterioare.",
    ],
    specs: [
      { label: "Material", value: "PVC 550 g/m²" },
      { label: "Temperatură de utilizare", value: "-30°C … +70°C" },
      { label: "Impermeabilitate", value: "100%" },
      { label: "Protecție UV", value: "Da" },
      { label: "Culoare", value: "Gri" },
    ],
  },
  {
    slug: "banda-intarire-margine-folie-tiv-30m",
    categorySlug: "accesorii",
    name: "Bandă întărire margine folie închidere terasă, rolă 30 m (TIV / Fustă)",
    shortDescription:
      "Bandă de întărire pentru marginea foliei transparente Cristal Flex®, rolă de 30 m, disponibilă în 3 lățimi.",
    price: 61.51,
    priceBeforeDiscount: 61.51,
    priceUnit: "RON / rolă (TVA inclus)",
    unitLabel: "rolă",
    thicknesses: ["650 g/mp"],
    widths: ["5 cm", "10 cm", "20 cm"],
    lengths: ["30 m"],
    sku: "BTIV3050",
    weight: "2 kg",
    hasCart: true,
    widthLabel: "Lățime",
    variants: [
      { thickness: "650 g/mp", width: "5 cm", length: "30 m", price: 61.51, sku: "BTIV0530" },
      { thickness: "650 g/mp", width: "10 cm", length: "30 m", price: 61.51, sku: "BTIV1030" },
      { thickness: "650 g/mp", width: "20 cm", length: "30 m", price: 61.51, sku: "BTIV2030" },
    ],
    images: [
      "/products/accesorii-catalog/03.jpg",
      "/products/accesorii-catalog/04.jpg",
      "/products/accesorii-catalog/05.jpg",
      "/products/accesorii-catalog/06.jpg",
      "/products/accesorii-catalog/07.jpg",
    ],
    description: [
      "Folia transparentă Cristal Flex® nu are țesătură la interior, ca să rămână perfect clară — de aceea marginea se întărește cu această bandă, din același material rezistent (650 g/m²) folosit la prelatele de camion.",
      "Oferă stabilitate dimensională, o zonă solidă pentru capse și fermoare, și o estetică mai curată la marginea panoului de folie.",
      "Se aplică prin sudură cu aer cald, sudură cu curenți de înaltă frecvență sau lipire cu aparat cu cap cald; pentru montaj fără scule, poate fi lipită și cu adezivul special pentru PVC sau cu banda dublu-adezivă Cristal Flex® Tape.",
    ],
    useCases: [
      "Întărirea marginii foliei transparente înainte de montarea capselor ovale sau rotunde.",
      "Realizarea unui tiv rezistent pe conturul panourilor de terasă, foișor sau pergolă.",
    ],
    specs: [
      { label: "Material", value: "Țesătură poliester acoperită cu PVC, 650 g/m²" },
      { label: "Temperatură de utilizare", value: "-30°C … +70°C" },
      { label: "Impermeabilitate", value: "100%" },
      { label: "Protecție UV", value: "Da" },
    ],
  },
  {
    slug: "bride-butoni-rotativi-set-10",
    categorySlug: "accesorii",
    name: "Bride (Butoni Rotativi), set 10 bucăți — compatibile cu capse ovale 42 × 22 mm",
    shortDescription:
      "Bride rotative din Nylon, set de 10 bucăți, pentru fixarea demontabilă a foliei transparente sau prelatelor PVC.",
    price: 23.0,
    priceBeforeDiscount: 23.0,
    priceUnit: "RON / set / 10 bucăți (TVA inclus)",
    unitLabel: "set",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "BRIDE10",
    weight: "0.3 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 23.0 }],
    colors: [
      { name: "Albe", skuSuffix: "ALB" },
      { name: "Crem", skuSuffix: "CREM" },
      { name: "Gri", skuSuffix: "GRI" },
      { name: "Maro", skuSuffix: "MARO" },
      { name: "Negre", skuSuffix: "NEGRU" },
    ],
    images: [
      "/products/accesorii-catalog/08.jpg",
      "/products/accesorii-catalog/09.jpg",
      "/products/accesorii-catalog/10.jpg",
      "/products/accesorii-catalog/11.jpg",
      "/products/accesorii-catalog/12.jpg",
    ],
    description: [
      "Bride rotative din Nylon tehnic, tratate anti-UV, compatibile cu capsele ovale de 42 × 22 mm — permit demontarea rapidă a foliei sau prelatei (de exemplu vara), fără să o tăiați.",
      "Formă ergonomică ce se rotește ușor pentru a fixa sau elibera materialul; rezistă la uzură, frig, căldură și umiditate.",
      "Se montează cu șuruburi, pe lemn, metal, PVC, cărămidă sau beton — potrivite atât pentru terase rezidențiale, cât și pentru proiecte comerciale.",
    ],
    useCases: [
      "Fixare demontabilă a panourilor de folie transparentă montate cu capse ovale.",
      "Prinderea prelatelor PVC pe structuri unde e nevoie de deschidere/închidere frecventă.",
    ],
    specs: [
      { label: "Material", value: "Nylon tehnic, tratat anti-UV" },
      { label: "Compatibilitate", value: "Capse ovale 42 × 22 mm" },
    ],
  },
  {
    slug: "adeziv-special-prelata-pvc",
    categorySlug: "accesorii",
    name: "Adeziv special pentru Prelată PVC",
    shortDescription:
      "Adeziv pentru lipirea profesională a tivului foliilor și prelatelor PVC — nu se folosește pentru transparent pe transparent.",
    price: 99.85,
    priceBeforeDiscount: 99.85,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "APVC860",
    weight: "1 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 99.85, sku: "APVC860" }],
    images: [
      "/products/accesorii-catalog/13.jpg",
      "/products/accesorii-catalog/14.jpg",
      "/products/accesorii-catalog/15.jpg",
    ],
    description: [
      "Adeziv special pentru lipirea tivului la foliile transparente și prelatele PVC folosite la închiderea teraselor, foișoarelor și structurilor similare — se aplică ușor, cu o pensulă, pe ambele suprafețe ce urmează a fi lipite.",
      "Recomandat exclusiv pentru lipirea tivului (bandă de întărire); nu se folosește pentru lipirea transparent pe transparent, unde poate albi materialul — pentru acel caz, folosiți banda dublu-adezivă Cristal Flex® Tape.",
      "În lunile reci, țineți cutia la temperatura camerei înainte de deschidere: la frig, consumul de adeziv crește și aplicarea uniformă e mai dificilă. Dacă adezivul s-a uscat pe suprafață, se reactivează prin încălzire cu aer cald.",
    ],
    useCases: [
      "Lipirea benzii de întărire (tiv) pe marginea foliei transparente, fără aparat de sudură.",
      "Reparații și îmbinări pe prelate PVC.",
    ],
    specs: [{ label: "Aplicare", value: "Cu pensula, pe ambele suprafețe" }],
  },
  {
    slug: "capse-ovale-42x22mm-set-10",
    categorySlug: "accesorii",
    name: "Set 10 bucăți, Capse Ovale 42 × 22 mm",
    shortDescription:
      "Capse ovale 42 × 22 mm, set de 10 bucăți, pentru fixarea marginilor foliei transparente sau prelatelor PVC.",
    price: 15.88,
    priceBeforeDiscount: 15.88,
    priceUnit: "RON / set / 10 bucăți (TVA inclus)",
    unitLabel: "set",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "CAPOV4222",
    weight: "0.3 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 15.88, sku: "CAPOV4222" }],
    images: [
      "/products/accesorii-catalog/16.jpg",
      "/products/accesorii-catalog/17.jpg",
      "/products/accesorii-catalog/18.jpg",
      "/products/accesorii-catalog/19.jpg",
      "/products/accesorii-catalog/20.jpg",
      "/products/accesorii-catalog/21.jpg",
    ],
    description: [
      "Capse ovale de 42 × 22 mm pentru fixarea și tensionarea marginilor foliei transparente sau prelatelor PVC întărite cu bandă de tiv — compatibile cu bridele rotative pentru demontare rapidă.",
      "Varianta afișată aici e metalică, rezistentă și potrivită pentru utilizare intensă; furnizorul o are disponibilă și din Nylon (plastic), la același preț — precizați la comandă dacă preferiți varianta din plastic.",
      "Montajul capselor metalice necesită unelte dedicate (preducea și stanța); pregătiți în prealabil marginea materialului cu bandă de întărire și adeziv sau termosudare.",
    ],
    useCases: [
      "Fixarea marginilor foliei transparente sau prelatelor PVC, alături de bride rotative.",
      "Montaje profesionale unde e nevoie de rezistență ridicată la tensionare.",
    ],
    specs: [
      { label: "Dimensiune", value: "42 × 22 mm" },
      { label: "Material", value: "Metalic (disponibil și din Nylon, la același preț)" },
    ],
  },
  {
    slug: "curelusa-pvc-fixare",
    categorySlug: "accesorii",
    name: "Curelușă din PVC pentru fixare",
    shortDescription:
      "Curelușă din PVC cu cataramă, pentru fixarea și tensionarea foliei rulate — 3 culori, 4 lungimi.",
    price: 3.33,
    priceBeforeDiscount: 3.33,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: ["25 cm", "50 cm", "70 cm", "80 cm"],
    sku: "CURPVC",
    weight: "0.1 kg",
    hasCart: true,
    lengthLabel: "Lungime",
    variants: [
      { thickness: "", width: "", length: "25 cm", price: 3.33 },
      { thickness: "", width: "", length: "50 cm", price: 3.33 },
      { thickness: "", width: "", length: "70 cm", price: 3.33 },
      { thickness: "", width: "", length: "80 cm", price: 3.33 },
    ],
    colors: [
      { name: "Alb / Gri", skuSuffix: "ALBGRI" },
      { name: "Crem", skuSuffix: "CREM" },
      { name: "Maro", skuSuffix: "MARO" },
    ],
    images: [
      "/products/accesorii-catalog/22.jpg",
      "/products/accesorii-catalog/23.jpg",
      "/products/accesorii-catalog/24.jpg",
      "/products/accesorii-catalog/25.jpg",
    ],
    description: [
      "Curelușă din PVC, prevăzută cu o cataramă solidă, pentru fixarea fermă a foliei transparente atunci când e rulată — previne desfacerea accidentală și menține un aspect curat.",
      "Disponibilă în 4 lungimi (25–80 cm), pentru diverse diametre de rolă, și 3 culori care se integrează discret în ansamblul terasei.",
    ],
    useCases: [
      "Fixarea și tensionarea foliei transparente atunci când e rulată deoparte, vara.",
      "Menținerea unui aspect ordonat al panourilor de închidere terasă.",
    ],
    specs: [{ label: "Prindere", value: "Cataramă din PVC" }],
  },
  {
    slug: "banda-dublu-adeziva-19mm-cristal-flex-tape",
    categorySlug: "accesorii",
    name: "Bandă dublu adezivă - 19 mm, CRISTAL FLEX® TAPE",
    shortDescription:
      "Bandă dublu-adezivă industrială, 19 mm × 50 m, pentru lipirea foliei transparente fără aparat de sudură.",
    price: 81.65,
    priceBeforeDiscount: 81.65,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: ["19 mm"],
    lengths: ["50 m"],
    sku: "BDA19",
    weight: "0.5 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "19 mm", length: "50 m", price: 81.65, sku: "BDA19" }],
    images: [
      "/products/accesorii-catalog/26.jpg",
      "/products/accesorii-catalog/27.jpg",
      "/products/accesorii-catalog/28.jpg",
    ],
    description: [
      "CRISTAL FLEX® TAPE 190 h+ este o bandă dublu-adezivă din acrilat modificat, sensibilă la presiune, cu rezistență mare la forțe de tracțiune — o alternativă rapidă la sudura cu aer cald pentru îmbinarea foliilor PVC.",
      "Lățime 19 mm, rolă de 50 m liniari. Suprafețele de lipit trebuie curățate și degresate în prealabil (recomandat cu alcool izopropilic); se aplică cu presiune uniformă, la temperaturi între 15°C și 40°C.",
      "Rezistența optimă a lipiturii se atinge după 72 de ore de la aplicare; poate fi grăbită prin încălzirea suprafeței la peste 40°C.",
    ],
    useCases: [
      "Îmbinarea foliilor PVC transparente, fără aparat cu aer cald.",
      "Reparații rapide sau ajustări la panourile deja montate.",
    ],
    specs: [
      { label: "Temperatură de aplicare", value: "15°C … 40°C" },
      { label: "Termen de valabilitate", value: "12 luni, în ambalajul original" },
    ],
  },
  {
    slug: "fermoar-lipire-3m",
    categorySlug: "accesorii",
    name: "Fermoar pentru lipire – 3 m, pentru închidere terasă, foișor, balcon",
    shortDescription:
      "Fermoar de lipit, lungime 3 m, în două culori — pentru o închidere care se deschide/închide ca un fermoar clasic, fără capse.",
    price: 82.39,
    priceBeforeDiscount: 82.39,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: ["3 m"],
    sku: "FRM3M",
    weight: "0.3 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "3 m", price: 82.39 }],
    colors: [
      { name: "Alb", skuSuffix: "ALB" },
      { name: "Maro", skuSuffix: "MARO" },
    ],
    images: [
      "/products/accesorii-catalog/29.jpg",
      "/products/accesorii-catalog/30.jpg",
    ],
    description: [
      "Fermoar de lipit de 3 m, pentru sisteme de închidere terasă, foișor sau balcon care se deschid ca un fermoar clasic — o alternativă la sistemul cu capse, cu demontare rapidă.",
      "Se aplică prin lipire cu aer cald sau cu adezivul special pentru prelată PVC. Cursorul se achiziționează separat.",
    ],
    useCases: [
      "Închideri de terasă sau foișor unde se preferă un sistem tip fermoar, fără capse vizibile.",
      "Panouri demontate frecvent, unde deschiderea rapidă contează.",
    ],
    specs: [{ label: "Lungime", value: "3 m" }],
  },
  {
    slug: "fermoar-lipire-metraj",
    categorySlug: "accesorii",
    name: "Fermoar pentru lipire – metraj, pentru închidere terasă, foișor, balcon",
    shortDescription:
      "Fermoar de lipit la metraj, în două culori — pentru proiecte personalizate, tăiat exact pe lungimea necesară.",
    price: 23.49,
    priceBeforeDiscount: 23.49,
    priceUnit: "RON / m liniar (TVA inclus)",
    unitLabel: "metru liniar",
    thicknesses: [],
    widths: [],
    lengths: ["la metru"],
    sku: "FRMMETRAJ",
    weight: "0.2 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "la metru", price: 23.49 }],
    colors: [
      { name: "Alb", skuSuffix: "ALB" },
      { name: "Negru", skuSuffix: "NEGRU" },
    ],
    images: [
      "/products/accesorii-catalog/31.jpg",
      "/products/accesorii-catalog/32.jpg",
      "/products/accesorii-catalog/33.jpg",
    ],
    description: [
      "Fermoar de lipit vândut la metraj, pentru aplicații personalizate pe prelate PVC, copertine, corturi sau folie transparentă — tăiat exact pe lungimea necesară, fără pierderi de material.",
      "Se aplică prin lipire cu aer cald sau cu adezivul special pentru prelată PVC. Cursorii se achiziționează separat și nu sunt incluși în preț.",
    ],
    useCases: [
      "Reparații sau proiecte personalizate unde lungimea standard de 3 m nu se potrivește.",
      "Aplicații industriale ușoare pe prelate sau folii PVC.",
    ],
    specs: [{ label: "Vânzare", value: "La metraj, tăiat pe comandă" }],
  },
  {
    slug: "capse-rotunde-d10mm-1000buc",
    categorySlug: "accesorii",
    name: "Capse rotunde D10 mm - 1000 bucăți",
    shortDescription:
      "Capse rotunde cu șaibă, diametru 10 mm, pungă de 1000 bucăți, tratate anticoroziv.",
    price: 178.96,
    priceBeforeDiscount: 178.96,
    priceUnit: "RON / pungă (TVA inclus)",
    unitLabel: "pungă",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "CR101000",
    weight: "1.9 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 178.96, sku: "CR101000" }],
    images: [
      "/products/accesorii-catalog/34.jpg",
      "/products/accesorii-catalog/35.jpg",
    ],
    description: [
      "Capse rotunde cu șaibă, diametru 10 mm, dintr-un material rezistent, tratat anticoroziv și anti-oxidare — pentru fixarea prelatelor și a foliei transparente întărite cu bandă de tiv.",
      "Pungă de 1000 de bucăți, potrivită pentru utilizare intensă: prelate de camion, corturi, acoperiri industriale sau agricole, protecție solară.",
    ],
    useCases: [
      "Fixarea prelatelor PVC și a foliei transparente, pe marginea întărită cu bandă de tiv.",
      "Proiecte cu consum mare de capse (montaje profesionale, suprafețe mari).",
    ],
    specs: [{ label: "Diametru", value: "10 mm" }],
  },
  {
    slug: "capse-rotunde-d12mm-1000buc",
    categorySlug: "accesorii",
    name: "Capse rotunde D12 mm - 1000 bucăți",
    shortDescription:
      "Capse rotunde cu șaibă, diametru 12 mm, pungă de 1000 bucăți, tratate anticoroziv.",
    price: 206.92,
    priceBeforeDiscount: 206.92,
    priceUnit: "RON / pungă (TVA inclus)",
    unitLabel: "pungă",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "CR121000",
    weight: "2.78 kg",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 206.92, sku: "CR121000" }],
    images: [
      "/products/accesorii-catalog/36.jpg",
      "/products/accesorii-catalog/37.jpg",
    ],
    description: [
      "Capse rotunde cu șaibă, diametru 12 mm, dintr-un material rezistent, tratat anticoroziv și anti-oxidare — pentru fixarea prelatelor și a foliei transparente întărite cu bandă de tiv.",
      "Pungă de 1000 de bucăți, potrivită pentru utilizare intensă: prelate de camion, corturi, acoperiri industriale sau agricole, protecție solară.",
    ],
    useCases: [
      "Fixarea prelatelor PVC și a foliei transparente, pe marginea întărită cu bandă de tiv, pentru materiale mai groase decât la D10.",
      "Proiecte cu consum mare de capse (montaje profesionale, suprafețe mari).",
    ],
    specs: [{ label: "Diametru", value: "12 mm" }],
  },
  {
    slug: "cursor-fermoar-lipire",
    categorySlug: "accesorii",
    name: "Cursor pentru fermoar de lipit",
    shortDescription:
      "Cursor de schimb pentru fermoarele de lipit folosite la închiderea teraselor cu folie transparentă.",
    price: 11.85,
    priceBeforeDiscount: 11.85,
    priceUnit: "RON / bucată (TVA inclus)",
    unitLabel: "bucată",
    thicknesses: [],
    widths: [],
    lengths: [],
    sku: "CURSORFRM",
    hasCart: true,
    variants: [{ thickness: "", width: "", length: "", price: 11.85, sku: "CURSORFRM" }],
    images: ["/products/accesorii-catalog/38.jpg"],
    description: [
      "Cursor pentru fermoarele de lipit (la bucată sau la metraj) folosite la închiderea teraselor, foișoarelor și balcoanelor cu folie transparentă — asigură o glisare ușoară și fără blocaje.",
      "Construit din metal rezistent sau plastic de calitate, rezistent la coroziune și potrivit pentru utilizare exterioară îndelungată.",
    ],
    useCases: [
      "Înlocuirea unui cursor uzat sau deteriorat pe un fermoar de lipit deja montat.",
      "Completarea unui fermoar la metraj, care nu vine cu cursor inclus.",
    ],
    specs: [{ label: "Compatibilitate", value: "Fermoare de lipit pentru folie transparentă" }],
  },
  {
    slug: "banda-cu-scai-5cm-25m",
    categorySlug: "accesorii",
    name: "Bandă cu scai (sistem de prindere cârlig și buclă) – 5 cm × 25 ml",
    shortDescription:
      "Bandă autogripantă (scai) profesională, lățime 5 cm, rolă de 25 m, pentru prinderi rapide și refolosibile.",
    price: 409.0,
    priceBeforeDiscount: 409.0,
    priceUnit: "RON / rolă (TVA inclus)",
    unitLabel: "rolă",
    thicknesses: [],
    widths: ["5 cm"],
    lengths: ["25 m"],
    sku: "BSCAI525",
    hasCart: true,
    variants: [{ thickness: "", width: "5 cm", length: "25 m", price: 409.0, sku: "BSCAI525" }],
    images: ["/products/accesorii-catalog/39.jpg"],
    description: [
      "Bandă autogripantă (sistem cârlig și buclă), lățime 5 cm, rolă de 25 m — pentru prinderi rapide și refolosibile pe prelate, copertine, folii PVC transparente și sisteme de protecție solară, fără unelte suplimentare.",
      "Varianta afișată aici e cu bandă adezivă (peel & stick): se îndepărtează folia protectoare și se lipește direct pe suprafețe curate și degresate. Furnizorul o are disponibilă și în variantă termosudabilă (se aplică prin sudură termică sau înaltă frecvență), la același preț — precizați la comandă dacă preferiți această variantă.",
      "Rezistentă la umiditate, raze UV și variații de temperatură; suportă multe cicluri de prindere/desprindere fără pierderea aderenței.",
    ],
    useCases: [
      "Închideri demontate frecvent, unde capsele sau fermoarele nu sunt practice.",
      "Fixare rapidă pe prelate, copertine sau perdele de terasă.",
    ],
    specs: [{ label: "Tip prindere", value: "Cu adeziv (disponibilă și termosudabilă, la același preț)" }],
  },
];
