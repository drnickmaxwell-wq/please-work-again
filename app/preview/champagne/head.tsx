const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'https://www.stmaryshousedental.co.uk';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: "St Mary's House Dental Care",
  url: siteUrl,
  logo: `${siteUrl}/icons/icon-192x192.png`,
  image: [`${siteUrl}/hero-poster.jpg`],
  sameAs: [
    'https://www.facebook.com/stmaryshousedental',
    'https://www.instagram.com/stmaryshousedental',
    'https://www.linkedin.com/company/stmaryshousedental',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44 1273 453109',
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  ],
  hasPart: [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/treatments/veneers`,
      url: `${siteUrl}/treatments/veneers`,
      name: 'Porcelain Veneers',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/treatments/implants`,
      url: `${siteUrl}/treatments/implants`,
      name: 'Dental Implants',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/treatments/whitening`,
      url: `${siteUrl}/treatments/whitening`,
      name: 'Teeth Whitening',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/treatments/3d-dentistry`,
      url: `${siteUrl}/treatments/3d-dentistry`,
      name: '3D Digital Dentistry',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/treatments/technology`,
      url: `${siteUrl}/treatments/technology`,
      name: 'Dental Technology',
    },
  ],
};

export default function Head() {
  return (
    <>
      <meta
        name="theme-color"
        content="var(--smh-primary-magenta)"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="var(--smh-bg)"
        media="(prefers-color-scheme: dark)"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
