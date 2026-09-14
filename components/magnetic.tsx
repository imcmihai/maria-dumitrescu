"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

/* Buton „magnetic” (DESIGN-SYSTEM.md §1.6) — conținutul alunecă ușor spre
   cursor cât timp acesta e în zona-tampon din jur și revine la plecare.
   Doar cu mouse și fără `prefers-reduced-motion`; altfel e un wrapper inert. */
export default function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: ReactNode;
  /** 0–1: cât din distanța până la cursor parcurge elementul */
  strength?: number;
  className?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const inner = innerRef.current;
    if (!area || !inner) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      inner.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const r = inner.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    area.addEventListener("mousemove", onMove, { passive: true });
    area.addEventListener("mouseleave", onLeave);
    return () => {
      area.removeEventListener("mousemove", onMove);
      area.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={areaRef} className={`-m-4 inline-flex p-4 ${className}`.trim()}>
      <div ref={innerRef} className="inline-flex will-change-transform">
        {children}
      </div>
    </div>
  );
}
