import Link from "next/link";
import { nav, site, CTA_LABEL } from "@/lib/site";
import { ArrowIcon } from "@/components/icons";

/* Header — transparent, suprapus peste hero. Pattern: DESIGN-SYSTEM.md §3.1 */
export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50" data-enter="down">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-[1.35rem] font-medium tracking-[-0.01em] text-[--color-ink]"
        >
          {site.name}
        </Link>

        <nav className="hidden lg:block">
          <div className="nav-pill">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.short}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="btn btn-primary group-arrow max-sm:hidden"
          >
            <span>{CTA_LABEL}</span>
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            aria-label={CTA_LABEL}
            className="btn-icon sm:hidden"
          >
            <ArrowIcon className="arrow-slide h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
