# Brief de construcție — mariadumitrescu.ro (redesign)

Acest document e sursa unică de adevăr pentru construirea noului website al Mariei Dumitrescu, psiholog & psihoterapeut în București. Conține poziționarea, sitemap-ul, conținutul complet pe pagini și sistemul de design (Direcția C, confirmată). Imaginile sunt placeholder deliberat — se generează într-o etapă separată, după ce structura și conținutul sunt funcționale.

## 0. Context strategic (de ce arată așa site-ul)

Maria lucrează în principal cu tineri de **18–26 de ani** — atât studenți, cât și oameni care au terminat facultatea de câțiva ani și navighează primii ani de independență/carieră. Din analiza a 8 competitori din București (cabinete de psihologie cu practică privată), **niciunul nu se poziționează explicit pe acest segment** — toți vorbesc generic despre „adulți”. Asta e principalul avantaj de poziționare al noului site și motivul pentru care apare o pagină dedicată „Pentru cine sunt aici” în sitemap.

Reguli de ton, valabile pe tot site-ul:
- Adresare directă, la persoana a II-a („tu”), conversațională, fără jargon clinic.
- Normalizează decizia de a cere ajutor — nu presupune că vizitatorul știe deja ce vrea sau ce simte.
- Nișa e o **etapă de viață (18-26 ani)**, nu un „statut de student” — copy-ul nu trebuie să sune ca și cum s-ar adresa doar celor din facultate.
- Zero cifre sau afirmații fabricate. Orice cifră marcată `[DE COMPLETAT]` mai jos trebuie confirmată de Maria înainte de publicare — nu se inventează.

---

## 1. Sitemap

| # | Pagină | Scop |
|---|--------|------|
| 1 | Acasă | Conversie în <30 secunde — poziționare + încredere + CTA |
| 2 | Despre Maria | Credibilitate + conexiune emoțională |
| 3 | Pentru cine sunt aici | Pagină nouă, strategică — singurul loc unde nișa e explicită |
| 4 | Servicii (hub) | Cards → 4 pagini dedicate |
| 4a | Servicii / Terapie individuală | Text unic |
| 4b | Servicii / Terapie de cuplu | Text unic |
| 4c | Servicii / Terapie de familie | Text unic |
| 4d | Servicii / Terapie de grup | Text unic |
| 5 | Tarife | Transparență + pachete |
| 6 | Resurse | Ghid gratuit + meditații ghidate (lead capture) |
| 7 | Blog | SEO + autoritate |
| 8 | Contact | Formular + telefon + WhatsApp + hartă |

**Notă:** nu construim o pagină „Testimoniale” separată la lansare — cea de pe site-ul vechi avea conținut placeholder (același text fals repetat de 3 ori). Recenziile reale merg direct pe Acasă printr-un widget, când Maria are 6-8 recenzii adunate. Pagina dedicată se adaugă ulterior.

Navigație principală recomandată: `Despre mine · Pentru cine sunt aici · Servicii · Tarife · Resurse · Blog` + buton CTA distinct „Programează-te” în header, peste tot.

---

## 2. Sistem de design — Direcția C („Teren comun”)

### Culori

```
--bg:        #F3EFDD   /* fundal crem cald — folosit pe majoritatea paginii */
--surface:   #FFFDF6   /* fundal carduri/elemente ridicate */
--ink:       #20281F   /* text principal */
--ink-soft:  #516049   /* text secundar, descrieri */
--deep:      #23402F   /* verde adânc — hero, header/nav, footer, butoane primare */
--deep-text: #FDFAF0   /* text pe fundal verde */
--accent:    #C79A3D   /* auriu/muștar — cifre, eyebrow-uri, highlight-uri, hover */
--line:      rgba(35,64,47,0.12)  /* borduri subtile pe carduri */
```

Regulă de contrast: text pe `--deep` e mereu `--deep-text` sau `--accent`, niciodată `--ink`.

### Tipografie

