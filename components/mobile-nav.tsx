"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import Link from "next/link";
import { nav, site, CTA_LABEL, WHATSAPP_LABEL } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import Words from "@/components/words";

/* Traseele organice de fundal ale meniului — aceeași familie ca `.line-art`
   din restul secțiunilor (Poveste, Portrete, Cum funcționează), redesenate
   pentru un ecran vertical de telefon. Se desenează când cortina se deschide
   (`.is-in` comutat direct din starea `open`, nu din observerul de scroll —
   panoul stă la `height: 0` cât e închis, deci nu ar intra niciodată în
   viewport pentru IntersectionObserver). */
const MENU_LINES = [
  "M-20 90 C 110 40 190 190 400 150",
  "M-20 260 C 130 210 210 350 400 320",
  "M-20 460 C 150 400 230 540 400 500",
  "M-20 660 C 160 610 240 740 400 700",
  "M-20 860 C 170 810 250 930 400 900",
];

function MenuLines({ active }: { active: boolean }) {
  return (
    <svg
      className={`line-art ${active ? "is-in" : ""}`}
      viewBox="0 0 380 950"
      preserveAspectRatio="none"
      aria-hidden
    >
      {MENU_LINES.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={{ "--line-delay": `${0.5 + i * 0.16}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/* Meniul de pe telefon/tabletă (DESIGN-SYSTEM.md §3.9) — o cortină, nu un
   panou simplu: la deschidere coboară din antet (`.menu-curtain`, 0 →
   100svh) cu colțul de jos domat care se aplatizează pe măsură ce ajunge la
   bază; la închidere e exact tranziția inversă. Fundalul are aceleași linii
   organice desenate ca restul paginii; rândurile intră în cascadă Playfair
   index → `.headline-3` cu reveal pe cuvinte → săgeată. Se închide cu ✕,
   Escape sau la click pe link; blochează scroll-ul paginii cât e deschis. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="btn btn-outline relative z-[61] h-[52px] gap-3 px-4 sm:px-5"
      >
        <span>{open ? "închide" : "meniu"}</span>
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-500 ${
              open ? "translate-y-[5.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-500 ${
              open ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
        aria-hidden={!open}
        className={`menu-curtain ${open ? "is-open is-in" : ""}`}
      >
        <MenuLines active={open} />

        <div className="menu-curtain-content relative flex h-full w-full flex-col px-6 pb-8 pt-28 sm:px-10">
          <nav aria-label="Principal" className="flex flex-1 flex-col justify-center">
            <ul>
              {nav.map((item, i) => (
                <li
                  key={item.href}
                  className="menu-row border-b border-line"
                  style={{ "--i": i } as CSSProperties}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    className="group-arrow flex items-center gap-4 py-4 sm:py-5"
                  >
                    <span className="section-index w-8 shrink-0" aria-hidden>
                      0{i + 1}
                    </span>
                    <span className="headline-3 flex-1 text-ink">
                      <Words text={item.label} delay={480 + i * 80} />
                    </span>
                    <ArrowIcon className="arrow-slide h-5 w-5 shrink-0 text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-cta mt-10 flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="btn btn-primary group-arrow py-[18px]"
            >
              <span>{CTA_LABEL}</span>
              <ArrowIcon className="arrow-slide h-4 w-4" />
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-ink-soft">
              <a href={site.whatsapp} tabIndex={open ? 0 : -1} className="link-underline">
                {WHATSAPP_LABEL}
              </a>
              <a
                href={`mailto:${site.email}`}
                tabIndex={open ? 0 : -1}
                className="link-underline"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
