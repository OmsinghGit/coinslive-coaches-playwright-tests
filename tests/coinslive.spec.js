import { test, expect } from '@playwright/test';

test('public CoinsLive Explore page shows its heading', async ({ page }) => {
  await page.goto('https://coinslive.in/explore/');

  await expect(
    page.getByRole('heading', { name: 'Explore CoinsLive Content' })
  ).toBeVisible();
});

test('Coaches MVP homepage loads successfully', async ({ page }) => {
  await page.goto('https://coinslive-coaches-mvp.vercel.app/');

  await expect(
    page.getByRole('heading', { name: 'FYI holdings' })
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'Browse courses' })
  ).toBeVisible();
});

test('Browse courses link scrolls to the Courses section', async ({ page }) => {
  await page.goto('https://coinslive-coaches-mvp.vercel.app/');

  await page.getByRole('link', { name: 'Browse courses' }).click();

  await expect(page).toHaveURL(/#courses$/);

  await expect(
    page.getByRole('heading', { name: 'Courses' })
  ).toBeVisible();
});

test('View course opens agentic AI course details', async ({ page }) => {
  await page.goto('https://coinslive-coaches-mvp.vercel.app/');

  await page.getByRole('link', { name: 'Browse courses' }).click();

  await page.getByRole('link', { name: 'View course' }).click();

  await expect(page).toHaveURL(/\/courses\/[^/]+$/);
  await expect(
    page.getByRole('heading', { name: 'agentic AI' })
  ).toBeVisible();

  await expect(
  page.getByText('Enroll', { exact: true })
).toBeVisible();
});

test('Enroll redirects to login page', async ({ page }) => {
  await page.goto('https://coinslive-coaches-mvp.vercel.app/');

  await page.getByRole('link', { name: 'Browse courses' }).click();
  await page.getByRole('link', { name: 'View course' }).click();

  await page.getByText('Enroll', { exact: true }).click();

  await expect(page).toHaveURL(/\/sign-in/);
  await expect(
    page.getByRole('heading', { name: 'Log in' })
  ).toBeVisible();

  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
});

test('Workshops page displays upcoming and archived sections', async ({ page }) => {
  await page.goto('https://coinslive-coaches-mvp.vercel.app/workshops');

  await expect(
  page.getByRole('heading', { name: 'Workshops', exact: true }).last()
).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Upcoming', exact: true })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Archived', exact: true })
  ).toBeVisible();
});