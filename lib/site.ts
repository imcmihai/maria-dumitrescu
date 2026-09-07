/**
 * Configurație globală de site.
 *
 * Valorile marcate `[DE COMPLETAT]` vin din brief §5 și trebuie confirmate de
 * Maria înainte de lansare — nu se inventează cifre sau date de contact.
 */

export const site = {
  name: "Maria Dumitrescu",
  role: "Psiholog & psihoterapeut",
  city: "București",
  title: "Psiholog pentru Tineri (18-26 ani) București — Maria Dumitrescu",
  description:
    "Terapie pentru tineri de 18–26 de ani din București și online. Anxietate, tranziția facultate–carieră, relații, identitate. Ședințe de 50 de minute, în Sector 4 sau online.",
  url: "https://mariadumitrescu.ro",

  // [DE COMPLETAT] — număr real de telefon
  phone: "+40 7XX XXX XXX",
  phoneHref: "tel:+407XXXXXXXX",
  // [DE COMPLETAT] — număr real de WhatsApp
  whatsapp:
    "https://wa.me/407XXXXXXXX?text=Bun%C4%83%20Maria%2C%20a%C8%99%20vrea%20s%C4%83%20programez%20o%20%C8%99edin%C8%9B%C4%83.",
  email: "contact@mariadumitrescu.ro",

  address: {
    street: "Str. Albă, Nr. 12",
    district: "Sector 4",
    city: "București",
    metro: "Metrou Piața Sudului — 6 min pe jos",
  },

  schedule: "Luni – Vineri · 10:00 – 20:00",
} as const;

/** `short` e eticheta din header, unde bara are lățime limitată. */
export const nav = [
  { label: "Despre mine", short: "Despre mine", href: "/despre" },
  { label: "Pentru cine sunt aici", short: "Pentru cine", href: "/pentru-cine" },
  { label: "Servicii", short: "Servicii", href: "/servicii" },
  { label: "Tarife", short: "Tarife", href: "/tarife" },
  { label: "Resurse", short: "Resurse", href: "/resurse" },
  { label: "Blog", short: "Blog", href: "/blog" },
] as const;

/**
 * Servicii — rezumat pentru secțiunea de pe Acasă (brief §3.1).
 * `slug` = ancora din pagina `/servicii`, unde apare textul complet al fiecărui
 * serviciu. `blurb` = o singură propoziție, extrasă din descrierea lungă.
 */
export const homeServices = [
  {
    slug: "terapie-individuala",
    title: "Terapie individuală",
    blurb:
      "Un cadru securizant, confidențial și autentic în care primești instrumentele de care ai nevoie ca să faci față situațiilor cu care te confrunți.",
  },
  {
    slug: "terapie-de-cuplu",
    title: "Terapie de cuplu",
    blurb:
      "Explorați împreună rădăcinile tiparelor care vă blochează, vă înțelegeți mai bine nevoile și reînvățați cum să cereți și să oferiți sprijin.",
  },
  {
    slug: "terapie-de-grup",
    title: "Terapie de grup",
    blurb:
      "Alături de oameni care trec prin lucruri similare, descoperi sprijin, încredere și apartenență — și afli că nu ești singur.",
  },
] as const;

/**
 * Secțiunea „Povestea mea" de pe Acasă — apare înainte de „Servicii", ca punte
 * personală între Maria și cititor. Text furnizat de Maria; ultimul paragraf
 * („Aveam 18 ani atunci…") e o punte adăugată editorial spre cititorul adult
 * de peste 30 de ani — de confirmat cu Maria. `pullQuote` = o frază ridicată
 * din paragraful 3, folosită ca accent vizual lângă fotografie (nu înlocuiește
 * textul, care rămâne complet).
 */
