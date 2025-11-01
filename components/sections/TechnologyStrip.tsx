export default function TechnologyStrip() {
  return (
    <section
      id="technology"
      className="technologyStrip technologyStrip--frozen relative isolate overflow-hidden"
      aria-label="Technology in Harmony"
    >
      {/* Masked wave backdrop */}
      <div className="strip__backdrop" aria-hidden="true" />

      {/* Gold veil */}
      <div className="strip__veil" aria-hidden="true" />

      {/* Legacy wave layer (retained for animation context) */}
      <div className="technologyStrip__waves" aria-hidden="true" />
      
      {/* Gold dust shimmer layer */}
      <div className="technologyStrip__goldDust" aria-hidden="true" />
      
      {/* Glass vignette overlay */}
      <div className="technologyStrip__glassReflect" aria-hidden="true" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="technologyStrip__content text-center">
          {/* Eyebrow */}
          <div className="technologyStrip__eyebrow">
            <span className="technologyStrip__eyebrowPill">TECHNOLOGY</span>
          </div>
          
          {/* Heading */}
          <h1 className="technologyStrip__heading font-playfair text-5xl md:text-6xl font-semibold leading-tight tracking-tight mt-4">
            Technology in Harmony
          </h1>
          
          {/* Subline */}
          <p className="technologyStrip__subline mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Where precision meets artistry.
          </p>
          
          {/* CTA */}
          <div className="mt-10">
            <a
              href="/treatments/technology"
              className="technologyStrip__cta strip__cta"
            >
              Explore Our Digital Workflow
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
