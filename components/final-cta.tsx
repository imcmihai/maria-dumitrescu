import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { site, finalCta, CTA_LABEL, WHATSAPP_LABEL } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import Words from "@/components/words";
import Magnetic from "@/components/magnetic";

/* CTA final (Acasă) — 08. Secțiunea de închidere, înainte de footer: panou
   rotunjit pe toată lățimea (ecou al panourilor din hero), peisajul cu dealuri
   în duoton măsliniu, voal spre bază pentru contrast, titlu pe `.headline-1`
   cu reveal pe cuvinte și cele două CTA-uri (programare + WhatsApp).
   `data-dark` comută cursorul custom pe crem. */
export default function FinalCta() {
  return (
    <section
      id="programare"
      aria-labelledby="programare-titlu"
      className="px-2.5 pb-2.5 pt-10 lg:pt-16"
    >
      <div
        data-dark
        data-reveal="fade"
        className="relative isolate mx-auto flex min-h-[86svh] max-w-[1600px] items-end overflow-hidden rounded-xl bg-accent-deep text-on-accent"
      >
        <div className="duotone img-reveal absolute inset-0" aria-hidden>
          <Image
            src="/home/mountain.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_65%]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-accent-deep/90 via-accent-deep/55 to-accent-deep/30"
        />

        <div className="relative z-10 grid w-full gap-10 px-6 pb-12 pt-32 sm:px-10 lg:grid-cols-12 lg:items-end lg:px-16 lg:pb-16 lg:pt-48">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="section-index text-on-accent" aria-hidden>
                08
              </span>
              <span className="rule-draw rule-draw--on-accent w-10" aria-hidden />
              <p className="eyebrow text-on-accent-soft">{finalCta.eyebrow}</p>
            </div>
            <h2
              id="programare-titlu"
              className="headline-1 headline-on-accent mt-8 max-w-[15ch] text-on-accent"
            >
              <Words text={finalCta.heading} accent={finalCta.headingAccent} delay={150} />
            </h2>
            <p
              data-reveal
              style={{ "--reveal-delay": "500ms" } as CSSProperties}
              className="mt-8 max-w-[44ch] text-lg leading-snug text-on-accent-soft"
            >
              {finalCta.lead}
            </p>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "650ms" } as CSSProperties}
            className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-end"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="btn btn-on-accent group-arrow py-[18px] pl-7 pr-6"
              >
                <span>{CTA_LABEL}</span>
                <ArrowIcon className="arrow-slide h-4 w-4" />
              </Link>
            </Magnetic>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-on-accent py-[18px]"
            >
              <span>{WHATSAPP_LABEL}</span>
            </a>
            <p className="mono-label mt-4 text-on-accent-soft sm:ml-auto lg:ml-0 lg:text-right">
              {site.schedule}
              <br />
              {site.address.district}, {site.address.city} · online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