Import Google Fonts:
```
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&family=Sora:wght@400..800&family=JetBrains+Mono:wght@400;500;600&display=swap
```

- **Newsreader** (serif) — toate titlurile (H1-H4), greutate 600, uneori italic pentru accent punctual. Warm, clasic, profesionist — nu decorativ.
- **Sora** (sans) — tot corpul de text, butoane, navigare. Greutăți 400 (text), 600 (butoane/labels), 700-800 (numere mari în carduri).
- **JetBrains Mono** — doar pentru: eyebrow-uri (etichete mici uppercase deasupra titlurilor), etichete de statistici, prețuri afișate ca „cifră”.

Scală tip recomandată: H1 clamp(32px, 4.5vw, 52px) · H2 ~32px · H3 ~22px · body 17-18px · caption/mono 12-13px.

### Formă & componente

- **Cadre foto arcuite** — motivul vizual central. `border-radius: 50% 50% 8px 8px` aplicat pe un container cu `aspect-ratio` vertical (portret) — colțurile de sus complet rotunjite (arcadă), cele de jos aproape drepte. Folosit pentru orice fotografie de persoană (Maria, pozele din „Pentru cine sunt aici”).
- **Butoane primare**: fundal `--deep`, text `--deep-text`, `border-radius: 100px` (pill), padding generos (14px 28px).
- **Butoane secundare**: transparent, border 1.5px `--deep` (sau `--deep-text` pe fundal verde), aceeași formă pill.
- **Carduri** (servicii, beneficii): fundal `--surface`, `border-radius: 16px`, border 1px `--line`, fără umbre puternice — flat, curat.
- **Bară de statistici**: 3 cifre alăturate, cifra în Newsreader + `--accent`, eticheta dedesubt în JetBrains Mono mic, pe fundal `--deep` (de obicei lângă poza din hero).
- Evită complet: colțuri drepte agresive, umbre grele, gradient-uri decorative fără sens.

---

## 3. Conținut pe pagini

Peste tot unde apare `[DE COMPLETAT]`, valoarea trebuie confirmată de Maria înainte de lansare — nu se inventează cifre.

### 3.1 — Acasă

**Hero**
- Eyebrow: `PSIHOLOG & PSIHOTERAPEUT · BUCUREȘTI`
- H1: **„Terapie pentru anii în care parcă totul trebuie decis deja”**
- Subheadline: „Lucrez cu tineri de 18–26 de ani — încă în facultate sau la primii ani de carieră — care simt presiunea de a avea totul clar: ce carieră, ce relații, cine sunt. Găsim claritate împreună, în ritmul tău.”
- CTA primar: „Programează o ședință” · CTA secundar: „Scrie-mi pe WhatsApp”
- Bară de cifre: `[DE COMPLETAT] ani experiență` · `[DE COMPLETAT]+ ședințe susținute` · `Sector 4 & online`
- Imagine: portret Maria (cadru arcuit) — vezi §4.

**Secțiune — „Te regăsești aici?”**
- H2: „Dacă simți că...”
- Listă conversațională (4-5 rânduri, nu bullet clinic):
  - „...toată lumea din jur pare să știe încotro se îndreaptă, mai puțin tu”
  - „...faci tot ce «trebuie» — facultate, job, relații — dar tot simți un gol”
  - „...anxietatea de dinainte de facultate nu s-a oprit când ai luat diploma”
  - „...vrei să vorbești cu cineva, dar nu știi dacă «e suficient de gravă» problema ta”
- CTA: „Vezi cum te pot ajuta →” (link spre „Pentru cine sunt aici”)

**Secțiune — Servicii pe scurt**
- H2: „Cum putem lucra împreună”
- 4 carduri, fiecare cu titlu + 1 propoziție + preț de pornire + link spre pagina dedicată:
  - **Terapie individuală** — „Ședințe 1-la-1, axate pe tine.” — de la 200 RON
  - **Terapie de cuplu** — „Pentru cuplurile tinere care navighează prima locuință împreună sau distanța.” — de la `[DE COMPLETAT]`
  - **Terapie de familie** — „Pentru momentele în care relația cu părinții are nevoie de un spațiu neutru.” — de la 300 RON
  - **Terapie de grup** — „Un grup de 8-12 tineri care trec prin lucruri similare.” — de la `[DE COMPLETAT]`

