"use client";

import { useEffect } from "react";

/* Cursor custom discret (DESIGN-SYSTEM.md §1.7). Activ doar cu mouse
   (`hover: hover` + `pointer: fine`) și fără `prefers-reduced-motion`.
   Punctul urmează exact cursorul; inelul îl urmează cu întârziere și se
   dilată peste elementele interactive. Peste `[data-dark]` (fundal accent)
   ambele trec pe crem. Elementele sunt create în afara arborelui React ca să
   nu declanșeze re-randări la fiecare mișcare. */
export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot is-hidden";
    dot.setAttribute("aria-hidden", "true");
    const ring = document.createElement("div");
    ring.className = "cursor-ring is-hidden";
    ring.setAttribute("aria-hidden", "true");
    document.body.append(dot, ring);
    document.documentElement.classList.add("has-cursor");

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let shown = false;

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(x - rx) > 0.15 || Math.abs(y - ry) > 0.15) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const INTERACTIVE =
      "a, button, [role='button'], summary, input, textarea, select, label, [data-cursor='active']";

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        dot.classList.remove("is-hidden");
        ring.classList.remove("is-hidden");
      }
      if (!raf) raf = requestAnimationFrame(loop);

      const target = e.target instanceof Element ? e.target : null;
      const active = !!target?.closest(INTERACTIVE);
      const dark = !!target?.closest("[data-dark]");
      ring.classList.toggle("is-active", active);
      dot.classList.toggle("is-light", dark);
      ring.classList.toggle("is-light", dark);
    };

    const onLeave = () => {
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
    };
    const onEnter = () => {
      if (!shown) return;
      dot.classList.remove("is-hidden");
      ring.classList.remove("is-hidden");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
      if (raf) cancelAnimationFrame(raf);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
