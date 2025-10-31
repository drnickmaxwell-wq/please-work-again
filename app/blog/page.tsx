import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './blog.module.css';

const posts = [
  {
    slug: 'digital-smile-design',
    title: 'Digital Smile Design at the Shoreline',
    description:
      'How 3D planning and gentle artistry come together for bespoke smile transformations in Shoreham-by-Sea.',
    date: 'June 2024',
    readingTime: '6 min read',
  },
  {
    slug: 'calm-implant-journey',
    title: 'A Calmer Dental Implant Journey',
    description:
      'From consultation to same-day placement, explore how precision technology makes implants feel effortless.',
    date: 'May 2024',
    readingTime: '5 min read',
  },
  {
    slug: 'composite-bonding-tips',
    title: 'Composite Bonding Aftercare Tips',
    description:
      'Simple rituals to keep your new bonding luminous between visits with the St Mary’s House team.',
    date: 'April 2024',
    readingTime: '4 min read',
  },
];

export const metadata: Metadata = {
  title: 'Dental Blog | St Mary’s House Dental',
  description:
    'Patient-friendly insights on technology, treatments, and calm dental care from the St Mary’s House team.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span>Insights</span>
          <h1>Blog</h1>
          <p>Stories from our clinicians and patients on living well with a beautifully cared-for smile.</p>
        </header>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.slug} id={post.slug} className={styles.card}>
              <div>
                <div className={styles.meta}>
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardCopy}>{post.description}</p>
              </div>
              <Link href={`#${post.slug}`} className={styles.cardLink}>
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
