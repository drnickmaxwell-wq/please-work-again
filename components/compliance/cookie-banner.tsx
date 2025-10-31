'use client';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

interface CookiePrefs {
  analytics: boolean;
  marketing: boolean;
  necessary: true;
}

const ESSENTIAL_PREFS: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ALL_PREFS: CookiePrefs = {
  necessary: true,
  analytics: true,
  marketing: true,
};

function parseCookiePrefs(value: string | null): CookiePrefs | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookiePrefs>;
    if (parsed && parsed.necessary === true) {
      return {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
      };
    }
  } catch {
    return null;
  }

  return null;
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  const containerStyle = {
    '--cookie-dark-bg': 'color-mix(in srgb, var(--smh-bg) 95%, transparent 5%)',
  } as CSSProperties;

  useEffect(() => {
    const storedPrefs = parseCookiePrefs(localStorage.getItem('cookie-consent'));
    if (!storedPrefs) {
      setOpen(true);
      localStorage.setItem('cookie-consent', JSON.stringify(ESSENTIAL_PREFS));
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 inset-x-4 z-50 rounded-xl p-4 bg-white/95 dark:bg-[var(--cookie-dark-bg)] border shadow-lg"
      style={containerStyle}
    >
      <p className="text-sm">We use essential cookies and, with your consent, analytics to improve your experience.</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => {
            localStorage.setItem('cookie-consent', JSON.stringify(ESSENTIAL_PREFS));
            setOpen(false);
          }}
          className="px-3 py-1 rounded-md border"
        >
          Essential only
        </button>
        <button
          onClick={() => {
            localStorage.setItem('cookie-consent', JSON.stringify(ALL_PREFS));
            setOpen(false);
          }}
          className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 text-white"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
