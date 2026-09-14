# Sistem de design — „Câmp deschis”

Sursa unică de adevăr pentru construirea site-ului (psiholog, practică privată —
ton cald, natură, spațiu de respirat). Tokenele trăiesc în
[`app/globals.css`](app/globals.css); fonturile în [`app/layout.tsx`](app/layout.tsx).
Nu se scriu valori px/hex punctuale în markup — totul trece prin token sau clasă
utilitară.

Ediția curentă documentează și **rafinamentul „editorial”** al paginii Acasă:
ierarhie tipografică pe scara `.headline-*`, antete de secțiune numerotate,
layout asimetric pe 12 coloane, reveal-uri pe cuvinte și în trepte, cursor și
scrollbar custom, duoton pe imaginile de atmosferă. Identitatea (paletă, fonturi,
ton) nu s-a schimbat.

---

## 1. Design tokens

### 1.1 Culori

Cele 4 culori de bază vin din brief-ul clientului. Restul sunt derivate calde,
pe aceeași temperatură (nu griuri neutre). **Nu se introduc culori noi.**

| Token | Valoare | Rol |
|---|---|---|
| `--color-bg` | `#fdfbef` | Fundal de pagină — crem cald. Fundalul implicit al aproape tuturor secțiunilor. |
| `--color-surface` | `#ffffff` | Alb pur — doar rame foto și carduri plutitoare („polaroid”). |
| `--color-panel` | `#f0ebcc` | Bej — panoul din hero, cardurile crem, pașii din „Cum funcționează”, cifrele-obiect („18”, ghilimeaua), wordmark-ul din footer. |
| `--color-panel-2` | `#f6f2da` | Bej deschis — fundaluri de secțiune alternante (portrete, acreditări), hover pe carduri crem. |
| `--color-ink` | `#484343` | Text principal. |
| `--color-ink-soft` | `#6f6863` | Text secundar, descrieri, nav în repaus. |
| `--color-ink-faint` | `#9c938c` | Legende, meta, placeholder, parantezele din nav. |
| `--color-accent` | `#5c6c02` | Verde măsliniu — butoane primare, cifre, indexuri, linkuri, **suprafețe pline**. |
| `--color-accent-deep` | `#4a5702` | Hover pe accent, umbrele duotonului, voalul de pe CTA-ul final. |
| `--color-accent-bright` | `#8b9a1f` | Highlight, `::selection`, bula de hover pe `.btn-on-accent`. |
| `--color-on-accent` | `#fdfbef` | Text pe accent (= `--color-bg`). |
| `--color-on-accent-soft` | `rgba(253,251,239,.72)` | Text secundar pe accent. |
| `--color-line` | `rgba(72,67,67,.14)` | Borduri subtile pe crem/bej. |
| `--color-line-strong` | `rgba(72,67,67,.28)` | Linii desenate, borduri de buton outline. |
| `--color-line-on-accent` | `rgba(253,251,239,.24)` | Borduri și diviziuni pe fundal verde. |

**Reguli de contrast**
- Text pe `--color-accent` este întotdeauna `--color-on-accent` / `--color-on-accent-soft`, niciodată `--color-ink`.
- `--color-surface` (alb) este rezervat ramelor foto. Cardurile de conținut folosesc `--color-panel` sau `--color-accent`, nu alb.
- `--color-accent` pe `--color-bg` = 5.1:1 → OK pentru text ≥ 16px bold și elemente UI mari; pentru text mic de corp pe crem se folosește `--color-ink`.
- Pe fotografii duoton, textul stă doar peste zona voalată cu `--color-accent-deep` (vezi §3.6).

### 1.2 Tipografie

Două familii, ambele auto-găzduite prin `next/font/local` din
[`public/fonts`](public/fonts):

| Familie | Token | Fișier / greutate | Folosire |
|---|---|---|---|
| **Helvetica Neue** | `--font-sans` | `HelveticaNeueLight.otf` — 300 · `HelveticaNeueMedium.otf` — 500 | Corp de text (300), **titlurile mari de pe Acasă** (`.headline-*`, 300), tot UI-ul: nav, butoane, etichete, meta (500). |
| **Playfair Display** | `--font-display` | `PlayfairDisplay-Medium.ttf` — 500 | Cuvântul-accent din titluri (`<em>`, italic), cifre mari (`.numeral`, `.stat-num`, `.area-index`), indexul de secțiune (`.section-index`), citatele mari (`.quote-display`), wordmark-ul. Niciodată în corp de text sau butoane. |

