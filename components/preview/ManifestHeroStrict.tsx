"use client";

import React from "react";
import manifest from "@/styles/champagne/manifest.json";
import "@/styles/champagne/manifest-hero-strict.css";

type MotionKey = "caustics" | "shimmer" | "particles" | "gold";

export default function ManifestHeroStrict() {
  const motion: Partial<Record<MotionKey, { src: string }>> =
    (manifest as any).motion || {};

  return (
    <section className="manifestHeroStrict">
      <div className="mhs__mask">
        {/* 1) Waves BG under everything */}
        <div className="mhs__waves" aria-hidden="true" />

        {/* 2) Motion layers in canonical order (if present) */}
        {motion.caustics && (
          <video className="mhs__video" aria-hidden="true" autoPlay muted loop playsInline>
            <source src={motion.caustics.src} type="video/webm" />
          </video>
        )}
        {motion.shimmer && (
          <video className="mhs__video" aria-hidden="true" autoPlay muted loop playsInline>
            <source src={motion.shimmer.src} type="video/webm" />
          </video>
        )}
        {motion.particles && (
          <video className="mhs__video mhs__particles" aria-hidden="true" autoPlay muted loop playsInline>
            <source src={motion.particles.src} type="video/webm" />
          </video>
        )}
        {motion.gold && (
          <video className="mhs__video mhs__gold" aria-hidden="true" autoPlay muted loop playsInline>
            <source src={motion.gold.src} type="video/webm" />
          </video>
        )}

        {/* 3) Fine grain as token image */}
        <div className="mhs__grain" aria-hidden="true" />

        {/* 4) Content */}
        <div className="mhs__content">
          <p className="mhs__eyebrow">TECHNOLOGY</p>
          <h1 className="mhs__title">Precision in Harmony</h1>
          <p className="mhs__sub">Where artistry meets innovation under the Champagne light.</p>
          <a className="mhs__cta" href="/treatments/technology">Explore Our Digital Workflow</a>
        </div>
      </div>

      {/* Minimal diagnostics */}
      <ul className="mhs__diag" aria-label="Diagnostics">
        <li>--smh-waves-bg: <code>var(--smh-waves-bg)</code></li>
        <li>mask-image: <code>var(--smh-wave-mask-desktop)</code> / mobile variant</li>
        <li>motion: {Object.keys(motion).join(", ") || "none"}</li>
      </ul>
    </section>
  );
}
