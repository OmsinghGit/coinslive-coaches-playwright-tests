import { test, expect } from '@playwright/test';

test('ADH-ACCESS-003: Create approval-based Adhyayan room', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'commit',
    timeout: 60000,
  });

  await page.locator('#adhyayan-title').fill('QA Approval Access Test');

  const approvalButton = page.getByRole('button', {
    name: 'Approval',
    exact: true,
  });

  await approvalButton.click();
  await expect(approvalButton).toHaveAttribute('aria-pressed', 'true', { timeout: 10000 });

  await expect(approvalButton).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', {
    name: 'Create study session',
    exact: true,
  }).click();

  await expect(page).toHaveURL(
    url => /^\/adhyayan\/[^/]+\/?$/.test(url.pathname)
      && url.pathname !== '/adhyayan/new/',
    { timeout: 30000 }
  );

  console.log('Approval room URL:', page.url());

  await context.close();
});

