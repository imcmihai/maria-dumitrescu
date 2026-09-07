"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { clientPortraits } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";

/* Secțiune „Cine vine la cabinet" (Acasă) — portrete-tip, nu persoane reale.
   Așezată după „Servicii". Grilă de carduri crem: fiecare card e o vinietă —
   fraza de deschidere cu accent serif + continuarea după „…".
   Fundal bej deschis cu aceeași linie organică ce se desenează singură ca în
   „Povestea mea" (`.line-art` + `.is-in`). Markup ca utilitare Tailwind inline;
   din globals.css doar primitivele reutilizabile: .line-art, .link-underline,
   .eyebrow, [data-reveal]. */

/* Trasee lungi care traversează secțiunea diagonal — ecou al crengii din
   „Servicii". viewBox generic, întins pe secțiune cu preserveAspectRatio="none". */
const PORTRAIT_LINES = [
  "M-40 190 C 220 110 380 300 640 250 C 900 200 1040 380 1240 310",
  "M-40 470 C 200 400 360 560 620 510 C 900 456 1060 600 1240 545",
  "M140 -40 C 240 220 130 440 300 640 C 420 780 350 900 460 1040",
];

function PortraitLines() {
  return (
    <svg
      className="line-art"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      style={{ opacity: 0.09 }}
      aria-hidden
    >
      {PORTRAIT_LINES.map((d, i) => (
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

export default function ClientPortraits() {
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
      id="cine-vine-la-cabinet"
      aria-labelledby="cine-vine-la-cabinet-titlu"
      className="relative isolate overflow-hidden py-24 lg:py-32"
    >
      {/* Fundal — linia organică ce se desenează la intrarea în viewport. */}
      <div
        data-reveal="fade"
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <PortraitLines />
      </div>

      <div className="shell">
        <header
          data-reveal
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-20"
        >
          <p className="eyebrow inline-flex items-center gap-2">
            <AsteriskMark className="h-3 w-3 text-accent" />
            {clientPortraits.eyebrow}
          </p>
          <h2
            id="cine-vine-la-cabinet-titlu"
            className="mt-4 text-balance font-sans text-[clamp(2rem,1rem+2.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {clientPortraits.heading} <em>{clientPortraits.headingAccent}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-ink-soft">
            {clientPortraits.lead}
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {clientPortraits.portraits.map((portrait, i) => (
            <li
              key={portrait.intro}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              className={
                i === clientPortraits.portraits.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-0.75rem)]"
                  : ""
              }
            >
              <article className="card card-cream bg-panel-2 flex h-full flex-col gap-3" >
                <h3 className="font-sans text-[1.75rem] font-light leading-snug tracking-[-0.01em] text-ink">
                  {portrait.intro}
                </h3>
                <p className="max-w-[46ch] text-sm leading-relaxed text-ink-soft">
                  <span aria-hidden className="text-accent">
                    …{" "}
                  </span>
                  {portrait.body}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-14 flex justify-center lg:mt-20">
          <Link
            href="/pentru-cine"
            className="link-underline group-arrow text-sm"
          >
            Vezi cu ce lucrez cel mai des
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
