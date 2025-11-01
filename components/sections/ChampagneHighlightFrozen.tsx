import Link from 'next/link';

type ChampagneHighlightFrozenProps = {
  eyebrow: string;
  title: string;
  subline: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ChampagneHighlightFrozen({
  eyebrow,
  title,
  subline,
  ctaLabel,
  ctaHref,
}: ChampagneHighlightFrozenProps) {
  const headingId = 'champagne-highlight-frozen-heading';
  const descriptionId = 'champagne-highlight-frozen-description';

  return (
    <section
      className="champagne-highlight-frozen"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
    >
      <div className="champagne-highlight-frozen__veil" aria-hidden="true" />
      <div className="champagne-highlight-frozen__wave" aria-hidden="true" />
      <div className="champagne-highlight-frozen__grain" aria-hidden="true" />
      <div className="champagne-highlight-frozen__content">
        <p className="champagne-highlight-frozen__eyebrow" id={`${headingId}-eyebrow`}>
          {eyebrow}
        </p>
        <h1 className="champagne-highlight-frozen__title" id={headingId}>
          {title}
        </h1>
        <p className="champagne-highlight-frozen__subline" id={descriptionId}>
          {subline}
        </p>
        {ctaLabel && ctaHref ? (
          <div className="champagne-highlight-frozen__cta">
            <Link href={ctaHref} className="champagne-highlight-frozen__cta-link">
              <span className="champagne-highlight-frozen__cta-label">{ctaLabel}</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
