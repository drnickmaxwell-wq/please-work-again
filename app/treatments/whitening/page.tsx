import type { Metadata } from 'next';

import { JsonLd, schema } from '@/lib/seo';
import WhiteningPageContent from './page-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/whitening`;

const serviceJson = schema.service({
  name: 'Professional Teeth Whitening',
  url: pageUrl,
  areaServed: ['Shoreham-by-Sea', 'Brighton', 'Worthing'],
  offers: { priceCurrency: 'GBP' },
});

const faqJson = schema.faqPage([
  {
    q: 'How long does teeth whitening last?',
    a: 'Professional whitening can brighten your smile for 12-18 months, especially with top-up gels and good oral hygiene.',
  },
  {
    q: 'Will whitening make my teeth sensitive?',
    a: 'We tailor each treatment to minimise sensitivity and use desensitising serums where needed.',
  },
  {
    q: 'Is whitening safe for enamel?',
    a: 'Yes, dentist-supervised whitening uses regulated gels that safely lift stains without damaging enamel.',
  },
]);

export const metadata: Metadata = {
  title: 'Teeth Whitening in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Achieve a brighter smile with professional teeth whitening at St Mary’s House Dental. Custom treatment plans deliver stunning results safely and comfortably.',
  alternates: { canonical: pageUrl },
};

export default function WhiteningPage() {
  return (
    <>
      <JsonLd json={serviceJson} />
      <JsonLd json={faqJson} />
      <WhiteningPageContent />
    </>
  );
}