export const story = {
  eyebrow: "povestea mea",
  heading: "Înainte de a fi terapeut,",
  headingAccent: "am fost clientă",
  caption: "( Maria, azi )",
  pullQuote: "M-am simțit respectată, înțeleasă, acceptată.",
  paragraphs: [
    "M-am intersectat cu psihoterapia pentru prima dată când aveam 18 ani. Urma să susțin examenul de bacalaureat și simțeam o anxietate de performanță copleșitoare. Pe un fond emoțional deja șubred, cauzat de despărțirea de prietenul din acea vreme, simțeam că nu voi putea face față examenului care bătea la ușă, deși dintotdeauna fusesem o elevă silitoare.",
    "Nu-mi mai amintesc exact cum am intrat în posesia numărului de telefon al unei psihoterapeute din orașul meu natal, cu atât mai mult cu cât, în acea perioadă, nu exista internetul, iar această meserie era aproape necunoscută.",
    "Cert este că, în cabinetul psihoterapeutului, m-am simțit respectată, înțeleasă, acceptată. Am încheiat un angajament cu psihoterapeutul în urma căruia am învățat să mă iubesc și să mă accept așa cum sunt, am învățat tehnici de relaxare și auto-control, mi-am dezvoltat asertivitatea, capacitatea de reziliență și abilitatea de adaptare. Relațiile cu familia și prietenii s-au îmbunătățit, iar examenul de bacalaureat l-am absolvit cu succes.",
    "Aveam 18 ani atunci. Astăzi, în cabinet, întâlnesc mai ales adulți — cu întrebări mult mai complicate decât un examen: un rost care s-a estompat, o relație care s-a răcit, o pierdere, un diagnostic. Dar respectul și acceptarea de care am avut eu nevoie atunci sunt exact ce îmi doresc să găsești aici.",
  ],
} as const;

/**
 * Secțiunea „Cine vine la cabinet" de pe Acasă — portrete-tip, nu persoane
 * reale. Ajută cititorul să se recunoască într-o situație și să înțeleagă că
 * terapia i se potrivește. Text furnizat/aprobat de Maria; `lead` păstrează
 * nota de confidențialitate. Fiecare portret: `intro` (fraza de deschidere,
 * cu accent serif) + `body` (continuarea, după „…").
 */
export const clientPortraits = {
  eyebrow: "pentru cine",
  heading: "Cine vine",
  headingAccent: "la cabinet",
  lead: "Oamenii mă contactează cu cele mai diferite dificultăți. Din respect pentru confidențialitate, nu pot descrie persoane reale — pot însă schița câteva portrete, situații în care adulții se regăsesc adesea, undeva după 30 de ani, și în care psihoterapia își arată roadele.",
  portraits: [
    {
      intro: "Un bărbat de patruzeci de ani, ajuns unde își propusese",
      body: "cu jobul, casa și familia la locul lor — și care se trezește totuși dimineața cu un gol pe care niciuna dintre aceste reușite nu reușește să-l umple.",
    },
    {
      intro: "O femeie care jonglează de ani buni cu munca, copiii și părinții care îmbătrânesc",
      body: "și care a uitat, undeva pe drum, că are și ea nevoi proprii, nu doar liste de îndeplinit pentru ceilalți.",
    },
    {
      intro: "Un cuplu împreună de peste zece ani",
      body: "care a ajuns să vorbească doar despre logistică și facturi și se întreabă, fiecare în tăcere, dacă mai există un „noi” dincolo de rutină.",
    },
    {
      intro: "Cineva care tocmai a trecut printr-o pierdere",
      body: "un părinte, un partener, o căsnicie — și pentru care viața de dinainte pare acum a altcuiva.",
    },
    {
      intro: "O femeie la început de patruzeci de ani, pusă în fața unui diagnostic medical",
      body: "care are nevoie de un spațiu unde să poată fi speriată, furioasă și obosită, fără să fie nevoită să menajeze pe nimeni.",
    },
    {
      intro: "Un bărbat pe care atacurile de panică l-au prins prima dată la volan",
      body: "și care de atunci își reorganizează discret viața în jurul locurilor din care „se poate ieși” repede.",
    },
    {
      intro: "Cineva care, după un divorț, intră iar în aceleași tipare de relație",
      body: "cu parteneri indisponibili emoțional, fără să înțeleagă de ce alege de fiecare dată pe cineva care îl face să se simtă neînsemnat.",
    },
  ],
} as const;

