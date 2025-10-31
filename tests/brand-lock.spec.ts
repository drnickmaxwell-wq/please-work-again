import { test, expect } from '@playwright/test';
import { CANON_GRADIENT } from '../scripts/brand-report.cjs';

const normalize = (v: string) => v.replace(/\s+/g, '').toLowerCase();

test('Brand lock surface diagnostics: token gradient equals canonical, surface chain includes assets', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  // token gradient
  const tokenGradient = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim()
  );

  // surface background-image on the hero probe (or the surface root)
  const surfaceBg = await page.evaluate(() => {
    const el = document.querySelector('[data-brand-surface]') || document.documentElement;
    return getComputedStyle(el).getPropertyValue('background-image').trim();
  });

  // 1) token equals canon
  expect(normalize(tokenGradient)).toBe(normalize(CANON_GRADIENT));

  // 2) surface starts with the gradient, then includes assets
  const ng = normalize(surfaceBg);
  expect(ng.startsWith(normalize('linear-gradient('))).toBeTruthy();
  expect(ng).toContain('/assets/champagne/waves/');
  expect(ng).toContain('/assets/champagne/particles/');
  expect(ng).toContain('/assets/champagne/textures/');
});
