# Sistem de design — „Câmp deschis”

Sursa unică de adevăr pentru construirea site-ului după macheta din referință
(psiholog, practică privată — ton cald, natură, spațiu de respirat). Tokenele
trăiesc în [`app/globals.css`](app/globals.css); fonturile în
[`app/layout.tsx`](app/layout.tsx). Nu se scrie valori px/hex punctuale în
markup — totul trece prin token sau clasă utilitară.

---

## 1. Design tokens

### 1.1 Culori

Cele 4 culori de bază vin din brief-ul clientului. Restul sunt derivate calde,
pe aceeași temperatură (nu griuri neutre).

| Token | Valoare | Rol |
|---|---|---|
| `--color-bg` | `#fdfbef` | Fundal de pagină — crem cald. Fundalul implicit al aproape tuturor secțiunilor. |
| `--color-surface` | `#ffffff` | Alb pur — doar rame foto și carduri plutitoare („polaroid”). |
| `--color-panel` | `#f0ebcc` | Bej — cardul din hero, cardurile secundare, fundaluri de secțiune alternante. |
| `--color-panel-2` | `#f6f2da` | Bej deschis — fundaluri discrete, stare hover pe zone crem. |
| `--color-ink` | `#484343` | Text principal. |
| `--color-ink-soft` | `#6f6863` | Text secundar, descrieri de card, nav în repaus. |
| `--color-ink-faint` | `#9c938c` | Legende, meta, placeholder. |
| `--color-accent` | `#5c6c02` | Verde măsliniu — butoane primare, cifre, linkuri, **suprafețe pline de card**. |
| `--color-accent-deep` | `#4a5702` | Hover pe accent, suprafață verde mai închisă. |
| `--color-accent-bright` | `#8b9a1f` | Highlight, noduri pe orbită, `::selection`, separatorul `✳` din marquee. |
| `--color-on-accent` | `#fdfbef` | Text pe accent (= `--color-bg`). |
| `--color-on-accent-soft` | `rgba(253,251,239,.72)` | Text secundar pe accent. |
| `--color-line` | `rgba(72,67,67,.14)` | Borduri subtile pe crem/bej. |
| `--color-line-strong` | `rgba(72,67,67,.28)` | Borduri de buton outline, diviziuni mai vizibile. |
| `--color-line-on-accent` | `rgba(253,251,239,.24)` | Borduri și diviziuni pe fundal verde. |

**Reguli de contrast**
- Text pe `--color-accent` este întotdeauna `--color-on-accent` / `--color-on-accent-soft`, niciodată `--color-ink`.
- `--color-surface` (alb) este rezervat ramelor foto. Cardurile de conținut folosesc `--color-panel` sau `--color-accent`, nu alb.
- `--color-accent` pe `--color-bg` = 5.1:1 → OK pentru text ≥ 16px bold și elemente UI mari; pentru text mic de corp pe crem se folosește `--color-ink`.

### 1.2 Tipografie

Două familii, ambele auto-găzduite prin `next/font/local` din
[`public/fonts`](public/fonts):

| Familie | Token | Fișier / greutate | Folosire |
|---|---|---|---|
| **Playfair Display** | `--font-display` | `PlayfairDisplay-Medium.ttf` — 500 | Toate titlurile (H1–H4), cifrele mari (statistici, index carduri), accente în `<em>` italic. |
| **Helvetica Neue** | `--font-sans` | `HelveticaNeueLight.otf` — 300 · `HelveticaNeueMedium.otf` — 500 | Corp de text (300), tot UI-ul: nav, butoane, etichete, pill-uri, meta (500). |

> **Italic Playfair — de completat.** Avem doar Medium roman. Cuvintele-accent din
> titluri (`<em>`) folosesc acum italic **sintetizat** (`font-synthesis` lăsat
> activ). Înainte de lansare se adaugă `PlayfairDisplay-MediumItalic.ttf` în
> `public/fonts` și o intrare `style: "italic"` în loaderul din `layout.tsx`.

**Scară** (token → px la bază; `rem` presupune 16px root)

| Token | px | Line-height | Uz |
|---|---|---|---|
| `--text-xs` | 12 | 1.4 | eyebrow, etichete mono, `.stat-label` |
| `--text-sm` | 14 | 1.55 | pill-uri, nav, butoane, meta, `.marquee-item` |
| `--text-base` | 17 | 1.62 | corp de text |
| `--text-lg` | 20 | 1.5 | paragraf-lead sub H1/H2 |
| `--text-xl` | 24 | 1.25 | `.card-title` / H4 |
| `--text-2xl` | 32 | 1.15 | H3 |
| `--text-3xl` | 44 | 1.08 | H2 |
| `--text-4xl` | 56 | 1.04 | H1 static |

