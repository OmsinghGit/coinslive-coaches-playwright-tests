import { test } from '@playwright/test';

test('Inspect actual Adhyayan room details', async ({ page }) => {
  await page.goto(
    'https://www.coinslive.in/adhyayan/calculus-problem-set-4-dsozen/',
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  await page.waitForTimeout(1500);

  console.log('ROOM URL:', page.url());
  console.log('VISIBLE TEXT:', await page.locator('body').innerText());
});
