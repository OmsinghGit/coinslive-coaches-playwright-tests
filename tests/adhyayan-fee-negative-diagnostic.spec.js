import { test } from '@playwright/test';

test('Diagnose seat fee negative value handling', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', { waitUntil: 'domcontentloaded', timeout: 60000 });

  const fee = page.locator('#adhyayan-seat-fee');

  await fee.fill('-1');

  const result = await fee.evaluate(el => ({
    value: el.value,
    min: el.min,
    max: el.max,
    valid: el.validity.valid,
    rangeUnderflow: el.validity.rangeUnderflow,
    badInput: el.validity.badInput,
    valueMissing: el.validity.valueMissing
  }));

  console.log('Negative fee diagnostic:', JSON.stringify(result, null, 2));

  await context.close();
});
