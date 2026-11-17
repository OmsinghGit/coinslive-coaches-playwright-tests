import { test, expect } from '@playwright/test';

test('ADH-INV-007: Re-enable Adhyayan share link', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  const createButton = page.getByRole('button', {
    name: 'Create share link',
    exact: true,
  });

  await expect(createButton).toBeEnabled();
  await createButton.click();

  await expect(
    page.getByRole('button', { name: 'Turn off', exact: true })
  ).toBeVisible({ timeout: 20000 });

  console.log('PASS: Share link created and Turn off control available.');

  await context.close();
});
