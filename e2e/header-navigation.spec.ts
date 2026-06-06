import { test, expect } from '@playwright/test';

test.describe('Header Navigation', () => {
  test('should have "주문하기" menu item and navigate to /customize', async ({ page }) => {
    await page.goto('/');

    const customizeMenu = page.getByText('주문하기');
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);

    await expect(page.locator('body')).toBeVisible();
  });

  test('should have "Order" menu item in English mode', async ({ page }) => {
    await page.goto('/');

    const enButton = page.getByText('EN').first();
    await enButton.click();

    const customizeMenu = page.getByText('Order');
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });

  test('should have active highlight bar on menu hover', async ({ page }) => {
    await page.goto('/');

    const customizeMenu = page.getByText('주문하기').first();
    await customizeMenu.hover();

    await page.waitForTimeout(300);

    const highlightBar = page.locator('span.bg-primary.opacity-100').first();
    await expect(highlightBar).toBeVisible();
  });

  test('mobile menu should have "주문하기" item', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await menuButton.click();

    await page.waitForTimeout(300);

    const customizeMenu = page.getByRole('link', { name: '주문하기' });
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });
});
