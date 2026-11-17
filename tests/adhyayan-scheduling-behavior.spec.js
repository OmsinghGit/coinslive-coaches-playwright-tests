import { test, expect } from '@playwright/test';

test('ADH-FORM-004: Verify scheduled date and time input', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
  });

  const schedule = page.locator('#adhyayan-scheduled');

  const testDate = '2026-12-15T10:30';

  await schedule.fill(testDate);

  await expect(schedule).toHaveValue(testDate);

  console.log('Selected schedule:', await schedule.inputValue());
  console.log('Scheduling input retained the selected date and time.');

  await context.close();
});
