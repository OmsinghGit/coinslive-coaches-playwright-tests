import { test } from '@playwright/test';

test('Inspect Adhyayan manual creation form', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.getByRole('button', {
    name: /Skip AI.*fill manually/i,
  }).click();

  await page.waitForTimeout(1000);

  const fields = await page.locator('input, textarea, select').evaluateAll(
    elements => elements.map(el => ({
      tag: el.tagName,
      id: el.id,
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      type: el.getAttribute('type'),
      value: el.value
    }))
  );

  console.log('MANUAL FORM FIELDS:', JSON.stringify(fields, null, 2));

  console.log('ACCESS BUTTONS:', await page.locator('button').evaluateAll(
    elements => elements.map(el => ({
      text: el.innerText.trim(),
      pressed: el.getAttribute('aria-pressed')
    }))
  ));

  await page.screenshot({
    path: 'test-results/adhyayan-manual-form.png',
    fullPage: true,
  });

  await context.close();
});
