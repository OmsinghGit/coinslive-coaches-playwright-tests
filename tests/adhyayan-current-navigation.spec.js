import { test } from '@playwright/test';

test('Inspect current Adhyayan navigation', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/spaces/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.waitForTimeout(2000);

  console.log('URL:', page.url());
  console.log('HEADINGS:', await page.locator('h1,h2,h3').allTextContents());

  console.log('LINKS:', JSON.stringify(
    await page.locator('a:visible').evaluateAll(els =>
      els.map(el => ({
        text: el.innerText.trim(),
        href: el.getAttribute('href')
      }))
    ), null, 2
  ));

  console.log('BUTTONS:', await page.locator('button:visible').allTextContents());

  await page.screenshot({
    path: 'test-results/current-spaces-navigation.png',
    fullPage: true,
  });

  await context.close();
});
