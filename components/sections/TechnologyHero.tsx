import Link from 'next/link';

export default function TechnologyHero() {
  const headingId = 'technology-hero-heading';

  return (
    <section
      className="technologyHero technologyStrip technologyStrip--frozen"
      aria-labelledby={headingId}
      data-testid="technology-hero"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="technologyStrip__content text-center">
          <div className="technologyStrip__eyebrow">
            <span className="technologyStrip__eyebrowPill">TECHNOLOGY</span>
          </div>

          <h2
            id={headingId}
            className="technologyStrip__heading font-playfair text-5xl md:text-6xl font-semibold leading-tight tracking-tight mt-4"
          >
            Calm precision, powered by digital artistry
          </h2>

          <p className="technologyStrip__subline mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            Every appointment is choreographed with wave-inspired lighting, AI-guided planning, and on-site fabrication.
            The result: a smoother experience and gallery-ready finishes, all within our Shoreham-by-Sea studio.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#digital-workflow" className="cta strip__cta">
              Explore the workflow
            </Link>
            <Link href="#equipment" className="cta strip__cta">
              View our equipment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
