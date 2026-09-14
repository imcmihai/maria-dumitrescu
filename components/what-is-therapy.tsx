import type { CSSProperties } from "react";
import Link from "next/link";
import { whatIsTherapy, CTA_LABEL } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";
import SectionHead from "@/components/section-head";

/* Secțiunea „Ce este psihoterapia" (Acasă) — 03. Blocul plin, verde-accent,
   cu colțuri generoase (ecou al panourilor din hero): singurul container
   închis la culoare al paginii, deci ancora ei vizuală. Pe desktop, două
   coloane inegale: stânga → primul paragraf ridicat ca frază-afirmație în
   Playfair italic, apoi restul textului și CTA-ul; dreapta → „tabelul" cu
   motivele frecvente, rânduri despărțite de linii care se desenează pe rând.
   `data-dark` comută cursorul custom pe crem. */

const THERAPY_LINES = [
  "M-40 230 C 210 150 370 330 630 285 C 890 240 1050 400 1240 335",
  "M-40 500 C 190 440 350 580 610 535 C 890 486 1060 610 1240 560",
  "M115 -40 C 210 230 120 450 290 650 C 405 790 340 910 450 1040",
];

function TherapyLines() {
  return (
    <svg
      className="line-art"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      style={{ color: "var(--color-on-accent)", opacity: 0.14 }}
      aria-hidden
    >
      {THERAPY_LINES.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={
            {
              "--line-delay": `${0.2 + i * 0.25}s`,
              transitionDuration: "2.6s",
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}

export default function WhatIsTherapy() {
  const [statement, ...rest] = whatIsTherapy.paragraphs;

  return (
    <section
      id="ce-este-psihoterapia"
      aria-labelledby="ce-este-psihoterapia-titlu"
      className="px-2.5 py-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          data-dark
          className="relative isolate overflow-hidden rounded-xl bg-accent px-6 py-16 text-on-accent sm:px-10 lg:px-16 lg:py-24 xl:px-24"
        >
          <div
            data-reveal="fade"
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <TherapyLines />
          </div>

          <SectionHead
            index="03"
            eyebrow={whatIsTherapy.eyebrow}
            heading={whatIsTherapy.heading}
            accent={whatIsTherapy.headingAccent}
            tone="on-accent"
            id="ce-este-psihoterapia-titlu"
            headingClassName="max-w-[13ch]"
          />

          <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-16">
            {/* Stânga — afirmație + text + CTA */}
            <div className="lg:col-span-6">
              <p data-reveal className="quote-display max-w-[24ch] text-on-accent">
                {statement}
              </p>

              <div
                data-reveal-group
                className="mt-9 flex max-w-[50ch] flex-col gap-5 text-on-accent-soft"
              >
                {rest.map((paragraph, i) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    data-reveal-child
                    style={{ "--i": i } as CSSProperties}
                    className="leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                data-reveal
                style={{ "--reveal-delay": "200ms" } as CSSProperties}
                className="mt-11 flex items-center gap-3"
              >
                <Link href="/contact" className="btn btn-on-accent group-arrow py-[18px]">
                  <span>{CTA_LABEL}</span>
                </Link>
                <Link
                  href="/contact"
                  aria-label={CTA_LABEL}
                  className="btn-icon btn-icon-on-accent"
                >
                  <ArrowIcon className="arrow-slide h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Dreapta — motivele frecvente, pe două grupuri */}
            <div className="lg:col-span-5 lg:col-start-8">
              <h3 className="eyebrow text-on-accent">{whatIsTherapy.addressesTitle}</h3>

              {whatIsTherapy.addressGroups.map((group, gi) => (
                <div
                  key={group.title}
                  data-reveal-group
                  className={gi === 0 ? "mt-8" : "mt-12"}
                  style={{ "--stagger": "60ms" } as CSSProperties}
                >
                  <p className="font-display text-xl italic text-on-accent-soft">
                    {group.title}
                  </p>
                  <ul className="mt-4">
                    {group.items.map((item, i) => (
                      <li
                        key={item}
                        data-reveal-child
                        style={{ "--i": i } as CSSProperties}
                        className="relative"
                      >
                        <span
                          className="rule-draw rule-draw--on-accent absolute inset-x-0 top-0"
                          style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                          aria-hidden
                        />
                        <span className="flex items-baseline gap-3 py-3.5 text-lg leading-snug text-on-accent lg:text-xl">
                          <AsteriskMark className="h-2.5 w-2.5 shrink-0 translate-y-1 text-on-accent-soft" />
                          {item}
                        </span>
                      </li>
                    ))}
                    <li aria-hidden className="rule-draw rule-draw--on-accent" />
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
