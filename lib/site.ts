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

export const CTA_LABEL = "Programează o ședință";
export const WHATSAPP_LABEL = "Scrie-mi pe WhatsApp";

/**
 * Bara de cifre din hero (brief §3.1).
 * `pending: true` → valoarea e `[DE COMPLETAT]` și trebuie confirmată de Maria
 * înainte de lansare. Nu se inventează cifre.
 */
export const heroStats = [
  { value: "1", suffix: "", label: "ani de experiență", pending: true },
  { value: "100", suffix: "+", label: "ședințe susținute", pending: true },
  {
    value: "Sector 4",
    suffix: "",
    label: "ședințe la cabinet sau online",
    pending: false,
  },
] as const;
