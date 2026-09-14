import Link from "next/link";
import { site, nav, WHATSAPP_LABEL } from "@/lib/site";
import { ArrowIcon, AsteriskMark } from "@/components/icons";

/* Footer (DESIGN-SYSTEM.md §3.7). Patru coloane: identitate · navigare ·
   contact · cabinet; rând de subsol cu © și link „sus”; dedesubt, wordmark-ul
   uriaș în Playfair, bej pe crem, tăiat la marginea de jos — semnătura
   paginii. Toate datele vin din `site` (cele marcate [DE COMPLETAT] în
   `lib/site.ts` rămân de confirmat de clientă). */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div className="shell pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-display text-[1.5rem] font-medium leading-none tracking-[-0.01em] text-ink"
            >
              {site.name}
            </Link>
            <p className="mt-3 text-sm text-ink-soft">
              {site.role} · {site.city}
            </p>
            <p className="mono-label mt-8 inline-flex items-center gap-2 text-ink-faint">
              <AsteriskMark className="h-3 w-3 text-accent" />
              Psihoterapie integrativă
            </p>
          </div>

          <nav aria-label="Secundar" className="lg:col-span-2">
            <p className="mono-label text-ink-faint">Navigare</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline font-light text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="link-underline font-light text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="mono-label text-ink-faint">Contact</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a href={site.phoneHref} className="link-underline font-light text-ink">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-underline font-light text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-light"
                >
                  {WHATSAPP_LABEL}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mono-label text-ink-faint">Cabinet</p>
            <address className="mt-4 flex flex-col gap-2 text-sm not-italic text-ink">
              <span>{site.address.street}</span>
              <span>
                {site.address.district}, {site.address.city}
              </span>
              <span className="text-ink-soft">{site.address.metro}</span>
              <span className="mt-3 text-ink-soft">{site.schedule}</span>
            </address>
          </div>
        </div>

        <div className="mono-label mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-ink-faint lg:mt-20">
          <p>
            © {year} {site.name} · Psihoterapeut atestat de Colegiul Psihologilor din România
          </p>
          <a href="#" className="link-underline group-arrow text-ink-soft">
            Înapoi sus
            <ArrowIcon className="arrow-slide h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
      </div>

      <div aria-hidden className="wordmark-giant -mb-[0.16em] mt-10 px-2.5 text-center lg:mt-14">
        {site.name}
      </div>
    </footer>
  );
}
