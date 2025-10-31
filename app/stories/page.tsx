import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './stories.module.css';

const stories = [
  {
    slug: 'shoreline-bonding',
    title: 'Composite Bonding with a Shoreline Glow',
    summary: 'Feather-light refinements closed micro-gaps and brightened Amelia\'s smile in a single visit.',
    focus: 'Composite Bonding',
  },
  {
    slug: 'calm-implants',
    title: 'Implants Planned for Calm and Comfort',
    summary: 'Guided surgery and same-day restorations restored James\'s bite without downtime.',
    focus: 'Dental Implants',
  },
  {
    slug: 'anxiety-eased',
    title: 'Easing Anxiety with Gentle Technology',
    summary: 'Sedation, aromatherapy, and The Wand numbing system helped Priya return to routine visits.',
    focus: 'Anxiety-Free Care',
  },
];

export const metadata: Metadata = {
  title: 'Patient Stories | St Mary’s House Dental',
  description: 'Real experiences from St Mary’s House patients embracing calm, precise dental care.',
  alternates: { canonical: '/stories' },
};

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span>Stories</span>
          <h1>Patient Stories</h1>
          <p>Confidence, comfort, and thoughtful care—told through the voices of our community.</p>
        </header>

        <div className={styles.grid}>
          {stories.map((story) => (
            <article key={story.slug} id={story.slug} className={styles.card}>
              <div>
                <p className={styles.cardEyebrow}>{story.focus}</p>
                <h2 className={styles.cardTitle}>{story.title}</h2>
                <p className={styles.cardCopy}>{story.summary}</p>
              </div>
              <Link href={`#${story.slug}`} className={styles.cardLink}>
                Read story
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
