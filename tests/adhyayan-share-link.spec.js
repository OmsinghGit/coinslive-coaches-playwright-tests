import { test, expect } from '@playwright/test';

test('ADH-INV-003: Inspect create share link action', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  const button = page.getByRole('button', {
    name: 'Create share link',
    exact: true,
  });

  await expect(button).toBeEnabled();
  await button.click();

  await page.waitForTimeout(1500);

  console.log('Current URL:', page.url());
  console.log('Visible dialogs:', await page.getByRole('dialog').allTextContents());
  console.log('Visible inputs:', await page.locator('input').evaluateAll(
    els => els.map(el => ({
      type: el.type,
      value: el.value,
      placeholder: el.placeholder
    }))
  ));
  console.log('Visible buttons:', await page.getByRole('button').allTextContents());

  await page.screenshot({
    path: 'test-results/adhyayan-share-link-action.png',
    fullPage: true,
  });

  await context.close();
});