/**
 * Secțiunea „Ce este psihoterapia" de pe Acasă — rol educativ: normalizează
 * decizia de a începe terapia și explică ce poate aborda.
 *
 * Paragrafele au fost rescrise editorial din limbajul de manual al briefului
 * într-un limbaj direct, potrivit pentru un cititor adult care citește pe
 * telefon — de confirmat cu Maria. Termenii clinici detaliați rămân pe pagina
 * dedicată „Ce este psihoterapia?".
 *
 * `addressGroups` = motivele frecvente, grupate în „momente de viață" și
 * „stări care durează" — mai apropiat de felul în care oamenii de peste 30 de
 * ani își descriu situația decât o listă seacă de diagnostice.
 */
export const whatIsTherapy = {
  eyebrow: "ce este psihoterapia",
  heading: "Cu ce te poate",
  headingAccent: "ajuta terapia",
  paragraphs: [
    "Terapia nu înseamnă doar să scapi de un simptom. Înseamnă să înțelegi de unde vine — și să te simți din nou în largul tău în propria viață.",
    "Lucrez integrativ: nu mă limitez la o singură metodă, ci pornesc de la tine — de la ce gândești, ce simți, cum reacționează corpul tău și ce se întâmplă în relațiile tale. Punem lucrurile astea la un loc, în ritmul tău.",
    "Ce rămâne constant, indiferent de subiect, e relația dintre noi: un spațiu în care poți fi sincer fără să fii judecat. Pe fundația asta se construiește tot restul.",
  ],
  addressesTitle: "Motive frecvente pentru care oamenii încep terapia",
  addressGroups: [
    {
      title: "Momente de viață care te dau peste cap",
      items: [
        "Pierderea unei persoane dragi",
        "Un divorț sau o despărțire",
        "O schimbare majoră",
        "Un diagnostic medical",
        "Un eveniment traumatic",
      ],
    },
    {
      title: "Stări care durează de prea mult",
      items: [
        "Anxietate și neliniște",
        "Atacuri de panică și fobii",
        "Tristețe persistentă sau depresie",
        "Stres posttraumatic",
        "Somn dificil",
        "Relația cu mâncarea",
        "Dificultăți în viața de cuplu sau sexuală",
      ],
    },
  ],
} as const;

/**
 * Secțiunea „Cum funcționează ședințele" de pe Acasă — apare după „Servicii".
 * Traseu cronologic, ușor de urmărit: patru repere care rămân la fel indiferent
 * de subiectul cu care vine clientul. `label` + `heading` sunt reperul scurt;
 * `body` e textul integral furnizat de Maria — nu se rescrie. `icon` = numele
 * componentei din `components/icons.tsx`.
 */
export const sessionFlow = {
  eyebrow: "cum decurge",
  heading: "Cum funcționează",
  headingAccent: "ședințele",
  lead: "Fără proceduri complicate. Câteva repere care fac din cabinet un loc previzibil și sigur.",
  steps: [
    {
      icon: "HeartIcon",
      label: "Sinceritate",
      heading: "Lași măștile la ușă",
      body: "Ședința de psihoterapie este, în primul rând, un exercițiu de sinceritate. Dacă în viața de zi cu zi am învățat să purtăm măști adaptate situațiilor sociale cu care ne confruntăm, în cabinet învățăm să fim autentici și să ne asumăm vulnerabilitatea. Sinceritatea este aluatul cu care lucrăm, elementul esențial care cimentează alianța terapeutică.",
    },
    {
      icon: "ClockIcon",
      label: "Ritm",
      heading: "O întâlnire pe săptămână, 50 de minute",
      body: "Cel mai frecvent, ședințele au loc o dată pe săptămână, cu o durată de 50 de minute. Implicarea activă atât a pacientului, cât și a terapeutului, precum și încrederea reciprocă, sunt absolut necesare pentru atingerea obiectivelor stabilite la începutul terapiei.",
    },
    {
      icon: "PathIcon",
      label: "Durată",
      heading: "Pe termen scurt sau pe termen lung",
      body: "Psihoterapia se poate desfășura pe termen scurt (de la câteva săptămâni la câteva luni), pentru depășirea provocărilor imediate, sau pe termen lung (de la câteva luni la ani), pentru tratarea unor probleme complexe și profunde.",
    },
    {
      icon: "LockIcon",
      label: "Confidențialitate",
      heading: "Ce vorbim rămâne între noi",
      body: "Confidențialitatea ședințelor este o cerință de bază, morală, dar impusă și de legislația în vigoare.",
    },
  ],
} as const;

