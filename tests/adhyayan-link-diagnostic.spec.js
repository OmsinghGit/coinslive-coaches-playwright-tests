import { test } from '@playwright/test';

test('Inspect Adhyayan host link destination', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/', {
    waitUntil: 'domcontentloaded',
  });

  const link = page.getByRole('link', {
    name: 'Host a study session',
    exact: true,
  });

  console.log('Link visible:', await link.isVisible());
  console.log('Link href:', await link.getAttribute('href'));
  console.log('Link text:', await link.innerText());

  await context.close();
});
