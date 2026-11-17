import { test } from '@playwright/test';

test('Diagnose Adhyayan share link API response', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  page.on('response', response => {
    if (/share|invite/i.test(response.url())) {
      console.log('API RESPONSE:', response.status(), response.url());
    }
  });

  page.on('requestfailed', request => {
    if (/share|invite/i.test(request.url())) {
      console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText);
    }
  });

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  await page.getByRole('button', {
    name: 'Create share link',
    exact: true,
  }).click();

  await page.waitForTimeout(10000);

  console.log('Final button states:',
    await page.getByRole('button').allTextContents()
  );

  await context.close();
});
