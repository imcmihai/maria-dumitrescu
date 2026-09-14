# Brief — rafinament vizual masiv, nivel Awwwwards

## Context

Site-ul (Next.js + Tailwind) al Mariei Dumitrescu, psiholog/psihoterapeut, are deja:
- un sistem de design documentat în [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) ("Câmp deschis") — tokens de culoare, tipografie, spațiere, componente și pattern-uri;
- conținutul sursă al clientei în [`structura-website-psiholog.md`](structura-website-psiholog.md);
- textele deja adaptate/structurate pentru web în [`lib/site.ts`](lib/site.ts);
- componentele Home în `components/`: `hero.tsx`, `story.tsx`, `client-portraits.tsx`, `what-is-therapy.tsx`, `services.tsx`, `session-flow.tsx`, `approach.tsx` (existentă dar dezactivată în `app/page.tsx`), `site-header.tsx`.

**Diagnostic actual:** design-ul e corect din punct de vedere al sistemului (paletă, fonturi, componente), dar percepția e de site "bland", dominat de text fără structură vizuală puternică. Execuția e prea safe pentru conținutul foarte personal (poveste de viață, vulnerabilitate, încredere) pe care îl are pagina.

## Obiectiv

Du designul actual la un nivel de **rafinament de agenție / candidat Awwwwards**, păstrând identitatea vizuală existentă. Nu e un rebrand — e o trecere de la "corect" la "memorabil".

## Ce rămâne neschimbat (constrângeri dure)

- **Paleta de culori** exact ca în `DESIGN-SYSTEM.md` §1.1 (crem `#fdfbef`, bej `#f0ebcc`, verde măsliniu `#5c6c02`, cerneală `#484343`). Nu se introduc culori noi.
- **Fonturile**: Helvetica Neue pentru tot corpul de text/UI, Playfair Display doar pentru titluri/cifre mari/accente `<em>`. Nu se schimbă familiile de fonturi.
- **Tonul minimalist, calm, "spațiu de respirat"** — potrivit unui cabinet de psihoterapie. Rafinamentul înseamnă precizie și detaliu de craft, **nu** maximalism, nu culori/forme stridente, nu animații jucăușe/gimmick.
- Structura de date din `lib/site.ts` (conținutul deja aprobat) rămâne sursa de adevăr pentru text; unde lipsește conținut nou (testimoniale, acreditări) se preia din `structura-website-psiholog.md`.

## Unde trebuie să se ridice nivelul (rafinament, nu concept nou)

1. **Ierarhie tipografică mai îndrăzneață** — variație mai mare de scară între eyebrow/H1/H2/body, folosește `.display-1`/`.display-2` din sistem mai expresiv, nu totul la aceeași "temperatură" vizuală. Titlurile de secțiune să aibă prezență, nu doar text centrat mediu.
2. **Layout editorial, nu blocuri centrate repetitive** — introdu asimetrie controlată: text offset față de imagine, coloane inegale, elemente care ies din grid (overflow controlat), citate mari plasate ca obiecte grafice (nu doar paragraf cu ghilimele). Evită pattern-ul "eyebrow + H2 centrat + grid de carduri" repetat identic la fiecare secțiune — vezi `DESIGN-SYSTEM.md` §3.3, care e valid dar prea uniform aplicat.
3. **Ritm de scroll** — fiecare secțiune trebuie să se simtă diferit ca densitate/compoziție de cea de dinainte (una foto-dominantă, una tipografic-dominantă, una densă cu carduri, una aerisită cu un singur citat). Acum toate secțiunile "cad" la fel.
4. **Micro-interacțiuni de calitate** — reveal-uri la scroll cu stagger pe elemente (nu doar fade+translate pe bloc întreg), hover states mai rafinate pe carduri/butoane, tranziții fine pe imagini (scale discret la hover/scroll), eventual magnetic button pe CTA-ul principal. Respectă `prefers-reduced-motion` (deja în sistem, §1.6).
5. **Tratament foto** — fotografiile (portret Maria, peisaj) să nu stea doar "puse în cadru rotunjit". Explorează crop-uri mai îndrăznețe, straturi (text care intersectează foto), poate un ton duoton discret pe olive pentru imaginile de atmosferă, consistent cu paleta.
6. **Detaliu de craft** — cursor custom discret, scrollbar stilizat, `::selection` (deja definit ca `--color-accent-bright`, verifică că se simte intenționat peste tot), numerotare/index vizual pe secțiuni (`01 / 02 / 03`) în stil Playfair, linii/diviziuni desenate, nu doar borduri CSS standard.
7. **Consistență de execuție** — auditează fiecare componentă existentă față de `DESIGN-SYSTEM.md` (radius, umbre, spațiere) și repară inconsistențele, dar cu libertate de a **extinde** sistemul (pattern-uri noi de secțiune) dacă rafinamentul o cere — actualizează `DESIGN-SYSTEM.md` cu orice pattern nou introdus.

