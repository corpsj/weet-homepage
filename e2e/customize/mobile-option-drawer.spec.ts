import { test, expect } from '@playwright/test';

test.describe('MobileOptionDrawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/customize-proto');
    await page.addStyleTag({
      content: `[class*="bottom-6"][class*="left-1/2"] { display: none !important; }`,
    });
  });

  test('하단 핸들 클릭으로 Drawer 열기', async ({ page }) => {
    const handle = page.getByRole('button', { name: '옵션 선택 열기' });
    await expect(handle).toBeVisible();

    await handle.click();

    const drawer = page.getByRole('dialog', { name: '옵션 선택' });
    await expect(drawer).toBeVisible();
  });

  test('Tabs 로 카테고리 전환', async ({ page }) => {
    await page.getByRole('button', { name: '옵션 선택 열기' }).click();

    const flooringTab = page.getByRole('tab', { name: '바닥재' });
    await flooringTab.click();

    const flooringPanel = page.getByRole('tabpanel', { name: '바닥재' });
    await expect(flooringPanel).toBeVisible();
    await expect(flooringPanel.getByRole('button', { name: /SPC 돌마루/ })).toHaveCount(3);
  });

  test('옵션 선택 시 Drawer 유지', async ({ page }) => {
    await page.getByRole('button', { name: '옵션 선택 열기' }).click();

    const option = page.getByRole('button', { name: '골강판 - 화이트 기본 포함' });
    await option.click();

    const drawer = page.getByRole('dialog', { name: '옵션 선택' });
    await expect(drawer).toBeVisible();
  });

  test('완료 버튼으로 Drawer 닫기', async ({ page }) => {
    await page.getByRole('button', { name: '옵션 선택 열기' }).click();

    await page.getByRole('button', { name: '완료' }).click();

    const drawer = page.getByRole('dialog', { name: '옵션 선택' });
    await expect(drawer).not.toBeVisible();
  });

  test('데스크톱에서는 표시되지 않음', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();

    const handle = page.getByRole('button', { name: '옵션 선택 열기' });
    await expect(handle).not.toBeVisible();
  });
});
