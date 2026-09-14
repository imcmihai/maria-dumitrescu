"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { nav, site, CTA_LABEL, WHATSAPP_LABEL } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";

/* Meniul de pe telefon/tabletă (DESIGN-SYSTEM.md §3.1). Buton „meniu” în
   header → panou pe tot ecranul, bej, cu linkurile pe scara `.headline-3`,
   CTA-ul și datele de contact. Se închide cu ✕, Escape sau la click pe link;
   blochează scroll-ul paginii cât e deschis. */
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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="btn btn-outline h-[52px] gap-3 px-4 sm:px-5"
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
        hidden={!open}
        className="fixed inset-0 z-[60] flex flex-col bg-panel px-6 pb-8 pt-28 sm:px-10"
      >
        <nav className="flex flex-1 flex-col justify-center">
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: `${80 + i * 45}ms` }}
                className={`border-b border-line transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group-arrow flex items-center justify-between py-4"
                >
                  <span className="headline-3 text-ink">{item.label}</span>
                  <ArrowIcon className="arrow-slide h-5 w-5 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: "380ms" }}
          className={`mt-10 flex flex-col gap-4 transition-all duration-700 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary group-arrow py-[18px]"
          >
            <span>{CTA_LABEL}</span>
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-ink-soft">
            <a href={site.whatsapp} className="link-underline">
              {WHATSAPP_LABEL}
            </a>
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
