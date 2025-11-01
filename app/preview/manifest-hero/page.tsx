import type { CSSProperties } from 'react';

import '@/styles/champagne/hero.css';
import manifest from '@/styles/champagne/manifest.json';

type Layer = {
  type: string;
  src: string;
  opacity?: number;
  blendMode?: string;
  motion?: boolean;
};

type Manifest = {
  heroLayers?: Layer[];
  waveMask?: {
    desktop?: string;
    mobile?: string;
  };
  motion?: Record<string, { src: string } | null | undefined>;
};

const manifestData = manifest as Manifest;
const heroLayers = manifestData.heroLayers ?? [];

const layerByType = (type: string) => heroLayers.find((layer) => layer.type === type);

const baseLayer = layerByType('base');
const waveLayer = layerByType('wave');
const veilLayer = layerByType('veil');
const particlesLayer = layerByType('particles');
const goldLayer = layerByType('gold');
const grainLayer = layerByType('grain');

const maskTokens = {
  desktop: manifestData.waveMask?.desktop ?? 'var(--smh-wave-mask-desktop)',
  mobile: manifestData.waveMask?.mobile ?? 'var(--smh-wave-mask-mobile)',
};

const motionOrder = ['caustics', 'shimmer'];
const manifestMotion = manifestData.motion ?? {};
const motionLayers = motionOrder
  .map((key) => {
    const entry = manifestMotion[key];
    return entry?.src ? { key, src: entry.src } : null;
  })
  .filter(Boolean) as { key: string; src: string }[];

const layerStyle = (layer?: Layer, fallback?: Partial<CSSProperties>) => {
  const style: CSSProperties = {
    ...(fallback ?? {}),
  };

  if (layer?.src) {
    style.backgroundImage = layer.src;
  }

  if (layer && typeof layer.opacity === 'number') {
    style.opacity = layer.opacity;
  }

  if (layer?.blendMode) {
    style.mixBlendMode = layer.blendMode as CSSProperties['mixBlendMode'];
  }

  return Object.keys(style).length > 0 ? style : undefined;
};

const waveStyle = layerStyle(waveLayer, {
  backgroundImage: 'var(--smh-waves-bg)',
  mixBlendMode: 'screen',
});
const veilStyle = layerStyle(veilLayer);
const particlesStyle = layerStyle(particlesLayer);
const goldStyle = layerStyle(goldLayer);
const grainStyle = layerStyle(grainLayer);

const maskStatus = (() => {
  const token = maskTokens.desktop ?? '';
  return token.includes('url(') || token.includes('--smh-wave-mask') ? 'url' : 'none';
})();

export default function ManifestHeroPreviewPage() {
  const gradient = baseLayer?.src ?? 'var(--smh-gradient)';
  const renderedMotionKeys = motionLayers.map((layer) => layer.key);

  return (
    <main className="space-y-16 pb-24">
      <section className="manifestHero" style={{ backgroundImage: gradient }}>
        <div
          className="manifestHero__mask"
          style={{
            ['--manifestHeroMaskDesktop' as const]: maskTokens.desktop,
            ['--manifestHeroMaskMobile' as const]: maskTokens.mobile,
          }}
        >
          <div className="manifestHero__overlay manifestHero__waves" aria-hidden="true" style={waveStyle} />

          {veilLayer ? (
            <div className="manifestHero__overlay manifestHero__veil" aria-hidden="true" style={veilStyle} />
          ) : null}

          {motionLayers.map(({ key, src }) => (
            <video
              key={key}
              className="manifestHero__video"
              aria-hidden="true"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={src} type="video/webm" />
            </video>
          ))}

          {particlesLayer ? (
            <div
              className="manifestHero__overlay manifestHero__particles"
              aria-hidden="true"
              style={particlesStyle}
            />
          ) : null}

          {goldLayer ? (
            <div className="manifestHero__overlay manifestHero__gold" aria-hidden="true" style={goldStyle} />
          ) : null}

          {grainLayer ? (
            <div className="manifestHero__overlay manifestHero__grain" aria-hidden="true" style={grainStyle} />
          ) : null}

          <div className="manifestHero__content">
            <div className="manifestHero__eyebrow text-slate-200/90">
              <span>Technology</span>
            </div>
            <h1 className="font-playfair text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              Precision in Harmony
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
              Where artistry meets innovation under the Champagne light.
            </p>
            <div>
              <a className="manifestHero__cta" href="/treatments/technology">
                Explore Our Digital Workflow
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6" aria-label="Manifest hero diagnostics">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100">Diagnostics</h2>
        <dl className="mt-4 space-y-3 font-mono text-sm text-slate-200/80">
          <div className="flex items-start justify-between gap-3">
            <dt>--smh-waves-bg</dt>
            <dd className="text-right">{waveLayer?.src ?? 'var(--smh-waves-bg)'}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt>mask-image</dt>
            <dd className="text-right">{maskStatus}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt>motion layers</dt>
            <dd className="text-right">
              {renderedMotionKeys.length > 0 ? renderedMotionKeys.join(', ') : 'none'}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
