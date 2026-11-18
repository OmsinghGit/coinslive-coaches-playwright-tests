import { test } from '@playwright/test';

test('Diagnose Approval room creation failure', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  page.on('response', response => {
    if (/adhyayan|study/i.test(response.url())) {
      console.log('RESPONSE:', response.status(), response.url());
    }
  });

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.locator('#adhyayan-title').fill('QA Approval Access Test');

  await page.getByRole('button', {
    name: 'Approval',
    exact: true,
  }).click();

  await page.waitForTimeout(500);

  await page.getByRole('button', {
    name: 'Create study session',
    exact: true,
  }).click();

  await page.waitForTimeout(5000);

  console.log('Final URL:', page.url());
  console.log('Page content:', (await page.locator('body').innerText()).slice(0, 2500));
  console.log('Validation errors:', await page.locator(
    '[role="alert"], .text-red-500, .text-destructive'
  ).allTextContents());

  await page.screenshot({
    path: 'test-results/adhyayan-approval-create-diagnostic.png',
    fullPage: true,
  });

  await context.close();
});
