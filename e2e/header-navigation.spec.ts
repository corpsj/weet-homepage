import { test, expect } from '@playwright/test';

test.describe('Header Navigation', () => {
  test('should have "주문하기" CTA and navigate to /customize', async ({ page }) => {
    await page.goto('/');

    const customizeMenu = page.getByRole('link', { name: '주문하기' }).last();
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);

    await expect(page.locator('body')).toBeVisible();
  });

  test('should have "Order" CTA in English mode', async ({ page }) => {
    await page.goto('/');

    const enButton = page.getByText('EN').first();
    await enButton.click();

    const customizeMenu = page.getByRole('link', { name: 'Order' }).last();
    await expect(customizeMenu).toBeVisible();

    await customizeMenu.click();

    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });

  test('active nav item is highlighted for the current route', async ({ page }) => {
    // 웜 리디자인 헤더: 호버 하이라이트 바 대신, 현재 경로의 메뉴가 gold-deep + aria-current="page"로 강조된다.
    await page.goto('/products');

    const activeLink = page.getByRole('link', { name: '제품소개', exact: true }).first();
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('mobile menu should have "주문하기" item', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label="메뉴 열기"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const customizeMenu = page.getByRole('link', { name: '주문하기' }).last();
    await expect(customizeMenu).toBeVisible({ timeout: 10000 });

    await customizeMenu.click();

    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });

  test('nav collapses to a hamburger menu at <=860px', async ({ page }) => {
    // 리디자인 네비 접힘 기준은 860px (min-[861px]:flex / max-[860px] 숨김).
    await page.setViewportSize({ width: 800, height: 900 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label="메뉴 열기"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const customizeMenu = page.getByRole('link', { name: '주문하기' }).last();
    await expect(customizeMenu).toBeVisible({ timeout: 10000 });

    await customizeMenu.click();
    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  });
});