> **Italic Playfair — de completat.** Avem doar Medium roman. Cuvintele-accent
> (`<em>`) și citatele folosesc acum italic **sintetizat**. Înainte de lansare se
> adaugă `PlayfairDisplay-MediumItalic.ttf` în `public/fonts` și o intrare
> `style: "italic"` în loaderul din `layout.tsx`.

**Cele două voci.** Helvetica Light dă vocea de titlu — mare, strânsă, calmă;
Playfair italic intră ca accent (un cuvânt-două din titlu, o cifră, un citat).
Contrastul dintre ele e ierarhia paginii: nu se pune Playfair pe titluri întregi
de secțiune pe Acasă, și nu se pune Helvetica pe citate.

**Scară de bază** (token → px; `rem` presupune 16px root)

| Token | px | Line-height | Uz |
|---|---|---|---|
| `--text-xs` | 12 | 1.4 | eyebrow, etichete mono, `.stat-label` |
| `--text-sm` | 14 | 1.55 | pill-uri, nav, butoane, meta, `.section-index` |
| `--text-base` | 17 | 1.62 | corp de text |
| `--text-lg` | 20 | 1.5 | paragraf-lead sub titluri |
| `--text-xl` | 24 | 1.25 | primul paragraf ridicat (poveste), titluri de pas/metodă |
| `--text-2xl` | 32 | 1.15 | H3 |
| `--text-3xl` | 44 | 1.08 | H2 (pagini interioare) |
| `--text-4xl` | 56 | 1.04 | H1 static (pagini interioare) |

**Scara „headline” (fluidă, Helvetica Light)** — vocea de titlu a paginii Acasă.
Variația de scară dintre eyebrow (12px) → headline (până la 90px) e intenționat
mare; nu se „temperează” punând totul la 40px.

| Utilitar | Mărime | Uz |
|---|---|---|
| `.headline-1` | `clamp(2.75rem, 1rem + 4.4vw, 5.6rem)`, lh 0.94, ls −0.035em | H1 din hero, titlul CTA-ului final |
| `.headline-2` | `clamp(2.25rem, 1rem + 3.5vw, 4.6rem)`, lh 0.98, ls −0.03em | H2 de secțiune (prin `SectionHead`) |
| `.headline-3` | `clamp(1.5rem, 1rem + 1.4vw, 2.25rem)`, lh 1.12 | fraza de deschidere din cardurile-portret, titlul benzii de acreditări, linkurile din meniul mobil |
| `.quote-display` | `clamp(1.5rem, 1rem + 1.9vw, 2.7rem)`, Playfair italic | citatul-obiect din poveste, afirmația din blocul verde, recomandările |
| `.section-index` | 14px, Playfair, cifre tabulare, `--color-accent` | „01 / 02 / 03” din antete, indexul cardurilor-portret și al formărilor |
| `.numeral` | mixin | orice cifră mare Playfair: „18”-ul din poveste, contorul recomandărilor, cifrele pașilor/metodelor |

Utilitarele Playfair `.display-1` / `.display-2` rămân pentru paginile interioare
(H1/H2 clasice), nu se folosesc pe Acasă.

**Titluri** — `font-weight: 500` (Playfair) / 300 (headline), `text-wrap: pretty`
pe `.headline-*` (nu `balance`: cuvintele sunt inline-block pentru reveal și
`balance` le rupe câte unul pe rând). Lățimea maximă se dă **pe titlu**, în `ch`
(`max-w-[14ch]`), nu pe wrapper — `ch` e relativ la fontul elementului.

**Accentul** se marchează semantic: `<h2>Înainte de a fi terapeut, <em>am fost clientă</em></h2>`.
`h1–h4 em` și `.headline-* em` → Playfair italic 500, `--color-accent`; pe
containere accent se adaugă `.headline-on-accent` (accentul devine crem).

**Eyebrow** — `.eyebrow`: Helvetica 500, 12px, `letter-spacing: .16em`, uppercase,
`--color-ink-soft`. Pe Acasă vine mereu în antetul numerotat (§3.3): index →
linie desenată → eyebrow. „✳” (`AsteriskMark`) rămâne pentru eyebrow-urile
neindexate (hero, banda de acreditări) și ca semn de punctuație vizuală.

