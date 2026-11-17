import { test } from '@playwright/test';

test('Inspect Adhyayan host creation form', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForTimeout(2000);

  console.log('URL:', page.url());
  console.log('Forms:', await page.locator('form').count());
  console.log('Inputs:', await page.locator('input').count());
  console.log('Textareas:', await page.locator('textarea').count());
  console.log('Buttons:', await page.getByRole('button').allTextContents());
  console.log('Body text:', (await page.locator('body').innerText()).slice(0, 2000));

  await page.screenshot({
    path: 'test-results/adhyayan-host-form-inspection.png',
    fullPage: true,
  });

  await context.close();
});
