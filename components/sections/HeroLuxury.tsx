import React from "react";

export default function HeroLuxury() {
  return (
    <section
      className="heroLuxury relative isolate"
      aria-label="St Mary’s House Dental — Quiet Luxury Hero"
    >
      <div className="waves" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="soften-under glassCard rounded-2xl p-8 md:p-12">
          <h1 className="font-playfair text-5xl font-semibold leading-tight tracking-tight" style={{ color: 'var(--ink)' }}>
            Quiet luxury, 3D-first dentistry
          </h1>
          <p className="mt-4 max-w-xl text-lg" style={{ color: 'color-mix(in oklab, var(--ink) 80%, white)' }}>
            Same-day smiles, precision care, and compassionate expertise.
          </p>
          <div className="mt-8 flex gap-4">
            <a className="glass-btn" style={{ borderColor: 'var(--brand-gold-keyline)' }} href="/treatments">
              Explore treatments
            </a>
            <a className="glass-btn" href="/video-consultation">
              Book a video consult
            </a>
          </div>
        </div>
      </div>
      <div className="handoff" aria-hidden="true" />
    </section>
  );
}
