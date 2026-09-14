"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";

/* Acordeon (DESIGN-SYSTEM.md §2.10) — buton cu „+” într-un cerc care se
   rotește în „×” la deschidere; panoul se desfășoară cu `grid-template-rows`.
   Un singur element, nu un grup: îl folosim pentru lista de formări din banda
   de acreditări. */
export default function Accordion({
  title,
  meta,
  children,
  defaultOpen = false,
}: {
  title: string;
  /** text mic în dreapta titlului, ex. „5 formări” */
  meta?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-t border-line">
      <button
        type="button"
        className="acc-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-sans text-lg font-medium tracking-[-0.01em] text-ink">
            {title}
          </span>
          {meta ? <span className="mono-label text-ink-faint">{meta}</span> : null}
        </span>
        <span className="acc-icon" aria-hidden>
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div id={id} className={`acc-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div>
          <div className="pb-8 pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
