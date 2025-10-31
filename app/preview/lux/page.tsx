'use client';

import HeroBand from '@/components/layout/sections/HeroBand';
import TreatmentsGridExact from '@/components/layout/sections/TreatmentsGridExact';
import TestimonialsExact from '@/components/layout/sections/TestimonialsExact';
import FinanceCtaExact from '@/components/layout/sections/FinanceCtaExact';
import TechTeaserExact from '@/components/layout/sections/TechTeaserExact';
import EmergencyExact from '@/components/layout/sections/EmergencyExact';
import BlogPreviewExact from '@/components/layout/sections/BlogPreviewExact';

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HeroBand />
      <TreatmentsGridExact />
      <TestimonialsExact />
      <FinanceCtaExact />
      <TechTeaserExact />
      <EmergencyExact />
      <BlogPreviewExact />
    </main>
  );
}
