"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { whatIsTherapy, CTA_LABEL } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";

/* Secțiune „Ce este psihoterapia" (Acasă) — rol educativ, așezată după
   „Povestea mea". Un singur container plin, verde-accent, cu colțuri generos
   rotunjite (ecou al panourilor din hero). Pe desktop, două coloane:
     stânga → eyebrow + titlu + textul integral + CTA (perechea buton + săgeată
              ca în hero);
     dreapta → „tabelul" cu ce poate aborda psihoterapia, listă cu rânduri
               despărțite prin linii subțiri și font mărit.
   Linia organică din fundal (`.line-art` + `.is-in`) e recolorată pentru
   fundalul accent. Markup ca utilitare Tailwind inline; din globals.css doar
   primitivele reutilizabile: .line-art, .btn*, .eyebrow, [data-reveal]. */

/* Trasee lungi care traversează containerul diagonal — ecou al crengii din
   „Servicii". viewBox generic, întins pe container cu preserveAspectRatio="none". */
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
      style={{ color: "var(--color-on-accent)", opacity: 0.16 }}
      aria-hidden
    >
      {THERAPY_LINES.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={
            {
              "--line-delay": `${0.15 + i * 0.25}s`,
              transitionDuration: "2.6s",
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}

export default function WhatIsTherapy() {
  const rootRef = useRef<HTMLElement>(null);

  /* Reveal la scroll — pune `.is-in` pe `[data-reveal]` când intră în viewport.
     Fără IntersectionObserver, totul devine vizibil imediat. */
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="ce-este-psihoterapia"
      aria-labelledby="ce-este-psihoterapia-titlu"
      className="px-2.5 py-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-accent px-6 py-14 text-on-accent sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-20 2xl:px-28">
          {/* Fundal — linia organică ce se desenează la intrarea în viewport. */}
          <div
            data-reveal="fade"
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <TherapyLines />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
            {/* Stânga — eyebrow + titlu + text + CTA */}
            <div data-reveal>

              <h2
                id="ce-este-psihoterapia-titlu"
                className=" max-w-[16ch] text-balance font-sans text-[clamp(2rem,1rem+2.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-on-accent"
              >
                {whatIsTherapy.heading}{" "}
                <em className="text-on-accent">{whatIsTherapy.headingAccent}</em>
              </h2>

              <div className="mt-8 flex max-w-[54ch] flex-col gap-5 text-on-accent-soft lg:mt-10">
                {whatIsTherapy.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>


            </div>

            {/* Dreapta — „tabelul" cu ce poate aborda psihoterapia */}
            <div data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              <h3
                className="eyebrow text-[1rem] flex items-center gap-2"
                style={{ color: "var(--color-on-accent)" }}
              >

                {whatIsTherapy.addressesTitle}
              </h3>
              <ul className="mt-5 border-t border-[color:var(--color-line-on-accent)] lg:mt-7">
                {whatIsTherapy.addresses.map((item, i) => (
                  <li
                    key={item}
                    data-reveal
                    style={
                      { "--reveal-delay": `${140 + i * 40}ms` } as CSSProperties
                    }
                    className="flex items-baseline gap-3 border-b border-[color:var(--color-line-on-accent)] py-3.5 text-lg leading-snug text-on-accent lg:text-xl"
                  >
                    <AsteriskMark className="h-2.5 w-2.5 shrink-0 translate-y-1 text-on-accent/70" />
                    {item}
                  </li>
                ))}
              </ul>
                            <div className="mt-10 flex items-center gap-3 lg:mt-12">
                <Link
                  href="/contact"
                  className="btn btn-on-accent group-arrow py-[18px]"
                >
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
          </div>
        </div>
      </div>
    </section>
  );
}
