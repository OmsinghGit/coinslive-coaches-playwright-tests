import { test } from '@playwright/test';

test('Inspect Approval form page loading', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText);
  });

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  console.log('Headings:', await page.locator('h1,h2').allTextContents());
  console.log('Form fields:', await page.locator('input').evaluateAll(
    els => els.map(el => ({
      id: el.id,
      type: el.type,
      placeholder: el.placeholder
    }))
  ));

  await page.screenshot({
    path: 'test-results/approval-form-page-inspection.png',
    fullPage: true,
  });

  await context.close();
});
