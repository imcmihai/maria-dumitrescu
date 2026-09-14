import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { story } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";
import SectionHead from "@/components/section-head";

/* Secțiunea „Povestea mea" (Acasă) — 01. Secțiune tipografic-dominantă:
   titlul pe toată lățimea, apoi grilă pe 12 coloane cu fotografia lipicioasă
   în stânga (rămâne în cadru cât se citește textul) și povestea în dreapta.
   Două obiecte grafice: cifra „18” uriașă (Playfair, bej pe crem) — vârsta la
   care Maria a intrat prima dată într-un cabinet — și citatul mare, așezat
   ca un card peste colțul fotografiei. Pe telefon totul curge într-o coloană:
   titlu → foto → citat → text → link. */
export default function Story() {
  return (
    <section
      id="povestea-mea"
      aria-labelledby="povestea-mea-titlu"
      className="section-y relative isolate overflow-hidden bg-bg"
    >
      {/* „18” — obiect grafic, decorativ. */}
      <span
        aria-hidden
        data-reveal="fade"
        className="numeral pointer-events-none absolute -top-[0.06em] right-[-0.04em] -z-10 select-none text-panel"
        style={{ fontSize: "clamp(13rem, 36vw, 32rem)", "--reveal-delay": "300ms" } as CSSProperties}
      >
        18
      </span>

      <div className="shell">
        <SectionHead
          index="01"
          eyebrow={story.eyebrow}
          heading={story.heading}
          accent={story.headingAccent}
          id="povestea-mea-titlu"
          headingClassName="max-w-[16ch]"
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          {/* Fotografia — lipicioasă pe desktop */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <figure
                data-reveal
                className="relative mx-auto w-[min(84%,22rem)] lg:mx-0 lg:w-full lg:max-w-[26rem]"
              >
                <div className="img-reveal relative aspect-[4/5] rounded-lg bg-panel-2">
                  <Image
                    src="/home/maria2.png"
                    alt="Maria Dumitrescu, psiholog și psihoterapeut, ținând în brațe un buchet de lalele și narcise."
                    fill
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 84vw"
                    className="object-cover object-[50%_20%]"
                  />
                </div>
                <figcaption className="mono-label mt-3 flex items-center justify-between text-ink-faint">
                  <span>{story.caption}</span>
                  <AsteriskMark className="h-3 w-3 text-accent" />
                </figcaption>

                {/* Citatul — card care iese peste colțul fotografiei pe desktop */}
                <blockquote
                  data-reveal
                  style={{ "--reveal-delay": "260ms" } as CSSProperties}
                  className="quote-display mt-8 rounded-md bg-panel px-7 py-6 text-ink shadow-[0_24px_50px_-30px_rgba(72,67,67,0.35)] lg:absolute lg:-right-28 lg:bottom-20 lg:mt-0 lg:max-w-[15ch] xl:-right-36"
                >
                  „{story.pullQuote}”
                </blockquote>
              </figure>
            </div>
          </div>

          {/* Povestea */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div
              data-reveal-group
              className="flex flex-col gap-6 text-ink-soft"
              style={{ "--stagger": "110ms" } as CSSProperties}
            >
              {story.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 24)}
                  data-reveal-child
                  style={{ "--i": i } as CSSProperties}
                  className={
                    i === 0
                      ? "max-w-[38ch] text-xl leading-snug text-ink"
                      : "max-w-[52ch] leading-relaxed"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-12">
              <span className="rule-draw rule-draw--soft mb-8 block" aria-hidden />
              <Link
                href="/despre"
                className="link-underline group-arrow inline-flex text-sm"
              >
                Mai multe despre drumul meu
                <ArrowIcon className="arrow-slide h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
