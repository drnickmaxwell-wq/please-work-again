import { test, expect } from '@playwright/test';

const CANON_GRADIENT = 'linear-gradient(135deg,#C2185B 0%,#40C4B4 60%,#D4AF37 100%)';

const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

const canonicalizeGradient = (value: string) =>
  normalize(
    value.replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi, (_, r, g, b) => {
      const toHex = (component: string) => Number(component).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    })
  );

const extractUrl = (value: string) => {
  const match = value.match(/url\((['"]?)(.*?)\1\)/i);
  return match ? match[2] : value;
};

test.describe('Technology Strip Locked — Champagne brand guard', () => {
  test('desktop layers resolve canonical assets & tuners', async ({ page }) => {
    await page.goto('/preview/tech-strip-locked');

    const selector = '[data-testid="technology-strip-locked"]';
    await page.waitForSelector(selector);

    const surface = await page.evaluate((sel) => {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return null;
      const styles = getComputedStyle(el);
      const maskImage = styles.getPropertyValue('mask-image') || styles.getPropertyValue('-webkit-mask-image');
      return {
        backgroundImage: styles.getPropertyValue('background-image'),
        maskImage,
      };
    }, selector);

    expect(surface).not.toBeNull();
    expect(canonicalizeGradient(surface!.backgroundImage)).toContain(normalize(CANON_GRADIENT));
    expect(extractUrl(surface!.maskImage)).toContain('/assets/champagne/waves/wave-mask-desktop.webp');

    const particles = await page.evaluate((sel) => {
      const layer = document.querySelector<HTMLElement>(`${sel} .tech-strip-locked__layer--particles`);
      if (!layer) return null;
      const styles = getComputedStyle(layer);
      return {
        backgroundImage: styles.getPropertyValue('background-image'),
        opacity: parseFloat(styles.getPropertyValue('opacity') || '0'),
      };
    }, selector);

    expect(particles).not.toBeNull();
    expect(extractUrl(particles!.backgroundImage)).toContain('/assets/champagne/');
    expect(particles!.opacity).toBeGreaterThanOrEqual(0.04);
    expect(particles!.opacity).toBeLessThanOrEqual(0.1);

    const grain = await page.evaluate((sel) => {
      const layer = document.querySelector<HTMLElement>(`${sel} .tech-strip-locked__layer--grain`);
      if (!layer) return null;
      const styles = getComputedStyle(layer);
      return {
        backgroundImage: styles.getPropertyValue('background-image'),
        opacity: parseFloat(styles.getPropertyValue('opacity') || '0'),
      };
    }, selector);

    expect(grain).not.toBeNull();
    expect(extractUrl(grain!.backgroundImage)).toContain('/assets/champagne/');
    expect(grain!.opacity).toBeGreaterThanOrEqual(0.06);
    expect(grain!.opacity).toBeLessThanOrEqual(0.08);
  });

  test.describe('mobile wave mask', () => {
    test.use({ viewport: { width: 640, height: 900 } });

    test('mobile mask resolves mobile asset', async ({ page }) => {
      await page.goto('/preview/tech-strip-locked');
      const selector = '[data-testid="technology-strip-locked"]';
      await page.waitForSelector(selector);
      const maskImage = await page.evaluate((sel) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) return '';
        const styles = getComputedStyle(el);
        return (
          styles.getPropertyValue('mask-image') ||
          styles.getPropertyValue('-webkit-mask-image') ||
          ''
        );
      }, selector);

      expect(extractUrl(maskImage)).toContain('/assets/champagne/waves/wave-mask-mobile.webp');
    });
  });
});
