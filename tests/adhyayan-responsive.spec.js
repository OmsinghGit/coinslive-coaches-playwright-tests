import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile-360', width: 360, height: 800 },
  { name: 'Mobile-390', width: 390, height: 844 },
  { name: 'Tablet-768', width: 768, height: 1024 },
  { name: 'Laptop-1366', width: 1366, height: 768 },
  { name: 'Desktop-1920', width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`Adhyayan responsive check - ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await page.goto('https://www.coinslive.in/adhyayan/', {
      waitUntil: 'domcontentloaded',
    });

    await page.screenshot({
      path: `test-results/adhyayan-${viewport.name}.png`,
      fullPage: true,
    });

    const dimensions = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }));

    console.log(`${viewport.name}:`, dimensions);

    expect(
      dimensions.documentWidth,
      `Horizontal overflow at ${viewport.name}`,
    ).toBeLessThanOrEqual(dimensions.viewportWidth);
  });
}
 