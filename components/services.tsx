"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeServices } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";

/* Secțiune „Servicii" pe Acasă (brief §3.1 — „Cum putem lucra împreună").
   Card-based: index mare + titlu + o propoziție + link spre ancora din
   pagina /servicii. Fundal de secțiune: creanga din public/home, cu
   `mix-blend-multiply` ca albul să dispară în crem. Layout ca utilitare
   Tailwind inline; globals.css ține doar `.line-art` (linia animată). */

/* Trei seturi de trasee organice, câte unul per card — curbe care traversează
   diagonal cardul, evocând creanga din fundal. viewBox generic, întins pe card
   cu preserveAspectRatio="none". */
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
          style={{ "--line-delay": `${0.2 + i * 0.22}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  /* Reveal la scroll: pune `.is-in` pe elementele `[data-reveal]` din secțiune
     când intră în viewport — declanșează și fade-ul cardului, și desenarea
     liniei. Fără IntersectionObserver, totul devine vizibil imediat. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
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
      id="servicii-acasa"
      aria-labelledby="servicii-acasa-titlu"
      className="relative isolate flex items-center overflow-hidden py-24 lg:min-h-svh lg:py-32"
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
      {/* Voal discret ca fundalul să nu concureze cu cardurile. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/60 via-bg/10 to-bg"
      />

      <div className="shell w-full">
        <header
          data-reveal
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-20"
        >
          <p className="eyebrow inline-flex items-center gap-2">
            <AsteriskMark className="h-3 w-3 text-accent" />
            servicii
          </p>
          <h2
            id="servicii-acasa-titlu"
            className="mt-4 text-balance font-sans text-[clamp(2rem,1rem+2.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink"
          >
            Cum putem lucra <em>împreună</em>
          </h2>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {homeServices.map((service, i) => {
            const accent = i === 1;
            const offset =
              i === 1 ? "lg:translate-y-12" : i === 2 ? "lg:translate-y-5" : "";
            return (
              <li
                key={service.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className={`${offset} max-lg:[&:last-child]:sm:col-span-2`}
              >
                <Link
                  href={`/servicii#${service.slug}`}
                  className={`card card-lift group relative flex h-full min-h-[18rem] flex-col overflow-hidden ${
                    accent ? "card-accent" : "card-cream"
                  }`}
                >
                  <ServiceLines index={i} />

                  <span
                    className={`relative z-10 font-sans text-[clamp(2.4rem,1.4rem+3vw,3.6rem)] font-light leading-none tracking-[-0.02em] ${
                      accent ? "text-on-accent" : "text-accent"
                    }`}
                  >
                    0{i + 1}
                  </span>

                  <div className="relative z-10 mt-auto flex flex-col gap-3 pt-10">
                    <h3 className="font-sans text-[1.35rem] font-medium leading-tight tracking-[-0.01em]">
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
                      className={`link-underline mt-1 text-sm ${
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
