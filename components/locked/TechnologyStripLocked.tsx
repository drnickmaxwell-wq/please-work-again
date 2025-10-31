import React from 'react';

const features = [
  {
    title: 'Micron scanning',
    description:
      'Contactless 3D capture maps enamel texture and bite registration with soothing, silent hardware.',
  },
  {
    title: 'In-suite fabrication',
    description:
      'Same-day veneers, aligners, and crowns are milled on site, blending artisan finish with AI guidance.',
  },
  {
    title: 'Guided comfort',
    description:
      'Ambient lighting, motion-calmed chairs, and predictive planning keep every visit composed.',
  },
];

export default function TechnologyStripLocked() {
  return (
    <section
      className="tech-strip-locked"
      aria-labelledby="technology-strip-locked-heading"
      data-testid="technology-strip-locked"
    >
      <div className="tech-strip-locked__layer tech-strip-locked__layer--particles" aria-hidden="true" />
      <div className="tech-strip-locked__layer tech-strip-locked__layer--grain" aria-hidden="true" />
      <div className="tech-strip-locked__brand-polish" aria-hidden="true">
        <span className="tech-strip-locked__polish tech-strip-locked__polish--glass" />
        <span className="tech-strip-locked__polish tech-strip-locked__polish--dust" />
        <span className="tech-strip-locked__polish tech-strip-locked__polish--light" />
      </div>

      <div className="tech-strip-locked__content">
        <header className="tech-strip-locked__header">
          <p className="tech-strip-locked__eyebrow">Technology</p>
          <h2 id="technology-strip-locked-heading">Technology in Harmony</h2>
          <p className="tech-strip-locked__intro">
            The frozen Manus reference: cinematic gradient, wave geometry, and calibrated overlays tuned for
            St Mary’s House Champagne.
          </p>
        </header>

        <dl className="tech-strip-locked__grid">
          {features.map((feature) => (
            <div key={feature.title} className="tech-strip-locked__item">
              <dt>{feature.title}</dt>
              <dd>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
