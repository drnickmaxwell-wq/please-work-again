'use client';
import StickyHeader from '@/components/layout/sticky-header';
import { FooterLuxe } from '@/components/footer-luxe';

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[var(--smh-midnight)]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'var(--font-playfair), Georgia, serif'}}>Privacy Policy</h1>
        <div className="mt-6 text-slate-700 dark:text-slate-300" style={{fontFamily:'var(--font-inter), system-ui, Arial'}}>
          <p>Privacy policy placeholder. Replace with your finalized text.</p>
        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}
