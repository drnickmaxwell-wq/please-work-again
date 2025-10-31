'use client';

import React, { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: '“The AI consultations feel like a luxury lounge for dentistry. Every patient says yes.”',
    name: 'Dr. Elaina Cortez',
    role: 'Signature Smile Studio, Austin'
  },
  {
    quote: '“Seeing projected outcomes in 3D builds trust instantly. We closed our biggest case in weeks.”',
    name: 'Dr. Martin Chao',
    role: 'Harborfront Aesthetic Dentistry'
  },
  {
    quote: '“Our treatment coordinators love the automated follow-ups. It keeps momentum without the manual work.”',
    name: 'Brittany Lawson',
    role: 'Patient Concierge Lead'
  },
  {
    quote: '“Signature Services turned our office into an experience patients recommend to everyone.”',
    name: 'Dr. Nia Winters',
    role: 'Summit View Dental Loft'
  }
];

export default function TestimonialsMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let offset = 0;
    let raf: number;

    const animate = () => {
      offset -= 0.4;
      if (Math.abs(offset) > node.scrollWidth / 2) {
        offset = 0;
      }
      node.style.transform = `translate3d(${offset}px, 0, 0)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--smh-surface-elevated)] py-12">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--smh-surface-elevated)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--smh-surface-elevated)] to-transparent" />
        <div className="smh-anim" role="list" aria-label="Testimonials marquee">
          <div ref={ref} className="flex gap-6 whitespace-nowrap will-change-transform">
            {[...testimonials, ...testimonials].map((item, index) => (
              <figure
                key={`${item.name}-${index}`}
                className="min-w-[22rem] max-w-[22rem] rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-white/70"
              >
                <blockquote className="text-sm leading-relaxed text-white/80">{item.quote}</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--smh-gold)]">
                  {item.name}
                  <span className="mt-1 block text-[0.65rem] font-medium tracking-[0.1em] text-white/50">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
