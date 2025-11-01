import '@/styles/champagne/technology-strip.css';

export type TechnologyStripCloneProps = {
  eyebrow?: string;
  title?: string;
  subline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: 'light' | 'dark';
};

const DEFAULT_EYEBROW = 'TECHNOLOGY';
const DEFAULT_TITLE = 'Technology in Harmony';
const DEFAULT_SUBLINE = 'Where precision meets artistry.';
const DEFAULT_CTA_LABEL = 'Explore Our Digital Workflow';
const DEFAULT_CTA_HREF = '/treatments/technology';

export default function TechnologyStripClone({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  subline = DEFAULT_SUBLINE,
  ctaLabel = DEFAULT_CTA_LABEL,
  ctaHref = DEFAULT_CTA_HREF,
  variant = 'light',
}: TechnologyStripCloneProps) {
  return (
    <section
      id="technology"
      className="technologyStrip technologyStrip--clone relative isolate overflow-hidden"
      aria-label={title}
      data-variant={variant}
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
            <span className="technologyStrip__eyebrowPill">{eyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="technologyStrip__heading font-playfair text-5xl md:text-6xl font-semibold leading-tight tracking-tight mt-4">
            {title}
          </h1>

          {/* Subline */}
          <p className="technologyStrip__subline mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            {subline}
          </p>

          {/* CTA */}
          <div className="mt-10">
            <a href={ctaHref} className="technologyStrip__cta strip__cta">
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