**Secțiune — Despre Maria (teaser)**
- H2: „Cine sunt eu”
- Copy: 2-3 propoziții din poveste (vezi §3.2) + „Citește povestea completă →”

**Secțiune — Prima ședință**
- H2: „Nu trebuie să știi exact ce simți ca să începi”
- Copy: normalizare + ce se întâmplă concret (durată 50 min, confidențialitate, ce se discută)
- CTA: „Programează prima ședință”

**Secțiune — Recenzii** *(se activează doar după ce Maria are 6-8 recenzii reale colectate)*
- H2: „Ce spun cei cu care am lucrat”
- Widget cu recenzii reale (Google), nume reale

**Secțiune — Resurse gratuite**
- H2: „Un prim pas, fără presiune”
- Copy: prezentare ghid gratuit PDF + meditații ghidate. Formular de email pentru download (NU link direct — construiește listă de contacte).

**CTA final**
- H2: „Fă primul pas”
- Telefon, WhatsApp, adresă, hartă cu metroul apropiat

---

### 3.2 — Despre Maria

**Hero**: H1 „Cine sunt eu” · Sub: „Psiholog, psihoterapeut de formare integrativă, consilier vocațional.”

**Secțiune — Povestea mea** (păstrată din site-ul actual, e un punct forte real):
> M-am intersectat cu psihoterapia pentru prima dată când aveam 18 ani. Urma să susțin examenul de bacalaureat și simțeam o anxietate de performanță copleșitoare. [...] Am încheiat un angajament cu psihoterapeutul în urma căruia am învățat să mă iubesc și să mă accept. Mi-a rămas întipărită dorința de a ajuta la rândul meu alte persoane, de a le călăuzi pașii în acest proces.

*(Text complet de preluat/rescris ușor din pagina „Despre” a site-ului actual — narațiunea rămâne, doar clarificată.)*

**Secțiune — Formare & acreditări** (listă vizuală, nu text mic de footer):
- Membru al Colegiului Psihologilor din România
- Licențiată în Psihologie, Universitatea din București
- `[DE COMPLETAT — masterat/formări specifice]`
- Formare în terapie integrativă / Gestalt / CBT

**Secțiune — Cum lucrez**: explicație pe limbaj accesibil (nu jargon) a metodei terapeutice, ce înseamnă practic o ședință cu ea.

CTA final: „Hai să vorbim” → Contact

---

### 3.3 — Pentru cine sunt aici

**Hero**: H1 „Pentru cine sunt aici” · Sub: „Lucrez în principal cu tineri între 18 și 26 de ani — fie că ești încă în facultate, fie că ai terminat-o de câțiva ani și încă îți dai seama ce urmează.”

5 secțiuni tematice (titlu + 2-3 propoziții fiecare):

1. **Presiune academică & anxietate de performanță** — examene, note, frica de eșec, comparație cu colegii.
2. **Tranziția facultate → carieră** — primul job, sindromul impostorului, „ce fac cu diploma asta”.
3. **Relații & independență** — prima relație serioasă, coabitare, distanțarea firească de prietenii din liceu/facultate.
4. **Presiune financiară & de familie** — așteptările părinților, independența financiară, vinovăția de „a nu fi acolo unde ar trebui”.
5. **Cine ești, dincolo de așteptări** — identitate, valori proprii vs. presiune socială și social media.

CTA final: „Recunoști ceva din toate astea? Hai să vorbim.” → Contact

---

### 3.4 — Servicii (hub) + 4 subpagini

**Hub**: H1 „Cum te pot ajuta” + intro scurt + 4 carduri linkate.

