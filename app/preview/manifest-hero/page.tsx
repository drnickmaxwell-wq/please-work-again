import HeroManifest, { heroManifestLayers, heroManifestMotionLayers } from '@/components/sections/HeroManifest';

export default function ManifestHeroPreviewPage() {
  const staticLayers = Array.isArray(heroManifestLayers) ? heroManifestLayers : [];
  const motionLayers = Array.isArray(heroManifestMotionLayers) ? heroManifestMotionLayers : [];
  const allLayers = staticLayers.concat(motionLayers);
  
  return (
    <main className="space-y-16 pb-24">
      <HeroManifest />

      <section className="mx-auto max-w-4xl px-6" aria-label="Manifest layer diagnostics">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100">Layer Diagnostics</h2>
        <p className="mt-2 text-sm text-slate-300/80">
          Ordered as defined in <code>styles/champagne/manifest.json</code>. Motion layers now included.
        </p>
        
        <div className="mt-4 flex gap-4 text-sm">
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-slate-300/70">Static layers: </span>
            <span className="font-semibold text-slate-100">{staticLayers.length}</span>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2">
            <span className="text-amber-300/70">Motion layers: </span>
            <span className="font-semibold text-amber-200">{motionLayers.length}</span>
          </div>
        </div>

        <ul className="mt-6 space-y-4 font-mono text-sm">
          {allLayers.map((layer, index) => {
            const isMotion = layer.type === 'motion' || layer.motion;
            const layerName = layer.name || layer.type;
            
            return (
              <li
                key={`${layerName}-${index}`}
                className={`rounded-lg border p-4 ${
                  isMotion
                    ? 'border-amber-500/20 bg-amber-500/5 text-amber-100'
                    : 'border-white/10 bg-white/5 text-slate-100'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold uppercase tracking-[0.2em]">
                    {index + 1}. {layerName}
                  </span>
                  <span className="text-xs opacity-70">
                    opacity: {layer.opacity ?? '—'} | blend: {layer.blendMode ?? 'normal'}
                  </span>
                </div>
                <div className="mt-2 break-words text-xs opacity-70">
                  src: {layer.src || layer.cssBackground || '—'}
                </div>
                {isMotion && (
                  <div className="mt-2 text-xs text-amber-300/80">
                    ✓ Motion layer (WEBM video, hides on prefers-reduced-motion)
                  </div>
                )}
                {layer.description && (
                  <div className="mt-2 text-xs opacity-60">
                    {layer.description}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
