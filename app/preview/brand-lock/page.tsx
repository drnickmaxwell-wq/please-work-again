// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useRef, useState } from "react";

type Diagnostics = {
  gradient: string;
  tokenGradient: string;
  normalizedTokenGradient: string;
  normalizedSurfaceGradient: string;
  hasHeroWavesOverlay: boolean;
  hasJourneyWavesOverlay: boolean;
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

function rgbToHex(s: string) {
  const m = s.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (!m) return s;
  const toHex = (n: string) => Number(n).toString(16).padStart(2, "0");
  return "#" + toHex(m[1]) + toHex(m[2]) + toHex(m[3]);
}

function normalizeGradientString(value: string) {
  if (!value) return "";
  const i = value.indexOf("linear-gradient");
  if (i === -1) return "";
  let depth = 0;
  let end = -1;
  for (let j = i; j < value.length; j++) {
    const ch = value[j];
    if (ch === "(") depth++;
    if (ch === ")") {
      depth--;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  let g = end > i ? value.slice(i, end + 1) : value;
  g = g.replace(/rgb\([^\)]+\)/gi, (m) => rgbToHex(m));
  return g.replace(/\s+/g, "").toLowerCase();
}

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
    const gradient = gradientMatch ? normalizeGradientString(gradientMatch[0]) : "";

    const tokenGradientRaw = docStyles.getPropertyValue("--smh-gradient") || "";
    const normalizedTokenGradient = normalizeGradientString(tokenGradientRaw);
    const heroElement = document.querySelector<HTMLElement>("section.heroLuxury");
    const heroBackgroundImage = heroElement
      ? tidy(getComputedStyle(heroElement).backgroundImage || "")
      : "";
    const normalizedSurfaceGradient = normalizeGradientString(heroBackgroundImage || backgroundImage);
    const journeyElement = document.querySelector<HTMLElement>("section.smileJourney");
    const journeyBackgroundImage = journeyElement
      ? tidy(getComputedStyle(journeyElement).backgroundImage || "")
      : "";

    const wavesTokenRaw = docStyles.getPropertyValue("--smh-waves-bg").trim();
    const waveUrlMatch = wavesTokenRaw.match(/url\((['"]?)(.*?)\1\)/i);
    const waveAsset = waveUrlMatch ? waveUrlMatch[2] : wavesTokenRaw;
    const waveAssetClean = tidy(waveAsset || "");
    const wavesResolved = Boolean(waveUrlMatch && waveAsset);

    const hasHeroWavesOverlay = Boolean(document.querySelector(".heroLuxury > .waves"));
    const hasJourneyWavesOverlay = Boolean(document.querySelector(".smileJourney > .waves"));

    const diagnostics: Diagnostics = {
      gradient,
      tokenGradient: tidy(tokenGradientRaw),
      normalizedTokenGradient,
      normalizedSurfaceGradient,
      hasHeroWavesOverlay,
      hasJourneyWavesOverlay,
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
    };

    if (typeof window !== "undefined") {
      (window as typeof window & { __brandLockDiagnostics?: Diagnostics }).__brandLockDiagnostics = diagnostics;
    }

    setLiveDiagnostics(diagnostics);
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
                <p>tokenGradient={liveDiagnostics.tokenGradient}</p>
                <p>
                  normalizedTokenGradient={liveDiagnostics.normalizedTokenGradient || "n/a"}
                </p>
                <p>
                  normalizedSurfaceGradient={liveDiagnostics.normalizedSurfaceGradient || "n/a"}
                </p>
                <p>
                  hasHeroWavesOverlay={String(liveDiagnostics.hasHeroWavesOverlay)}
                  {" "}
                  hasJourneyWavesOverlay={String(liveDiagnostics.hasJourneyWavesOverlay)}
                </p>
                <p>waves={liveDiagnostics.waves || "unresolved"}</p>
                <p>
                  bgSize/Pos={liveDiagnostics.backgroundSize} | {liveDiagnostics.backgroundPosition}
                </p>
                <p>
                  wavesToken={String(liveDiagnostics.wavesToken.resolved)} (
                  {liveDiagnostics.wavesToken.asset || "n/a"})
                </p>
                <p>heroBackgroundImage={liveDiagnostics.heroBackgroundImage}</p>
                <p>journeyBackgroundImage={liveDiagnostics.journeyBackgroundImage}</p>
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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          left: "-9999px",
          pointerEvents: "none",
          opacity: 0,
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
        }}
      >
        <section className="heroLuxury" />
        <section className="smileJourney" />
      </div>
    </main>
  );
}