### 1.3 Spațiere

Scala Tailwind implicită (bază 4px). Reguli de sistem:

- **Gutter container:** `.shell` — `max-width: 1240px`, padding-inline `20px` (mobil) → `40px` (≥768px).
- **Ritm vertical de secțiune:** `.section-y` — `padding-block: clamp(4rem, 9vw, 7.5rem)`.
- **Panouri pe tot ecranul** (hero, blocul verde, CTA final): `px-2.5` pe secțiune, container `max-w-[1600px]`, colț `--radius-xl`.
- **Grila editorială:** 12 coloane (`lg:grid-cols-12`, `gap-x-12`). Coloanele nu sunt egale: 5/7 (foto/text), 7/4 cu o coloană goală (listă/foto), 3/9 (contor/citat).
- **Padding card:** `28px` (`.card`). Cardurile-portret: `min-h-[24rem]`; cardurile de servicii: `min-h-[22rem]`.
- **Gap grilă de carduri:** `16px` (mobil) → `24px` (desktop).
- **Bleed:** rail-ul de portrete începe aliniat cu `.shell` și curge până la marginea dreaptă (`pl-[max(40px,calc((100%-1240px)/2+40px))]`).

### 1.4 Rază de colț

| Token | px | Uz |
|---|---|---|
| `--radius-xs` | 8 | **butoane** (`.btn`, `.btn-icon`), chip-uri |
| `--radius-sm` | 12 | `.icon-badge`, `.photo-float` |
| `--radius-md` | 18 | carduri standard, citatul-obiect |
| `--radius-lg` | 24 | rame foto, bara de statistici |
| `--radius-xl` | 32 | panourile hero, blocul verde, CTA-ul final |
| `--radius-pill` | 999 | `.nav-pill`, `.pill-tag`, `.btn-icon-ghost`, `.acc-icon`, indicatorii recomandărilor |

> Butoanele sunt **dreptunghiuri moi** (`--radius-xs`), nu pastile — decizie
> luată la implementarea hero-ului (perechea buton + buton-iconiță pătrat).
> Documentul anterior spunea „pastilă”; CSS-ul e sursa de adevăr.

### 1.5 Umbre

Fără umbre grele. Un singur nivel de elevație, cald și difuz:

- **Card la hover:** `0 24px 44px -24px rgba(72,67,67,.32)` + ridicare 6px (`.card-lift`).
- **Foto plutitoare / citat-obiect:** `0 22px 50px -18px rgba(72,67,67,.35)` (`.photo-float`).
- **CTA deschis peste fotografie:** `0 10px 30px -14px rgba(72,67,67,.4)` (`.btn-light`).

Panourile de sticlă folosesc `backdrop-filter: blur()` peste fotografie, nu umbră.

### 1.6 Mișcare

