import type { Metadata } from 'next';

import { JsonLd, schema } from '@/lib/seo';
import ThreeDDentistryPageContent from './page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/3d-dentistry`;

const serviceJson = schema.service({
  name: '3D Digital Dentistry',
  url: pageUrl,
  areaServed: ['Shoreham-by-Sea', 'Brighton & Hove', 'Worthing'],
});

const faqJson = schema.faqPage([
  {
    q: 'What is 3D digital dentistry?',
    a: '3D digital dentistry uses intraoral scanners, CAD/CAM design, and 3D printing to deliver faster, more precise treatments.',
  },
  {
    q: 'Can I really get same-day crowns?',
    a: 'Yes, our CEREC and 3D printing workflow allows for bespoke crowns, veneers, and inlays to be completed in a single visit.',
  },
  {
    q: 'Is 3D scanning comfortable?',
    a: 'Digital scanning replaces uncomfortable putty impressions with a quick, mess-free process that patients love.',
  },
]);

export const metadata: Metadata = {
  title: '3D Digital Dentistry in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Discover cutting-edge 3D digital dentistry at St Mary’s House Dental. Same-day crowns, ultra-precise planning, and comfortable treatments in Shoreham-by-Sea.',
  alternates: { canonical: pageUrl },
};

export default function ThreeDDentistryPage() {
  return (
    <>
      <JsonLd json={serviceJson} />
      <JsonLd json={faqJson} />
      <ThreeDDentistryPageContent />
    </>
  );
}
