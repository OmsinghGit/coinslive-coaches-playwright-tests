import { test, expect } from '@playwright/test';

test('ADH-FORM-003: Verify numeric field boundary validation', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/');

  const cases = [
    { id: 'adhyayan-capacity', value: '1', valid: false },
    { id: 'adhyayan-capacity', value: '2', valid: true },
    { id: 'adhyayan-capacity', value: '40', valid: true },
    { id: 'adhyayan-capacity', value: '41', valid: false },
    { id: 'adhyayan-seat-fee', value: '-1', valid: true, expectedValue: '0' },
    { id: 'adhyayan-seat-fee', value: '0', valid: true },
    { id: 'adhyayan-seat-fee', value: '100000', valid: true },
    { id: 'adhyayan-seat-fee', value: '100001', valid: false },
  ];

  for (const item of cases) {
    const field = page.locator(`#${item.id}`);

    await field.fill(item.value);

    const validity = await field.evaluate(el => el.validity.valid);

    expect(validity).toBe(item.valid);
    if (item.expectedValue !== undefined) {
      await expect(field).toHaveValue(item.expectedValue);
    }

    console.log(`${item.id} = ${item.value}: ${validity ? 'VALID' : 'INVALID'}`);
  }

  await context.close();
});
