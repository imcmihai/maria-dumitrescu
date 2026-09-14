import type { CSSProperties } from "react";
import Link from "next/link";
import { clientPortraits } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";
import SectionHead from "@/components/section-head";
import Rail from "@/components/rail";

/* Secțiunea „Cine vine la cabinet" (Acasă) — 02. Portrete-tip, nu persoane
   reale. Secțiunea densă a paginii: un rail orizontal de carduri înalte care
   iese din `.shell` spre marginea dreaptă a ecranului (pattern §3.5).
   Antet „split”: titlul în stânga, lead-ul în coloana din dreapta. Cardurile
   sunt bej, cu un singur card verde ca accent; fiecare are index Playfair,
   fraza de deschidere pe `.headline-3` și continuarea după „…". */

const ACCENT_INDEX = 3;

export default function ClientPortraits() {
  return (
    <section
      id="cine-vine-la-cabinet"
      aria-labelledby="cine-vine-la-cabinet-titlu"
      className="section-y relative overflow-hidden bg-panel-2"
    >
      <div className="shell">
        <SectionHead
          index="02"
          eyebrow={clientPortraits.eyebrow}
          heading={clientPortraits.heading}
          accent={clientPortraits.headingAccent}
          lead={clientPortraits.lead}
          layout="split"
          id="cine-vine-la-cabinet-titlu"
        />
      </div>

      {/* Rail-ul începe aliniat cu conținutul din `.shell` și curge până la
          marginea dreaptă a ecranului. */}
      <div
        data-reveal-group
        className="mt-14 lg:mt-20"
        style={{ "--stagger": "70ms" } as CSSProperties}
      >
        <Rail
          label="Portrete de clienți"
          className="[&>ul]:pl-5 [&>ul]:pr-5 md:[&>ul]:pl-[max(40px,calc((100%-1240px)/2+40px))] md:[&>ul]:pr-10"
        >
          {clientPortraits.portraits.map((portrait, i) => {
            const accent = i === ACCENT_INDEX;
            return (
              <li
                key={portrait.intro}
                data-reveal-child
                style={{ "--i": i } as CSSProperties}
                className="w-[min(84vw,21rem)] sm:w-[22rem]"
              >
                <article
                  className={`card card-lift flex h-full min-h-[24rem] flex-col ${
                    accent ? "card-accent" : "card-cream"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`section-index ${accent ? "text-on-accent" : ""}`}
                      aria-hidden
                    >
                      0{i + 1}
                    </span>
                    <AsteriskMark
                      className={`h-3 w-3 ${accent ? "text-on-accent-soft" : "text-accent"}`}
                    />
                  </div>

                  <h3
                    className={`headline-3 mt-10 ${accent ? "text-on-accent" : "text-ink"}`}
                  >
                    {portrait.intro}
                  </h3>

                  <p
                    className={`mt-auto pt-8 text-sm leading-relaxed ${
                      accent ? "text-on-accent-soft" : "text-ink-soft"
                    }`}
                  >
                    <span aria-hidden className={accent ? "text-on-accent" : "text-accent"}>
                      …{" "}
                    </span>
                    {portrait.body}
                  </p>
                </article>
              </li>
            );
          })}
        </Rail>
      </div>

      <div data-reveal className="shell mt-12 lg:mt-16">
        <Link href="/pentru-cine" className="link-underline group-arrow text-sm">
          Vezi cu ce lucrez cel mai des
          <ArrowIcon className="arrow-slide h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
