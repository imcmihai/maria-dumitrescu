"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { approach } from "@/lib/site";
import {
  AsteriskMark,
  CompassIcon,
  EyeIcon,
  LeafIcon,
  LoopIcon,
  TargetIcon,
} from "@/components/icons";

/* Secțiune „Abordarea mea terapeutică" (Acasă) — apare după „Servicii".
   Fundal alb + creanga `brenches2.png` peste el (albul iese la `mix-blend-multiply`).
   Carduri-glass așezate într-o grilă decalată pe coloane (ca în referință):
   un card verde plin domină fiecare rând, restul sunt frost deschis, iar o
   celulă e o fotografie. Secțiunea ocupă tot ecranul (`lg:min-h-svh`).
   Stilul urmează `components/services.tsx`; din globals.css: `.card-glass`,
   `.icon-badge`, `.line-art`, `.eyebrow`, `[data-reveal]`. */

const ICONS = { LeafIcon, EyeIcon, LoopIcon, TargetIcon, CompassIcon } as const;

/* Trasee organice diagonale, câte un set per card — ecou al crengii din fundal.
   viewBox generic, întins pe card cu preserveAspectRatio="none". */
const LINE_SETS: string[][] = [
  [
    "M-10 280 C 70 240 96 180 156 172 C 220 164 250 112 322 74",
    "M-10 322 C 78 286 120 232 180 220 C 250 206 288 152 332 116",
    "M-10 234 C 48 206 88 138 148 126 C 220 112 262 66 322 26",
  ],
  [
    "M-10 110 C 66 142 100 200 160 216 C 222 232 268 280 332 306",
    "M-10 150 C 78 184 128 232 188 246 C 256 262 296 306 332 336",
    "M-10 64 C 56 100 98 156 158 176 C 228 198 274 228 332 258",
  ],
  [
    "M52 -10 C 88 76 66 156 128 216 C 186 274 164 332 206 404",
    "M100 -10 C 138 84 116 166 176 224 C 226 278 216 342 246 404",
    "M-10 52 C 74 96 122 138 154 208 C 186 282 152 336 196 404",
  ],
];

function ApproachLines({ index }: { index: number }) {
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
          style={{ "--line-delay": `${0.2 + i * 0.22}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/* Decalajul pe coloane (doar desktop) + înălțimea minimă per celulă — dau
   ritmul „masonry" din referință. Ordinea celulelor: metodă, metodă, FOTO,
   metodă, metodă, metodă. */
const COL_OFFSET = [
  "",
  "lg:translate-y-12",
  "lg:translate-y-6",
  "",
  "lg:translate-y-12",
  "lg:translate-y-6",
];
const MIN_H = [
  "lg:min-h-[23rem]",
  "lg:min-h-[19rem]",
  "lg:min-h-[19rem]",
  "lg:min-h-[18rem]",
  "lg:min-h-[21rem]",
  "lg:min-h-[18rem]",
];

type Method = (typeof approach.methods)[number];

type Cell = { kind: "method"; method: Method } | { kind: "photo" };

function MethodCard({ method, minH, lineIndex }: {
  method: Method;
  minH: string;
  lineIndex: number;
}) {
  const Icon = ICONS[method.icon];
  return (
    <article
      className={`relative flex h-full min-h-[15rem] flex-col overflow-hidden ${
        method.accent ? "card-glass card-glass--accent" : "card-glass"
      } ${minH}`}
    >
      <ApproachLines index={lineIndex} />

      <span className="icon-badge relative z-10">
        <Icon className="h-6 w-6" />
      </span>

      <div className="relative z-10 mt-auto flex flex-col gap-2.5 pt-10">
        <h3
          className={`font-sans text-[1.3rem] font-medium leading-tight tracking-[-0.01em] ${
            method.accent ? "text-on-accent" : "text-ink"
          }`}
        >
          {method.title}
        </h3>
        <p
          className={`max-w-[34ch] text-sm leading-relaxed ${
            method.accent ? "text-on-accent-soft" : "text-ink-soft"
          }`}
        >
          {method.blurb}
        </p>
      </div>
    </article>
  );
}

const CELLS: Cell[] = [
  { kind: "method", method: approach.methods[0] },
  { kind: "method", method: approach.methods[1] },
  { kind: "photo" },
  { kind: "method", method: approach.methods[2] },
  { kind: "method", method: approach.methods[3] },
  { kind: "method", method: approach.methods[4] },
];

export default function Approach() {
  const rootRef = useRef<HTMLElement>(null);

  /* Reveal la scroll — pune `.is-in` pe `[data-reveal]` la intrarea în viewport;
     declanșează fade-ul cardurilor și desenarea liniilor. Fără
     IntersectionObserver, totul devine vizibil imediat. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="abordare-terapeutica"
      aria-labelledby="abordare-terapeutica-titlu"
      className="relative isolate flex items-center overflow-hidden py-24 lg:min-h-svh lg:py-32"
    >
      {/* Fundal — alb plin + creanga peste el (albul iese la multiply). */}
      <div className="absolute inset-0 -z-10 bg-surface" />
      <Image
        src="/home/brenches2.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-top opacity-90 mix-blend-multiply lg:object-right-top"
      />
      {/* Voal discret ca creanga să nu concureze cu cardurile-glass. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-surface/70 via-surface/10 to-surface"
      />

      <div className="shell w-full">
        <header
          data-reveal
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-20"
        >
          <p className="eyebrow inline-flex items-center gap-2">
            <AsteriskMark className="h-3 w-3 text-accent" />
            {approach.eyebrow}
          </p>
          <h2
            id="abordare-terapeutica-titlu"
            className="mt-4 text-balance font-sans text-[clamp(2rem,1rem+2.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {approach.heading} <em>{approach.headingAccent}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-ink-soft">
            {approach.lead}
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-6">
          {CELLS.map((cell, i) => (
            <li
              key={cell.kind === "photo" ? "photo" : cell.method.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
              className={COL_OFFSET[i]}
            >
              {cell.kind === "photo" ? (
                <figure
                  className={`relative w-full overflow-hidden rounded-[18px] border border-line aspect-[16/11] lg:aspect-auto lg:h-full ${MIN_H[i]}`}
                >
                  <Image
                    src={approach.photo.src}
                    alt={approach.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              ) : (
                <MethodCard
                  method={cell.method}
                  minH={MIN_H[i]}
                  lineIndex={i}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
