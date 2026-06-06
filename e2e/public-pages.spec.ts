import { expect, test } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

const adminId = process.env.E2E_ADMIN_ID;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const serviceClient = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
  : null;

type ProductFixture = {
  id: string;
  name: string;
  sub_category: string | null;
  size_category: string | null;
};

function sortProductFixtures(products: ProductFixture[]) {
  const categoryOrder = ['S', 'M', 'L', 'XL', 'DESIGN'];

  return [...products].sort((a, b) => {
    const idxA = categoryOrder.indexOf(a.size_category ?? '');
    const idxB = categoryOrder.indexOf(b.size_category ?? '');

    if (idxA !== idxB) return idxA - idxB;

    if (a.size_category === 'S') {
      if (a.sub_category === 'Private' && b.sub_category !== 'Private') return -1;
      if (a.sub_category !== 'Private' && b.sub_category === 'Private') return 1;
    }

    return 0;
  });
}

async function createE2EAdminCredentials() {
  if (adminId && adminPassword) {
    return {
      id: adminId,
      password: adminPassword,
      cleanup: async () => {},
    };
  }

  test.skip(!serviceClient, 'Admin credentials or Supabase service role env are required for authenticated admin UI checks.');

  const id = `e2e-${randomUUID().slice(0, 8)}`;
  const password = `Weet-e2e-${randomUUID()}-A1!`;
  const email = `${id}@weet.com`;
  const { data, error } = await serviceClient!.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  expect(error).toBeNull();
  expect(data.user?.id).toBeTruthy();

  return {
    id,
    password,
    cleanup: async () => {
      if (data.user?.id) {
        await serviceClient!.auth.admin.deleteUser(data.user.id);
      }
    },
  };
}

async function loginAsAdmin(page: import('@playwright/test').Page, credentials: { id: string; password: string }) {
  await page.goto('/login');
  await page.getByLabel('아이디').fill(credentials.id);
  await page.getByLabel('비밀번호').fill(credentials.password);
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await expect(page.getByRole('heading', { name: '대시보드' })).toBeVisible();
}

test.describe('Public page transition', () => {
  test('homepage leads with mobile home configuration CTA', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '위트 이동식주택' })).toBeVisible();
    await expect(page.getByText('작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.')).toBeVisible();
    await expect(page.getByRole('heading', { name: '견적보다 먼저 불확실성을 줄입니다' })).toBeVisible();
    await expect(page.getByText('기본 포함')).toBeVisible();
    await expect(page.getByText('현장별 별도 확인')).toBeVisible();
    await expect(page.getByText('카페·팝업·숙박 운영')).toBeVisible();
    await expect(page.getByText('기관·법인 프로젝트')).toBeVisible();
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

  test('products and projects avoid misleading public conversion states', async ({ page }) => {
    await page.goto('/products');

    await expect(page.locator('a[href*="/customize?product="]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: /구성 상담 시작하기/ }).first()).toHaveAttribute('href', '/customize');

    await page.goto('/projects');

    await expect(page.getByText('테스트 입니다')).toHaveCount(0);
    await expect(page.getByText('Image Coming Soon')).toHaveCount(0);
  });

  test('direct incomplete project detail URLs are not public for seeded rejection cases', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required to seed incomplete project fixtures.');

    const now = new Date();
    const pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const futureDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const validBase = {
      client: 'E2E 검수 고객',
      location: '경기 양평',
      completed_at: pastDate,
      created_at: now.toISOString(),
      description: '공개 차단 회귀 테스트를 위한 충분한 길이의 프로젝트 설명입니다.',
      images: ['https://example.com/e2e-project.webp'],
      status: 'completed',
      tags: ['e2e'],
    };
    const fixtures = [
      { ...validBase, id: randomUUID(), title: 'E2E 테스트 제목 공개 차단' },
      { ...validBase, id: randomUUID(), title: 'E2E 이미지 없음', images: [] },
      { ...validBase, id: randomUUID(), title: 'E2E 설명 없음', description: null },
      { ...validBase, id: randomUUID(), title: 'E2E 미완료 상태', status: 'in_progress' },
      { ...validBase, id: randomUUID(), title: 'E2E 잘못된 이미지 URL', images: ['not-a-url'] },
      { ...validBase, id: randomUUID(), title: 'E2E 미래 완료일', completed_at: futureDate },
    ];
    const ids = fixtures.map((fixture) => fixture.id);

    const { error } = await serviceClient!.from('projects').insert(fixtures);
    expect(error).toBeNull();

    try {
      for (const fixture of fixtures) {
        await page.goto(`/projects/${fixture.id}`);
        await expect(page.locator('body'), fixture.title).toContainText(/404|찾을 수|not found/i);
        await expect(page.getByText(fixture.title)).toHaveCount(0);
      }
    } finally {
      await serviceClient!.from('projects').delete().in('id', ids);
    }
  });

  test('products hash links reveal hidden staged products', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required to find product fixtures.');

    const { data, error } = await serviceClient!
      .from('products')
      .select('id, name, sub_category, size_category');

    expect(error).toBeNull();
    const hiddenProduct = sortProductFixtures((data ?? []) as ProductFixture[])[8];

    test.skip(!hiddenProduct, 'At least 9 products are required to verify staged product hash links.');

    await page.goto(`/products#${encodeURIComponent(hiddenProduct!.id)}`);
    await expect(page.getByRole('heading', { name: hiddenProduct!.name, exact: true })).toBeVisible({ timeout: 10000 });
    expect(await page.evaluate(() => decodeURIComponent(window.location.hash))).toBe(`#${hiddenProduct!.id}`);
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
    const credentials = await createE2EAdminCredentials();

    try {
      await page.setViewportSize({ width: 390, height: 844 });
      await loginAsAdmin(page, credentials);

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
    } finally {
      await credentials.cleanup();
    }
  });

  test('key admin routes avoid horizontal overflow on mobile', async ({ page }) => {
    const credentials = await createE2EAdminCredentials();

    try {
      await page.setViewportSize({ width: 390, height: 844 });
      await loginAsAdmin(page, credentials);

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
    } finally {
      await credentials.cleanup();
    }
  });
});
