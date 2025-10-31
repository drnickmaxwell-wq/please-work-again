import React from 'react';
import Link from 'next/link';

export default function CTA_Book() {
  return (
    <section className="smh-anim rounded-[2.5rem] border border-white/10 bg-[var(--smh-surface-elevated)] p-10 text-white shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--smh-gold)]">Book a Walkthrough</p>
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Ready to deliver the Signature Smile experience?
          </h2>
          <p className="text-lg text-white/70">
            Schedule a guided demo to explore how AI24 choreographs patient journeys, boosts case acceptance, and empowers your
            team to shine.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--smh-gradient)] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition hover:opacity-90"
          >
            Book a Signature Demo
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Concierge onboarding • 30 minutes</p>
        </div>
      </div>
    </section>
  );
}
