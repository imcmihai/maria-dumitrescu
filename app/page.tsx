import Hero from "@/components/hero";
import Story from "@/components/story";
import ClientPortraits from "@/components/client-portraits";
import WhatIsTherapy from "@/components/what-is-therapy";
import Services from "@/components/services";
import Approach from "@/components/approach";
import SessionFlow from "@/components/session-flow";
import Testimonials from "@/components/testimonials";
import Credentials from "@/components/credentials";
import FinalCta from "@/components/final-cta";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: site.name,
  description: site.description,
  url: site.url,
  areaServed: "București, România",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: `${site.address.city}, ${site.address.district}`,
    addressCountry: "RO",
  },
  knowsLanguage: "ro",
};

/* Acasă — ritmul de scroll (DESIGN-SYSTEM.md §3.8):
   Hero (foto + titlu mare) → 01 Poveste (tipografic, foto lipicioasă) →
   02 Portrete (rail dens de carduri) → 03 Ce este psihoterapia (bloc verde) →
   04 Servicii (grilă de carduri pe creangă) → 05 Abordare (index de metode +
   foto) → 06 Cum funcționează (pași pe orizontală) → 07 Recomandări (un citat
   mare) → Acreditări (bandă compactă) → 08 CTA final (duoton) → Footer. */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        <Hero />
        <Story />
        <ClientPortraits />
        <WhatIsTherapy />
        <Services />
        <Approach />
        <SessionFlow />
        <Testimonials />
        <Credentials />
        <FinalCta />
      </main>
    </>
  );
}
