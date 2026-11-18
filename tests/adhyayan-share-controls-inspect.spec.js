import { test, expect } from '@playwright/test';

test('Inspect share resources controls', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  await page.waitForTimeout(1500);

  console.log('URL:', page.url());
  console.log('HEADINGS:', await page.locator('h1,h2,h3').allTextContents());
  console.log('BUTTONS:', await page.locator('button:visible').allTextContents());
  console.log('SHARE SECTION:', await page.getByText('Share session resources', { exact: true }).count());

  await page.screenshot({
    path: 'test-results/share-resources-before-expansion.png',
    fullPage: true,
  });

  await context.close();
});
