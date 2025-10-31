'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useMemo } from 'react';

import styles from './breadcrumbs.module.css';

import { MAIN_NAV, TREATMENTS } from '@/lib/nav';

const formatSegment = (segment: string) => {
  return segment
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
};

export type BreadcrumbsProps = {
  className?: string;
};

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const segments = useSelectedLayoutSegments();

  const navLookup = useMemo(() => {
    const entries = new Map<string, string>();
    const normalise = (href: string) => {
      if (href.length > 1 && href.endsWith('/')) {
        return href.slice(0, -1);
      }
      return href;
    };

    [...MAIN_NAV, ...TREATMENTS].forEach((link) => {
      const key = normalise(link.href);
      if (link.label) {
        entries.set(key, link.label);
      }
    });

    return entries;
  }, []);

  const crumbs = useMemo(() => {
    const resolveLabel = (href: string, fallback: string) => navLookup.get(href) ?? fallback;
    const base = [
      { href: '/', label: resolveLabel('/', 'Home') },
      { href: '/treatments', label: resolveLabel('/treatments', 'Treatments') },
    ];

    if (!segments.length) {
      return base;
    }

    return base.concat(
      segments.map((segment, index) => {
        const path = `/treatments/${segments.slice(0, index + 1).join('/')}`;
        const normalised = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

        return {
          href: normalised,
          label: resolveLabel(normalised, formatSegment(segment)),
        };
      }),
    );
  }, [navLookup, segments]);

  const lastIndex = crumbs.length - 1;

  return (
    <nav className={`${styles.wrapper}${className ? ` ${className}` : ''}`} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => {
          const isCurrent = index === lastIndex;
          return (
            <li key={crumb.href} className={styles.item}>
              {isCurrent ? (
                <span className={`${styles.link} ${styles.current}`} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link className={styles.link} href={crumb.href}>
                  {crumb.label}
                </Link>
              )}
              {index < lastIndex ? <span className={styles.separator} aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
