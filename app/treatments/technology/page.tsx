import type { Metadata } from 'next';

import FaqAccordion from '@/components/faq/FaqAccordion';
import ChampagneHighlightFrozen from '@/components/sections/ChampagneHighlightFrozen';
import TechnologyHero from '@/components/sections/TechnologyHero';

import styles from './technology.module.css';

export const metadata: Metadata = {
  title: "Technology | St Mary’s House Dental Care",
  description:
    'Precision, comfort, and aesthetics powered by world-class dental technology: 3D scanning & printing, guided implants, laser dentistry, and more.',
  alternates: { canonical: '/treatments/technology' },
  openGraph: {
    title: 'Our Technology',
    description: 'Guided implants, 3D scanning & printing, laser precision — a calmer, faster, more precise appointment.',
    url: '/treatments/technology',
    type: 'website',
  },
};

const workflowSteps = [
  {
    title: 'Digital scan',
    description: 'Micron-level 3D scanning replaces impressions, capturing every contour with gentle, contactless mapping.',
    icon: '/icons/scan.svg',
    timeline: ['5 minute scan', 'No moulds', 'Instant preview'],
  },
  {
    title: 'Design in motion',
    description: 'Our designers co-create your smile in real-time, blending tooth anatomy, bite and facial harmony in calibrated light.',
    icon: '/icons/sparkle.svg',
    timeline: ['Shade matching', 'Texture overlays', 'Your approval'],
  },
  {
    title: 'Same-day make',
    description: 'On-site milling and 3D printing deliver veneers, inlays, and aligners in a single relaxed visit.',
    icon: '/icons/implant.svg',
    timeline: ['Guided milling', 'Hand finishing', 'Studio polish'],
  },
];

const equipmentShowcase = [
  {
    title: 'Primescan digital suite',
    description: 'Ultra-fast intraoral scanners reduce chair time while capturing fine edge detail for veneers and crowns.',
    notes: ['Micron accuracy', 'Comfort-led capture', 'Instant modelling'],
  },
  {
    title: 'Guided implant theatre',
    description: 'CBCT imaging and dynamic navigation plan implants with precision, keeping procedures calm and efficient.',
    notes: ['Low-dose imaging', 'Sedation friendly', 'Same-day smile'],
  },
  {
    title: 'Femtosecond laser finishing',
    description: 'Laser contouring refines soft tissue and activates whitening gels with minimal sensation and zero downtime.',
    notes: ['Cooling comfort', 'High precision', 'Promotes healing'],
  },
];

const technologyFaq = [
  {
    question: 'How does AI improve my dental visit?',
    answer:
      'Predictive scanners and real-time analysis reduce guesswork, shorten chair time, and visualise outcomes before treatment begins.',
  },
  {
    question: 'Can I preview my smile changes virtually?',
    answer:
      'Yes. Our AR try-on and 3D modelling suite let you explore adjustments before we ever touch a tooth, so you can make confident decisions.',
  },
  {
    question: 'Is the technology comfortable for anxious patients?',
    answer:
      'We pair gentle laser dentistry with guided sedation pathways and noise-dampened equipment for a calmer experience from start to finish.',
  },
];

export default function TechnologyPage() {
  return (
    <>
      <ChampagneHighlightFrozen
        eyebrow="Technology"
        title="Precision in Harmony"
        subline="Where artistry meets innovation under the Champagne light."
        ctaLabel="Explore our technology"
        ctaHref="/treatments/technology"
      />
      <TechnologyHero />

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <section
            id="digital-workflow"
            className={`${styles.waveSection} smh-wave-mask`}
            aria-labelledby="digital-workflow-heading"
          >
            <div className={styles.sectionHeader}>
              <h2 id="digital-workflow-heading">Our digital workflow</h2>
              <p>
                A guided trio of steps keeps your smile journey fluid—from contactless scanning to real-time design and same-day
                finishing.
              </p>
            </div>
            <div className={styles.workflowGrid}>
              {workflowSteps.map((step) => (
                <article key={step.title} className={styles.workflowCard}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <img src={step.icon} alt="" loading="lazy" aria-hidden="true" />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ul className={styles.timeline}>
                    {step.timeline.map((entry) => (
                      <li key={entry}>
                        <span>•</span>
                        {entry}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="equipment" className={`${styles.waveSection} smh-wave-mask`} aria-labelledby="equipment-heading">
            <div className={styles.sectionHeader}>
              <h2 id="equipment-heading">Our equipment gallery</h2>
              <p>
                Each suite is tuned for comfort—ambient soundscapes, frosted glass dividers, and technicians trained to keep you
                relaxed from hello to reveal.
              </p>
            </div>
            <div className={styles.equipmentGrid}>
              {equipmentShowcase.map((item) => (
                <article key={item.title} className={styles.equipmentCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <footer>
                    {item.notes.map((note) => (
                      <span key={note}>✶ {note}</span>
                    ))}
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <section id="technology-faq" className={styles.faqSection} aria-labelledby="technology-faq-heading">
            <h2 id="technology-faq-heading">Technology FAQs</h2>
            <FaqAccordion items={technologyFaq} glassEnabled />
          </section>
        </div>
      </main>
    </>
  );
}
