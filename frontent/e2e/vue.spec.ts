import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {

  await page.goto('/')

  await page.screenshot({ path: 'screenshots/login-page.png' });

  await expect(page.getByPlaceholder('Username')).toBeVisible()
  await expect(page.getByPlaceholder('Password')).toBeVisible()

  await expect(page.getByRole('button', { name: /login/i })).toHaveText('Login')

  await expect(page).toHaveURL(/.*login/);

  await page.getByPlaceholder('Username').fill('patrycja@base.com')
  await page.getByPlaceholder('Password').fill('password')
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL('/');

  await expect(page.locator('.homeboard__loader')).toBeHidden();

  await page.screenshot({ path: 'screenshots/home-page.png' });

  await expect(page.getByText(/pilne zgłoszenia/i)).toHaveText('Pilne zgłoszenia')
  await page.locator('.homeboard__status-item__link').click()

  await expect(page).toHaveURL(/.*tickets/);

  await expect(page.getByRole('table')).toBeVisible();
  await page.screenshot({ path: 'screenshots/tickets-page.png' });

})
