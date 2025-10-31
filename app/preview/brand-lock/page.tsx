// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useRef, useState } from "react";

type Diagnostics = {
  gradient: string;
  waves: string;
  backgroundSize: string;
  backgroundPosition: string;
  wavesToken: { resolved: boolean; asset: string };
  heroBackgroundImage: string;
  journeyBackgroundImage: string;
  tuners: {
    waveContrast: string;
    heroParticles: string;
    journeyParticles: string;
    footerParticles: string;
  };
};

const normalizeGradient = (value: string) =>
  value
    .replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (_, r, g, b) => {
      const toHex = (channel: string) => {
        const hex = Number(channel).toString(16).padStart(2, "0");
        return hex.toUpperCase();
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    })
    .replace(/\s+/g, "");

const tidy = (value: string) => value.replace(/\s+/g, " ").trim();

export default function BrandLock() {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const [particlesEnabled, setParticlesEnabled] = useState(false);
  const [liveDiagnostics, setLiveDiagnostics] = useState<Diagnostics | null>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const surfaceStyles = getComputedStyle(surface);
    const docStyles = getComputedStyle(document.documentElement);
    if (!document.body) return;

    const backgroundImage = surfaceStyles.backgroundImage;
    const gradientMatch = backgroundImage.match(/linear-gradient\([^)]*\)/i);
    const gradient = gradientMatch ? normalizeGradient(gradientMatch[0]) : "";

    const wavesTokenRaw = docStyles.getPropertyValue("--smh-waves-bg").trim();
    const waveUrlMatch = wavesTokenRaw.match(/url\((['"]?)(.*?)\1\)/i);
    const waveAsset = waveUrlMatch ? waveUrlMatch[2] : wavesTokenRaw;
    const waveAssetClean = tidy(waveAsset || "");
    const wavesResolved = Boolean(waveUrlMatch && waveAsset);

    const createProbe = (className: string) => {
      const probe = document.createElement("section");
      probe.className = className;
      probe.setAttribute("aria-hidden", "true");
      probe.style.position = "absolute";
      probe.style.width = "1px";
      probe.style.height = "1px";
      probe.style.left = "-9999px";
      probe.style.pointerEvents = "none";
      probe.style.opacity = "0";
      probe.style.clip = "rect(0 0 0 0)";
      probe.style.clipPath = "inset(50%)";
      document.body.appendChild(probe);
      return probe;
    };

    const probes: HTMLElement[] = [];
    const sampleBackground = (className: string) => {
      const probe = createProbe(className);
      probes.push(probe);
      return tidy(getComputedStyle(probe).backgroundImage || "");
    };

    const heroBackgroundImage = sampleBackground("heroLuxury");
    const journeyBackgroundImage = sampleBackground("smileJourney");

    probes.forEach((probe) => {
      if (probe.parentNode) {
        probe.parentNode.removeChild(probe);
      }
    });

    setLiveDiagnostics({
      gradient,
      waves: waveAssetClean,
      backgroundSize: surfaceStyles.backgroundSize,
      backgroundPosition: surfaceStyles.backgroundPosition,
      wavesToken: { resolved: wavesResolved, asset: waveAssetClean },
      heroBackgroundImage,
      journeyBackgroundImage,
      tuners: {
        waveContrast: tidy(docStyles.getPropertyValue("--smh-wave-contrast") || ""),
        heroParticles: tidy(docStyles.getPropertyValue("--smh-hero-particles") || ""),
        journeyParticles: tidy(docStyles.getPropertyValue("--smh-journey-particles") || ""),
        footerParticles: tidy(docStyles.getPropertyValue("--smh-footer-particles") || ""),
      },
    });
  }, [particlesEnabled]);

  const surfaceClassName = `champagne-surface champagne-surface-lux hero flex min-h-screen items-center justify-center p-6${
    particlesEnabled ? " particles" : ""
  }`;

  return (
    <main className="min-h-screen bg-[color:var(--smh-bg)] text-[color:var(--smh-text)]">
      <section ref={surfaceRef} className={surfaceClassName}>
        <div className="champagne-glass w-full max-w-2xl p-8">
          <h2 className="font-serif text-2xl">Brand lock diagnostics</h2>
          <p className="mt-2 text-sm opacity-80">
            Values below reflect live computed styles for the champagne surface stack.
          </p>
          <label className="mt-4 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={particlesEnabled}
              onChange={(event) => setParticlesEnabled(event.target.checked)}
            />
            Particles overlay
          </label>
          <div className="mt-6 space-y-2 font-mono text-sm">
            {liveDiagnostics ? (
              <>
                <p>gradient={liveDiagnostics.gradient}</p>
                <p>waves={liveDiagnostics.waves || "unresolved"}</p>
                <p>
                  bgSize/Pos={liveDiagnostics.backgroundSize} | {liveDiagnostics.backgroundPosition}
                </p>
                <p>
                  wavesToken={String(liveDiagnostics.wavesToken.resolved)} (
                  {liveDiagnostics.wavesToken.asset || "n/a"})
                </p>
                <p>heroBg={liveDiagnostics.heroBackgroundImage}</p>
                <p>journeyBg={liveDiagnostics.journeyBackgroundImage}</p>
                <p>
                  tuners wave={liveDiagnostics.tuners.waveContrast} hero={liveDiagnostics.tuners.heroParticles}
                  {' '}
                  journey={liveDiagnostics.tuners.journeyParticles} footer={liveDiagnostics.tuners.footerParticles}
                </p>
              </>
            ) : (
              <p aria-live="polite">Sampling surface…</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