/**
 * Secțiunea „Abordarea mea terapeutică" de pe Acasă — apare după „Servicii",
 * înainte de „Cum funcționează ședințele". Grilă de carduri-glass peste creanga
 * de pe fundal alb (DESIGN-SYSTEM.md §3.4). `accent: true` → card verde plin;
 * restul sunt glass deschis. `icon` = numele componentei din
 * `components/icons.tsx`. O celulă e o fotografie, nu un card.
 */
export const approach = {
  eyebrow: "cum lucrez",
  heading: "Abordarea mea",
  headingAccent: "terapeutică",
  lead: "Fiecare om e diferit, așa că adaptez terapia la nevoile tale. Combin metode validate științific care te ajută să te înțelegi mai bine, să depășești blocajele și să faci schimbări care durează.",
  methods: [
    {
      slug: "mindfulness",
      icon: "LeafIcon",
      title: "Tehnici de mindfulness",
      blurb:
        "Exersezi prezența și blândețea față de tine, ca să răspunzi la ce simți în loc să reacționezi automat.",
      accent: true,
    },
    {
      slug: "gestalt",
      icon: "EyeIcon",
      title: "Terapie Gestalt",
      blurb:
        "Îți crești conștiența de sine și înțelegi mai bine emoțiile, nevoile și felul în care te raportezi la ceilalți.",
      accent: false,
    },
    {
      slug: "cbt",
      icon: "LoopIcon",
      title: "Terapie cognitiv-comportamentală (CBT)",
      blurb:
        "Observi tiparele de gândire care întrețin anxietatea și le înlocuiești treptat cu unele care te ajută.",
      accent: false,
    },
    {
      slug: "solutii",
      icon: "TargetIcon",
      title: "Terapie centrată pe soluții",
      blurb:
        "Lucrezi spre obiective concrete și pași realiști, pornind de la resursele pe care le ai deja.",
      accent: true,
    },
    {
      slug: "act",
      icon: "CompassIcon",
      title: "Terapia acceptării și angajamentului (ACT)",
      blurb:
        "Înveți să faci loc emoțiilor dificile și să te îndrepți spre o viață ghidată de valorile tale.",
      accent: false,
    },
  ],
  photo: {
    src: "/home/mountain.png",
    alt: "Dealuri verzi sub un cer noros — imagine de atmosferă pentru secțiunea despre metodă.",
  },
} as const;

export const CTA_LABEL = "Programează o ședință";
export const WHATSAPP_LABEL = "Scrie-mi pe WhatsApp";

/**
 * Bara de cifre din hero (brief §3.1).
 * `pending: true` → valoarea e `[DE COMPLETAT]` și trebuie confirmată de Maria
 * înainte de lansare. Nu se inventează cifre.
 *
 * Nu afișăm „ani de experiență": pentru publicul 30+ un număr mic de ani
 * lucrează împotriva încrederii. Punem în loc repere concrete și neutre la
 * trecerea timpului (formare, durata ședinței, locație).
 */
export const heroStats = [
  { value: "100 +", suffix: " ", label: "ședințe susținute", pending: true },
  { value: "50 minute", suffix: " ", label: "durata unei ședințe", pending: false },
  {
    value: "Sector 4",
    suffix: "",
    label: "ședințe la cabinet sau online",
    pending: false,
  },
] as const;
