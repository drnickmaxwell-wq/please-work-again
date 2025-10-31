import React from 'react';

export function JsonLd({ json }: { json: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export const schema = {
  localBusiness: (opts: {
    name: string;
    url: string;
    telephone: string;
    address: { street: string; city: string; postalCode: string; country: string };
    geo?: { lat: number; lng: number };
    sameAs?: string[];
  }) => {
    const { address, geo, sameAs, ...business } = opts;

    return {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      ...business,
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.city,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
      ...(geo
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: geo.lat,
              longitude: geo.lng,
            },
          }
        : {}),
      ...(sameAs ? { sameAs } : {}),
    };
  },
  service: (opts: {
    name: string;
    url: string;
    areaServed?: string[];
    offers?: { price?: string; priceCurrency?: string };
  }) => {
    const { offers, ...service } = opts;

    return {
      "@context": "https://schema.org",
      "@type": "Service",
      ...service,
      ...(offers
        ? {
            offers: {
              "@type": "Offer",
              ...offers,
            },
          }
        : {}),
    };
  },
  faqPage: (faqs: { q: string; a: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: x.a,
      },
    })),
  }),
  video: (opts: {
    name: string;
    description: string;
    thumbnailUrl: string[];
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    ...opts,
  }),
};
