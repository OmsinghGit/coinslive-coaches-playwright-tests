import { test, expect } from '@playwright/test';

test('ADH-INV-004: Verify generated share link copying', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
    permissions: ['clipboard-read', 'clipboard-write'],
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  const copyButton = page.getByRole('button', {
    name: 'Copy link',
    exact: true,
  });

  await expect(copyButton).toBeVisible();
  await expect(copyButton).toBeEnabled();

  await copyButton.click();

  const copiedLink = await page.evaluate(() =>
    navigator.clipboard.readText()
  );

  console.log('Generated share link:', copiedLink);

  expect(copiedLink).toMatch(/^https:\/\/www\.coinslive\.in\//);

  await context.close();
});
