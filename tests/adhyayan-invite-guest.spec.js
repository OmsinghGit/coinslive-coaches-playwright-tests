import { test, expect } from '@playwright/test';

test('ADH-INV-002: Verify signed-out invite redirect', async ({ browser }) => {
  test.setTimeout(90000);

  const context = await browser.newContext();
  const page = await context.newPage();

  const invitePath =
    '/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/live';

  await page.goto(`https://www.coinslive.in${invitePath}/`, {
    waitUntil: 'commit',
    timeout: 60000,
  });

  await expect.poll(
    () => new URL(page.url()).pathname,
    { timeout: 30000 }
  ).toBe('/sign-in/');

  const redirectUrl = new URL(page.url()).searchParams.get('redirect_url');

  console.log('Final URL:', page.url());
  console.log('Decoded redirect destination:', redirectUrl);

  expect(redirectUrl).toBe(invitePath);

  console.log('PASS: Signed-out invite redirect verified.');

  await context.close();
});
