import { test, expect } from '@playwright/test';

test.describe('Header Navigation', () => {
  test('should have "맞춤 견적" CTA and navigate to /customize', async ({ page }) => {
    await page.goto('/');

    const customizeMenu = page.getByText('맞춤 견적').last();
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);

    await expect(page.locator('body')).toBeVisible();
  });

  test('should have "Get a Quote" CTA in English mode', async ({ page }) => {
    await page.goto('/');

    const enButton = page.getByText('EN').first();
    await enButton.click();

    const customizeMenu = page.getByText('Get a Quote').last();
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });

  test('should have active highlight bar on menu hover', async ({ page }) => {
    await page.goto('/');

    const navItem = page.getByText('제품 소개').first();
    await navItem.hover();

    await page.waitForTimeout(300);

    const highlightBar = page.locator('span.bg-primary.opacity-100').first();
    await expect(highlightBar).toBeVisible();
  });

  test('mobile menu should have "맞춤 견적" item', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const customizeMenu = page.getByRole('link', { name: '모델 구성하기' }).last();
    await expect(customizeMenu).toBeVisible({ timeout: 10000 });

    await customizeMenu.click();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });

  test('tablet menu opens between lg and xl breakpoints', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const customizeMenu = page.getByRole('link', { name: '모델 구성하기' }).last();
    await expect(customizeMenu).toBeVisible({ timeout: 10000 });

    await customizeMenu.click();
    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });
});