**4a. Terapie individuală**
- Ce este: „Ședințe 1-la-1, axate pe tine — pe ce trăiești acum, nu pe un tipar general.”
- Pentru cine: „Dacă vrei un spațiu doar al tău, fără presiunea de a-l împărți cu altcineva.”
- Format: 50 min, fizic (Sector 4) sau online
- Preț: de la 200 RON/ședință · Abonament 1.600 RON/10 ședințe
- CTA: „Programează o ședință individuală”

**4b. Terapie de cuplu**
- Ce este: „Pentru cuplurile tinere care navighează prima locuință împreună, decizii despre viitor sau distanța fizică (relații la distanță, diaspora).”
- Pentru cine: cupluri care vor un spațiu neutru de dialog
- Format: 50 min, fizic sau online
- Preț: `[DE COMPLETAT — lipsă pe site-ul actual]`
- CTA: „Programează o ședință de cuplu”

**4c. Terapie de familie**
- Ce este: „Pentru momentele în care relația cu părinții are nevoie de un spațiu neutru — mai ales când independența ta le schimbă și lor regulile jocului.”
- Format: 50 min, fizic sau online
- Preț: de la 300 RON/ședință
- CTA: „Programează o ședință de familie”

**4d. Terapie de grup**
- Ce este: „Un grup de 8-12 tineri care trec prin lucruri similare. Uneori cel mai vindecător lucru e să afli că nu ești singurul/a.”
- Format: ședințe de grup, frecvență `[DE COMPLETAT]`
- Preț: `[DE COMPLETAT — lipsă pe site-ul actual]`
- CTA: „Cere detalii despre grupul curent”

---

### 3.5 — Tarife

- H1: „Tarife” · Sub: „Transparență de la primul click.”
- Tabel complet cu toate cele 4 tipuri de terapie (toate prețurile, nu doar 2 din 4 ca acum) + pachetul de 10 ședințe la preț redus.
- **Idee de diferențiere recomandată**: tarif redus cu carnet de student — semnal de nișă puternic, greu de copiat de competitorii generaliști.
- Secțiune politici: reprogramare (cu câte zile lucrătoare înainte), anulare, modalități de plată — clar, fără scris mic.

---

### 3.6 — Resurse

- H1: „Resurse gratuite, fără programare”
- **Ghid gratuit** — „Ce se întâmplă la prima ședință” (PDF-ul existent) — în spatele unui formular de email, nu link direct.
- **Meditații ghidate** — playlist embed (Spotify/YouTube): Anxietate, Încredere în sine, Depresie (păstrate din site-ul actual).
- **Opțional**: mini-quiz non-clinic „Ai nevoie de cineva cu care să vorbești?” (5 întrebări, rezultat blând, CTA de programare la final).

---

### 3.7 — Blog

- H1: „Blog” · Categorii: Facultate & anxietate · Primul job · Relații · Familie · Autocunoaștere
- 10 titluri de pornire (long-tail SEO, pentru 18-26 ani, nu generice):
  1. Anxietatea de examen nu dispare la absolvire — iată ce se întâmplă de fapt
  2. Sindromul impostorului la primul job: de ce te simți un fraudator
  3. Cum știi dacă ai nevoie de terapie la 22 de ani
  4. De ce nu știi ce vrei de la viață la 25 de ani (și de ce e normal)
  5. Relație la distanță în facultate: cum supraviețuiește
  6. Vinovăția de a te muta departe de părinți
  7. Ce e burnout-ul academic și cum se deosebește de „oboseală”
  8. Comparația pe social media: cum îți sabotează stima de sine la 20 de ani
  9. Primul job toxic: cum recunoști și cum pleci fără să te simți vinovat/ă
  10. Terapie online vs. la cabinet: ce e potrivit pentru tine

---

### 3.8 — Contact

- H1: „Hai să vorbim”
- Formular scurt: nume, email/telefon, mesaj opțional (cât mai puține câmpuri)
- Contact direct: telefon clickabil, buton WhatsApp, adresă (Str. Albă, Nr. 12, Sector 4, București), program
- Hartă cu stația de metrou apropiată marcată explicit

