import type { CSSProperties } from "react";
import Image from "next/image";
import { approach, site } from "@/lib/site";
import { AsteriskMark } from "@/components/icons";
import SectionHead from "@/components/section-head";

/* Secțiunea „Abordarea mea terapeutică" (Acasă) — 05. Decizie: intră pe
   Acasă, dar în formă compactă — nu grila de carduri-glass (ar fi a doua grilă
   de carduri după „Servicii"), ci un index de metode: rânduri cu cifră
   Playfair, titlu și o propoziție, despărțite de linii care se desenează.
   În dreapta, portretul cu cărțile de psihoterapie integrativă, lipicios pe
   desktop. Aerisită, „pe două coloane”, ca respirație între carduri și pași. */
export default function Approach() {
  return (
    <section
      id="abordare-terapeutica"
      aria-labelledby="abordare-terapeutica-titlu"
      className="section-y relative overflow-hidden bg-bg"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <SectionHead
            index="05"
            eyebrow={approach.eyebrow}
            heading={approach.heading}
            accent={approach.headingAccent}
            lead={approach.lead}
            id="abordare-terapeutica-titlu"
          />

          <dl
            data-reveal-group
            style={{ "--stagger": "90ms" } as CSSProperties}
            className="mt-14 lg:mt-20"
          >
            {approach.methods.map((method, i) => (
              <div
                key={method.slug}
                data-reveal-child
                style={{ "--i": i } as CSSProperties}
                className="relative grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:py-8"
              >
                <span
                  aria-hidden
                  className="rule-draw absolute inset-x-0 top-0"
                  style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                />
                <span
                  aria-hidden
                  className="numeral text-[1.6rem] text-accent lg:text-[1.9rem]"
                >
                  0{i + 1}
                </span>
                <div>
                  <dt className="font-sans text-xl font-medium leading-tight tracking-[-0.01em] text-ink">
                    {method.title}
                  </dt>
                  <dd className="mt-2 max-w-[50ch] text-ink-soft">{method.blurb}</dd>
                </div>
              </div>
            ))}
            <div aria-hidden className="rule-draw" />
          </dl>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <figure data-reveal className="lg:sticky lg:top-24">
            <div className="img-reveal relative aspect-[4/5] rounded-lg bg-panel-2">
              <Image
                src="/home/maria.png"
                alt="Maria Dumitrescu în cabinet, cu mâinile pe câteva cărți de psihoterapie integrativă."
                fill
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mono-label mt-3 flex items-center justify-between text-ink-faint">
              <span>( {site.name} )</span>
              <AsteriskMark className="h-3 w-3 text-accent" />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
