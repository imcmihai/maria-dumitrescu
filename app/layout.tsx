import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

/* Playfair Display — titluri (H1-H4), cifre mari, accente în italic.
   Avem doar Medium (500); italicul e sintetizat până se adaugă fișierul real
   `PlayfairDisplay-MediumItalic.ttf` (vezi DESIGN-SYSTEM.md §Tipografie). */
const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  src: [
    { path: "../public/fonts/PlayfairDisplay-Medium.ttf", weight: "500", style: "normal" },
  ],
});

/* Helvetica Neue — corp de text, navigare, etichete, butoane.
   Light (300) pentru text lung, Medium (500) pentru UI și accente. */
const helvetica = localFont({
  variable: "--font-helvetica",
  display: "swap",
  adjustFontFallback: "Arial",
  src: [
    { path: "../public/fonts/HelveticaNeueLight.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fdfbef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${playfair.variable} ${helvetica.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
