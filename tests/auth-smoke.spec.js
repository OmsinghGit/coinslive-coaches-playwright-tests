import { test, expect } from '@playwright/test';

test('Verify authenticated CoinsLive session', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();
  await page.goto('https://www.coinslive.in', {
    waitUntil: 'domcontentloaded',
  });

  await expect(page.getByRole('link', { name: 'Log In' })).not.toBeVisible();

  console.log('Authenticated session verified:', page.url());

  await context.close();
});

test('Authenticated user can access Adhyayan host creation', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/', {
    waitUntil: 'domcontentloaded',
  });

  await page.getByRole('link', {
    name: 'Host a study session',
    exact: true,
  }).click();

  await expect(page).toHaveURL(
    url => /^\/adhyayan\/new\/?$/.test(url.pathname)
  );

  console.log('Authenticated Adhyayan host access verified.');

  await context.close();
});
