import { test } from '@playwright/test';

test('Diagnose CoinsLive authentication across pages', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/coinslive-main.json',
  });

  const page = await context.newPage();

  for (const path of ['/home/', '/adhyayan/']) {
    await page.goto(`https://www.coinslive.in${path}`, {
      waitUntil: 'domcontentloaded',
    });

    await page.waitForTimeout(2000);

    const details = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      loginVisible: [...document.querySelectorAll('a,button')]
        .some(el => el.innerText.trim().toLowerCase() === 'log in'),
      visibleNav: [...document.querySelectorAll('nav a')]
        .map(el => ({
          text: el.innerText.trim(),
          href: el.getAttribute('href')
        }))
        .filter(el => el.text)
        .slice(0, 15),
      localStorageKeys: Object.keys(localStorage),
    }));

    console.log(`\n--- ${path} ---`);
    console.log(JSON.stringify(details, null, 2));
  }

  await context.close();
});

