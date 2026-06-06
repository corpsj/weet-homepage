import { expect, test } from '@playwright/test';

test.describe('Public page transition', () => {
  test('homepage leads with mobile home configuration CTA', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '위트 이동식주택' })).toBeVisible();
    await expect(page.getByText('작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.')).toBeVisible();
    await expect(page.getByRole('link', { name: /나만의 위트 만들기/ }).first()).toHaveAttribute('href', '/customize');
    await expect(page.getByText('영상 준비 중입니다')).toHaveCount(0);
  });

  test('support is reassurance page without public inquiry form', async ({ page }) => {
    await page.goto('/support');

    await expect(page.getByRole('heading', { name: '진행 과정과 확인사항' })).toBeVisible();
    await expect(page.getByText('구매 과정')).toBeVisible();
    await expect(page.getByText('A/S', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /문의/ })).toHaveCount(0);
  });

  test('bespoke public page is restored as BESPOKE showcase', async ({ page }) => {
    await page.goto('/bespoke');

    await expect(page.getByRole('heading', { name: 'BESPOKE' })).toBeVisible();
    await expect(page.getByText('SMALL CAFE')).toBeVisible();
    await expect(page.getByText('POP-UP STORE / BRAND SHOWROOM')).toBeVisible();
    await expect(page.getByText('SMART FARM')).toBeVisible();
  });
});
