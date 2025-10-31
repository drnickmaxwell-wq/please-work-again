// app/treatments/technology/components/TechnologySchema.tsx
"use client";
import Script from "next/script";

export default function TechnologySchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Advanced dental technology",
    provider: {
      "@type": "Dentist",
      name: "St Mary’s House Dental Care",
      // add address/phone when final
    },
    areaServed: { "@type": "City", name: "Shoreham-by-Sea" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Scanning & Printing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guided Implants" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Dentistry" } }
      ]
    }
  };

  return (
    <Script id="schema-technology" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
