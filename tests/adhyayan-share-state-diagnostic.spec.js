import { test } from '@playwright/test';

test('Diagnose Adhyayan share link state', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  page.on('response', response => {
    if (/resource-share/i.test(response.url())) {
      console.log('API:', response.status(), response.url());
    }
  });

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  await page.waitForTimeout(2000);

  console.log('Buttons:', await page.getByRole('button').allTextContents());
  console.log('Page text:', (await page.locator('body').innerText()).slice(0, 2500));

  await page.screenshot({
    path: 'test-results/adhyayan-share-current-state.png',
    fullPage: true,
  });

  await context.close();
});
