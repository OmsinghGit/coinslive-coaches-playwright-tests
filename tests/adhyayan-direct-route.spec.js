import { test } from '@playwright/test';

test('Inspect direct Adhyayan host creation route', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  const response = await page.goto(
    'https://www.coinslive.in/adhyayan/new/',
    { waitUntil: 'domcontentloaded' }
  );

  await page.waitForTimeout(2000);

  console.log('HTTP Status:', response?.status());
  console.log('Final URL:', page.url());
  console.log('Page Title:', await page.title());
  console.log('Visible headings:', await page.locator('h1,h2').allTextContents());

  await context.close();
});
