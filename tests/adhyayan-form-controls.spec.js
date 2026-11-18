import { test } from '@playwright/test';

test('Inspect Adhyayan form controls', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.waitForTimeout(2000);

  const controls = await page.locator(
    'input, textarea, select, [role="textbox"], button'
  ).evaluateAll(elements =>
    elements.map(el => ({
      tag: el.tagName,
      type: el.getAttribute('type'),
      id: el.id,
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      ariaLabel: el.getAttribute('aria-label'),
      text: el.innerText?.trim(),
      value: el.value ?? ''
    }))
  );

  console.log('FORM CONTROLS:', JSON.stringify(controls, null, 2));

  await context.close();
});
