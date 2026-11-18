import { test } from '@playwright/test';

test('Diagnose Adhyayan access mode selection', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  for (const name of ['Public', 'Private', 'Approval']) {
    const button = page.getByRole('button', { name, exact: true });

    console.log(name, {
      visible: await button.isVisible(),
      pressed: await button.getAttribute('aria-pressed'),
      className: await button.getAttribute('class'),
    });
  }

  await context.close();
});
