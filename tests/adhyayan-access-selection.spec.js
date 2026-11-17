import { test, expect } from '@playwright/test';

test('ADH-FORM-002: Verify access mode selection', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/');

  for (const mode of ['Public', 'Private', 'Approval']) {
    const button = page.getByRole('button', {
      name: mode,
      exact: true,
    });

    await button.click();

    await expect(button).toHaveAttribute('aria-pressed', 'true');

    console.log(`${mode} mode selection verified.`);
  }

  await context.close();
});
