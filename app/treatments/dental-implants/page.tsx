import type { Metadata } from 'next';

import { JsonLd, schema } from '@/lib/seo';
import ImplantsPageContent from '../implants/page-content';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? 'https://www.stmaryshousedental.co.uk';
const canonicalBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
const pageUrl = `${canonicalBase}/treatments/dental-implants`;

const serviceJson = schema.service({
  name: 'Dental Implant Treatments',
  url: pageUrl,
  areaServed: ['Shoreham-by-Sea', 'Brighton', 'Worthing'],
  offers: { priceCurrency: 'GBP' },
});

const faqJson = schema.faqPage([
  {
    q: 'How long do dental implants last?',
    a: 'With good oral hygiene and regular check-ups, dental implants can last for decades and often a lifetime.',
  },
  {
    q: 'Is dental implant surgery painful?',
    a: 'We use modern anaesthetic and sedation techniques to ensure treatment is comfortable with minimal downtime.',
  },
  {
    q: 'Who is suitable for dental implants?',
    a: 'Most adults with healthy gums and sufficient bone density are candidates. Bone grafting can help where support is needed.',
  },
]);

export const metadata: Metadata = {
  title: 'Dental Implants in Shoreham-by-Sea | St Mary’s House Dental',
  description:
    'Restore your smile with precision dental implants at St Mary’s House Dental in Shoreham-by-Sea. Advanced planning delivers natural-looking, long-lasting results.',
  alternates: { canonical: pageUrl },
};

export default function DentalImplantsPage() {
  return (
    <>
      <JsonLd json={serviceJson} />
      <JsonLd json={faqJson} />
      <ImplantsPageContent />
    </>
  );
}
