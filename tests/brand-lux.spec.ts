import { test, expect } from '@playwright/test';

const CANON_GRADIENT = 'linear-gradient(135deg,#C2185B 0%,#40C4B4 60%,#D4AF37 100%)';

test('Manus Lux gradient resolves 3-stop canon', async ({ page }) => {
  await page.goto('/preview/brand-live');

  const gradient = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--smh-gradient')
      .trim()
  );

  const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

  expect(normalize(gradient)).toBe(normalize(CANON_GRADIENT));
});
