import { test } from '@playwright/test';

test('Inspect Adhyayan manual form after skipping AI', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const manualButton = page.getByRole('button', {
    name: /Skip AI.*fill manually/i,
  });

  await manualButton.click();
  await page.waitForTimeout(1500);

  const fields = await page.locator('input, textarea, select').evaluateAll(
    elements => elements.map(el => ({
      tag: el.tagName,
      id: el.id,
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      type: el.getAttribute('type')
    }))
  );

  console.log('FIELDS AFTER MANUAL MODE:', JSON.stringify(fields, null, 2));
  console.log('HEADINGS:', await page.locator('h1,h2').allTextContents());

  await page.screenshot({
    path: 'test-results/adhyayan-manual-mode-activated.png',
    fullPage: true,
  });

  await context.close();
});
