import { test } from '@playwright/test';

test('Check whether QA Adhyayan room exists', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.getByText('QA Automation - ADH E2E Test', {
    exact: false,
  }).first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});

  const matches = await page.getByText(
    'QA Automation - ADH E2E Test',
    { exact: false }
  ).allTextContents();

  console.log('Matching QA rooms:', matches);

  await context.close();
});
