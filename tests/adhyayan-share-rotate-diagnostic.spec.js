import { test, expect } from '@playwright/test';

test('Diagnose Adhyayan share link rotation', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
    permissions: ['clipboard-read', 'clipboard-write'],
  });

  const page = await context.newPage();

  page.on('response', async response => {
    if (/rotate|share/i.test(response.url())) {
      console.log('API:', response.status(), response.url());
    }
  });

  await page.goto(
    'https://www.coinslive.in/adhyayan/qa-automation-adh-e2e-test-1794907159113-lez97r/',
    { waitUntil: 'commit', timeout: 60000 }
  );

  const rotateButton = page.getByRole('button', {
    name: 'Rotate link',
    exact: true,
  });

  await expect(rotateButton).toBeVisible();
  await rotateButton.click();

  await page.waitForTimeout(3000);

  console.log('Buttons after rotation:',
    await page.getByRole('button').allTextContents()
  );

  await context.close();
});
