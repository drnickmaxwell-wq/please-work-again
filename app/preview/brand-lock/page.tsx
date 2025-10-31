// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useRef, useState } from "react";

type Diagnostics = {
  gradient: string;
  wavesAsset: string;
  backgroundSize: string;
  backgroundPosition: string;
  wavesBgResolved: { resolved: boolean; urlSnippet: string };
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

export default function BrandLock() {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const [particlesEnabled, setParticlesEnabled] = useState(false);
  const [liveDiagnostics, setLiveDiagnostics] = useState<Diagnostics | null>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const sampleBackgroundImage = (className: string) => {
      const probe = document.createElement("section");
      probe.className = className;
      Object.assign(probe.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        opacity: "0",
        visibility: "hidden",
        pointerEvents: "none",
      });
      document.body.appendChild(probe);
      const styles = getComputedStyle(probe);
      const backgroundImage = styles.backgroundImage;
      document.body.removeChild(probe);
      return backgroundImage;
    };

    const surfaceStyles = getComputedStyle(surface);
    const rootStyles = getComputedStyle(document.documentElement);

    const backgroundImage = surfaceStyles.backgroundImage;
    const gradientMatch = backgroundImage.match(/linear-gradient\([^)]*\)/i);
    const gradient = gradientMatch ? normalizeGradient(gradientMatch[0]) : "";

    const wavesMatch = backgroundImage.match(/url\(([^)]*waves[^)]*)\)/i);
    const wavesAsset = wavesMatch ? wavesMatch[1].replace(/"|'/g, "") : "";

    const wavesBgToken = rootStyles.getPropertyValue("--smh-waves-bg").trim();
    const wavesBgMatch = wavesBgToken.match(/url\(([^)]*)\)/i);
    const wavesBgSnippet = wavesBgMatch ? wavesBgMatch[1].replace(/"|'/g, "") : "";

    const heroBackgroundImage = sampleBackgroundImage(
      `heroLuxury${particlesEnabled ? " particles" : ""}`,
    );
    const journeyBackgroundImage = sampleBackgroundImage(
      `smileJourney${particlesEnabled ? " particles" : ""}`,
    );

    setLiveDiagnostics({
      gradient,
      wavesAsset,
      backgroundSize: surfaceStyles.backgroundSize,
      backgroundPosition: surfaceStyles.backgroundPosition,
      wavesBgResolved: {
        resolved: Boolean(wavesBgMatch),
        urlSnippet: wavesBgSnippet,
      },
      heroBackgroundImage,
      journeyBackgroundImage,
      tuners: {
        waveContrast: rootStyles.getPropertyValue("--smh-wave-contrast").trim() || "n/a",
        heroParticles: rootStyles.getPropertyValue("--smh-hero-particles").trim() || "n/a",
        journeyParticles: rootStyles.getPropertyValue("--smh-journey-particles").trim() || "n/a",
        footerParticles: rootStyles.getPropertyValue("--smh-footer-particles").trim() || "n/a",
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
                <p>wavesAsset={liveDiagnostics.wavesAsset}</p>
                <p>
                  bgSize/Pos={liveDiagnostics.backgroundSize} | {liveDiagnostics.backgroundPosition}
                </p>
                <p>
                  wavesBgTokenResolved=
                  {`${liveDiagnostics.wavesBgResolved.resolved} (${liveDiagnostics.wavesBgResolved.urlSnippet})`}
                </p>
                <p>heroBackgroundImage={liveDiagnostics.heroBackgroundImage}</p>
                <p>journeyBackgroundImage={liveDiagnostics.journeyBackgroundImage}</p>
                <p>
                  opacityTuners=
                  {JSON.stringify({
                    waveContrast: liveDiagnostics.tuners.waveContrast,
                    hero: liveDiagnostics.tuners.heroParticles,
                    journey: liveDiagnostics.tuners.journeyParticles,
                    footer: liveDiagnostics.tuners.footerParticles,
                  })}
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
