import { test, expect } from '@playwright/test';

const ROOM_PATH = '/adhyayan/calculus-problem-set-4-dsozen/';
const ROOM_URL = `https://www.coinslive.in${ROOM_PATH}`;
const ADHYAYAN_PATH = '/adhyayan/';

test('ADH-NAV-004: Verify room join action destination', async ({ page }) => {
  await page.goto(ROOM_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const joinLink = page.getByRole('link', {
    name: 'Sign in to join',
    exact: true,
  });

  await expect(joinLink).toBeVisible();

  const href = await joinLink.getAttribute('href');
  expect(href).not.toBeNull();

  if (href === null) {
    throw new Error('"Sign in to join" link is missing its href');
  }

  const joinUrl = new URL(href, ROOM_URL);
  expect(joinUrl.pathname).toBe('/sign-in/');
  expect(joinUrl.searchParams.get('redirect_url')).toBe(ROOM_PATH);
});

test('ADH-NAV-005: Verify room details content', async ({ page }) => {
  test.setTimeout(90000);

  await page.goto(ROOM_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await expect(
    page.getByRole('heading', {
      name: 'Calculus problem set 4',
      exact: true,
    }),
  ).toBeVisible();

  await expect(page.getByText('Starting soon', { exact: true })).toBeVisible();
  await expect(
    page.getByText('Derivatives and chain rule', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Everyone can solve chain-rule related problem unaided'),
  ).toBeVisible();
  await expect(
    page.getByText('We will study together the chain rule concepts', {
      exact: true,
    }),
  ).toBeVisible();
});

test('ADH-NAV-006: Verify room host profile link destination', async ({ page }) => {
  await page.goto(ROOM_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const hostProfileLink = page.getByRole('link', {
    name: 'Sachin anand',
    exact: true,
  });

  await expect(hostProfileLink).toBeVisible();
  await expect(hostProfileLink).toHaveAttribute(
    'href',
    '/u/sachin_anand_mbb/',
  );
});

test('ADH-NAV-007: Signed-out visitor is redirected to sign-in to host a study session', async ({ page }) => {
  await page.goto(`https://www.coinslive.in${ADHYAYAN_PATH}`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const hostLink = page.getByRole('link', {
    name: 'Host a study session',
    exact: true,
  });

  await expect(hostLink).toBeVisible();
  await hostLink.click();

  await expect(page).toHaveURL((url) => url.pathname === '/sign-in/');

  const signInUrl = new URL(page.url());
  expect(signInUrl.searchParams.get('redirect_url')).toBe('/adhyayan/new');
});

test('ADH-NAV-008: Room host profile link opens the correct profile', async ({ page }) => {
  test.setTimeout(90000);

  await page.goto(ROOM_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const hostProfileLink = page.getByRole('link', {
    name: 'Sachin anand',
    exact: true,
  });

  await expect(hostProfileLink).toBeVisible();
  await expect(hostProfileLink).toHaveAttribute(
    'href',
    '/u/sachin_anand_mbb/',
  );

  await hostProfileLink.click();

 await expect(page).toHaveURL(
  (url) => url.pathname === '/u/sachin_anand_mbb/',
);
});

test('ADH-NAV-009: Joining a room redirects to sign-in with the room destination', async ({ page }) => {
  await page.goto(ROOM_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const joinLink = page.getByRole('link', {
    name: 'Sign in to join',
    exact: true,
  });

  await expect(joinLink).toBeVisible();

  const href = await joinLink.getAttribute('href');
  expect(href).not.toBeNull();

  if (href === null) {
    throw new Error('"Sign in to join" link is missing its href');
  }

  const joinUrl = new URL(href, ROOM_URL);
  expect(joinUrl.pathname).toBe('/sign-in/');
  expect(joinUrl.searchParams.get('redirect_url')).toBe(ROOM_PATH);

  await joinLink.click();

  await expect(page).toHaveURL((url) => url.pathname === '/sign-in/');

  const signInUrl = new URL(page.url());
  expect(signInUrl.searchParams.get('redirect_url')).toBe(ROOM_PATH);
});

test('ADH-NAV-010: Browser back returns from room to Adhyayan listing', async ({ page }) => {
  await page.goto(`https://www.coinslive.in${ADHYAYAN_PATH}`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const roomLink = page.getByRole('link', {
    name: 'Calculus problem set 4',
    exact: true,
  });

  await expect(roomLink).toBeVisible();
  await expect(roomLink).toHaveAttribute('href', ROOM_PATH);

  await roomLink.click();

  await expect(page).toHaveURL((url) => url.pathname === ROOM_PATH);

  await page.goBack({ waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL((url) => url.pathname === ADHYAYAN_PATH);
  await expect(
    page.getByRole('heading', { name: 'Adhyayan', exact: true }),
  ).toBeVisible();
});