Utilitare fluide (preferate în hero/secțiuni mari): `.display-1`
(`clamp(2.6rem, 6.2vw, 3.9rem)`), `.display-2` (`clamp(2.1rem, 4.6vw, 2.9rem)`).
`.numeral` = mixin pentru orice cifră mare Playfair (tabular, tracking -0.02em).

**Titluri** — `font-weight: 500`, `letter-spacing: -0.01em`, `text-wrap: balance`.
Accentul se marchează semantic: `<h1>Găsești claritate în <em>echilibru</em></h1>`.

**Eyebrow** — `.eyebrow`: Helvetica 500, 12px, `letter-spacing: .16em`, uppercase,
`--color-ink-soft`. Deseori precedat de un „✳” decorativ (caracter, `aria-hidden`),
centrat deasupra titlului de secțiune.

### 1.3 Spațiere

Scala Tailwind implicită (bază 4px). Reguli de sistem:

- **Gutter container:** `.shell` — `max-width: 1240px`, padding-inline `20px` (mobil) → `40px` (≥768px).
- **Ritm vertical de secțiune:** `.section-y` — `padding-block: clamp(4rem, 9vw, 7.5rem)`.
- **Padding card:** `28px` (`.card`). Cardurile mari de hero: `32–40px`.
- **Gap grilă de carduri:** `16px` (mobil) → `24px` (desktop).

### 1.4 Rază de colț

| Token | px | Uz |
|---|---|---|
| `--radius-xs` | 8 | chip-uri mici, tag-uri |
| `--radius-sm` | 12 | `.icon-badge`, `.photo-float` |
| `--radius-md` | 18 | carduri standard |
| `--radius-lg` | 24 | panouri mari, `.photo-frame` |
| `--radius-xl` | 32 | cardul din hero |
| `--radius-pill` | 999 | butoane, nav-pill, pill-tag, bara de statistici |

### 1.5 Umbre

Fără umbre grele. Un singur nivel de elevație, cald și difuz:

- **Card la hover:** `0 20px 40px -24px rgba(72,67,67,.30)` (`.card-lift`).
- **Foto plutitoare:** `0 22px 50px -18px rgba(72,67,67,.35)` (`.photo-float`).

Panourile de sticlă folosesc `backdrop-filter: blur()` peste fotografie, nu umbră.

### 1.6 Mișcare

