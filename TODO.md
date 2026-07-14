# TODO — Folii Timișoara

Acest fișier e jurnalul proiectului. La reluarea conversației, citește-l
primul ca să știi exact unde am rămas.

## Proiect
- **Repo**: https://github.com/santoby13-dev/folii-timisoara
- **Live**: https://folii-timisoara.vercel.app (deploy automat la fiecare push pe `master`)
- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS, deploy pe Vercel
- **Business**: unchiul lui Toby, partener autorizat al foliepvctransparenta.ro (Covertex SRL / Cristal Flex®), vinde aceleași produse la prețuri mai bune
- **Contact site**: +40 729 768 521 · szabojo90@gmail.com
- **Nume firmă**: "Folii Timișoara" — provizoriu, se schimbă la final

## ✅ Făcut
- Repo GitHub + proiect Next.js scaffolduit, deploy Vercel conectat (auto-deploy pe push)
- Structură categorii: `/produse` (index) → `/produse/[categorie]` → `/produse/[categorie]/[produs]`
  - Categorii: **Folii transparente pentru terase** (activă), Prelate din PVC, Accesorii, Scule (toate 3 „în curând”)
- Primul produs real: **Folie transparentă Cristal Flex®**
  - 23 de variante reale (grosime × lățime × lungime) cu prețuri exacte extrase din catalogul sursă, în `lib/folie-variants.ts`
  - Galerie foto (5 imagini originale, ordine păstrată) — orizontală, centrată deasupra textului
  - Selectoare dropdown (grosime/lățime/lungime) cu iconițe, preselectate implicit pe varianta cea mai ieftină
- **Coș de cumpărături**: persistă în localStorage, iconiță cu contor în header, pagină `/cos`
- **Plasare comandă** (`/comanda`): formular Nume/Telefon/Email/Adresă → salvează comanda ca rând nou în Google Sheets via `app/api/comanda/route.ts` + `lib/google-sheets.ts`
- **Header responsive**:
  - Desktop: logo stânga, dropdown "Produse" + Despre noi + Contact centru, coș dreapta
  - Mobil: buton `>`/`<` stânga (deschide/închide meniu secundar cu un singur link "Produse", Despre noi, Contact, telefon), titlu centrat, coș dreapta

## 🔲 De făcut (în ordinea probabilă)

### 1. Configurare Google Sheets (blocant pentru comenzi funcționale — vezi ghidul trimis în chat)
- [ ] Creat tabel Google Sheets cu tab „Comenzi” și header-ele corecte
- [ ] Creat Service Account în Google Cloud Console + activat Sheets API
- [ ] Descărcat cheia JSON, dat Share pe tabel către emailul service account-ului
- [ ] Variabile de mediu setate pe Vercel (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`) + `.env.local` local
- [ ] Testată o comandă reală cap-coadă (coș → comandă → apare în Sheets)

### 2. Produse
- [ ] Populat categoria **Prelate din PVC** (produse + prețuri + poze, ca la folie)
- [ ] Populat categoria **Accesorii**
- [ ] Populat categoria **Scule**
- [ ] Verificat/actualizat prețurile foliei când vine oferta reală de la furnizor (unchiul stabilește marja)

### 3. Alte îmbunătățiri posibile (neprogramate încă, doar idei)
- [ ] Domeniu propriu (ex. foliitimisoara.ro) în loc de `.vercel.app`
- [ ] Email de confirmare automat către client (necesită domeniu propriu + Resend, sau parolă de aplicație Gmail — decis să se amâne)
- [ ] Redenumire firmă/site când se stabilește numele final
- [ ] Pagină „Despre noi” cu conținut real (acum e doar o secțiune scurtă pe homepage)

## Note importante
- Nu am copiat recenziile clienților de pe site-ul sursă (conținut al altor persoane)
- Prețurile foliei sunt reale, extrase din catalogul furnizorului (iul. 2026) — de reactualizat manual în `lib/folie-variants.ts` când se schimbă
- Vercel nu are filesystem persistent — de-aia comenzile merg în Google Sheets, nu într-un fișier local
