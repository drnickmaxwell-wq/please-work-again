import type { Metadata } from 'next';

import { JsonLd, schema } from '@/lib/seo';
import VeneersPageContent from './page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/veneers`;

const serviceJson = schema.service({
  name: 'Porcelain Veneers',
  url: pageUrl,
  areaServed: ['Shoreham-by-Sea', 'Brighton', 'Worthing'],
  offers: { priceCurrency: 'GBP' },
});

const faqJson = schema.faqPage([
  {
    q: 'How long do porcelain veneers last?',
    a: 'High-quality porcelain veneers typically last 10-15 years with excellent oral hygiene and regular dental reviews.',
  },
  {
    q: 'Will veneers look natural?',
    a: 'Each veneer is hand-crafted to match your smile so the final result looks translucent, bright, and natural.',
  },
  {
    q: 'Do veneers damage my natural teeth?',
    a: 'Only a tiny amount of enamel is refined to ensure a perfect bond. We prioritise minimally invasive preparation.',
  },
]);

export const metadata: Metadata = {
  title: 'Porcelain Veneers in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Design your dream smile with bespoke porcelain veneers at St Mary’s House Dental in Shoreham-by-Sea. Discover confidence-building cosmetic dentistry.',
  alternates: { canonical: pageUrl },
};

export default function VeneersPage() {
  return (
    <>
      <JsonLd json={serviceJson} />
      <JsonLd json={faqJson} />
      <VeneersPageContent />
    </>
  );
}
