import HeroManifest, { heroManifestLayers } from '@/components/sections/HeroManifest';

export default function ManifestHeroPreviewPage() {
  return (
    <main className="space-y-16 pb-24">
      <HeroManifest />

      <section className="mx-auto max-w-4xl px-6" aria-label="Manifest layer diagnostics">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100">Layer Diagnostics</h2>
        <p className="mt-2 text-sm text-slate-300/80">
          Ordered as defined in <code>styles/champagne/manifest.json</code> (motion layers omitted).
        </p>
        <ul className="mt-6 space-y-4 font-mono text-sm">
          {heroManifestLayers.map((layer, index) => (
            <li
              key={`${layer.type}-${index}`}
              className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-100"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold uppercase tracking-[0.2em] text-slate-200/80">
                  {index + 1}. {layer.type}
                </span>
                <span className="text-xs text-slate-300/70">
                  opacity: {layer.opacity ?? '—'} | blend: {layer.blendMode ?? 'normal'}
                </span>
              </div>
              <div className="mt-2 break-words text-xs text-slate-200/70">
                src: {layer.src}
              </div>
              {layer.motion ? (
                <div className="mt-2 text-xs text-amber-300/80">motion layer placeholder (not rendered)</div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
