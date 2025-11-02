import '@/styles/champagne/hero-manifest.css';
import manifest from '@/styles/champagne/manifest.json';

export type Layer = {
  src: string;
  type: 'base' | 'wave' | 'particles' | 'grain' | 'veil' | 'gold';
  opacity?: number;
  blendMode?: string;
  motion?: boolean;
};

export type Manifest = {
  heroLayers: Layer[];
};

const manifestData = manifest as Manifest;

// Split the manifest into static CSS-driven layers and motion <video> overlays.
const staticLayers = manifestData.heroLayers.filter((layer) => !layer.motion);
const motionLayers = manifestData.heroLayers.filter((layer) => layer.motion);

const baseLayer = staticLayers.find((layer) => layer.type === 'base');
const overlayLayers = staticLayers.filter((layer) => layer.type !== 'base');

export default function HeroManifest() {
  return (
    <section
      className="heroManifest"
      style={{
        ['--heroManifestBase' as const]: baseLayer?.src ?? 'var(--smh-gradient)',
      }}
      aria-label="Precision in Harmony hero"
    >
      <div className="heroManifest__layers" aria-hidden="true">
        {overlayLayers.map((layer, index) => {
          const layerClass = `hm-layer hm-layer--${layer.type}`;

          return (
            <div
              key={`${layer.type}-${index}`}
              className={layerClass}
              style={{
                ['--opacity' as const]: layer.opacity ?? 1,
                ['--blend' as const]: layer.blendMode ?? 'normal',
                backgroundImage: layer.src,
              }}
            />
          );
        })}

        {motionLayers.map((layer, index) => {
          const layerClass = `hm-layer hm-layer--${layer.type}`;

          return (
            <div
              key={`${layer.type}-motion-${index}`}
              className={layerClass}
              style={{
                ['--opacity' as const]: layer.opacity ?? 1,
                ['--blend' as const]: layer.blendMode ?? 'normal',
              }}
            >
              <video
                src={layer.src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
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

export const heroManifestLayers = staticLayers;
