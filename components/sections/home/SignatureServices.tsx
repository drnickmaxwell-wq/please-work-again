import React from 'react';
import { asset, hasCDN } from '@/lib/assets';

const services = [
  {
    title: 'Smile Storyboarding',
    description: 'AI-assisted narratives showcase treatment milestones with clarity and emotion.',
    media: {
      poster: '/images/ai24/services/storyboard.jpg',
      video: '/videos/ai24/services/storyboard.mp4',
    },
  },
  {
    title: 'Photo Studio Automation',
    description: 'Capture, classify, and deliver media with tokenized workflows and automatic consent tracking.',
    media: {
      poster: '/images/ai24/services/studio.jpg',
      video: '/videos/ai24/services/studio.mp4',
    },
  },
  {
    title: 'Concierge Follow-Up',
    description: 'Sequenced texts and emails nurture patient excitement from consult to completion.',
    media: {
      poster: '/images/ai24/services/concierge.jpg',
      video: '/videos/ai24/services/concierge.mp4',
    },
  },
];

export default function SignatureServices() {
  return (
    <section className="space-y-10 rounded-[2.5rem] border border-white/10 bg-[var(--smh-surface-elevated)] p-8 text-white shadow-[0_24px_72px_rgba(0,0,0,0.35)] sm:p-12">
      <div className="smh-anim max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--smh-gold)]">
          Signature Services
        </p>
        <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
          Curated touchpoints that make modern dentistry unforgettable.
        </h2>
        <p className="text-lg text-white/70">
          Each workflow is orchestrated with AI insights and concierge-level polish, giving your team the tools to create
          moments patients rave about.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => {
          const poster = hasCDN ? asset(service.media.poster) : undefined;
          const videoSrc = hasCDN ? asset(service.media.video) : undefined;

          return (
            <article
              key={service.title}
              className="smh-anim flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed">{service.description}</p>
              </div>
              {hasCDN ? (
                <video
                  className="mt-6 w-full rounded-2xl border border-white/10"
                  poster={poster}
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/20 p-6 text-center text-xs text-white/50">
                  Media available when CDN assets are connected.
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
