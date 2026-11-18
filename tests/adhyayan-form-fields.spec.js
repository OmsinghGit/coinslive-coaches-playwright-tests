import { test } from '@playwright/test';

test('Inspect Adhyayan form field selectors', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.waitForTimeout(2000);

  const fields = await page.locator('input, textarea, select').evaluateAll(
    elements => elements.map(el => ({
      tag: el.tagName,
      id: el.id,
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      type: el.getAttribute('type'),
      value: el.value,
      outerHTML: el.outerHTML.slice(0, 400)
    }))
  );

  console.log('ACTUAL FORM FIELDS:', JSON.stringify(fields, null, 2));

  await context.close();
});
