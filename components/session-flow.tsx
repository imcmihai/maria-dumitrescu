"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { sessionFlow, CTA_LABEL } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";

/* Secțiune „Cum funcționează ședințele" (Acasă) — așezată după „Servicii", ca
   ultim reper practic înainte de contact. Index editorial: fiecare pas e un
   rând despărțit de linii subțiri — număr Playfair în stânga, reperul scurt și
   textul în dreapta. Fără iconițe, fără coloană-nod: aceleași primitive ca în
   restul paginii (`.line-art`, `.eyebrow`, `.link-underline`, [data-reveal]).
   Pe mobil rândul se stivuiește; pe desktop cele trei zone stau pe o grilă. */

/* Trasee lungi care traversează secțiunea diagonal — ecou al crengii din
   „Servicii". viewBox generic, întins pe secțiune cu preserveAspectRatio="none". */
const FLOW_LINES = [
  "M-40 210 C 220 130 380 320 640 270 C 900 220 1040 400 1240 330",
  "M-40 490 C 200 420 360 580 620 530 C 900 476 1060 620 1240 565",
  "M160 -40 C 250 220 140 440 310 640 C 430 780 360 900 470 1040",
];

function FlowLines() {
  return (
    <svg
      className="line-art"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      style={{ opacity: 0.09 }}
      aria-hidden
    >
      {FLOW_LINES.map((d, i) => (
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

export default function SessionFlow() {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="cum-functioneaza-sedintele"
      aria-labelledby="cum-functioneaza-sedintele-titlu"
      className="relative isolate overflow-hidden bg-panel-2 py-24 lg:py-32"
    >
      {/* Fundal — linia organică ce se desenează la intrarea în viewport. */}
      <div
        data-reveal="fade"
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <FlowLines />
      </div>

      <div className="shell">
        <header
          data-reveal
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-20"
        >
          <p className="eyebrow inline-flex items-center gap-2">
            <AsteriskMark className="h-3 w-3 text-accent" />
            {sessionFlow.eyebrow}
          </p>
          <h2
            id="cum-functioneaza-sedintele-titlu"
            className="mt-4 text-balance font-sans text-[clamp(2rem,1rem+2.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {sessionFlow.heading} <em>{sessionFlow.headingAccent}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-ink-soft">
            {sessionFlow.lead}
          </p>
        </header>

        <ol className="mx-auto max-w-4xl border-t border-[color:var(--color-line)]">
          {sessionFlow.steps.map((step, i) => (
            <li
              key={step.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
              className="grid gap-x-8 gap-y-3 border-b border-[color:var(--color-line)] py-8 lg:grid-cols-[4rem_minmax(0,15rem)_1fr] lg:py-10"
            >
              <span
                aria-hidden
                className="font-display text-[2rem] font-medium leading-none text-accent lg:text-[2.4rem]"
              >
                0{i + 1}
              </span>

              <div>
                <p className="eyebrow text-accent">{step.label}</p>
                <h3 className="mt-2 font-sans text-[clamp(1.3rem,1rem+0.9vw,1.7rem)] font-medium leading-tight tracking-[-0.01em] text-ink">
                  {step.heading}
                </h3>
              </div>

              <p className="max-w-[54ch] leading-relaxed text-ink-soft lg:pt-1">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-14 flex justify-center lg:mt-20">
          <Link href="/contact" className="link-underline group-arrow text-sm">
            {CTA_LABEL}
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
