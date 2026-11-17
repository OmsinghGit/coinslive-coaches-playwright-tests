import { test, expect } from '@playwright/test';

test('ADH-INV-001: Verify copy invite link functionality', async ({ browser }) => {
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
    name: 'Copy invite link',
    exact: true,
  });

  await expect(copyButton).toBeEnabled();
  await copyButton.click();

  await page.waitForTimeout(1000);

  const clipboardText = await page.evaluate(() =>
    navigator.clipboard.readText()
  );

  console.log('Copied invite link:', clipboardText);

  expect(clipboardText).toContain(
    '/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/'
  );

  await context.close();
});
