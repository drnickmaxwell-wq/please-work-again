// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useRef, useState } from "react";

type Diagnostics = {
  gradient: string;
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

    const normalizedTokenGradient = normalizeGradientString(
      getComputedStyle(document.documentElement).getPropertyValue("--smh-gradient")
    );
    const heroElement = document.querySelector<HTMLElement>(".heroLuxury");
    const normalizedSurfaceGradient = normalizeGradientString(
      heroElement ? getComputedStyle(heroElement).backgroundImage : backgroundImage
    );

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
      if (className === "heroLuxury" || className === "smileJourney") {
        const waves = document.createElement("div");
        waves.className = "waves";
        waves.setAttribute("aria-hidden", "true");
        probe.appendChild(waves);
      }
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

    const hasHeroWavesOverlay = Boolean(document.querySelector(".heroLuxury > .waves"));
    const hasJourneyWavesOverlay = Boolean(document.querySelector(".smileJourney > .waves"));

    probes.forEach((probe) => {
      if (probe.parentNode) {
        probe.parentNode.removeChild(probe);
      }
    });

    const diagnostics: Diagnostics = {
      gradient,
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
