import { test, expect } from '@playwright/test';

test('ADH-E2E-002: Verify saved Adhyayan room details', async ({ browser }) => {
  test.setTimeout(90000);

  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  await expect(page.locator('body')).toContainText(
    'QA Automation - ADH E2E Test 1794907159113',
    { timeout: 30000 }
  );

  await expect(page.locator('body')).toContainText('Playwright Automation');
  await expect(page.locator('body')).toContainText('Verify automated study room creation');
  await expect(page.locator('body')).toContainText('QA testing session created through Playwright');

  console.log('PASS: All four saved room details verified.');

  await context.close();
});