## Secțiuni noi necesare pe Home

Home-ul actual (`app/page.tsx`) are: Hero → Story → ClientPortraits → WhatIsTherapy → Services → SessionFlow. Lipsesc, comparat cu conținutul clientei din `structura-website-psiholog.md`:

1. **Testimoniale / Recomandări** — există 3 recomandări complete în `structura-website-psiholog.md` §5, neintroduse încă în `lib/site.ts`. E probă socială esențială înainte de decizie; ar trebui să vină spre finalul paginii, aproape de CTA. Tratează-le ca obiect vizual (citate mari, nu carduri mici de review).
2. **Acreditări / încredere** — Colegiul Psihologilor din România, Asociația de Psihoterapia Integrativă, formările enumerate în `structura-website-psiholog.md` §2. Recomandarea clientei explicit: secțiune compactă, discretă (ex. accordion sau bandă orizontală), să nu întrerupă fluxul emoțional — nu trebuie să domine pagina, dar trebuie să existe undeva pe Home.
3. **CTA final** — secțiune de închidere dedicată, înainte de footer, cu îndemn clar spre programare (nu doar butonul din header/hero).
4. **Footer** — nu există deloc în cod momentan (`components/` nu are `footer.tsx`). Necesar: adresă, contact, program, nav secundar, eventual link WhatsApp — toate datele există deja în `site` din `lib/site.ts`.
5. **Decide și integrarea `Approach`** — componenta există dar e dezactivată în `app/page.tsx`. Evaluează dacă intră în noua compoziție a paginii (conținutul despre metodele terapeutice e valoros pentru decizie) sau rămâne doar pe pagina de servicii — dar ia decizia explicit, nu o lăsa comentată din inerție.

## Ce să NU facă

- Nu schimba paleta, fonturile, sau tonul (evită orice ar face site-ul să pară "startup tech" sau "agenție creativă" în loc de cabinet de terapie).
- Nu adăuga animații/efecte care distrag de la conținut (parallax greu, elemente care sar, sunet).
- Nu rescrie conținutul aprobat din `lib/site.ts` — poate reformula minor pentru layout (ex. scurtare pentru un citat mare), dar sensul și vocea rămân neschimbate.
- Nu ignora `DESIGN-SYSTEM.md` — extinde-l, nu-l contrazice; orice pattern nou introdus se documentează acolo.
- Nu sacrifica accesibilitatea (contrast, `aria-label`, `alt`, focus states) pentru efect vizual — regulile din §5 din `DESIGN-SYSTEM.md` rămân valabile.

## Livrabil așteptat

O reproiectare vizuală completă a paginii Home (componentele existente rafinate + secțiunile noi de mai sus), cu `DESIGN-SYSTEM.md` actualizat pentru orice pattern nou, păstrând identitatea "Câmp deschis" dar cu un nivel de execuție de portofoliu premium.
