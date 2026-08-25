import { test, expect } from '@playwright/test';

test('worked incident demo reaches a real feedback outcome on the deployed PR preview', async ({ page }) => {
  const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL;
  if (!baseURL) throw new Error('PLAYWRIGHT_TEST_BASE_URL is required');

  await page.goto(`${baseURL}/?demo=1&source_channel=playwright`);

  await expect(page.getByRole('heading', { name: 'TraceCrumb First-60' })).toBeVisible();
  await expect(page.getByText('Sample output — no live AI call')).toBeVisible();
  await expect(page.getByRole('heading', { name: /First diagnostic branch/ })).toBeVisible();
  await expect(page.getByText('Would this branch have saved time in your incidents?')).toBeVisible();

  await page.getByRole('button', { name: 'Useful', exact: true }).click();
  await expect(page.getByText('Outcome captured: useful')).toBeVisible();
});

test('public landing keeps intent before auth and exposes the no-signup demo', async ({ page }) => {
  const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL;
  if (!baseURL) throw new Error('PLAYWRIGHT_TEST_BASE_URL is required');

  await page.goto(baseURL);
  await expect(page.getByRole('heading', { name: 'Know where to look first when an incident hits.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue to protected app' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'See the first branch' })).toBeVisible();
});
