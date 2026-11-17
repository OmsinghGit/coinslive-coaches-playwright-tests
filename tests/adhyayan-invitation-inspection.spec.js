import { test } from '@playwright/test';

test('Inspect Adhyayan room invitation controls', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  await page.locator('body').waitFor();

  const buttons = await page.getByRole('button').evaluateAll(elements =>
    elements.map(el => ({
      text: el.innerText.trim(),
      disabled: el.disabled
    }))
  );

  const links = await page.getByRole('link').evaluateAll(elements =>
    elements.map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href')
    }))
  );

  console.log('Room buttons:', JSON.stringify(buttons, null, 2));
  console.log('Room links:', JSON.stringify(links, null, 2));

  await context.close();
});
