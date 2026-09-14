import type { CSSProperties } from "react";
import Link from "next/link";
import { nav, site, CTA_LABEL } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";
import MobileNav from "@/components/mobile-nav";

/* Header — transparent, suprapus peste panourile din hero (DESIGN-SYSTEM.md
   §3.1). Wordmark Playfair stânga · linkuri „( despre mine )” pe desktop ·
   CTA deschis (`.btn-light`, gândit să stea peste fotografie) dreapta.
   Sub `lg` linkurile trec în `MobileNav`. Nu e sticky: rămâne o parte a
   hero-ului, nu o bară care urmărește pagina. Paddingul orizontal e aliniat
   cu paddingul interior al panourilor din hero. */
export default function SiteHeader() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-50"
      data-enter="down"
      style={{ "--enter-delay": "150ms" } as CSSProperties}
    >
      <div className="flex h-20 items-center justify-between gap-6 px-6 sm:px-12 lg:h-24 lg:px-[4.625rem]">
        <Link
          href="/"
          aria-label={`${site.name} — acasă`}
          className="whitespace-nowrap font-display text-[1.05rem] font-medium leading-none tracking-[-0.01em] text-ink sm:text-[1.2rem]"
        >
          {site.name}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-paren">
              {item.short.toLowerCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-light group-arrow max-lg:hidden">
            <span>{CTA_LABEL}</span>
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            aria-label={CTA_LABEL}
            className="btn-icon lg:hidden"
          >
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
