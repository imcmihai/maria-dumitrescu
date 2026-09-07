import Image from "next/image";
import Link from "next/link";
import { site, nav, heroStats, CTA_LABEL } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";

/* Hero — pattern DESIGN-SYSTEM.md §3.2. Două panouri-card pe tot ecranul:
   stânga = text centrat pe crem, dreapta = fotografie cu portret „polaroid”
   sus și bara de cifre lipită de bază.
   Tipografie: Helvetica peste tot; Playfair doar pe cuvântul-accent din
   titlu și pe wordmark. */
export default function Hero() {
  return (
    <section
      className="relative grid grid-cols-1 gap-2.5 bg-bg p-2.5 lg:min-h-svh lg:grid-cols-2"
      data-enter="rise"
    >
      {/* Antet suprapus peste ambele panouri */}
      <header className="absolute inset-x-0 top-0 z-40 flex h-20 items-center justify-between gap-6 px-7 sm:px-12 lg:h-24 lg:px-[4.75rem]">


        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <span className="text-ink-faint">(</span> {item.short.toLowerCase()}{" "}
              <span className="text-ink-faint">)</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="btn btn-light group-arrow max-lg:hidden"
          >
            <span>{CTA_LABEL}</span>
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            aria-label={CTA_LABEL}
            className="btn-icon lg:hidden"
          >
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Panoul de text */}
      <div className="flex flex-col items-center justify-center gap-12 rounded-[1.75rem] bg-panel px-6 pb-14 pt-28 text-center sm:px-10 lg:gap-14 lg:px-16 lg:py-32">
        <div className="flex max-w-5xl flex-col items-center gap-4">
          <h1 className="mt-7 text-balance font-sans text-[clamp(2.5rem,1rem+3.8vw,5.5rem)] font-light leading-[0.9] tracking-[-0.03em] text-ink">
            Terapie pentru anii în care parcă totul trebuie decis deja

          </h1>

          <p className="mt-6 max-w-lg text-md leading-snug text-ink-soft ">
            Mă numesc Maria Dumitrescu și sunt psiholog, psihoterapeut de formare integrativă, consilier de dezvoltare personală, consilier vocațional și formator.
            În relația cu tine îmi doresc să fiu persoana care să te însoțească pe drumul descoperirii de sine, într-un cadru terapeutic securizant și autentic
          </p>
        </div>

        <div className="flex w-full max-w-lg items-center justify-center gap-3">
          <Link
            href="/contact"
            className="btn btn-primary group-arrow flex-1 py-[18px]"
          >
            <span>{CTA_LABEL}</span>
          </Link>
          <Link href="/contact" aria-label={CTA_LABEL} className="btn-icon">
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Panoul vizual — fotografie de fundal, portret sus, cifre jos */}
      <div className="relative flex min-h-[80svh] flex-col items-center justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-panel-2 p-4 sm:p-6 lg:min-h-0">
        {/* IMG: hero-fundal | lifestyle | cadru: liber | dealuri verzi — placeholder */}
        <Image
          src="/home/hero-background.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />

        {/* IMG: hero-maria | portret 3:4 | cadru: polaroid */}
        <figure className=" relative z-10 mt-[6vh] w-[min(58%,13rem)] shrink-0 lg:mt-[8vh] lg:w-[min(48%,27rem)]">
          <div className="photo-float bg-panel">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[6px]">
              <Image
                src="/home/maria-hero.png"
                alt={`${site.name}, ${site.role.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 27rem, 13rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2.5 text-center text-xs italic text-ink">
              ( Psihoterapie integrativă )
            </figcaption>
          </div>
        </figure>

        <div className="stat-bar glass relative z-10 w-full rounded-lg p-5 sm:p-7 lg:p-8">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 px-3 first:pl-0 last:pr-0 sm:px-5"
            >
              <div className="stat-num">
                {stat.value}
                {stat.suffix
                  ? stat.suffix.trim().length > 1
                    ? <span className="stat-suffix">{stat.suffix.trim()}</span>
                    : <sup>{stat.suffix}</sup>
                  : null}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
