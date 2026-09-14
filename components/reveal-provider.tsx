"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Observer unic pentru reveal-urile la scroll (DESIGN-SYSTEM.md §1.6).
   Montat o dată în layout; pune `.is-in` pe orice `[data-reveal]` /
   `[data-reveal-group]` din pagină la intrarea în viewport, apoi îl uită.
   Re-rulează la schimbarea rutei. Fără IntersectionObserver sau cu
   `prefers-reduced-motion`, totul devine vizibil imediat. */
export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]"),
    );
    if (items.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );
    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
