import { test, expect } from '@playwright/test';

test('Manus Lux gradient resolves 3-stop canon', async ({ page }) => {
  await page.goto('/preview/brand-live');

  const gradient = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--smh-gradient')
      .trim()
  );

  expect(gradient).toContain('#C2185B');
  expect(gradient).toContain('#40C4B4');
  expect(gradient).toContain('#D4AF37');
});
