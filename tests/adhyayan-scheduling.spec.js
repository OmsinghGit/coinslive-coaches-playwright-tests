import { test } from '@playwright/test';

test('Inspect Adhyayan scheduling field', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
  });

  const schedule = page.locator('#adhyayan-scheduled');

  console.log('Schedule field:', await schedule.evaluate(el => ({
    type: el.type,
    min: el.min,
    max: el.max,
    required: el.required,
    value: el.value,
    disabled: el.disabled
  })));

  await context.close();
});
