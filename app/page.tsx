import Hero from "@/components/hero";
import Story from "@/components/story";
import ClientPortraits from "@/components/client-portraits";
import WhatIsTherapy from "@/components/what-is-therapy";
import Services from "@/components/services";
import Approach from "@/components/approach";
import SessionFlow from "@/components/session-flow";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        <Hero />
        <Story />
        <ClientPortraits />
        <WhatIsTherapy />
        <Services />
        <SessionFlow />

        {/* <Approach /> */}
      </main>
    </>
  );
}
