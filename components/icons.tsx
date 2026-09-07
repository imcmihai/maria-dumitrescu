import type { SVGProps } from "react";

/* Set minimal de iconițe de linie — stroke: currentColor, 24×24, 1.5px.
   Vezi DESIGN-SYSTEM.md §2.3 (icon-badge). */

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AsteriskMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 4v16M4.7 7.5l14.6 9M19.3 7.5 4.7 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Iconițe pentru pașii din „Cum funcționează ședințele” — același traseu de
   linie ca mai sus (24×24, stroke 1.5, currentColor). */

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 20.25C12 20.25 3.75 15.5 3.75 9.75C3.75 7.4 5.65 5.75 7.85 5.75C9.55 5.75 10.95 6.75 12 8.25C13.05 6.75 14.45 5.75 16.15 5.75C18.35 5.75 20.25 7.4 20.25 9.75C20.25 15.5 12 20.25 12 20.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M20.25 12A8.25 8.25 0 1 1 3.75 12A8.25 8.25 0 1 1 20.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 7.5V12L15 14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PathIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5.5 18.5C9 18.5 8.5 12 12 12C15.5 12 15 5.5 18.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 18.5A1.4 1.4 0 1 1 4.2 18.5A1.4 1.4 0 1 1 7 18.5Z"
        fill="currentColor"
      />
      <path
        d="M19.8 5.5A1.4 1.4 0 1 1 17 5.5A1.4 1.4 0 1 1 19.8 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6.75 10.5H17.25C18.35 10.5 19.25 11.4 19.25 12.5V18.25C19.25 19.35 18.35 20.25 17.25 20.25H6.75C5.65 20.25 4.75 19.35 4.75 18.25V12.5C4.75 11.4 5.65 10.5 6.75 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 10.5V7.75A3.75 3.75 0 0 1 15.75 7.75V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 14.25V16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Iconițe pentru „Abordarea mea terapeutică” — câte una per metodă, același
   traseu de linie (24×24, stroke 1.5, currentColor). */

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M19 5C19 5 8.5 3.75 5.75 11.5C4.1 16.15 7.5 19.5 7.5 19.5C7.5 19.5 16 19.4 18.25 11.75C19.2 8.5 19 5 19 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 18.5C10 13 13.25 9.25 17.25 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3.75 12C3.75 12 7 6.25 12 6.25C17 6.25 20.25 12 20.25 12C20.25 12 17 17.75 12 17.75C7 17.75 3.75 12 3.75 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 12A2.25 2.25 0 1 1 9.75 12A2.25 2.25 0 1 1 14.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function LoopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5.75 9.5A6.5 6.5 0 0 1 17.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.25 14.5A6.5 6.5 0 0 1 6.5 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.75 4.25V8H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 19.75V16H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M20.25 12A8.25 8.25 0 1 1 3.75 12A8.25 8.25 0 1 1 20.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.75 12A3.75 3.75 0 1 1 8.25 12A3.75 3.75 0 1 1 15.75 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 12A1 1 0 1 1 11 12A1 1 0 1 1 13 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M20.25 12A8.25 8.25 0 1 1 3.75 12A8.25 8.25 0 1 1 20.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15 9L13.25 13.25L9 15L10.75 10.75L15 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