---

## 4. Plan de imagini (placeholder acum, generate ulterior)

Fiecare imagine trebuie inserată ca placeholder cu un comentariu/etichetă descriptivă, ca să poată fi înlocuită ulterior fără să se piardă intenția. Format recomandat pentru fiecare placeholder:

```html
<!-- IMG: [id-unic] | [tip: portret/lifestyle/iconiță] | [cadru: arcuit/liber] | [brief] -->
```

Listă de imagini necesare:

| ID | Pagină | Tip | Cadru | Brief |
|---|---|---|---|---|
| `hero-maria` | Acasă | Portret | Arcuit | Maria, lumină naturală, cadru relaxat, privire caldă spre cameră |
| `regasesti-aici` | Acasă | Lifestyle | Liber | Tânăr/ă 23-25 ani, cadru urban București (cafenea/metrou/birou), mood introspectiv, natural |
| `despre-teaser` | Acasă | Portret secundar | Arcuit | Maria, candid, cabinet sau birou |
| `prima-sedinta` | Acasă | Detaliu | Liber | Fotoliu gol, luminos, cadru cald |
| `ghid-mockup` | Acasă / Resurse | Grafică | — | Mockup copertă ghid PDF, design grafic simplu |
| `despre-hero` | Despre | Portret mare | Arcuit | Maria, format vertical |
| `despre-poveste` | Despre | Candid | Liber | Detaliu simbolic (jurnal, birou) sau semnătură stilizată |
| `despre-cabinet` | Despre | Interior | Liber | Cadru larg în cabinet |
| `nisa-academic` | Pentru cine | Lifestyle | Liber | Studiu/bibliotecă, autentic |
| `nisa-cariera` | Pentru cine | Lifestyle | Liber | Birou/spațiu de lucru, primul job |
| `nisa-relatii` | Pentru cine | Lifestyle | Liber | Doi tineri, cadru cald, non-pozat |
| `nisa-familie` | Pentru cine | Lifestyle | Liber | Cadru domestic, prima locuință proprie |
| `nisa-identitate` | Pentru cine | Portret | Liber | Portret reflexiv, natural |
| `icon-individuala`, `icon-cuplu`, `icon-familie`, `icon-grup` | Servicii | Iconițe | — | Set de 4 iconițe de linie, stil coerent (nu foto, nu emoji) |

Toate portretele/foto-urile de persoane folosesc cadrul arcuit definit în §2. Fotografiile lifestyle (nu portrete) pot rămâne libere (dreptunghi rotunjit 16px).

---

## 5. Ce lipsește și trebuie confirmat de Maria înainte de lansare

- [ ] Ani de experiență (pentru bara de cifre)
- [ ] Număr aproximativ de ședințe susținute / clienți
- [ ] Preț terapie de cuplu
- [ ] Preț terapie de grup
- [ ] Detalii masterat/formări pentru pagina Despre
- [ ] Frecvența grupului de terapie
- [ ] 6-8 recenzii reale ale clienților (nume + text, cu acordul lor) înainte de a activa secțiunea de recenzii
- [ ] Decizie: aplicăm sau nu tariful redus pentru studenți cu carnet

## 6. Funcțional (nu doar vizual)

- Buton WhatsApp vizibil permanent (mobil + desktop), nu doar în footer.
- CTA principal „Programează o ședință” identic peste tot (nu variante multiple ca pe site-ul vechi — „CHAT PROGRAMĂRI”, „VEZI SERVICIILE” etc.).
- Formular de download pentru ghidul gratuit — capturează email înainte de link (față de linkul direct de acum).
- Fiecare pagină de serviciu (4a-4d) pe URL propriu, cu title tag unic (SEO), nu conținut duplicat.
- Title tag general recomandat: „Psiholog pentru Tineri (18-26 ani) București — Maria Dumitrescu”.
