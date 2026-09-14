import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeServices } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import SectionHead from "@/components/section-head";

/* Secțiunea „Servicii" (Acasă) — 04. Singura grilă de carduri a paginii:
   trei carduri înalte, decalate pe verticală, peste creanga din fundal
   (`mix-blend-multiply` face albul să dispară în crem). Fiecare card: index
   Playfair mare (`.area-index`), titlu, o propoziție, link spre ancora din
   `/servicii`. Linia organică se desenează la intrarea în viewport. Antet
   „split” cu link spre tarife în coloana din dreapta. */

const LINE_SETS: string[][] = [
  [
    "M-10 300 C 60 250 90 195 150 188 C 214 180 250 128 320 88",
    "M-10 342 C 70 300 112 250 172 236 C 244 219 282 168 332 128",
    "M-10 252 C 40 222 82 150 142 140 C 214 128 260 78 320 36",
  ],
  [
    "M-10 96 C 60 132 92 192 152 208 C 214 224 262 272 332 300",
    "M-10 136 C 72 172 122 222 182 238 C 252 255 292 300 332 332",
    "M-10 52 C 52 92 92 150 152 168 C 224 186 272 220 332 250",
  ],
  [
    "M44 -10 C 82 72 60 152 122 212 C 182 272 160 330 202 400",
    "M92 -10 C 132 82 112 162 172 222 C 222 276 212 340 242 400",
    "M-10 44 C 72 92 122 132 152 202 C 182 276 150 332 192 400",
  ],
];

function ServiceLines({ index }: { index: number }) {
  const paths = LINE_SETS[index % LINE_SETS.length];
  return (
    <svg
      className="line-art"
      viewBox="0 0 320 380"
      preserveAspectRatio="none"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={{ "--line-delay": `${0.3 + i * 0.22}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

const OFFSETS = ["", "lg:translate-y-14", "lg:translate-y-6"];

export default function Services() {
  return (
    <section
      id="servicii-acasa"
      aria-labelledby="servicii-acasa-titlu"
      className="section-y relative isolate overflow-hidden"
    >
      {/* Fundal — crem plin + creanga peste el (albul iese la multiply). */}
      <div className="absolute inset-0 -z-10 bg-bg" />
      <Image
        src="/home/brenches.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-top opacity-80 mix-blend-multiply lg:object-right-top"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/70 via-bg/10 to-bg"
      />

      <div className="shell">
        <SectionHead
          index="04"
          eyebrow="servicii"
          heading="Cum putem lucra"
          accent="împreună"
          layout="split"
          id="servicii-acasa-titlu"
          aside={
            <Link href="/tarife" className="link-underline group-arrow self-start text-sm">
              Vezi serviciile și tarifele
              <ArrowIcon className="arrow-slide h-4 w-4" />
            </Link>
          }
        />

        <ul
          data-reveal-group
          style={{ "--stagger": "120ms" } as CSSProperties}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6"
        >
          {homeServices.map((service, i) => {
            const accent = i === 1;
            return (
              <li
                key={service.slug}
                data-reveal-child
                style={{ "--i": i } as CSSProperties}
                className={`${OFFSETS[i]} max-lg:[&:last-child]:sm:col-span-2`}
              >
                <Link
                  href={`/servicii#${service.slug}`}
                  className={`card card-lift group relative flex h-full min-h-[22rem] flex-col overflow-hidden ${
                    accent ? "card-accent" : "card-cream"
                  }`}
                >
                  <ServiceLines index={i} />

                  <span className="area-index relative z-10">0{i + 1}</span>

                  <div className="relative z-10 mt-auto flex flex-col gap-3 pt-14">
                    <h3
                      className={`font-sans text-[1.4rem] font-medium leading-tight tracking-[-0.01em] ${
                        accent ? "text-on-accent" : "text-ink"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`max-w-[34ch] text-sm leading-relaxed ${
                        accent ? "text-on-accent-soft" : "text-ink-soft"
                      }`}
                    >
                      {service.blurb}
                    </p>
                    <span
                      className={`link-underline mt-2 text-sm ${
                        accent ? "text-on-accent" : ""
                      }`}
                    >
                      Află mai multe
                      <ArrowIcon className="arrow-slide h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
