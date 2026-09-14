import type { CSSProperties } from "react";

/* Titlu cu reveal pe cuvinte (DESIGN-SYSTEM.md §1.6). Fiecare cuvânt e
   într-o mască `overflow: hidden` și urcă decalat cu `--w` când containerul
   (sau un strămoș `[data-reveal]`) primește `.is-in`. `accent` = cuvintele
   din <em> (Playfair italic, măsliniu), care continuă numerotarea. */
export default function Words({
  text,
  accent,
  className = "",
  delay = 0,
}: {
  text: string;
  accent?: string;
  className?: string;
  /** întârziere suplimentară (ms) înainte de primul cuvânt */
  delay?: number;
}) {
  const plain = text.split(" ").filter(Boolean);
  const em = accent ? accent.split(" ").filter(Boolean) : [];

  const word = (w: string, i: number, isAccent: boolean) => (
    <span className="word" key={`${i}-${w}`}>
      {isAccent ? (
        <em className="word-in" style={{ "--w": i } as CSSProperties}>
          {w}
        </em>
      ) : (
        <span className="word-in" style={{ "--w": i } as CSSProperties}>
          {w}
        </span>
      )}
    </span>
  );

  return (
    <span
      className={`words ${className}`.trim()}
      data-reveal="words"
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {plain.map((w, i) => (
        <span key={`p-${i}`}>
          {word(w, i, false)}
          {i < plain.length - 1 || em.length > 0 ? " " : null}
        </span>
      ))}
      {em.map((w, i) => (
        <span key={`a-${i}`}>
          {word(w, plain.length + i, true)}
          {i < em.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
