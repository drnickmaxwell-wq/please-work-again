import { test, expect } from '@playwright/test';

test.describe('Brand lock surface diagnostics', () => {
  test('gradient stack and assets align with Manus Lux canon', async ({ page }) => {
    await page.goto('/preview/brand-lock');

    await page.waitForFunction(() => {
      const diag = (window as typeof window & { __brandLockDiagnostics?: unknown }).__brandLockDiagnostics;
      return Boolean(
        diag &&
        typeof (diag as { normalizedSurfaceGradient?: string }).normalizedSurfaceGradient === 'string' &&
        (diag as { normalizedSurfaceGradient?: string }).normalizedSurfaceGradient
      );
    });

    const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

    const { tokenGradient, heroBg, journeyBg, reducedMotion } = await page.evaluate(() => {
      const docStyles = getComputedStyle(document.documentElement);
      const tokenGradient = docStyles.getPropertyValue('--smh-gradient');
      const hero = document.querySelector<HTMLElement>('section.heroLuxury');
      const journey = document.querySelector<HTMLElement>('section.smileJourney');
      const heroBg = hero ? getComputedStyle(hero).backgroundImage : '';
      const journeyBg = journey ? getComputedStyle(journey).backgroundImage : '';

      return {
        tokenGradient,
        heroBg,
        journeyBg,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      };
    });

    test.skip(reducedMotion, 'prefers-reduced-motion is enabled for this run');

    expect(normalize(tokenGradient)).toBe(
      normalize('linear-gradient(135deg,#C2185B 0%,#40C4B4 60%,#D4AF37 100%)')
    );

    expect(heroBg).toContain('linear-gradient(');
    expect(heroBg).toContain('/assets/champagne/waves/waves-bg-2560.webp');
    expect(heroBg).toContain('/assets/champagne/particles/home-hero-particles.webp');
    expect(heroBg).toContain('/assets/champagne/textures/home-hero-film-grain.webp');

    expect(journeyBg).toContain('/assets/champagne/waves/waves-bg-2560.webp');
    expect(journeyBg).toContain('/assets/champagne/particles/home-hero-particles.webp');
    expect(journeyBg).toContain('/assets/champagne/textures/home-hero-film-grain.webp');
  });
});
