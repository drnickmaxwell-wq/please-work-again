'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { MAIN_NAV, RESOURCES } from '@/lib/nav';

import styles from './footer-luxe.module.css';

type FormStatus = 'idle' | 'success' | 'error';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/stmaryshousedental', label: 'Instagram', short: 'IG' },
  { href: 'https://www.facebook.com/stmaryshousedental', label: 'Facebook', short: 'FB' },
];

function getEnabledLinks<T extends { enabled?: boolean }>(links: T[]): T[] {
  return links.filter((link) => link.enabled !== false);
}

export function FooterLuxe() {
  const mainLinks = getEnabledLinks(MAIN_NAV);
  const resourceLinks = getEnabledLinks(RESOURCES);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const feedbackId = useMemo(() => 'newsletter-feedback', []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/; // basic validation, avoids blocking accessibility

    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      setMessage('Enter a valid email to join the newsletter.');
      return;
    }

    setStatus('success');
    setMessage('Thank you! You’re on the list for future updates.');
    setEmail('');
  };

  return (
    <footer className={`${styles.footer} footerLuxe`}>
      <div className={styles.rim} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <h3 className={styles.heading}>St Mary’s House Dental</h3>
            <p className={styles.copy}>
              Calm, contemporary care using precision technology and a lifetime approach to oral health.
            </p>
          </div>

          <div>
            <h4 className={styles.heading}>Main</h4>
            <ul className={styles.linkList}>
              {mainLinks.map((item) => (
                <li key={item.href}>
                  <Link className={styles.link} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Resources</h4>
            <ul className={styles.linkList}>
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link className={styles.link} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h4 className={styles.heading}>Join our newsletter</h4>
            <p className={styles.copy}>
              Receive quarterly stories and gentle reminders curated by our clinical team.
            </p>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                className={styles.input}
                type="email"
                inputMode="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== 'idle') {
                    setStatus('idle');
                    setMessage('');
                  }
                }}
                aria-invalid={status === 'error'}
                aria-describedby={message ? feedbackId : undefined}
                placeholder="you@example.com"
                required
              />
              <button type="submit" className={styles.button}>
                Subscribe
              </button>
              <p className={styles.feedback} data-status={status} id={feedbackId} aria-live="polite">
                {message}
              </p>
            </form>
          </div>
        </div>

        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} St Mary’s House Dental Care. All rights reserved.</p>
          <div className={styles.socialList}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.socialLink}
                aria-label={social.label}
              >
                <span aria-hidden="true">{social.short}</span>
              </a>
            ))}
          </div>
          <div className={styles.socialList}>
            <Link href="/privacy" className={styles.link}>
              Privacy
            </Link>
            <Link href="/cookies" className={styles.link}>
              Cookies
            </Link>
            <Link href="/accessibility" className={styles.link}>
              Accessibility
            </Link>
            <Link href="/terms" className={styles.link}>
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLuxe;
