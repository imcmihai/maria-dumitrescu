"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { testimonials } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import SectionHead from "@/components/section-head";

/* Secțiunea „Recomandări" (Acasă) — 07. Cea mai aerisită secțiune a paginii:
   un singur citat mare, ca obiect grafic — ghilimeaua Playfair uriașă în bej,
   textul pe `.quote-display`, atribuirea sub o linie scurtă. Se schimbă cu
   săgețile sau tastatura (contor „01 / 03”); fiecare citat nou intră cu
   aceeași animație de urcare ca restul paginii. `excerpt` = tăietura pentru
   web; textul integral rămâne în `lib/site.ts` pentru pagina dedicată. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.items.length;
  const current = testimonials.items[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <section
      id="recomandari"
      aria-labelledby="recomandari-titlu"
      className="section-y relative overflow-hidden bg-bg"
    >
      <div className="shell">
        <SectionHead
          index="07"
          eyebrow={testimonials.eyebrow}
          heading={testimonials.heading}
          accent={testimonials.headingAccent}
          id="recomandari-titlu"
          headingClassName="max-w-[16ch]"
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          {/* Contor + navigare */}
          <div
            data-reveal
            className="flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-start"
          >
            <p className="numeral text-[2.4rem] text-ink" aria-live="off">
              <span className="text-accent">0{index + 1}</span>
              <span className="mx-2 text-ink-faint">/</span>
              <span className="text-ink-faint">0{total}</span>
            </p>
            <div className="flex items-center gap-2 lg:mt-8">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Recomandarea anterioară"
                className="btn-icon btn-icon-ghost"
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Recomandarea următoare"
                className="btn-icon btn-icon-ghost"
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Citatul */}
          <div
            data-reveal
            style={{ "--reveal-delay": "150ms" } as CSSProperties}
            className="relative lg:col-span-9"
          >
            <span
              aria-hidden
              className="numeral pointer-events-none absolute -left-3 -top-[0.42em] select-none text-panel"
              style={{ fontSize: "clamp(9rem, 18vw, 15rem)", lineHeight: 1 }}
            >
              „
            </span>

            <div aria-live="polite" className="relative">
              <figure key={index} data-enter="rise">
                <blockquote className="quote-display max-w-[32ch] text-ink">
                  {current.excerpt}
                </blockquote>
                <figcaption className="mt-9 flex items-center gap-4">
                  <span aria-hidden className="h-px w-10 bg-accent" />
                  <span className="eyebrow text-ink">
                    {current.name}, {current.age} de ani
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Indicatori */}
            <ol className="mt-10 flex gap-2" aria-label="Alege recomandarea">
              {testimonials.items.map((item, i) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Recomandarea ${i + 1}: ${item.name}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`block h-1 rounded-full transition-all duration-500 ease-out ${
                      i === index ? "w-10 bg-accent" : "w-4 bg-line-strong hover:bg-ink-faint"
                    }`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
