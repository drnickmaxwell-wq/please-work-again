'use client';

import '@/styles/champagne/hero-manifest.css';
import '@/styles/champagne/hero.css';
import manifest from '@/styles/champagne/manifest.json';
import { useEffect, useRef } from 'react';

export type Layer = {
  id?: number;
  name?: string;
  src: string | null;
  cssBackground?: string;
  type: 'base' | 'wave' | 'particles' | 'grain' | 'veil' | 'gold' | 'static' | 'motion' | 'content';
  opacity?: number;
  blendMode?: string;
  motion?: boolean;
  parallaxMaxPx?: number;
  zIndex?: number;
  tileable?: boolean;
  tileSize?: string;
  description?: string;
};

export type Manifest = {
  heroLayers?: Layer[];
  layers?: Layer[];
};

const manifestData = manifest as Manifest;

// Support both old and new manifest formats
const allLayers = (manifestData.layers || manifestData.heroLayers || []) as Layer[];

// Separate static and motion layers
const staticLayers = allLayers.filter((layer) => layer.type !== 'motion' && !layer.motion);
const motionLayers = allLayers.filter((layer) => layer.type === 'motion' || layer.motion);

const baseLayer = allLayers.find((layer) => layer.type === 'base' || (layer.name && layer.name.includes('gradient')));
const overlayLayers = staticLayers.filter((layer) => layer.type !== 'base' && layer.type !== 'content');

export default function HeroManifest() {
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

  return (
    <section
      className="heroManifest champagne-hero-manifest"
      style={{
        ['--heroManifestBase' as const]: baseLayer?.cssBackground || baseLayer?.src || 'var(--smh-gradient)',
      }}
      aria-label="Precision in Harmony hero"
    >
      {/* Base gradient layer */}
      <div className="hero-gradient-base" />

      {/* Motion layers */}
      {motionLayers.map((layer, index) => {
        const layerName = layer.name || `motion-${index}`;
        const layerClass = `hero-${layerName}`;
        
        return (
          <div key={layerName} className={layerClass}>
            <video
              ref={el => (videoRefs.current[index] = el)}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src={layer.src || ''} type="video/webm" />
            </video>
          </div>
        );
      })}

      {/* Static overlay layers */}
      <div className="heroManifest__layers" aria-hidden="true">
        {overlayLayers.map((layer, index) => {
          const layerType = layer.name || layer.type;
          const layerClass = `hm-layer hm-layer--${layerType}`;
          const backgroundImage = layer.src || '';

          return (
            <div
              key={`${layerType}-${index}`}
              className={layerClass}
              style={{
                ['--opacity' as const]: layer.opacity ?? 1,
                ['--blend' as const]: layer.blendMode ?? 'normal',
                backgroundImage: backgroundImage,
                mixBlendMode: (layer.blendMode as any) ?? 'normal',
                opacity: layer.opacity ?? 1,
              }}
            />
          );
        })}
      </div>

      <div className="heroManifest__contentWrap">
        <div className="heroManifest__content technologyStrip__content text-center">
          <div className="technologyStrip__eyebrow">
            <span className="technologyStrip__eyebrowPill">TECHNOLOGY</span>
          </div>

          <h1 className="technologyStrip__heading font-playfair text-5xl md:text-6xl font-semibold leading-tight tracking-tight mt-4">
            Precision in Harmony
          </h1>

          <p className="technologyStrip__subline mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Where artistry meets innovation under the Champagne light.
          </p>

          <div className="mt-10">
            <a href="/treatments/technology" className="technologyStrip__cta strip__cta">
              Explore Our Digital Workflow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const heroManifestLayers = Array.isArray(staticLayers) ? staticLayers : [];
export const heroManifestMotionLayers = Array.isArray(motionLayers) ? motionLayers : [];
