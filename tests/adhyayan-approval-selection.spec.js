import { test, expect } from '@playwright/test';

test('ADH-ACCESS-003: Verify Approval mode selection', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  await page.goto('https://www.coinslive.in/adhyayan/new/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const approval = page.getByRole('button', {
    name: 'Approval',
    exact: true,
  });

  await approval.click();
  await page.waitForTimeout(1000);

  console.log('After click:', {
    pressed: await approval.getAttribute('aria-pressed'),
    className: await approval.getAttribute('class'),
  });

  console.log('All access modes:', await page.locator(
    'button[aria-pressed]'
  ).evaluateAll(els => els.map(el => ({
    text: el.innerText,
    pressed: el.getAttribute('aria-pressed')
  }))));

  await page.screenshot({
    path: 'test-results/adhyayan-approval-selection.png',
    fullPage: true,
  });

  await context.close();
});
