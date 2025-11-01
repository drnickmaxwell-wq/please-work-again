// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useRef, useState } from "react";

type TokenProbe = {
  raw: string;
  resolved: boolean;
  asset: string;
};

type Diagnostics = {
  gradient: string;
  tokenGradient: string;
  normalizedTokenGradient: string;
  normalizedSurfaceGradient: string;
  techHeroGradient: string;
  techHeroFiltersRemoved: boolean;
  hasHeroWavesOverlay: boolean;
  hasJourneyWavesOverlay: boolean;
  waves: string;
  backgroundSize: string;
  backgroundPosition: string;
  tokens: {
    wavesBg: TokenProbe;
    waveMaskDesktop: TokenProbe;
    waveMaskMobile: TokenProbe;
    heroParticles: TokenProbe;
    heroGrain: TokenProbe;
    heroMaskDesktopAlias: TokenProbe;
  };
  heroBackgroundImage: string;
  journeyBackgroundImage: string;
  heroMaskImage: string;
  frozenStrip: {
    backgroundImage: string;
    backdropImage: string;
    backdropMask: string;
    particlesImage: string;
    grainImage: string;
  } | null;
  tuners: {
    waveContrast: string;
    heroParticlesOpacity: string;
    journeyParticlesOpacity: string;
    footerParticlesOpacity: string;
  };
};

const COMPONENT_PREVIEW_LINKS = [
  {
    href: "/preview/tech-strip-locked",
    label: "Technology Strip — Frozen reference",
  },
  {
    href: "/preview/tech-strip-clone",
    label: "Technology Strip clone (scoped)",
  },
] as const;