| Token | Curbă | Uz |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(.22,1,.36,1)` | intrări, hover, alunecarea săgeții — implicit |
| `--ease-in-out-soft` | `cubic-bezier(.65,0,.35,1)` | tranziții simetrice (rar) |
| `--enter` | `0.9s` | durata intrării la încărcare (`[data-enter]`) |

- **Reveal la scroll:** `[data-reveal]` → fade + 14px translate, la nivel de secțiune. Adaugă `.is-in` prin IntersectionObserver.
- **Intrare hero:** `[data-enter="rise"|"down"]` — animație pe load, nu pe observer (conținut deasupra pliului).
- **Marquee:** `--marquee-duration` (implicit 42s), liniar, infinit, pauză la hover.
- **Orbită:** `.orbit-spin` — `spin-slow` 60s liniar.
- `prefers-reduced-motion`: toate animațiile și reveal-urile sunt neutralizate.

---

## 2. Componente

### 2.1 Buton — `.btn`

Pastilă (`--radius-pill`), Helvetica 500 / 14px, padding `15px 26px`, cu o „bulă”
care urcă din jos la hover (pseudo-element `::before`).

| Variantă | Clasă | Fundal → hover | Text |
|---|---|---|---|
| Primar | `.btn.btn-primary` | `--color-accent` → `--color-accent-deep` | `--color-on-accent` |
| Outline | `.btn.btn-outline` | transparent → umplere `--color-ink` | `--color-ink` → `--color-bg` |
| Pe verde | `.btn.btn-on-accent` | `--color-on-accent` → bulă `--color-accent-bright` | `--color-accent` |

**Buton-iconiță** `.btn-icon` — cerc de 52px cu săgeată, `--color-accent`. Se
atașează la dreapta unui buton primar (grup „Programează → ◯”) sau stă singur pe
carusele. Săgeata interioară e `.arrow-slide` (translatează 4px la hover-ul
părintelui).

| Stare | Vizual | Comportament |
|---|---|---|
| Default | conform variantei | — |
| Hover / focus | bula urcă complet; culoarea textului comută | `::before` `translateY(101% → 0)` |
| Active | `scale(.975)` | — |
| Focus-visible | contur `2px --color-accent`, offset 3px | din `:focus-visible` global |
| Disabled | `opacity: .45`, `pointer-events: none` | a se aplica la nevoie (nu în token) |

**Accesibilitate:** `<button>` sau `<a>` real; iconița decorativă `aria-hidden`;
butonul-iconiță fără text vizibil primește `aria-label`.

### 2.2 Navigare — `.nav-pill` + `.nav-link`

Grup-pastilă semi-transparent cu `backdrop-blur`, bordură `--color-line`. Fiecare
link: `9px 16px`, 14px/500, `--color-ink-soft` în repaus → `--color-ink` pe
`--color-panel` la hover și pentru `[aria-current="page"]`.

- Desktop: grupul centrat în header; logo (Playfair) la stânga, buton „Programează” (`.btn-primary` + `.btn-icon`) la dreapta.
- Header transparent peste crem; nu-și schimbă fundalul la scroll (max. o linie `--color-line` jos).
- Mobil: nav-pill ascuns, înlocuit cu buton de meniu (drawer). Butonul CTA rămâne vizibil.

### 2.3 Card — `.card`

Bază: `--radius-md`, padding `28px`, bordură `1px --color-line`.

| Variantă | Clasă | Când |
|---|---|---|
| Alb | `.card` | rar; carduri utilitare pe fundal bej |
| Crem | `.card.card-cream` | implicit — beneficii, „domenii”, listă |
| Verde | `.card.card-accent` | 1 card „activ” dintr-un set; accent vizual |

- `.card-accent` comută automat textul `<p>` pe `--color-on-accent-soft` și inversează `.icon-badge` (fundal crem, iconiță verde).
- `.card-lift` (opt-in) adaugă ridicare 4px + umbra de hover.
- `.card-title` — Playfair 500 / 24px pentru titlul cardului.
- `.icon-badge` — pătrat rotunjit 48px (`--radius-sm`) cu iconiță de linie (24px, `stroke: currentColor`). Set de iconițe coerent, nu emoji, nu foto.

### 2.4 Card „Domeniu” — `.area-index`

Card (crem sau verde) cu index mare Playfair sus (`01`–`05`, clasa `.area-index`,
`--color-accent` / `--color-on-accent` pe verde), titlu, o propoziție. Așezate
într-un rând cu scroll orizontal / carusel; săgețile caruselului = `.btn-icon`.
O imagine (creangă) poate depăși marginea rândului la dreapta (`overflow: visible`
pe container, `position: absolute` pe imagine).

### 2.5 Bară de statistici — `.stat-bar`

Grilă de 3 coloane pe `--color-accent` (sau `.glass` peste fotografie), diviziuni
`--color-line-on-accent`. Fiecare celulă: `.stat-num` (Playfair, cifră + `<sup>`
pentru `+`/`%`) și `.stat-label` (12px uppercase, `--color-on-accent-soft`).
Se așază de obicei sub / peste rama foto din hero.

```html
<div class="stat-bar glass rounded-[--radius-lg] p-6">
  <div><div class="stat-num">10<sup>+</sup></div><div class="stat-label">ani de experiență</div></div>
  <div><div class="stat-num">95<sup>%</sup></div><div class="stat-label">clienți mulțumiți</div></div>
  <div><div class="stat-num">20<sup>+</sup></div><div class="stat-label">formări profesionale</div></div>
