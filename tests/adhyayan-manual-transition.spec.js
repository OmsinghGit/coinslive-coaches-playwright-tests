import { test } from '@playwright/test';

test('Inspect Adhyayan manual mode transition', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const skipButton = page.getByRole('button', {
    name: /Skip AI.*fill manually/i,
  });

  console.log('Before click:', await skipButton.isVisible());

  await skipButton.click();
  await page.waitForTimeout(2000);

  console.log('URL:', page.url());
  console.log('Visible buttons:', await page.getByRole('button').allTextContents());
  console.log('Visible fields:', await page.locator('input:visible, textarea:visible, select:visible').evaluateAll(
    els => els.map(el => ({
      id: el.id,
      placeholder: el.placeholder,
      type: el.type
    }))
  ));

  console.log('Page text:', (await page.locator('body').innerText()).slice(0, 3000));

  await page.screenshot({
    path: 'test-results/adhyayan-manual-transition.png',
    fullPage: true,
  });

  await context.close();
});
