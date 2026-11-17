import { test, expect } from '@playwright/test';

test('ADH-INV-006: Verify turn off share link action', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  const turnOffButton = page.getByRole('button', {
    name: 'Turn off',
    exact: true,
  });

  await expect(turnOffButton).toBeVisible();

  await turnOffButton.click();

  await page.waitForTimeout(2000);

  console.log('Final URL:', page.url());
  console.log('Visible buttons:', await page.getByRole('button').allTextContents());
  console.log('Page text:', (await page.locator('body').innerText()).slice(0, 2000));

  await page.screenshot({
    path: 'test-results/adhyayan-share-link-turned-off.png',
    fullPage: true,
  });

  await context.close();
});