const servicesGridAssets = [
  "/assets/champagne/icons/scan.svg",
  "/assets/champagne/icons/implant.svg",
  "/assets/champagne/icons/smile-curve.svg",
  "/assets/champagne/icons/sparkle.svg",
  "/assets/champagne/brand-polish/wave-gold-dust.png",
  "/assets/champagne/brand-polish/glass-reflect.svg",
  "/assets/champagne/brand-polish/wave-light-overlay.webp",
].join(", ");

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
    const techHeroElement = document.querySelector<HTMLElement>(".technologyStrip--techpage");
    const techHeroStyles = techHeroElement ? getComputedStyle(techHeroElement) : null;
    const techHeroGradient = techHeroStyles
      ? normalizeGradientString(techHeroStyles.backgroundImage || "")
      : "";
    const bannedFilterTokens = ["hue-rotate", "saturate", "sepia", "contrast"];
    const hasBannedFilterToken = (value: string) => {
      const lower = value.toLowerCase();
      return bannedFilterTokens.some((token) => lower.includes(token));
    };
    let techHeroFiltersRemoved = true;
    if (techHeroStyles) {
      const heroFilter = tidy(techHeroStyles.getPropertyValue("filter") || "");
      const heroBackdrop = tidy(
        techHeroStyles.getPropertyValue("backdrop-filter") ||
          techHeroStyles.getPropertyValue("-webkit-backdrop-filter") ||
          ""
      );
      if (hasBannedFilterToken(heroFilter) || hasBannedFilterToken(heroBackdrop)) {
        techHeroFiltersRemoved = false;
      }
    }
    if (techHeroElement) {
      const ctaNodes = techHeroElement.querySelectorAll<HTMLElement>(".cta");
      ctaNodes.forEach((cta) => {
        const ctaStyles = getComputedStyle(cta);
        const ctaFilter = tidy(ctaStyles.getPropertyValue("filter") || "");
        const ctaBackdrop = tidy(
          ctaStyles.getPropertyValue("backdrop-filter") ||
            ctaStyles.getPropertyValue("-webkit-backdrop-filter") ||
            ""
        );
        if (hasBannedFilterToken(ctaFilter) || hasBannedFilterToken(ctaBackdrop)) {
          techHeroFiltersRemoved = false;
        }
      });
    }
    const journeyElement = document.querySelector<HTMLElement>("section.smileJourney");
    const journeyBackgroundImage = journeyElement
      ? tidy(getComputedStyle(journeyElement).backgroundImage || "")
      : "";

    const probeToken = (tokenName: string): TokenProbe => {
      const raw = tidy(docStyles.getPropertyValue(tokenName) || "");
      const match = raw.match(/url\((['"]?)(.*?)\1\)/i);
      const asset = match ? tidy(match[2]) : raw;
      return {
        raw,
        resolved: Boolean(match && match[2]),
        asset,
      };
    };

    const wavesToken = probeToken("--smh-waves-bg");
    const waveMaskDesktopToken = probeToken("--smh-wave-mask-desktop");
    const waveMaskMobileToken = probeToken("--smh-wave-mask-mobile");
    const heroParticlesToken = probeToken("--smh-hero-particles");
    const heroGrainToken = probeToken("--smh-hero-grain");
    const heroMaskAliasToken = probeToken("--smh-hero-mask-desktop");

    const surfaceBeforeStyles = getComputedStyle(surface, "::before");
    const heroMaskImage = tidy(
      surfaceBeforeStyles.getPropertyValue("mask-image") ||
        surfaceBeforeStyles.getPropertyValue("-webkit-mask-image") ||
        ""
    );

    const frozenStripElement = document.querySelector<HTMLElement>(
      ".technologyStrip--frozen"
    );
    let frozenStrip: Diagnostics["frozenStrip"] = null;
    if (frozenStripElement) {
      const frozenStyles = getComputedStyle(frozenStripElement);
      const backdrop = frozenStripElement.querySelector<HTMLElement>(
        ".strip__backdrop"
      );
      const backdropStyles = backdrop ? getComputedStyle(backdrop) : null;
      const particlesStyles = getComputedStyle(frozenStripElement, "::before");
      const grainStyles = getComputedStyle(frozenStripElement, "::after");

      frozenStrip = {
        backgroundImage: tidy(frozenStyles.backgroundImage || ""),
        backdropImage: backdropStyles ? tidy(backdropStyles.backgroundImage || "") : "",
        backdropMask:
          backdropStyles
            ? tidy(
                backdropStyles.getPropertyValue("mask-image") ||
                  backdropStyles.getPropertyValue("-webkit-mask-image") ||
                  ""
              )
            : "",
        particlesImage: tidy(particlesStyles.backgroundImage || ""),
        grainImage: tidy(grainStyles.backgroundImage || ""),
      };
    }

    const hasHeroWavesOverlay = Boolean(document.querySelector(".heroLuxury > .waves"));
    const hasJourneyWavesOverlay = Boolean(document.querySelector(".smileJourney > .waves"));

    const diagnostics: Diagnostics = {
      gradient,
      tokenGradient: tidy(tokenGradientRaw),
      normalizedTokenGradient,
      normalizedSurfaceGradient,
      techHeroGradient,
      techHeroFiltersRemoved,
      hasHeroWavesOverlay,
      hasJourneyWavesOverlay,
      waves: wavesToken.asset,
      backgroundSize: surfaceStyles.backgroundSize,
      backgroundPosition: surfaceStyles.backgroundPosition,
      tokens: {
        wavesBg: wavesToken,
        waveMaskDesktop: waveMaskDesktopToken,
        waveMaskMobile: waveMaskMobileToken,
        heroParticles: heroParticlesToken,
        heroGrain: heroGrainToken,
        heroMaskDesktopAlias: heroMaskAliasToken,
      },
      heroBackgroundImage,
      journeyBackgroundImage,
      heroMaskImage,
      frozenStrip,
      tuners: {
        waveContrast: tidy(docStyles.getPropertyValue("--smh-wave-contrast") || ""),
        heroParticlesOpacity: tidy(
          docStyles.getPropertyValue("--smh-hero-particles-opacity") || ""
        ),
        journeyParticlesOpacity: tidy(
          docStyles.getPropertyValue("--smh-journey-particles-opacity") || ""
        ),
        footerParticlesOpacity: tidy(
          docStyles.getPropertyValue("--smh-footer-particles-opacity") || ""
        ),
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
      <section ref={surfaceRef} className={surfaceClassName} data-brand-surface>
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
                  techHeroGradient={liveDiagnostics.techHeroGradient || "n/a"}, techHeroFiltersRemoved=
                  {String(liveDiagnostics.techHeroFiltersRemoved)}
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
                  wavesToken={String(liveDiagnostics.tokens.wavesBg.resolved)} (
                  {liveDiagnostics.tokens.wavesBg.asset || "n/a"})
                </p>
                <p>
                  waveMaskDesktopToken={String(liveDiagnostics.tokens.waveMaskDesktop.resolved)} (
                  {liveDiagnostics.tokens.waveMaskDesktop.asset || "n/a"})
                </p>
                <p>
                  waveMaskMobileToken={String(liveDiagnostics.tokens.waveMaskMobile.resolved)} (
                  {liveDiagnostics.tokens.waveMaskMobile.asset || "n/a"})
                </p>
                <p>
                  heroParticlesToken={String(liveDiagnostics.tokens.heroParticles.resolved)} (
                  {liveDiagnostics.tokens.heroParticles.asset || "n/a"})
                </p>
                <p>
                  heroGrainToken={String(liveDiagnostics.tokens.heroGrain.resolved)} (
                  {liveDiagnostics.tokens.heroGrain.asset || "n/a"})
                </p>
                <p>heroMaskAlias={liveDiagnostics.tokens.heroMaskDesktopAlias.raw || "n/a"}</p>
                <p>heroMaskImage={liveDiagnostics.heroMaskImage || "n/a"}</p>
                <p>heroBackgroundImage={liveDiagnostics.heroBackgroundImage}</p>
                <p>journeyBackgroundImage={liveDiagnostics.journeyBackgroundImage}</p>
                <p>
                  frozenStrip.backgroundImage={
                    liveDiagnostics.frozenStrip?.backgroundImage || "n/a"
                  }
                </p>
                <p>
                  frozenStrip.backdropImage={
                    liveDiagnostics.frozenStrip?.backdropImage || "n/a"
                  }
                </p>
                <p>
                  frozenStrip.backdropMask={
                    liveDiagnostics.frozenStrip?.backdropMask || "n/a"
                  }
                </p>
                <p>
                  frozenStrip.particlesImage={
                    liveDiagnostics.frozenStrip?.particlesImage || "n/a"
                  }
                </p>
                <p>
                  frozenStrip.grainImage={
                    liveDiagnostics.frozenStrip?.grainImage || "n/a"
                  }
                </p>
                <p>servicesGridAssets={servicesGridAssets}</p>
                <p>
                  tuners wave={liveDiagnostics.tuners.waveContrast} heroOpacity={liveDiagnostics.tuners.heroParticlesOpacity}
                  {' '}
                  journeyOpacity={liveDiagnostics.tuners.journeyParticlesOpacity} footerOpacity={liveDiagnostics.tuners.footerParticlesOpacity}
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
      <footer className="border-t border-[color:color-mix(in oklab,var(--smh-ink, #0B0D0F) 12%, transparent)] bg-[color:var(--smh-bg)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:color-mix(in oklab,var(--smh-ink, #0B0D0F) 60%, transparent)]">
              Component Previews
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[color:color-mix(in oklab,var(--smh-ink, #0B0D0F) 80%, transparent)]">
              {COMPONENT_PREVIEW_LINKS.map((preview) => (
                <li key={preview.href}>
                  <a
                    className="inline-flex items-center gap-2 underline-offset-4 transition hover:text-[color:var(--smh-primary-magenta)] hover:underline"
                    href={preview.href}
                  >
                    <span>{preview.label}</span>
                    <span aria-hidden="true" className="text-[color:var(--smh-primary-teal)]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-[color:color-mix(in oklab,var(--smh-ink, #0B0D0F) 65%, transparent)]">
            Snapshot routes render read-only champagne surfaces for visual QA. Use these links to validate gradient scope and
            overlay intensity before shipping changes.
          </p>
        </div>
      </footer>
    </main>
  );
}
