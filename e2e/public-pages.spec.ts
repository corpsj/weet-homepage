import { expect, test } from '@playwright/test';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

const adminId = process.env.E2E_ADMIN_ID;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;

async function loginAsAdmin(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByLabel('아이디').fill(adminId!);
  await page.getByLabel('비밀번호').fill(adminPassword!);
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await expect(page.getByRole('heading', { name: '대시보드' })).toBeVisible();
}

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

  test('footer contains hidden admin link on True', async ({ page }) => {
    await page.goto('/');

    const adminLink = page.locator('footer a[href="/admin"]');
    await expect(adminLink).toBeAttached();
    await expect(adminLink).toHaveText('True');
    await expect(adminLink).toHaveCSS('cursor', 'default');

    await adminLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('products page mobile detail accordion opens without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/products');

    const overflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflowX).toBeFalsy();

    const toggleButton = page.getByRole('button', { name: /상세정보 보기|View Details/ }).first();
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
    await expect(page.getByRole('button', { name: /상세정보 닫기|Hide Details/ }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /설명|Description/ }).first()).toBeVisible();
  });

  test('key public pages do not horizontally overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    for (const path of ['/', '/support', '/products', '/modular', '/bespoke', '/solution', '/projects', '/privacy', '/terms', '/login']) {
      await page.goto(path);
      const overflowX = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflowX, `${path} has horizontal overflow`).toBeFalsy();
    }
  });
});

test.describe('Admin responsive shell', () => {
  test('mobile drawer opens, navigates, and keeps dangerous settings collapsed', async ({ page }) => {
    test.skip(!adminId || !adminPassword, 'Admin credentials are required for authenticated admin UI checks.');

    await page.setViewportSize({ width: 390, height: 844 });
    await loginAsAdmin(page);

    await page.getByLabel('관리자 메뉴 열기').click();
    await expect(page.getByRole('link', { name: '설정' })).toBeVisible();
    await page.getByRole('link', { name: '설정' }).click();

    await expect(page).toHaveURL(/\/admin\/settings/);
    await expect(page.getByRole('heading', { name: '설정', exact: true })).toBeVisible();
    await expect(page.getByText('고급 / 위험 작업')).toBeVisible();
    await expect(page.getByRole('button', { name: '데이터 이관 실행' })).toHaveCount(0);

    await page.getByText('고급 / 위험 작업').click();
    const migrationButton = page.getByRole('button', { name: '데이터 이관 실행' });
    await expect(migrationButton).toBeVisible();

    let confirmMessage = '';
    const dialogHandled = new Promise<void>((resolve) => {
      page.once('dialog', async (dialog) => {
        confirmMessage = dialog.message();
        await dialog.dismiss();
        resolve();
      });
    });
    await migrationButton.click();
    await dialogHandled;
    expect(confirmMessage).toContain('위험 작업입니다');

    const overflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflowX).toBeFalsy();
  });

  test('key admin routes avoid horizontal overflow on mobile', async ({ page }) => {
    test.skip(!adminId || !adminPassword, 'Admin credentials are required for authenticated admin UI checks.');

    await page.setViewportSize({ width: 390, height: 844 });
    await loginAsAdmin(page);

    for (const path of [
      '/admin',
      '/admin/main',
      '/admin/products',
      '/admin/customize',
      '/admin/projects',
      '/admin/support',
      '/admin/insights',
      '/admin/gallery',
      '/admin/consultations',
      '/admin/inquiries',
      '/admin/utm',
      '/admin/settings',
    ]) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const overflowX = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflowX, `${path} has horizontal overflow`).toBeFalsy();
    }
  });
});
