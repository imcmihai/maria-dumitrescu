"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { story } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";

/* Secțiune „Povestea mea" (Acasă) — punte personală între Maria și cititor,
   așezată înaintea secțiunii „Servicii".
   Layout editorial pe 12 coloane:
     desktop → stânga: fotografie (rândul 1) + citat-accent și link (rândul 2);
               dreapta: titlu + textul integral al poveștii (ambele rânduri).
     telefon → o singură coloană, în ordinea de citit:
               foto → titlu → poveste → citat → link.
   Fundal crem cu aceeași linie organică ce se desenează singură ca pe cardurile
   din „Servicii" (`.line-art` + `.is-in`), aici întinsă discret pe toată
   secțiunea. Markup ca utilitare Tailwind inline; din globals.css doar
   primitivele reutilizabile: .line-art, .link-underline, [data-reveal]. */

/* Trasee lungi care traversează secțiunea diagonal — ecou al crengii din
   „Servicii". viewBox generic, întins pe secțiune cu preserveAspectRatio="none". */
const STORY_LINES = [
  "M-40 150 C 220 70 380 250 640 205 C 900 160 1040 330 1240 265",
  "M-40 430 C 200 360 360 520 620 470 C 900 416 1060 560 1240 505",
  "M175 -40 C 255 210 150 420 305 620 C 415 765 360 895 470 1040",
  "M-40 665 C 240 625 420 705 660 665 C 920 620 1050 705 1240 675",
];

function StoryLines() {
  return (
    <svg
      className="line-art"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      style={{ opacity: 0.09 }}
      aria-hidden
    >
      {STORY_LINES.map((d, i) => (
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

export default function Story() {
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
      id="povestea-mea"
      aria-labelledby="povestea-mea-titlu"
      className="relative isolate overflow-hidden bg-bg py-24 lg:py-32"
    >
      {/* Fundal — linia organică ce se desenează la intrarea în viewport. */}
      <div
        data-reveal="fade"
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <StoryLines />
      </div>

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-14">
          {/* Fotografia — desktop: stânga, rândul 1 */}
          <figure
            data-reveal
            className="mx-auto w-[min(78%,20rem)] sm:w-[min(58%,22rem)] lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:mx-0 lg:w-full lg:max-w-[24rem]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[6px]">
              <Image
                src="/home/maria2.png"
                alt="Maria Dumitrescu, psiholog și psihoterapeut, alături de câteva cărți de psihoterapie integrativă."
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 22rem, 78vw"
                className="object-cover"
              />
            </div>
          </figure>

          {/* Titlu + poveste — desktop: dreapta, ambele rânduri */}
          <div className="lg:col-start-6 lg:col-span-7 lg:row-start-1 lg:row-span-2">
            <header data-reveal>
              <h2
                id="povestea-mea-titlu"
                className="max-w-[18ch] text-balance font-sans text-[clamp(2rem,1rem+2.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink"
              >
                {story.heading} <em>{story.headingAccent}</em>
              </h2>
            </header>

            <div
              data-reveal
              style={{ "--reveal-delay": "90ms" } as CSSProperties}
              className="mt-10 flex max-w-[52ch] flex-col gap-5 text-ink-soft lg:mt-12"
            >
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Citat + link — desktop: stânga, sub fotografie (rândul 2) */}
          <div
            data-reveal
            className="lg:col-start-1 lg:col-span-5 lg:row-start-2 lg:self-start"
          >
            <blockquote className="max-w-[34ch]  border-accent font-display text-[clamp(1.5rem,1rem+1.4vw,2rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
              „{story.pullQuote}”
            </blockquote>

            <Link
              href="/despre"
              className="link-underline group-arrow mt-8 inline-flex text-sm"
            >
              Mai multe despre drumul meu
              <ArrowIcon className="arrow-slide h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
