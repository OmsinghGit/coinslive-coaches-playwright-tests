import { test } from '@playwright/test';

test('Inspect Adhyayan access controls', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/');

  const controls = await page.getByRole('button').evaluateAll(buttons =>
    buttons.map(button => ({
      text: button.innerText.trim(),
      type: button.type,
      ariaPressed: button.getAttribute('aria-pressed'),
      ariaSelected: button.getAttribute('aria-selected'),
      className: button.className
    }))
  );

  console.log(JSON.stringify(controls, null, 2));

  await context.close();
});
