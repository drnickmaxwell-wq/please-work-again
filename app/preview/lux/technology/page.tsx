'use client';

import StickyHeader from '@/components/layout/sticky-header';
import { FooterLuxe } from '@/components/footer-luxe';


export default function Technology() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--smh-bg)', color: 'var(--smh-text)' }}>
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold">3D &amp; Digital Technology</h1>
        <p className="mt-2 opacity-80">
          Precision scanners, same-day crowns, AR smile previews and gentle comfort tech.
        </p>
        <div className="mt-6 aspect-[16/9] rounded-xl border grid place-items-center" style={{
          background: 'color-mix(in oklab, var(--smh-sand, var(--surface-0)) 86%, transparent)',
          color: 'var(--smh-text)'
        }}>
          3D viewer placeholder
        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}
