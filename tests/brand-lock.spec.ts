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

    const diagnostics = await page.evaluate(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      const windowWithDiag = window as typeof window & {
        __brandLockDiagnostics?: {
          normalizedSurfaceGradient?: string;
          normalizedTokenGradient?: string;
          hasHeroWavesOverlay?: boolean;
          hasJourneyWavesOverlay?: boolean;
        };
      };
      const diag = windowWithDiag.__brandLockDiagnostics ?? {};

      const resolveToken = (name: string): string => {
        const value = rootStyles.getPropertyValue(name).trim();
        if (!value) return '';
        const match = value.match(/^var\(([^)]+)\)$/);
        if (match) {
          return resolveToken(match[1].trim());
        }
        return value;
      };

      const stopTokens = ['--smh-grad-stop1', '--smh-grad-stop2', '--smh-grad-stop3'] as const;
      const stopValues = stopTokens.map((token, index) => {
        const resolved = resolveToken(token).replace(/\s+/g, '').toLowerCase();
        const suffix = index === 0 ? '0%' : index === 1 ? '60%' : '100%';
        return `${resolved}${suffix}`;
      });

      return {
        normalizedSurfaceGradient: diag.normalizedSurfaceGradient ?? '',
        normalizedTokenGradient: diag.normalizedTokenGradient ?? '',
        hasHeroWavesOverlay: Boolean(diag.hasHeroWavesOverlay),
        hasJourneyWavesOverlay: Boolean(diag.hasJourneyWavesOverlay),
        stopValues,
        waveMask: rootStyles.getPropertyValue('--wave-mask').trim(),
        particles: rootStyles.getPropertyValue('--particles').trim(),
        grainDesktop: rootStyles.getPropertyValue('--grain-desktop').trim(),
      };
    });

    expect(diagnostics.normalizedSurfaceGradient).toContain('linear-gradient(');
    expect(diagnostics.normalizedSurfaceGradient).toBe(diagnostics.normalizedTokenGradient);
    diagnostics.stopValues.forEach((stop) => {
      expect(diagnostics.normalizedTokenGradient).toContain(stop);
    });
    expect(diagnostics.hasHeroWavesOverlay).toBe(true);
    expect(diagnostics.hasJourneyWavesOverlay).toBe(true);
    expect(diagnostics.waveMask).toContain('/assets/champagne/wave-mask-desktop.webp');
    expect(diagnostics.particles).toContain('/assets/champagne/home-hero-particles.webp');
    expect(diagnostics.grainDesktop).toContain('/assets/champagne/film-grain-desktop.webp');
  });
});
