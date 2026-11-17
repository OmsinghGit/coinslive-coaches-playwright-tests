import { test } from '@playwright/test';

test('ADH-INV-008: Verify disabled share link access', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const oldShareLink =
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/shared/92fca55a6d6e4c3bae45aea82f26b517da9c1f29121a4a9d87d0c36f6d0f0cd3/';

  await page.goto(oldShareLink, {
    waitUntil: 'commit',
    timeout: 60000,
  });

  await page.waitForTimeout(3000);

  console.log('Final URL:', page.url());
  console.log('Page title:', await page.title());
  console.log('Headings:', await page.locator('h1,h2').allTextContents());
  console.log('Page content:', (await page.locator('body').innerText()).slice(0, 1500));

  await page.screenshot({
    path: 'test-results/adhyayan-disabled-share-access.png',
    fullPage: true,
  });

  await context.close();
});
