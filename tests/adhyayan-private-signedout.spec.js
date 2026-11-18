import { test, expect } from '@playwright/test';

test('ADH-ACCESS-002: Inspect signed-out private room access', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-private-access-test-wyajog/',
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  await page.waitForTimeout(2000);

  await expect(page.getByText('Private: people need the room code from the host.')).toBeVisible();
  await expect(page.getByText('Sign in to join')).toBeVisible();

  console.log('Final URL:', page.url());
  console.log('Headings:', await page.locator('h1,h2').allTextContents());
  console.log('Page text:', (await page.locator('body').innerText()).slice(0, 1800));

  await page.screenshot({
    path: 'test-results/adhyayan-private-signedout.png',
    fullPage: true,
  });

  await context.close();
});

