import { test } from '@playwright/test';

test('Inspect Adhyayan numeric field constraints', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/');

  for (const id of ['adhyayan-capacity', 'adhyayan-seat-fee']) {
    const field = page.locator(`#${id}`);

    console.log(id, await field.evaluate(el => ({
      type: el.type,
      min: el.min,
      max: el.max,
      step: el.step,
      required: el.required,
      defaultValue: el.defaultValue
    })));
  }

  await context.close();
});