| Token | Curbă | Uz |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(.22,1,.36,1)` | intrări, hover, alunecarea săgeții — implicit |
| `--ease-in-out-soft` | `cubic-bezier(.65,0,.35,1)` | tranziții simetrice (rar) |
| `--enter` | `0.9s` | durata intrării la încărcare (`[data-enter]`) |

Un singur observer, montat în layout (`components/reveal-provider.tsx`), pune
`.is-in` pe orice `[data-reveal]` / `[data-reveal-group]` la intrarea în viewport
(threshold 8%, o singură dată). Componentele nu-și mai fac observer propriu.

| Mecanism | Markup | Ce face |
|---|---|---|
| **Reveal pe bloc** | `data-reveal` (+ `--reveal-delay`) | fade + 16px urcare, 0.9s. `data-reveal="fade"` = fără translate (fundaluri, linii). |
| **Reveal pe cuvinte** | `<Words text accent />` în titlu (`data-reveal="words"`) | fiecare cuvânt urcă dintr-o mască, decalat 42ms × index (`--w`). Pentru toate titlurile `.headline-*`. |
| **Reveal în trepte** | părinte `data-reveal-group` (+ `--stagger`), copii `data-reveal-child` cu `--i` | copiii intră pe rând (80ms implicit). Paragrafe, carduri, rânduri de listă. |
| **Linie desenată** | `.rule-draw` (`--soft`, `--on-accent`) | diviziune care se trage de la stânga (1.3s) când strămoșul e `.is-in`. Înlocuiește bordurile statice în antete, liste, pași. |
| **Linie organică** | `.line-art` (SVG, `pathLength=1`) | traseul se desenează (1.6–2.6s); pe carduri și fundaluri. |
| **Imagine** | `.img-reveal` (scale 1.12 → 1, 1.6s) · `.img-zoom` (1.035 la hover) | orice fotografie de secțiune; zoom doar în carduri/linkuri. |
| **Intrare hero** | `[data-enter="rise"\|"down"\|"fade"\|"zoom"]` + `--enter-delay` | animație pe load, nu pe observer (conținut deasupra pliului). `zoom` = fotografia de fundal. |
| **Magnetic** | `<Magnetic>` în jurul unui `.btn` | butonul alunecă spre cursor (0.32 × distanță) cât e în zona-tampon; doar mouse. CTA-ul principal din hero și din CTA-ul final. |
| **Plutire** | `.float-slow` (+ `--float-rotate`) | polaroid-ul din hero, 7.5s, cu înclinarea păstrată. |
| **Marquee / orbită** | `.marquee`, `.orbit-spin` | păstrate din sistem; nefolosite pe Acasă. |

`prefers-reduced-motion`: toate animațiile, reveal-urile, liniile desenate,
cursorul custom și magnetismul sunt neutralizate (conținutul e vizibil imediat).

### 1.7 Detalii de craft

- **Scrollbar** — subțire, măsliniu 55% pe crem, cu chenar crem (`::-webkit-scrollbar*`, `scrollbar-color`). Rail-urile orizontale își ascund scrollbar-ul.
- **`::selection`** — `--color-accent-bright` cu text crem, global.
- **Cursor custom** (`components/cursor.tsx`) — doar `(hover: hover) and (pointer: fine)`: nativul se ascunde (`html.has-cursor`), un punct de 6px urmează exact cursorul, un inel de 34px îl urmează cu întârziere (lerp 0.16) și se dilată la 56px cu umplere 12% peste elementele interactive. Peste containerele `[data-dark]` (blocul verde, CTA final) ambele trec pe crem. Elementele sunt create în afara arborelui React.
- **Index de secțiune** — fiecare secțiune numerotată din Acasă poartă `01`…`08` în Playfair (§3.3); banda de acreditări nu e numerotată (nu e o „secțiune”, e o bandă).
- **Focus** — `:focus-visible` global: contur 2px `--color-accent`, offset 3px. Nu se elimină niciodată.

---

## 2. Componente

### 2.1 Buton — `.btn`

Dreptunghi moale (`--radius-xs`), Helvetica 500 / 14px, padding `15px 26px`
(`py-[18px]` pentru CTA-urile principale), cu o „bulă” care urcă din jos la
hover (pseudo-element `::before`).

| Variantă | Clasă | Fundal → hover | Text |
|---|---|---|---|
| Primar | `.btn.btn-primary` | `--color-accent` → `--color-accent-deep` | `--color-on-accent` |
| Outline | `.btn.btn-outline` | transparent → umplere `--color-ink` | `--color-ink` → `--color-bg` |
| Deschis | `.btn.btn-light` | `--color-bg` → bulă `--color-accent` | `--color-ink` → `--color-on-accent`. CTA-ul din header, peste fotografie. |
| Pe verde | `.btn.btn-on-accent` | `--color-on-accent` → bulă `--color-accent-bright` | `--color-accent` |
| Outline pe verde | `.btn.btn-outline-on-accent` | transparent, bordură `--color-line-on-accent` → umplere crem | `--color-on-accent` → `--color-accent-deep`. WhatsApp în CTA-ul final. |

**Buton-iconiță** `.btn-icon` — pătrat de 52px cu săgeată, `--color-accent`. Se
atașează la dreapta unui buton primar (grup „Programează → ▢”) sau stă singur.
Variante: `.btn-icon-on-accent` (crem pe verde), `.btn-icon-ghost` (cerc cu
contur, pentru săgețile de navigare din rail/recomandări; `:disabled` → 35%).
Săgeata interioară e `.arrow-slide` (translatează 4px la hover-ul părintelui
sau al unui strămoș `.group-arrow`).

| Stare | Vizual | Comportament |
|---|---|---|
| Default | conform variantei | — |
| Hover / focus | bula urcă complet; culoarea textului comută | `::before` `translateY(101% → 0)` |
| Active | `scale(.975)` | — |
| Focus-visible | contur `2px --color-accent`, offset 3px | din `:focus-visible` global |
| Disabled | `opacity: .35`, `pointer-events: none` | `.btn-icon:disabled` |

**Accesibilitate:** `<button>` sau `<a>` real; iconița decorativă `aria-hidden`;
butonul-iconiță fără text vizibil primește `aria-label`.

### 2.2 Navigare

- **Desktop** — `.nav-paren`: linkuri „( despre mine )”, 14px/500, `--color-ink-soft`; parantezele sunt pseudo-elemente `--color-ink-faint` și se aprind măsliniu la hover / `[aria-current="page"]`.
- **`.nav-pill` + `.nav-link`** — grupul-pastilă cu blur, păstrat pentru paginile interioare.
- **Mobil** (`components/mobile-nav.tsx`) — buton „meniu” (`.btn-outline`, cu două linii care devin ✕) → panou pe tot ecranul, bej, linkurile pe `.headline-3` cu săgeată, CTA primar, WhatsApp și e-mail. `role="dialog"`, `aria-expanded`/`aria-controls`, Escape închide, scroll-ul paginii se blochează.

### 2.3 Card — `.card`

Bază: `--radius-md`, padding `28px`, bordură `1px --color-line`.

| Variantă | Clasă | Când |
|---|---|---|
| Alb | `.card` | rar; carduri utilitare pe fundal bej |
| Crem | `.card.card-cream` | implicit — portrete, servicii |
| Verde | `.card.card-accent` | 1 card „activ” dintr-un set; accent vizual |
| Glass | `.card-glass` (`--accent`) | frost peste fotografie; păstrat pentru pagini interioare |

- `.card-accent` comută automat textul `<p>` pe `--color-on-accent-soft` și inversează `.icon-badge`.
- `.card-lift` (opt-in): ridicare 6px + umbra de hover; cardurile crem trec pe `--color-panel-2`.
- `.card-title` — Playfair 500 / 24px (pagini interioare). Pe Acasă titlurile de card sunt Helvetica 500 (`text-[1.4rem]`), ca să nu concureze cu accentul Playfair.
- `.icon-badge` — pătrat rotunjit 48px cu iconiță de linie 24px din `components/icons.tsx`. Set coerent, nu emoji.

### 2.4 Card cu index — `.area-index`

Card (crem sau verde) cu index mare Playfair sus (`01`–`03`, `.area-index`,
`--color-accent` / `--color-on-accent` pe verde), titlu, o propoziție, link
`.link-underline`. Pe Acasă: cardurile de servicii (§3.4).

### 2.5 Bară de statistici — `.stat-bar`

Grilă de 3 coloane pe `.glass` peste fotografie, diviziuni `--color-line-on-accent`.
Fiecare celulă: `.stat-num` (Playfair 500, cifră + `<sup>` sau `.stat-suffix`) și
`.stat-label` (12px uppercase). Sub 640px se stivuiește. Cifrele reale se
confirmă cu clienta — `pending` în `lib/site.ts`.

### 2.6 Marquee — `.marquee` · 2.7 Orbită + pill-tag

Păstrate din sistem (bandă cu „✳”, inel cu noduri și etichete-pastilă). Nu
apar pe Acasă în ediția curentă.

### 2.8 Fotografie

- `.photo-frame` — `--radius-lg`, `overflow: hidden`. Pentru orice fotografie mare. Folosește `next/image` cu `sizes` corect.
- `.photo-float` — cadru „polaroid”: fundal alb, padding `10px 10px 14px`, `--radius-sm`, umbră difuză, legendă italică „( … )” în banda de jos. În hero e înclinat −3° (`--float-rotate`) și iese ~3.5rem peste cusătura dintre panouri.
- `.glass` — overlay pe fotografie pentru bara de statistici.
- **Crop** — portretele se taie strâns: `aspect-[4/5]` cu `object-[50%_18–20%]` (față + umeri), nu „poza întreagă în ramă”. Fiecare fotografie apare o singură dată pe pagină.
- **`.duotone`** — pentru imaginile de atmosferă (peisaj), **nu pentru portrete**: fundal `--color-accent-deep`, imaginea `grayscale` + `mix-blend-mode: screen`, overlay `--color-panel` cu `multiply`. Rezultat: umbre măslinii, lumini bej — imaginea intră în paletă. Textul se pune doar peste voalul suplimentar spre bază (§3.6).
- **`.img-reveal` / `.img-zoom`** — vezi §1.6.

### 2.9 Link cu subliniere — `.link-underline`

Pentru CTA-uri text („Vezi cum te pot ajuta →”). `--color-accent` 500, subliniere
care se desenează de la stânga la hover; săgeata `.arrow-slide` opțională. În
footer se folosește pe text `--color-ink` (font 300).

### 2.10 Acordeon — `components/accordion.tsx`

Buton `.acc-trigger` (titlu 18px/500 + meta `.mono-label`) cu `.acc-icon` — cerc
de 40px cu „+” care se rotește 45° și se umple măsliniu la deschidere. Panoul
`.acc-panel` se desfășoară cu `grid-template-rows: 0fr → 1fr` (0.7s).
`aria-expanded` / `aria-controls`; conținutul ascuns primește `aria-hidden`.
Un singur element, nu grup — lista de formări din banda de acreditări.

### 2.11 Rail orizontal — `components/rail.tsx`

`<ul class="rail">` cu scroll nativ, `scroll-snap-type: x mandatory`, scrollbar
ascuns. Pe desktop se poate trage cu mouse-ul (`pointer` events, prag 6px,
`.is-dragging` oprește snap-ul și click-urile); pe touch, scroll-ul nativ.
Dedesubt: linia de progres (măsliniu pe `--color-line`) și `prev/next`
(`.btn-icon-ghost`, `disabled` la capete). Cardurile: `w-[22rem]`, `min-h-[24rem]`.

### 2.12 Wordmark uriaș — `.wordmark-giant`

Playfair 500, `clamp(3.2rem, 12.6vw, 13rem)`, `--color-panel` pe crem, un singur
rând, tăiat la marginea de jos a footer-ului (`-mb-[0.16em]`). `aria-hidden`,
`user-select: none` — e semnătură vizuală, nu conținut.

### 2.13 Citat-obiect

`blockquote.quote-display` tratat ca obiect grafic, nu ca paragraf:
- **Card** (poveste): fundal `--color-panel`, `--radius-md`, `px-7 py-6`, umbră difuză, poziționat absolut peste colțul din dreapta-jos al fotografiei (`lg:-right-28 lg:bottom-20`), `max-w-[15ch]`. Pe mobil curge sub fotografie.
- **Afirmație** (blocul verde): primul paragraf al secțiunii ridicat pe `.quote-display`, crem, `max-w-[24ch]`.
- **Recomandare**: citatul pe `.quote-display` `max-w-[32ch]`, ghilimeaua „„” uriașă (`.numeral`, 9–15rem, `--color-panel`) în spatele primului rând, atribuire = linie scurtă măslinie + `.eyebrow`.

---

## 3. Patternuri

### 3.1 Header
`components/site-header.tsx`, montat în layout, `position: absolute; top: 0`
peste panourile din hero — **nu e sticky** (nu urmărește pagina). Wordmark
Playfair 1.2rem stânga · `.nav-paren` (≥1024px) · `.btn-light` „Programează o
ședință” dreapta (sub 1024px: `.btn-icon` + `MobileNav`). Paddingul orizontal e
aliniat cu paddingul interior al panourilor (`px-6 sm:px-12 lg:px-[4.625rem]`).
`scroll-margin-top: 96px` pe secțiunile cu `id`.

### 3.2 Hero
Două panouri `--radius-xl` cu `gap-2.5`, `lg:min-h-svh`, `lg:grid-cols-2`.
- **Stânga (bej)** — aliniat la stânga, ancorat jos, `justify-between`: eyebrow cu „✳” → H1 `.headline-1` `max-w-[14ch]` cu `<Words>` (reveal pe cuvinte, 350ms) → rând pe două coloane: lead `text-lg` `max-w-[40ch]` + grup `<Magnetic>` `.btn-primary` (+ `.btn-icon` pe telefon) → linie de meta cu bordură sus: rolul · „( derulează ) ↓”. Intrările `[data-enter]` în trepte: 200 / 350 / 800 / 950 / 1300ms.
- **Dreapta (foto)** — fundalul (dealuri) într-un strat propriu decupat (`overflow-hidden rounded-xl`, `data-enter="zoom"`), ca polaroid-ul să poată ieși peste cusătură: `.photo-float.float-slow`, `aspect-[4/5]`, `--float-rotate: -3deg`, `lg:ml-[-3.5rem]`; jos, `.stat-bar.glass`.

### 3.3 Antet de secțiune — `components/section-head.tsx`
Înlocuiește antetul centrat „✳ + eyebrow + H2”. Structură: rând cu
`.section-index` („01”) → `.rule-draw` de 2.5rem → `.eyebrow`; apoi H2
`.headline-2` cu `<Words>`; opțional lead `text-lg` `--color-ink-soft`.

| Așezare | Când | Detalii |
|---|---|---|
| `layout="stack"` | secțiuni tipografice (poveste, blocul verde, abordare, recomandări) | totul la stânga, lead `max-w-[52ch]` |
| `layout="split"` | secțiuni cu grilă/rail (portrete, servicii, pași) | titlul pe coloanele 1–7, lead-ul sau `aside` (link) pe 9–12, aliniat la baza titlului |

`tone="on-accent"` pentru containere verzi; `headingClassName="max-w-[Nch]"`
pentru lățimea titlului. **Regula:** două secțiuni consecutive nu folosesc
aceeași așezare cu același tip de conținut (vezi §3.8).

### 3.4 Grilă de carduri (servicii)
Trei carduri `.card.card-cream` / un `.card-accent`, decalate pe verticală
(`lg:translate-y-14`, `lg:translate-y-6`), `data-reveal-group` cu 120ms, peste
creanga din `public/home/brenches.png` (`mix-blend-multiply`, voal gradient).
Singura grilă de carduri de pe Acasă.

### 3.5 Rail de portrete
Antet `split` → `<Rail>` (§2.11) care iese din `.shell` spre dreapta → link
`.link-underline`. Un card verde (al 4-lea) rupe ritmul bej. Fundal
`--color-panel-2`.

### 3.6 Panou plin pe tot ecranul
Secțiune `px-2.5`, container `max-w-[1600px]`, `--radius-xl`, `[data-dark]`.
- **Bloc verde** („Ce este psihoterapia”): `bg-accent`, `.line-art` crem 14%, antet `on-accent`, grilă 6/5 cu o coloană goală: afirmație `.quote-display` + text + CTA · listă-tabel cu `.rule-draw--on-accent` pe fiecare rând.
- **CTA final**: `.duotone` cu peisajul (`object-[50%_65%]`), voal `bg-gradient-to-t from-accent-deep/90 via-accent-deep/55 to-accent-deep/30`, `min-h-[86svh]`, conținut ancorat jos: index „08” + eyebrow, H2 `.headline-1` `max-w-[15ch]`, lead, `<Magnetic>` `.btn-on-accent` + `.btn-outline-on-accent` (WhatsApp) + program/locație `.mono-label`.

### 3.7 Footer — `components/site-footer.tsx`
Bordură sus, 4 coloane pe 12 (4/2/3/3): identitate (wordmark 1.5rem, rol ·
oraș, „✳ Psihoterapie integrativă”) · Navigare · Contact (telefon, e-mail,
WhatsApp) · Cabinet (adresă, metrou, program). Rând de subsol `.mono-label`: ©
an + atestare · „Înapoi sus ↑”. Sub el, `.wordmark-giant` (§2.12).

### 3.8 Ritmul de scroll al paginii Acasă
Fiecare secțiune trebuie să se simtă altfel ca densitate și compoziție față de
cea de dinainte. Ordinea și „temperatura” fiecăreia:

| # | Secțiune | Fundal | Compoziție | Densitate |
|---|---|---|---|---|
| — | Hero | bej + foto | două panouri, H1 uriaș, polaroid peste cusătură | foto + tip |
| 01 | Povestea mea | crem | titlu pe toată lățimea, foto lipicioasă 5 col, text 6 col, „18” uriaș, citat-card | tipografic, aerisit |
| 02 | Cine vine la cabinet | bej deschis | antet split, rail orizontal de 7 carduri | dens, carduri |
| 03 | Ce este psihoterapia | verde plin | afirmație Playfair + listă-tabel | bloc de contrast |
| 04 | Servicii | crem + creangă | 3 carduri decalate | carduri, foto de fundal |
| 05 | Abordarea mea | crem | index de 5 metode 7 col, foto lipicioasă 4 col | listă, aerisit |
| 06 | Cum funcționează | bej | 4 pași pe orizontală, linie desenată, iconițe | structurat |
| 07 | Recomandări | crem | un singur citat mare, contor, săgeți | cel mai aerisit |
| — | Acreditări | bej deschis, bandă | 3 repere + acordeon | compact |
| 08 | CTA final | duoton | panou plin, H2 uriaș, două butoane | foto-dominant |
| — | Footer | crem | 4 coloane + wordmark uriaș | închidere |

`Approach` (05) e integrată pe Acasă în formă compactă (index de metode), nu ca
grila de carduri-glass; grila rămâne disponibilă pentru `/servicii`.

---

## 4. Ce nu se face

| ✅ Da | ❌ Nu |
|---|---|
| Token de culoare / clasă utilitară | hex sau px în `className` (excepție: `shadow-[…]` cu valorile din §1.5 și `clamp()`-uri de cifre-obiect) |
| `--color-panel` / `--color-accent` pentru carduri | alb pur pentru carduri de conținut |
| Playfair doar la accent, cifre, citate, index | Playfair în corp de text, butoane sau titluri întregi pe Acasă |
| `.headline-*` cu `<Words>` pentru titlurile de secțiune | `text-[clamp(…)]` arbitrar repetat în fiecare componentă |
| `<em>` semantic pentru accentul de titlu | `<i>` sau `<span class="italic">` |
| Antet numerotat, stânga, `stack` / `split` alternate | „✳ + eyebrow + H2 centrat + grilă de carduri” repetat la fiecare secțiune |
| Grilă pe 12 coloane cu coloane inegale, un element care iese din grilă | blocuri centrate identice, totul în `max-w-2xl mx-auto` |
| Un singur observer global de reveal | `IntersectionObserver` copiat în fiecare componentă |
| O elevație caldă, difuză | umbre gri, multiple niveluri |
| Duoton măsliniu pe peisaje | duoton pe portrete; culori noi în overlay |
| Mișcare discretă, respectă `reduced-motion` | parallax greu, elemente care sar, sunet, cursor care ascunde textul |
| Colțuri din scala `--radius-*` | `border-radius` arbitrar |

---

## 5. Checklist de audit

- [x] Zero valori hex/rgb în `app/**/*.tsx` și `components/**/*.tsx` în afara umbrelor din §1.5.
- [x] Titlurile de secțiune pe `.headline-*`, nu `text-[clamp(…)]` arbitrar.
- [x] Fiecare `<img>`/`next/image` are `alt` real (sau `alt=""` dacă e pur decorativ).
- [x] Un singur `<h1>` per pagină; H2 pe fiecare secțiune, legat prin `aria-labelledby`.
- [x] Contrast: text pe verde ≥ 4.5:1 (`--color-on-accent`); text pe duoton doar peste voal.
- [x] Butoanele-iconiță fără text au `aria-label`; săgețile de rail/recomandări au `disabled`/`aria-current`.
- [x] Acordeonul și meniul mobil au `aria-expanded` / `aria-controls`; meniul e `role="dialog"`, se închide cu Escape.
- [x] `prefers-reduced-motion` neutralizează reveal-uri, linii, cursor, magnetism, plutire.
- [x] Cursorul custom apare doar cu mouse (`hover: hover`, `pointer: fine`).
- [ ] `PlayfairDisplay-MediumItalic.ttf` adăugat înainte de lansare.
- [ ] Cifrele din `heroStats` și datele de contact (`[DE COMPLETAT]`) confirmate de clientă.
- [ ] Tăietura recomandării Laurei M. (fără „trăite anul trecut”) confirmată de clientă.
- [ ] `site.title` / `site.description` (încă „18–26 ani”) aliniate cu poziționarea 30+ din conținut.
