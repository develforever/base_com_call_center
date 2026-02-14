import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')


  await expect(page.getByPlaceholder('Username')).toBeVisible()


  await expect(page.getByPlaceholder('Password')).toBeVisible()

  await expect(page.getByRole('button', { name: /login/i })).toHaveText('Login')

  await expect(page).toHaveURL(/.*login/);

  await page.getByPlaceholder('Username').fill('patrycja@base.com')
  await page.getByPlaceholder('Password').fill('password')
  await page.getByRole('button', { name: /login/i }).click()

  await expect(page).toHaveURL('/');


})
