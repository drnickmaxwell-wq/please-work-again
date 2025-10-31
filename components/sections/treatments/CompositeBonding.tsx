import Link from 'next/link';
import { asset, hasCDN } from '@/lib/assets';

import styles from './composite-bonding.module.css';

const highlights = [
  {
    title: 'Feather-light sculpting',
    description: 'Layered by hand to refine edges and close micro-spaces without compromising healthy enamel.',
  },
  {
    title: 'Studio-finish polish',
    description: 'Shot under calibrated lighting so every refinement blends seamlessly with your natural smile.',
  },
  {
    title: 'Same-day glow',
    description: 'Digitally shade matched and contoured in a single visit for an effortless reveal.',
  },
];

export default function CompositeBonding() {
  const poster = hasCDN ? asset('/images/ai24/treatments/composite-bonding.jpg') : undefined;

  return (
    <section className={`${styles.section} smh-wave-mask`} aria-labelledby="composite-bonding-highlights">
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div>
            <p className={styles.eyebrow}>Why guests choose it</p>
            <h2 id="composite-bonding-highlights" className={styles.title}>
              Composite bonding highlights
            </h2>
            <p className={styles.copy}>
              Guided artistry layered over a calm, coastal setting. Every detail—gloss, hue, texture—is tuned to your natural
              tooth anatomy.
            </p>
          </div>

          <ul className={styles.benefits}>
            {highlights.map((item) => (
              <li key={item.title} className={styles.benefitItem}>
                <span className={styles.benefitIcon} aria-hidden="true">
                  ✦
                </span>
                <div>
                  <p className={styles.benefitTitle}>{item.title}</p>
                  <p className={styles.benefitDescription}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a className="smh-btn" href="#results">
              View results
            </a>
            <Link className={styles.secondaryLink} href="#consult">
              Reserve a consultation
            </Link>
          </div>
        </div>

        <div className={styles.media}>
          {poster ? (
            <img
              src={poster}
              alt="Composite bonding smile transformation"
              loading="lazy"
              className={styles.mediaImage}
            />
          ) : (
            <div className={styles.mediaFallback}>
              Studio photography is being finalised—your smile preview appears here during consultations.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
