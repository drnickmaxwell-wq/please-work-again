'use client';

import React, { useEffect, useRef } from 'react';
import manifest from '@/styles/champagne/manifest.json';
import '@/styles/champagne/hero.css';

interface HeroManifestProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function HeroManifest({
  title = 'Your Luxury Smile Awaits',
  subtitle = 'Experience world-class dental care with the Champagne Design System',
  primaryLabel = 'Book Consultation',
  primaryHref = '/book',
  secondaryLabel = 'Explore Treatments',
  secondaryHref = '/treatments',
}: HeroManifestProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Pause all videos if reduced motion is preferred
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
        }
      });
    } else {
      // Ensure all videos are playing
      videoRefs.current.forEach(video => {
        if (video) {
          video.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      });
    }
  }, []);

  const motionLayers = manifest.layers.filter(layer => layer.type === 'motion');
  const staticLayers = manifest.layers.filter(layer => layer.type === 'static');

  return (
    <section className="champagne-hero-manifest" aria-labelledby="hero-title">
      {/* Layer 1: Gradient Base */}
      <div className="hero-gradient-base" />

      {/* Layer 2: Wave Caustics (motion) */}
      <div className="hero-wave-caustics">
        <video
          ref={el => (videoRefs.current[0] = el)}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/champagne/motion/wave-caustics.webm" type="video/webm" />
        </video>
      </div>

      {/* Layer 3: Wave Mask (static) */}
      <div className="hero-wave-mask" />

      {/* Layer 4: Glass Shimmer (motion) */}
      <div className="hero-glass-shimmer">
        <video
          ref={el => (videoRefs.current[1] = el)}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/champagne/motion/glass-shimmer.webm" type="video/webm" />
        </video>
      </div>

      {/* Layer 5: Particles Static */}
      <div className="hero-particles-static" />

      {/* Layer 6: Particles Drift (motion) */}
      <div className="hero-particles-drift">
        <video
          ref={el => (videoRefs.current[2] = el)}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/champagne/motion/particles-drift.webm" type="video/webm" />
        </video>
      </div>

      {/* Layer 7: Gold Dust Drift (motion) */}
      <div className="hero-gold-dust-drift">
        <video
          ref={el => (videoRefs.current[3] = el)}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/assets/champagne/particles/gold-dust-drift.webm" type="video/webm" />
        </video>
      </div>

      {/* Layer 8: Film Grain */}
      <div className="hero-film-grain" />

      {/* Layer 9: Content */}
      <div className="hero-content">
        <div className="hero-content-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 id="hero-title" className="hero-title">
            {title}
          </h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          <div className="hero-cta-group">
            <a href={primaryHref} className="hero-cta-primary">
              {primaryLabel}
            </a>
            {secondaryLabel && (
              <a href={secondaryHref} className="hero-cta-secondary">
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Debug info (only in preview) */}
      <div
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          zIndex: 9999,
          fontFamily: 'monospace',
        }}
      >
        <div>Manifest v{manifest.version}</div>
        <div>{manifest.layers.length} layers</div>
        <div>{motionLayers.length} motion / {staticLayers.length} static</div>
      </div>
    </section>
  );
}
