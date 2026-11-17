import { test, expect } from '@playwright/test';

test('ADH-ACCESS-001: Create a private Adhyayan room', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'commit',
    timeout: 60000,
  });

  await page.locator('#adhyayan-title').fill('QA Private Access Test');

  const privateButton = page.getByRole('button', {
    name: 'Private',
    exact: true,
  });

  await privateButton.click();

  await expect(privateButton).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', {
    name: 'Create study session',
    exact: true,
  }).click();

  await expect(page).toHaveURL(url => /^\/adhyayan\/[^/]+\/?$/.test(url.pathname) && url.pathname !== '/adhyayan/new/', {
    timeout: 30000,
  });

  console.log('Private room created:', page.url());

  await context.close();
});

