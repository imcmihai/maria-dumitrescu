import type { CSSProperties } from "react";
import { credentials } from "@/lib/site";
import { AsteriskMark } from "@/components/icons";
import Accordion from "@/components/accordion";

/* Banda „Acreditări" (Acasă) — compactă, discretă, între recomandări și
   CTA-ul final (recomandarea clientei: să nu întrerupă fluxul emoțional).
   Nu e o secțiune numerotată: e o bandă cu linii sus/jos. Trei repere de
   încredere mereu vizibile, într-un rând; lista completă de formări stă într-un
   acordeon. */
export default function Credentials() {
  return (
    <section
      id="acreditari"
      aria-labelledby="acreditari-titlu"
      className="relative border-y border-line bg-panel-2"
    >
      <div className="shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <header data-reveal className="lg:col-span-3">
            <p className="eyebrow inline-flex items-center gap-2.5">
              <AsteriskMark className="h-3 w-3 text-accent" />
              {credentials.eyebrow}
            </p>
            <h2 id="acreditari-titlu" className="headline-3 mt-4 text-ink">
              {credentials.heading}
            </h2>
          </header>

          <div className="lg:col-span-9">
            <ul
              data-reveal-group
              style={{ "--stagger": "90ms" } as CSSProperties}
              className="grid gap-6 sm:grid-cols-3 sm:gap-8"
            >
              {credentials.primary.map((item, i) => (
                <li
                  key={item.value}
                  data-reveal-child
                  style={{ "--i": i } as CSSProperties}
                  className="relative pt-5"
                >
                  <span
                    aria-hidden
                    className="rule-draw absolute inset-x-0 top-0"
                    style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                  />
                  <p className="mono-label text-accent">{item.label}</p>
                  <p className="mt-2 text-sm leading-snug text-ink">{item.value}</p>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10">
              <Accordion
                title={credentials.trainingsLabel}
                meta={`${credentials.trainings.length} formări`}
              >
                <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {credentials.trainings.map((t, i) => (
                    <li key={t.title} className="flex gap-4">
                      <span aria-hidden className="section-index pt-1">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="font-medium leading-snug text-ink">{t.title}</p>
                        <p className="mt-1 text-sm leading-snug text-ink-soft">{t.org}</p>
                        {"note" in t && t.note ? (
                          <p className="mt-1.5 text-xs leading-snug text-ink-faint">
                            {t.note}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