</div>
```

Cifrele reale se confirmă cu clienta (vezi `handoff-claude-code.md` §5) — `pending`
în `lib/site.ts`.

### 2.6 Marquee — `.marquee` + `.marquee-track`

Bandă orizontală cu bordură sus/jos, tag-uri lowercase 14px/500 separate de „✳”
în `--color-accent-bright`. Conținutul se dublează în markup pentru buclă continuă
(`translateX(0 → -50%)`). Pauză la hover. `--marquee-duration` reglează viteza.
Folosită ca ramă sus + jos pentru secțiunea „Dacă simți...”.

### 2.7 Orbită + pill-tag — secțiunea „Dacă simți...”

- `.orbit` — container `aspect-ratio: 1`, cerc cu bordură `--color-line-on-accent`. Opțional `.orbit-spin` (60s). Poate fi stratificat de 2–3 inele concentrice.
- `.orbit-node` — punct de 10px pe inel, cu halou `box-shadow` difuz.
- `.pill-tag` — etichetă-pastilă (frază la persoana a II-a: „te simți copleșit(ă) des”), fundal crem semi-transparent + blur, punct `--color-accent` în față. Așezate absolut în jurul orbitei; pe mobil trec într-o listă verticală simplă (fără poziționare absolută).
- Fundal de secțiune: fotografie (`public/home/mountain.png`) cu voal `--color-accent-deep` ~55% pentru contrast; tot textul devine `--color-on-accent`.

### 2.8 Ramă foto — `.photo-frame` / `.photo-float`

- `.photo-frame` — `--radius-lg`, `overflow: hidden`. Pentru orice fotografie mare (hero, tile-uri de secțiune). Folosește `next/image` cu `sizes` corect.
- `.photo-float` — cadru „polaroid”: fundal alb, padding `10px 10px 14px`, `--radius-sm`, umbră difuză. Se suprapune parțial peste `.photo-frame` (hero). Poate purta o legendă mică (`.mono-label`) în banda de jos.
- `.glass` — overlay pe fotografie pentru bara de statistici.

### 2.9 Link cu subliniere — `.link-underline`

Pentru CTA-uri text („Vezi cum te pot ajuta →”). `--color-accent` 500, subliniere
care se desenează de la stânga la hover; săgeata `.arrow-slide` opțională.

---

## 3. Patternuri

### 3.1 Header
Transparent, `.shell`, `position: sticky; top: 0`. Logo Playfair stânga · `.nav-pill` centru · `.btn-primary` + `.btn-icon` „Programează” dreapta. `scroll-margin-top: 96px` pe secțiunile cu `id`.

### 3.2 Hero
Grilă 2 coloane (≥1024px), altfel stivuit.
- **Stânga:** card `--color-panel`, `--radius-xl`, padding `40px`. Eyebrow cu „✳” → H1 `.display-1` cu `<em>` pe accentul de italic → paragraf `.text-lg` `--color-ink-soft` → grup buton (`.btn-primary` + `.btn-icon`). `[data-enter="rise"]` cu `--enter-delay` în trepte (0 / 90 / 180ms).
- **Dreapta:** `.photo-frame` (portret pe fundal de iarbă) cu `.photo-float` suprapus (legendă „Psihoterapie integrativă”), iar dedesubt / suprapus `.stat-bar.glass`.

### 3.3 Secțiune de conținut
`.section-y` + `.shell`. Antet centrat: „✳” + `.eyebrow` + H2 `.display-2` cu `<em>`. Conținut (grilă de carduri, carusel, listă). Un CTA `.link-underline` la final. `[data-reveal]` pe antet și pe grilă.

### 3.4 Grilă „abordare terapeutică”
`.card` în grilă responsivă (1 → 2 → 3 coloane). Amestec de `.card-cream` și `.card-accent` (max. 1–2 verzi pe rând vizual). O celulă poate fi `.photo-frame` în locul unui card. Fiecare card: `.icon-badge` → `.card-title` → descriere.

### 3.5 Carusel „Domenii cu care lucrez”
Rând cu scroll orizontal (`scroll-snap-type: x`), carduri `.area-index` la ~320px lățime, `.btn-icon` prev/next în antet. Imagine decorativă (creangă) `position: absolute` peste marginea dreaptă.

---

## 4. Ce nu se face

| ✅ Da | ❌ Nu |
|---|---|
| Token de culoare / clasă utilitară | hex sau px în `className` |
| `--color-panel` / `--color-accent` pentru carduri | alb pur pentru carduri de conținut |
| Playfair doar la titluri, cifre, `<em>` | Playfair în corp de text sau butoane |
| O elevație caldă, difuză | umbre gri, multiple niveluri |
| Colțuri rotunjite din scala `--radius-*` | colțuri drepte agresive sau `border-radius` arbitrar |
| `<em>` semantic pentru accentul de titlu | `<i>` sau `<span class="italic">` |
| Mișcare discretă, respectă `reduced-motion` | parallax greu, animații care distrag |

---

## 5. Checklist de audit

- [ ] Zero valori hex/rgb în `app/**/*.tsx` (doar `var(--color-*)` sau clase).
- [ ] Zero `text-[..]` / `p-[..]` arbitrare Tailwind unde există token.
- [ ] Fiecare `<img>`/`next/image` are `alt` real (sau `alt=""` dacă e pur decorativ).
- [ ] Titlurile respectă ierarhia (un singur `<h1>` per pagină).
- [ ] Contrast: text pe verde ≥ 4.5:1 (folosește `--color-on-accent`).
- [ ] Butoanele-iconiță fără text au `aria-label`.
- [ ] `PlayfairDisplay-MediumItalic.ttf` adăugat înainte de lansare.
- [ ] `prefers-reduced-motion` testat (marquee, orbită, reveal oprite).
- [ ] Cifrele din `heroStats` confirmate de clientă (fără `pending`).
