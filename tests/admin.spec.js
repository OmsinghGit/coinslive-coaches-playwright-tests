
import { test, expect } from '@playwright/test';

const baseURL =
  process.env.COACHES_BASE_URL ||
  'https://coinslive-coaches-mvp.vercel.app';

test('ADM-001: /admin route responds without a server error', async ({ page }) => {
  const response = await page.goto(`${baseURL}/admin`);

  expect(response, 'Expected an HTTP response from /admin').not.toBeNull();
  expect(response.status()).toBeLessThan(500);
  await expect(page.locator('body')).not.toBeEmpty();
});


test('ADM-002: unauthenticated /admin access requires authentication', async ({ page }) => {
  await page.goto(`${baseURL}/admin`, {
    waitUntil: 'domcontentloaded',
  });

  // Allow the client-side app and authentication UI to render.
  await page.waitForLoadState('networkidle', {
    timeout: 7000,
  }).catch(() => {});

  const currentUrl = page.url();
  const pathname = new URL(currentUrl).pathname;

  const bodyText = (await page.locator('body').innerText())
    .replace(/\s+/g, ' ')
    .trim();

  const loginUrl =
    /\/(sign-in|login)(\/|$)/i.test(pathname);

  const loginForm = await page.locator(
    'input[type="email"], input[name="identifier"], ' +
    'input[autocomplete="username"], input[autocomplete="email"]'
  ).count() > 0;

  const authenticationMessage =
    /please sign in|sign in to continue|you must sign in|login required|authentication required|unauthorized|access denied|forbidden/i
      .test(bodyText);

  const adminContentVisible =
    /no workspace yet|open workspace setup/i.test(bodyText);

  const authenticationRequired =
    (loginUrl || loginForm || authenticationMessage) &&
    !adminContentVisible;

  expect(
    authenticationRequired,
    [
      'Expected an authentication gate before showing the admin page.',
      `Final URL: ${currentUrl}`,
      `Visible text: ${bodyText.slice(0, 1000) || '(empty)'}`,
    ].join('\n')
  ).toBeTruthy();
});
