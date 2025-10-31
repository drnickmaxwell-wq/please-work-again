import React from 'react';
import Hero_Ai24 from '@/components/sections/home/Hero_Ai24';
import SignatureServices from '@/components/sections/home/SignatureServices';
import TestimonialsMarquee from '@/components/sections/home/TestimonialsMarquee';
import CTA_Book from '@/components/sections/common/CTA_Book';
import CompositeBonding from '@/components/sections/treatments/CompositeBonding';

export default function PreviewAi24Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
      <Hero_Ai24 />
      <SignatureServices />
      <TestimonialsMarquee />
      <CompositeBonding />
      <CTA_Book />
    </main>
  );
}
