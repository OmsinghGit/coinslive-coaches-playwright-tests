import { test } from '@playwright/test';

test('Inspect created QA room links', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const links = await page.getByRole('link', {
    name: /QA Automation - ADH E2E Test/,
  }).evaluateAll(elements =>
    elements.map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href'),
    }))
  );

  console.log('Created room links:', JSON.stringify(links, null, 2));

  await context.close();
});
