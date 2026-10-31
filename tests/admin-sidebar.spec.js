import { test, expect } from '@playwright/test';

const BASE_URL =
  process.env.COACHES_BASE_URL ||
  'https://coinslive-coaches-mvp.vercel.app';

// Use the saved authorized admin session.
test.use({
  storageState: 'playwright/.auth/admin.json',
});

// Verify that the authenticated admin dashboard is accessible.
test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/admin`);

  await expect(
    page.getByText(/No workspace yet/)
  ).toBeVisible();
});

test('ADM-008: Admin Home Dashboard', async ({ page }) => {
  await expect(
    page.getByText(/No workspace yet/)
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'Open workspace setup' })
  ).toBeVisible();
});

test('ADM-009: Landing page availability', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/landing`);

  await expect(
    page.getByText('Landing page is not ready.')
  ).toBeVisible();
});

test('ADM-010: SEO and Workspace Setup navigation', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/seo`);

  await expect(
    page.getByText('Setup', { exact: true })
  ).toBeVisible();

  await page.getByText('Setup', { exact: true }).click();

  await expect(page).toHaveURL(/\/admin\/setup/);

  await expect(
    page.getByText('Create your workspace')
  ).toBeVisible();
});

test('ADM-011: Courses module availability', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/courses`);

  await expect(
    page.getByText('Create a workspace first.')
  ).toBeVisible();

  await expect(
    page.getByText('No courses yet')
  ).toBeVisible();
});

test('ADM-012: Workshops module availability', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/workshops`);

  await expect(
    page.getByText('Setup', { exact: true })
  ).toBeVisible();
});

test('ADM-013: Email Automations availability', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/email-automations`);

  await expect(
    page.getByText('Blank canvas')
  ).toBeVisible();
});

test('ADM-014: Email Templates availability', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/templates`);

  await expect(
    page.getByText('Choose a workspace first.')
  ).toBeVisible();
});

test('ADM-015: Insights Dashboard', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/insights`);

  await expect(
    page.getByText('Paid this month')
  ).toBeVisible();

  await expect(
    page.getByText('No paid orders this month.')
  ).toBeVisible();
});

test('ADM-016: Leads page and filters', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/insights/leads`);

  await expect(
    page.getByRole('heading', { name: 'Leads' })
  ).toBeVisible();

  await expect(page.getByText('all', { exact: true })).toBeVisible();
  await expect(page.getByText('hot', { exact: true })).toBeVisible();
  await expect(page.getByText('cold', { exact: true })).toBeVisible();
});

test('ADM-017: Workshop Insights', async ({ page }) => {
  await page.goto(`${BASE_URL}/admin/insights`);

  await page.getByText('Workshop insights', {
    exact: true
  }).click();

  await expect(
    page.getByRole('heading', { name: 'Workshop insights' })
  ).toBeVisible();
});

test('ADM-018: Broadcast module availability', async ({ page }) => {
  await page.getByText('Broadcast', { exact: true }).click();

  await expect(
    page.getByText('Setup', { exact: true })
  ).toBeVisible();
});

// ADM-019: New Chat interface and composer state
test('ADM-019: New Chat interface and composer state', async ({ page }) => {
  await page.getByText('New Chat', { exact: true }).click();

  await expect(
    page.getByRole('heading', { name: 'How can I help?' })
  ).toBeVisible();

  await expect(
    page.getByText('Connect AI', { exact: true })
  ).toBeVisible();

  const composer = page.locator(
    '[role="textbox"][contenteditable="true"][aria-label="Message agent"]'
  );

  await expect(composer).toBeVisible();

  await expect(composer).toHaveAttribute(
    'aria-disabled',
    'true'
  );
});

  
