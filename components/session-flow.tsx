"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { sessionFlow, CTA_LABEL } from "@/lib/site";
import {
  ArrowIcon,
  AsteriskMark,
  ClockIcon,
  HeartIcon,
  LockIcon,
  PathIcon,
} from "@/components/icons";

/* Secțiune „Cum funcționează ședințele" (Acasă) — traseu vertical, cronologic,
   așezat după „Servicii". Fiecare pas: nod cu iconiță pe o coloană din stânga,
   text în dreapta. Coloana verticală care leagă nodurile e aceeași linie
   organică din „Servicii"/„Povestea mea" (`.line-art` + `.is-in`), aici trasată
   pe verticală și desenându-se singură la intrarea în viewport.
   Markup ca utilitare Tailwind inline; din globals.css doar primitivele
   reutilizabile: .line-art, .link-underline, .eyebrow, [data-reveal]. */

const ICONS = {
  HeartIcon,
  ClockIcon,
  PathIcon,
  LockIcon,
} as const;

function Spine() {
  return (
    <svg
      className="line-art"
      viewBox="0 0 2 600"
      preserveAspectRatio="none"
      style={{ opacity: 0.32 }}
      aria-hidden
    >
      <path
        d="M1 0V600"
        pathLength={1}
        style={{ transitionDuration: "2.8s" } as CSSProperties}
      />
    </svg>
  );
}

export default function SessionFlow() {
  const rootRef = useRef<HTMLElement>(null);

  /* Reveal la scroll — pune `.is-in` pe `[data-reveal]` când intră în viewport;
     asta declanșează și fade-ul pașilor, și desenarea coloanei verticale.
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
      <div className="shell">
        <header
          data-reveal
          className="mx-auto mb-16 max-w-2xl text-center lg:mb-24"
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

        <ol className="relative mx-auto max-w-3xl">
          {/* Coloana verticală care leagă nodurile — se desenează la reveal. */}
          <div
            data-reveal="fade"
            aria-hidden
            className="pointer-events-none absolute left-[1.375rem] top-4 bottom-8 w-0.5 -translate-x-1/2 lg:left-[1.75rem]"
          >
            <Spine />
          </div>

          {sessionFlow.steps.map((step, i) => {
            const Icon = ICONS[step.icon];
            const isLast = i === sessionFlow.steps.length - 1;
            return (
              <li
                key={step.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className={`relative flex gap-5 lg:gap-8 ${
                  isLast ? "" : "pb-12 lg:pb-16"
                }`}
              >
                <span
                  aria-hidden
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-accent text-on-accent shadow-[0_14px_30px_-16px_rgba(72,67,67,0.5)] lg:h-14 lg:w-14"
                >
                  <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                </span>

                <div className="flex-1 pt-0.5 lg:pt-2">
                  <p className="eyebrow flex items-center gap-2">
                    <span className="font-sans not-italic text-accent">
                      0{i + 1}
                    </span>
                    {step.label}
                  </p>
                  <h3 className="mt-2 font-sans text-[clamp(1.35rem,1rem+1vw,1.8rem)] font-medium leading-tight tracking-[-0.01em] text-ink">
                    {step.heading}
                  </h3>
                  <p className="mt-3 max-w-[54ch] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          data-reveal
          className="mx-auto mt-16 flex max-w-3xl pl-[calc(2.75rem+1.25rem)] lg:mt-20 lg:pl-[calc(3.5rem+2rem)]"
        >
          <Link
            href="/contact"
            className="link-underline group-arrow text-sm"
          >
            {CTA_LABEL}
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
