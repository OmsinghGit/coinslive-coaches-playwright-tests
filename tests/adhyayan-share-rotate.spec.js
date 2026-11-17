import { test, expect } from '@playwright/test';

test('ADH-INV-005: Verify share link rotation', async ({ browser }) => {
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

  await copyButton.click();
  const oldLink = await page.evaluate(() => navigator.clipboard.readText());

  const rotateButton = page.getByRole('button', {
    name: 'Rotate link',
    exact: true,
  });

  await expect(rotateButton).toBeVisible();
  await rotateButton.click();

  await expect(copyButton).toBeVisible({ timeout: 15000 });

  await copyButton.click();
  const newLink = await page.evaluate(() => navigator.clipboard.readText());

  console.log('Old share link:', oldLink);
  console.log('New share link:', newLink);

  expect(newLink).not.toBe(oldLink);
  expect(newLink).toContain('/adhyayan/');

  console.log('PASS: Share link rotation verified.');

  await context.close();
});
