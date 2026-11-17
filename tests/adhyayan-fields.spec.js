import { test } from '@playwright/test';

test('Inspect Adhyayan form field attributes', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/');

  const fields = await page.locator('input, textarea, select').evaluateAll(elements =>
    elements.map((el, index) => ({
      index,
      tag: el.tagName,
      type: el.type || null,
      name: el.name || null,
      id: el.id || null,
      placeholder: el.placeholder || null,
      required: el.required,
      value: el.type === 'password' ? '[hidden]' : el.value
    }))
  );

  console.log(JSON.stringify(fields, null, 2));

  await context.close();
});
