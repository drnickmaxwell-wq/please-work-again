'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { MAIN_NAV, RESOURCES } from '@/lib/nav';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/stmaryshousedental', label: 'Instagram', short: 'IG' },
  { href: 'https://www.facebook.com/stmaryshousedental', label: 'Facebook', short: 'FB' },
];

type FormStatus = 'idle' | 'success' | 'error';

function getEnabledLinks<T extends { enabled?: boolean }>(links: T[]): T[] {
  return links.filter((link) => link.enabled !== false);
}

const FooterLuxe = () => {
  const mainLinks = getEnabledLinks(MAIN_NAV);
  const resourceLinks = getEnabledLinks(RESOURCES);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const feedbackId = useMemo(() => 'newsletter-feedback', []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

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
    <footer className="footerLuxe footer-luxe relative" data-footer>
      <div className="footer-luxe__surface text-[var(--smh-text)]">
        <div className="footer-luxe__rim" aria-hidden="true" />
        <div className="footer-luxe__inner">
          <div className="footer-luxe__panel glassCard">
            <div className="footer-luxe__grid">
              <div className="footer-luxe__brand">
                <h3>St Mary’s House Dental</h3>
                <p>Calm, contemporary care using precision technology and a lifetime approach to oral health.</p>
              </div>

              <div>
                <h4>Main</h4>
                <ul>
                  {mainLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Resources</h4>
                <ul>
                  {resourceLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-luxe__newsletter keyline-gold">
                <h4>Join our newsletter</h4>
                <p>Receive quarterly stories and gentle reminders curated by our clinical team.</p>
                <form className="footer-luxe__form" onSubmit={handleSubmit} noValidate>
                  <label className="sr-only" htmlFor="footer-email">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    className="footer-luxe__input newsletter"
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
                  <button type="submit" className="smh-btn footer-luxe__button">
                    Subscribe
                  </button>
                  <p className="footer-luxe__feedback" data-status={status} id={feedbackId} aria-live="polite">
                    {message}
                  </p>
                </form>
              </div>
            </div>

            <div className="footer-luxe__meta">
              <p>© {new Date().getFullYear()} St Mary’s House Dental Care. All rights reserved.</p>
              <div className="footer-luxe__social">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.href} href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label}>
                    <span aria-hidden="true">{social.short}</span>
                  </a>
                ))}
              </div>
              <div className="footer-luxe__links">
                <Link href="/privacy">Privacy</Link>
                <Link href="/cookies">Cookies</Link>
                <Link href="/accessibility">Accessibility</Link>
                <Link href="/terms">Terms of Use</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-luxe__surface {
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 7.5vw, 5.5rem) clamp(1.75rem, 5.5vw, 4.75rem) clamp(3rem, 4.5vw, 4.25rem);
          isolation: isolate;
          background: inherit;
          color: inherit;
          --footer-gold: var(--smh-accent-gold);
          --footer-keyline-rest: color-mix(in oklab, var(--footer-gold) 36%, transparent);
          --footer-keyline-strong: color-mix(in oklab, var(--footer-gold) 60%, transparent);
          --footer-surface-strong: color-mix(in oklab, var(--smh-ink) 68%, transparent 32%);
          --footer-surface-soft: color-mix(in oklab, var(--smh-ink) 54%, transparent 46%);
        }

        [data-footer] a {
          color: inherit;
          text-decoration: none;
          text-decoration-color: transparent;
          transition:
            color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease),
            text-decoration-color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease);
        }

        [data-footer] a:hover,
        [data-footer] a:focus-visible {
          text-decoration: underline;
          text-decoration-color: var(--smh-accent-gold);
          text-underline-offset: 3px;
          text-decoration-thickness: 2px;
        }

        .footer-luxe__rim {
          height: 0;
          width: 100%;
          border-top: 0.5px solid var(--footer-keyline-rest);
          margin-bottom: clamp(2rem, 4vw, 3rem);
          position: relative;
          z-index: 2;
        }

        .footer-luxe__inner {
          position: relative;
          z-index: 2;
          max-width: min(1180px, 94vw);
          margin: 0 auto;
        }

        .footer-luxe__panel {
          display: grid;
          gap: clamp(2.5rem, 4vw, 3.5rem);
          padding: clamp(2.5rem, 4.5vw, 3.75rem);
          border-radius: 1.75rem;
          overflow: hidden;
        }

        .footer-luxe__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: clamp(2rem, 4vw, 3rem);
        }

        .footer-luxe__brand {
          display: grid;
          gap: 1rem;
          max-width: 42ch;
        }

        h3 {
          margin: 0;
          font-size: 1.6rem;
          font-family: var(--font-display, 'Playfair Display', serif);
          color: color-mix(in oklab, var(--smh-text) 92%, var(--smh-white) 8%);
        }

        h4 {
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.85rem;
          color: color-mix(in oklab, var(--smh-text) 78%, var(--smh-white) 22%);
        }

        p {
          margin: 0;
          color: color-mix(in oklab, var(--smh-text) 80%, var(--smh-white) 20%);
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.75rem;
        }

        .footer-luxe__newsletter p {
          max-width: 38ch;
        }

        .footer-luxe__form {
          margin-top: 1rem;
          display: grid;
          gap: 0.75rem;
        }

        .footer-luxe__input {
          width: 100%;
          padding: 0.9rem 1.15rem;
          background: transparent;
          color: color-mix(in oklab, var(--smh-text) 88%, var(--smh-white) 12%);
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        .footer-luxe__input::placeholder {
          color: color-mix(in oklab, var(--smh-text) 62%, transparent 38%);
        }

        .footer-luxe__button {
          width: fit-content;
          justify-content: center;
        }

        .footer-luxe__button:focus-visible {
          outline: 2px solid var(--footer-keyline-strong);
          outline-offset: 3px;
        }

        .footer-luxe__feedback {
          font-size: 0.9rem;
          min-height: 1.2rem;
          color: color-mix(in oklab, var(--smh-text) 76%, transparent 24%);
        }

        .footer-luxe__feedback[data-status='error'] {
          color: color-mix(in srgb, var(--smh-primary-magenta) 82%, transparent 18%);
        }

        .footer-luxe__feedback[data-status='success'] {
          color: var(--smh-primary-teal);
        }

        .footer-luxe__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 2rem;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--footer-keyline-rest);
          padding-top: clamp(1.75rem, 3.5vw, 2.75rem);
        }

        .footer-luxe__social {
          display: flex;
          gap: 0.75rem;
        }

        .footer-luxe__social a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 999px;
          box-shadow: 0 0 0 1px var(--footer-keyline-rest) inset;
          color: color-mix(in oklab, var(--footer-gold) 72%, transparent 28%);
          transition: background-color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease),
            color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease);
        }

        .footer-luxe__social a:hover,
        .footer-luxe__social a:focus-visible {
          background: color-mix(in oklab, var(--footer-gold) 28%, transparent 72%);
          color: var(--footer-gold);
        }

        .footer-luxe__links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-luxe__links a {
          font-size: 0.9rem;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 720px) {
          .footer-luxe__meta {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-luxe__button {
            width: 100%;
          }
        }

      `}</style>
    </footer>
  );
};

export default FooterLuxe;
