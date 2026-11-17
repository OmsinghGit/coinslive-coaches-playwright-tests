import { test, expect } from '@playwright/test';

test('ADH-E2E-001: Create a public Adhyayan QA room', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  const title = `QA Automation - ADH E2E Test ${Date.now()}`;

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.locator('#adhyayan-title').fill(title);
  await page.locator('#adhyayan-topic').fill('Playwright Automation');
  await page.locator('#adhyayan-learning-goal').fill(
    'Verify automated study room creation'
  );
  await page.locator('#adhyayan-description').fill(
    'QA testing session created through Playwright'
  );

  await page.locator('#adhyayan-capacity').fill('2');
  await page.locator('#adhyayan-seat-fee').fill('0');

  await page.getByRole('button', {
    name: 'Public',
    exact: true,
  }).click();

  await expect(page.locator('#adhyayan-title')).toHaveValue(title);

  console.log('Submitting QA room:', title);

  await page.getByRole('button', {
    name: 'Create study session',
    exact: true,
  }).click();

  await page.waitForTimeout(3000);

  console.log('Final URL:', page.url());
  console.log('Page title:', await page.title());
  console.log('Visible headings:', await page.locator('h1,h2').allTextContents());

  await page.screenshot({
    path: 'test-results/adhyayan-e2e-room-creation.png',
    fullPage: true,
  });

  await context.close();
});
