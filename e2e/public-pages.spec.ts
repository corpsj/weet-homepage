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
  // 리디자인 로그인 폼엔 비밀번호 표시/숨기기 토글(aria-label "비밀번호 표시")이 있어
  // 정확 일치로 입력 필드만 선택한다.
  await page.getByLabel('비밀번호', { exact: true }).fill(credentials.password);
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await expect(page.getByRole('heading', { name: '작업실' })).toBeVisible();
}

test.describe('Public page transition', () => {
  test('homepage leads with mobile home configuration CTA', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /작은 공간/ })).toBeVisible();
    await expect(page.getByText('이동식주택을 고를 때의 막연함을 없앱니다.')).toBeVisible();
    await expect(page.getByRole('heading', { name: '불확실성은 남기지 않습니다.' })).toBeVisible();
    await expect(page.getByText('카페·팝업·숙박 운영')).toBeVisible();
    await expect(page.getByText('기관·법인 프로젝트')).toBeVisible();
    await expect(page.getByRole('link', { name: /모델 구성하기|나만의 위트 만들기/ }).first()).toHaveAttribute('href', '/customize');
  });

  test('support answers permits and costs, and offers a consultation path', async ({ page }) => {
    await page.goto('/support');

    await expect(page.getByRole('heading', { name: /궁금한 것부터 해결하세요/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: '시작하기 전에' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '현장 설치 조건' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /내 땅에 둘 수 있을까/ })).toBeVisible();
    await expect(page.getByText('농막으로 두는 경우')).toBeVisible();
    await expect(page.getByText('농촌체류형 쉼터로 두는 경우')).toBeVisible();
    await expect(page.getByRole('heading', { name: '총비용은 이렇게 구성됩니다' })).toBeVisible();
    await expect(page.getByText('구매 과정')).toBeVisible();
    await expect(page.getByRole('heading', { name: '상담 신청', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '상담 신청하기' })).toBeVisible();
  });

  test('bespoke public page is repositioned as commercial custom solution', async ({ page }) => {
    await page.goto('/bespoke');

    await expect(page.getByRole('heading', { name: '상업 공간 맞춤 솔루션' })).toBeVisible();
    await expect(page.getByText('SMALL CAFE')).toBeVisible();
    await expect(page.getByText('POP-UP STORE / BRAND SHOWROOM')).toBeVisible();
    await expect(page.getByText('ACCOMMODATION / SITE OFFICE')).toBeVisible();
    await expect(page.getByText('SMART FARM')).toBeVisible();
  });

  test('modular public page shows premium narrative and process', async ({ page }) => {
    await page.goto('/modular');

    await expect(page.getByRole('heading', { name: '불확실성을 지운 프리미엄 공간' })).toBeVisible();

    // Assert scannable process steps
    await expect(page.getByText('01 / 공장 제작')).toBeVisible();
    await expect(page.getByText('02 / 운송 및 크레인 조립')).toBeVisible();
    await expect(page.getByText('03 / 생활과 운영')).toBeVisible();
    await expect(page.getByText('04 / 미래 확장과 이동')).toBeVisible();

    // Assert images are used (리디자인 생성 자산: modular-hero / factory-precision)
    await expect(page.locator('img[src*="modular-hero.webp"]')).toBeAttached();
    await expect(page.locator('img[src*="factory-precision.webp"]')).toBeAttached();
  });

  test('solution public page shows operational packages', async ({ page }) => {
    await page.goto('/solution');

    await expect(page.getByRole('heading', { name: '테크 옵션으로 완성하는 모듈러 공간' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '시큐리티', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '네트워크', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'IoT', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '에너지', exact: true })).toBeVisible();
    await expect(page.getByText('옵션은 장식이 아니라 생활의 기반입니다')).toBeVisible();
    // 다크 테크 리디자인: 카테고리 카드 이미지가 렌더되고, 상세 사진은 모달로 이동.
    await expect(page.locator('img[src*="security"]').first()).toBeAttached();
    // 카드 클릭 → 상세 모달에서 실제 서브라우트(/solution/energy)로 가는 링크가 노출된다.
    await page.getByRole('heading', { name: '에너지', exact: true }).first().click();
    await expect(page.locator('a[href="/solution/energy"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('footer no longer exposes a hidden admin link on the copyright wordmark', async ({ page }) => {
    await page.goto('/');

    // UX 개선: 카피라이트 "WEET"에 숨겨둔 /admin 링크 제거(오클릭·발견성 문제). 관리자는 /login 직접 접근.
    await expect(page.locator('footer a[href="/admin"]')).toHaveCount(0);
    await expect(page.locator('footer')).toContainText('WEET');
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

    // 오인 전환 방지: 제품별 /customize?product= 딥링크 없음.
    await expect(page.locator('a[href*="/customize?product="]')).toHaveCount(0);
    // 기준 모델(3x6·3x9)은 /customize, 비기준 모델은 /support#consult 로 분기(오인 방지).
    // ProductsPageClient는 client 렌더이므로 CTA가 나타날 때까지 auto-wait 후 검증한다.
    const configureLink = page.getByRole('link', { name: /이 모델 구성하기|Configure this model/ }).first();
    await expect(configureLink).toBeVisible();
    await expect(configureLink).toHaveAttribute('href', '/customize');
    const consultLink = page.getByRole('link', { name: /구성 상담 문의하기|Request a consultation/ }).first();
    if ((await consultLink.count()) > 0) {
      await expect(consultLink).toHaveAttribute('href', '/support#consult');
    }

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
      images: ['/images/e2e-project.webp'],
      status: 'completed',
      tags: ['e2e'],
    };
    const fixtures = [
      { ...validBase, id: randomUUID(), title: 'E2E 테스트 제목 공개 차단' },
      { ...validBase, id: randomUUID(), title: 'E2E 이미지 없음', images: [] },
      { ...validBase, id: randomUUID(), title: 'E2E 설명 없음', description: null },
      { ...validBase, id: randomUUID(), title: 'E2E 미완료 상태', status: 'in_progress' },
      { ...validBase, id: randomUUID(), title: 'E2E 잘못된 이미지 URL', images: ['/images/not-a-url.webp'] },
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

      const commandSearch = page.getByPlaceholder('명령 또는 화면 검색');
      await expect(commandSearch).toBeVisible();
      await commandSearch.fill('faq');
      await expect(page.getByRole('link', { name: 'FAQ 관리' })).toHaveAttribute('href', '/admin/support');

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

      // 파괴적 작업은 네이티브 confirm이 아니라 sonner confirmToast로 한 번 더 확인받는다. (lib/ui/confirm)
      await migrationButton.click();
      await expect(page.getByText('제품이 하나도 없을 때만 시드 데이터를 추가합니다')).toBeVisible({ timeout: 5000 });
      // 실제 이관을 실행하지 않도록 취소한다.
      await page.getByRole('button', { name: '취소' }).first().click();

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

  test('admin console operations pages expose readiness controls across devices', async ({ page }) => {
    const credentials = await createE2EAdminCredentials();
    const viewports = [
      { label: 'pc', width: 1440, height: 960 },
      { label: 'tablet', width: 834, height: 1112 },
      { label: 'mobile', width: 390, height: 844 },
    ];

    try {
      await page.setViewportSize(viewports[0]);
      await loginAsAdmin(page, credentials);

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        await page.goto('/admin/products');
        await expect(page.getByText('PRODUCT READINESS')).toBeVisible();
        await expect(page.getByPlaceholder('현재 페이지 제품 검색')).toBeVisible();
        await expect(page.getByText('이미지 보완')).toBeVisible();

        await page.goto('/admin/projects');
        await expect(page.getByText('PROJECT READINESS')).toBeVisible();
        await expect(page.getByText('IMAGE HEALTH')).toBeVisible();
        await expect(page.getByPlaceholder('프로젝트명, 고객, 지역 검색')).toBeVisible();

        await page.goto('/admin/consultations');
        await expect(page.getByText('CONSULTATION SLA')).toBeVisible();
        await expect(page.getByText('SLA 위험')).toBeVisible();

        await page.goto('/admin/insights');
        await expect(page.getByText('TRAFFIC INTELLIGENCE')).toBeVisible();

        const overflowX = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(overflowX, `${viewport.label} admin console overflow`).toBeFalsy();
      }
    } finally {
      await credentials.cleanup();
    }
  });
});
