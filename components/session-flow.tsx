import type { CSSProperties } from "react";
import Link from "next/link";
import { sessionFlow, CTA_LABEL } from "@/lib/site";
import {
  ArrowIcon,
  ClockIcon,
  HeartIcon,
  LockIcon,
  PathIcon,
} from "@/components/icons";
import SectionHead from "@/components/section-head";

/* Secțiunea „Cum funcționează ședințele" (Acasă) — 06. Traseu în patru pași,
   pe orizontală: o linie desenată leagă pașii, fiecare cu insignă de iconiță,
   cifră Playfair, reper scurt, titlu și textul integral. Pe telefon pașii se
   stivuiesc pe o coloană (linia devine verticală, în stânga). Fundal bej —
   ultima secțiune „practică” înainte de recomandări. */

const ICONS = { HeartIcon, ClockIcon, PathIcon, LockIcon } as const;

export default function SessionFlow() {
  return (
    <section
      id="cum-functioneaza-sedintele"
      aria-labelledby="cum-functioneaza-sedintele-titlu"
      className="section-y relative overflow-hidden bg-panel"
    >
      <div className="shell">
        <SectionHead
          index="06"
          eyebrow={sessionFlow.eyebrow}
          heading={sessionFlow.heading}
          accent={sessionFlow.headingAccent}
          lead={sessionFlow.lead}
          layout="split"
          id="cum-functioneaza-sedintele-titlu"
        />

        <ol
          data-reveal-group
          style={{ "--stagger": "140ms" } as CSSProperties}
          className="relative mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:mt-24 lg:grid-cols-4"
        >
          {/* Linia care leagă pașii — desktop, orizontală, sus. */}
          <span
            aria-hidden
            className="rule-draw absolute inset-x-0 top-0 hidden lg:block"
          />

          {sessionFlow.steps.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <li
                key={step.label}
                data-reveal-child
                style={{ "--i": i } as CSSProperties}
                className="relative pl-6 sm:pl-0 lg:pt-10"
              >
                {/* Linia verticală pe telefon. */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-px bg-line-strong sm:hidden"
                />
                {/* Nodul de pe linie — desktop. */}
                <span
                  aria-hidden
                  className="absolute -top-1 left-0 hidden h-2 w-2 rounded-full bg-accent lg:block"
                />

                <div className="flex items-center justify-between">
                  <span className="icon-badge">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span aria-hidden className="numeral text-[1.6rem] text-accent">
                    0{i + 1}
                  </span>
                </div>

                <p className="eyebrow mt-8 text-accent">{step.label}</p>
                <h3 className="mt-2 font-sans text-[1.35rem] font-medium leading-tight tracking-[-0.01em] text-ink">
                  {step.heading}
                </h3>
                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div data-reveal className="mt-16 flex items-center gap-3 lg:mt-20">
          <Link href="/contact" className="btn btn-primary group-arrow py-[18px]">
            <span>{CTA_LABEL}</span>
          </Link>
          <Link href="/contact" aria-label={CTA_LABEL} className="btn-icon">
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
