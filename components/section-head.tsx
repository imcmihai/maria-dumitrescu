import type { CSSProperties, ReactNode } from "react";
import Words from "@/components/words";

/* Antetul de secțiune (DESIGN-SYSTEM.md §3.3). Index Playfair „01” + linie
   desenată + eyebrow, apoi H2 pe scara `.headline-2` cu reveal pe cuvinte.
   Două așezări:
     `stack` → eyebrow, titlu și lead una sub alta, aliniate la stânga;
     `split` → titlul în stânga, lead-ul (sau `aside`) în coloana din dreapta,
               aliniat la baza titlului — antetul editorial pe 12 coloane.
   `tone="on-accent"` inversează culorile pentru containerele măslinii. */
export default function SectionHead({
  index,
  eyebrow,
  heading,
  accent,
  lead,
  aside,
  id,
  layout = "stack",
  tone = "ink",
  className = "",
  headingClassName = "",
  as: Tag = "h2",
}: {
  index: string;
  eyebrow: string;
  heading: string;
  accent?: string;
  lead?: string;
  aside?: ReactNode;
  id: string;
  layout?: "stack" | "split";
  tone?: "ink" | "on-accent";
  className?: string;
  /** clase pe titlul propriu-zis — ex. `max-w-[14ch]` (ch relativ la titlu) */
  headingClassName?: string;
  as?: "h1" | "h2";
}) {
  const onAccent = tone === "on-accent";
  const leadColor = onAccent ? "text-on-accent-soft" : "text-ink-soft";
  const headColor = onAccent ? "text-on-accent headline-on-accent" : "text-ink";

  const label = (
    <div className="flex items-center gap-4" data-reveal="fade">
      <span
        className={`section-index ${onAccent ? "text-on-accent" : ""}`}
        aria-hidden
      >
        {index}
      </span>
      <span
        className={`rule-draw w-10 ${onAccent ? "rule-draw--on-accent" : ""}`}
        aria-hidden
      />
      <p className={`eyebrow ${onAccent ? "text-on-accent-soft" : ""}`}>{eyebrow}</p>
    </div>
  );

  const title = (
    <Tag id={id} className={`headline-2 mt-7 ${headColor} ${headingClassName}`.trim()}>
      <Words text={heading} accent={accent} delay={120} />
    </Tag>
  );

  if (layout === "split") {
    return (
      <header className={`grid gap-8 lg:grid-cols-12 lg:gap-x-10 ${className}`}>
        <div className="lg:col-span-7">
          {label}
          {title}
        </div>
        <div
          className="flex flex-col justify-end lg:col-span-4 lg:col-start-9"
          data-reveal
          style={{ "--reveal-delay": "220ms" } as CSSProperties}
        >
          {lead ? (
            <p className={`max-w-[44ch] text-lg leading-snug ${leadColor}`}>{lead}</p>
          ) : null}
          {aside}
        </div>
      </header>
    );
  }

  return (
    <header className={className}>
      {label}
      {title}
      {lead ? (
        <p
          data-reveal
          style={{ "--reveal-delay": "220ms" } as CSSProperties}
          className={`mt-7 max-w-[52ch] text-lg leading-snug ${leadColor}`}
        >
          {lead}
        </p>
      ) : null}
      {aside}
    </header>
  );
}
