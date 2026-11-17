import { test, expect } from '@playwright/test';

test('ADH-FORM-001: Verify host creation form validation and defaults', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/');

  const title = page.locator('#adhyayan-title');
  const capacity = page.locator('#adhyayan-capacity');
  const fee = page.locator('#adhyayan-seat-fee');

  await expect(title).toHaveAttribute('required', '');
  await expect(capacity).toHaveValue('12');
  await expect(fee).toHaveValue('0');

  await page.getByRole('button', {
    name: 'Create study session',
    exact: true,
  }).click();

  await expect(title).toBeFocused();

  console.log('Title required validation verified.');
  console.log('Default capacity:', await capacity.inputValue());
  console.log('Default seat fee:', await fee.inputValue());

  await context.close();
});
