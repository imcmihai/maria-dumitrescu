import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { site, hero, heroStats, CTA_LABEL } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";
import Words from "@/components/words";
import Magnetic from "@/components/magnetic";

/* Hero — pattern DESIGN-SYSTEM.md §3.2. Două panouri pe tot ecranul:
     stânga → text pe bej, aliniat la stânga și ancorat jos: eyebrow, H1 pe
              `.headline-1` (reveal pe cuvinte), lead + CTA magnetic, linie de
              meta cu indiciu de derulare;
     dreapta → fotografie de fundal (dealuri), portret „polaroid” centrat pe
              coloană, bara de cifre pe sticlă.
   Tipografie: Helvetica peste tot; Playfair pe accentul din titlu, cifre și
   legende. Antetul e în layout (`SiteHeader`), suprapus peste ambele panouri. */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-titlu"
      className="relative grid grid-cols-1 gap-2.5 bg-bg p-2.5 lg:min-h-svh lg:grid-cols-2"
    >
      {/* Panoul de text */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-panel px-6 pb-7 pt-32 sm:px-12 lg:px-16 lg:pb-9 lg:pt-36">
        <div>
          <p
            data-enter="rise"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
            className="eyebrow inline-flex items-center gap-2.5"
          >
            <AsteriskMark className="h-3 w-3 text-accent" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-titlu"
            className="headline-1 mt-9 max-w-[14ch] text-ink lg:mt-10"
          >
            <Words text={hero.heading} accent={hero.headingAccent} delay={350} />
          </h1>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-16">
          <p
            data-enter="rise"
            style={{ "--enter-delay": "800ms" } as CSSProperties}
            className="max-w-[40ch] text-lg leading-snug text-ink-soft"
          >
            {hero.lead}
          </p>

          <div
            data-enter="rise"
            style={{ "--enter-delay": "950ms" } as CSSProperties}
            className="flex items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="btn btn-primary group-arrow py-[18px] pl-7 pr-6"
              >
                <span>{CTA_LABEL}</span>
                <ArrowIcon className="arrow-slide h-4 w-4" />
              </Link>
            </Magnetic>
            <Link
              href="/contact"
              aria-label={CTA_LABEL}
              className="btn-icon sm:hidden"
            >
              <ArrowIcon className="arrow-slide h-4 w-4" />
            </Link>
          </div>
        </div>

        <div
          data-enter="fade"
          style={{ "--enter-delay": "1300ms" } as CSSProperties}
          className="mt-12 flex items-center justify-between gap-6 border-t border-line pt-5 lg:mt-14"
        >
          <span className="mono-label text-ink-faint">{site.role}</span>
          <span className="mono-label inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-ink-faint">
            ( {hero.scrollCue} )
            <ArrowIcon aria-hidden className="h-3.5 w-3.5 rotate-90 text-accent" />
          </span>
        </div>
      </div>

      {/* Panoul vizual */}
      <div
        data-enter="fade"
        style={{ "--enter-delay": "250ms" } as CSSProperties}
        className="relative flex min-h-[80svh] flex-col items-center justify-between gap-8 p-4 sm:p-6 lg:min-h-0"
      >
        {/* Fundalul e într-un strat propriu, decupat cu colțuri rotunjite, ca
            portretul să poată ieși peste cusătura panourilor. */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-xl bg-panel-2"
        >
          <Image
            src="/home/hero-background.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            data-enter="zoom"
          />
        </div>

        {/* IMG: hero-maria | portret 4:5 | cadru: polaroid */}
        <figure
          data-enter="rise"
          style={{ "--enter-delay": "650ms" } as CSSProperties}
          className="relative z-10 mt-[5vh] w-[min(62%,14.5rem)] shrink-0 lg:mt-[9vh] lg:w-[min(48%,25rem)] lg:self-center"
        >
          <div className="photo-float float-slow bg-panel">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
              <Image
                src="/home/maria-hero.png"
                alt={`${site.name}, ${site.role.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 25rem, 14.5rem"
                className="object-cover object-[50%_18%]"
              />
            </div>
            <figcaption className="mt-2.5 flex items-center justify-between gap-3 px-0.5 text-xs text-ink">
              <span className="italic">( {hero.caption} )</span>
              <AsteriskMark className="h-3 w-3 text-accent" />
            </figcaption>
          </div>
        </figure>

        <div
          data-enter="rise"
          style={{ "--enter-delay": "900ms" } as CSSProperties}
          className="stat-bar glass relative z-10 w-full rounded-lg p-5 sm:p-7 lg:p-8"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="min-w-0 px-3 first:pl-0 last:pr-0 sm:px-5">
              <div className="stat-num">
                {stat.value}
                {stat.suffix ? (
                  stat.suffix.trim().length > 1 ? (
                    <span className="stat-suffix">{stat.suffix.trim()}</span>
                  ) : (
                    <sup>{stat.suffix}</sup>
                  )
                ) : null}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
