import { test } from '@playwright/test';

test('Diagnose Adhyayan browser back navigation', async ({ page }) => {
  await page.goto('https://www.coinslive.in/adhyayan/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const roomLink = page.getByRole('link', {
    name: 'Calculus problem set 4',
    exact: true,
  });

  await roomLink.click();

  await page.waitForURL(/\/adhyayan\/[^/]+\/?$/, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  console.log('ROOM URL:', page.url());

  await page.goBack({
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await page.waitForTimeout(1500);

  console.log('BACK URL:', page.url());
  console.log('HEADINGS:', await page.locator('h1,h2,h3').allTextContents());
  console.log('PAGE TITLE:', await page.title());
});