"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons";

/* Rail orizontal (DESIGN-SYSTEM.md §3.5). Scroll nativ cu snap, tras cu
   mouse-ul (drag) pe desktop, roată sau săgeți. Sub rail: linia de progres
   și butoanele prev/next (`.btn-icon-ghost`). `children` = elementele `<li>`. */
export default function Rail({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  /** eticheta accesibilă a listei */
  label: string;
  className?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setProgress(ratio);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max - el.scrollLeft <= 2);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  /* Drag cu mouse-ul — doar pointer de tip mouse; pe touch scroll-ul nativ e
     mai bun. Sub 6px mișcare rămâne click. */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let startX = 0;
    let startLeft = 0;
    let active = false;
    let dragging = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      active = true;
      dragging = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > 6) {
        dragging = true;
        el.classList.add("is-dragging");
        el.setPointerCapture(e.pointerId);
      }
      if (dragging) el.scrollLeft = startLeft - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      if (dragging) {
        dragging = false;
        el.classList.remove("is-dragging");
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    const amount = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <ul ref={listRef} aria-label={label} className="rail" data-cursor="active">
        {children}
      </ul>

      <div className="shell mt-8 flex items-center gap-6 lg:mt-10">
        <div className="relative h-px flex-1 bg-line" aria-hidden>
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Portretele anterioare"
            className="btn-icon btn-icon-ghost"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Portretele următoare"
            className="btn-icon btn-icon-ghost"
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
