import { expect, test } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const canUseServiceRole = Boolean(supabaseUrl && serviceRoleKey);
const serviceClient = canUseServiceRole
  ? createClient(supabaseUrl!, serviceRoleKey!, { auth: { persistSession: false } })
  : null;

test.describe('Customize configurator', () => {
  test('clean customize load keeps a clean URL until the buyer changes configuration', async ({ page }) => {
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/\/customize$/);

    await page.getByRole('button', { name: /Standard 3x9/ }).click();
    await expect(page).toHaveURL(/\/customize\?c=/);
  });

  test('desktop model and option flow updates estimated total and URL config', async ({ page }) => {
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { level: 1, name: 'Compact 3x6' })).toBeVisible();
    await expect(page.getByTestId('desktop-estimated-total')).toHaveText('₩27,900,000');
    // 인라인 SVG 도면: 우측 벽 고정·좌측 확장. 3×6 → 동일 스케일로 width 504.
    await expect(page.getByTestId('floorplan-length-rail')).toContainText('6m');
    await expect(page.getByTestId('model-footprint')).toHaveCount(1);
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('data-plan-width', '504');
    await expect(page.getByTestId('customize-step-space')).toHaveAttribute('aria-current', 'step');
    await expect(page.getByTestId('customize-step-space')).toContainText('모델');
    await expect(page.getByTestId('customize-step-included')).toContainText('공간 구성');
    await expect(page.getByTestId('customize-step-mood')).toContainText('무드 & 소재');
    await expect(page.getByTestId('customize-step-smart')).toContainText('스마트 테크');
    await expect(page.getByTestId('customize-step-review')).toContainText('검토·요청');
    await expect(page.getByTestId('customize-step-included')).toBeVisible();
    await expect(page.getByTestId('customize-step-mood')).toBeVisible();
    await expect(page.getByTestId('customize-step-smart')).toBeVisible();
    await expect(page.getByRole('heading', { name: '어떤 모델이 적합할까요?' })).toHaveCount(0);

    await page.getByRole('button', { name: /Standard 3x9/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Standard 3x9' })).toBeVisible();
    await expect(page.getByTestId('desktop-estimated-total')).toHaveText('₩34,900,000');
    // 3×9 선택 시 좌측 벽이 확장(504 → 756)되고 레일도 9m로 갱신된다.
    await expect(page.getByTestId('floorplan-length-rail')).toContainText('9m');
    await expect(page.getByTestId('model-footprint')).toHaveCount(1);
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('data-plan-width', '756');

    await page.getByTestId('customize-step-mood').click();
    await expect(page.getByTestId('customize-step-mood')).toHaveAttribute('aria-current', 'step');
    // 진행 시스템: 도달한 단계 이전의 단계는 완료 상태로 표시된다.
    await expect(page.getByTestId('customize-step-space')).toHaveAttribute('data-state', 'complete');
    await page.getByRole('button', { name: /적삼목 포인트/ }).click();
    await expect(page.getByTestId('desktop-estimated-total')).toHaveText('₩37,100,000');

    await page.getByTestId('customize-step-smart').click();
    await page.getByRole('button', { name: /태양광 패널/ }).click();
    // 모바일 인라인 패널(lg:hidden)에도 동일 칩이 DOM에 남아 있으므로 데스크톱 aside로 한정한다.
    await expect(page.getByTestId('customize-desktop-rail').getByText('상담 필요').first()).toBeVisible();
    await expect(page).toHaveURL(/\/customize\?c=/);

    await page.getByTestId('customize-step-space').click();
    await page.getByRole('button', { name: /Compact 3x6/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Compact 3x6' })).toBeVisible();
    await expect(page.getByTestId('desktop-estimated-total')).toHaveText('₩30,100,000');
  });

  test('review step shows configuration summary, pricing breakdown, and consultation form', async ({ page }) => {
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByTestId('customize-step-review').click();

    const review = page.getByTestId('customize-review');
    await expect(review).toBeVisible();
    await expect(review.getByRole('heading', { name: '구성 검토 및 상담 요청' })).toBeVisible();
    await expect(review.getByText('기본 제품가').first()).toBeVisible();
    await expect(review.getByText('옵션 합계')).toBeVisible();
    await expect(review.getByTestId('review-estimated-total')).toHaveText('₩27,900,000');
    await expect(review.getByText('운반/설치 별도', { exact: false }).first()).toBeVisible();
    await expect(review.getByText('상담 요청이며 결제는 진행되지 않습니다.').first()).toBeVisible();

    await expect(review.getByTestId('consultation-name')).toBeVisible();
    await expect(review.getByTestId('consultation-phone')).toBeVisible();
    await expect(review.getByTestId('consultation-region')).toBeVisible();

    // 선택 정보는 접힌 상태로 시작하고 토글로 펼친다.
    await expect(review.getByText('생산·설치 일정 제안에만 참고합니다.')).toHaveCount(0);
    await review.getByRole('button', { name: /더 정확한 견적을 위한 선택 정보/ }).click();
    await expect(review.getByText('생산·설치 일정 제안에만 참고합니다.')).toBeVisible();

    // 검토 단계에서는 구성 단계용 하단 고정 바가 사라진다.
    await expect(page.getByTestId('mobile-next-cta')).toHaveCount(0);
  });

  test('consultation submission succeeds with insert-only RLS and stores snapshot', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required for consultation cleanup.');

    const uniquePhone = `010${Date.now().toString().slice(-8)}`;
    const uniqueName = `Codex E2E ${Date.now()}`;

    try {
      await page.goto('/customize');
      await page.waitForLoadState('networkidle');

      await page.getByTestId('customize-step-review').click();
      await page.getByTestId('consultation-name').fill(uniqueName);
      await page.getByTestId('consultation-phone').fill(uniquePhone);
      await page.getByTestId('consultation-region').fill('테스트 지역');
      await page.getByTestId('consultation-submit').click();

      await expect(page.getByText('상담 신청이 접수되었습니다. 입력하신 연락처로 안내드리겠습니다.')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('상담 요청이 접수되었습니다')).toBeVisible();

      await expect.poll(async () => {
        const { count } = await serviceClient!
          .from('customize_consultations')
          .select('id', { count: 'exact', head: true })
          .eq('phone', uniquePhone);
        return count ?? 0;
      }, { timeout: 15000 }).toBe(1);

      const { data, error } = await serviceClient!
        .from('customize_consultations')
        .select('id, selected_model_id, estimated_total, config_snapshot')
        .eq('phone', uniquePhone)
        .single();

      expect(error).toBeNull();
      expect(data?.selected_model_id).toBe('compact-3x6');
      expect(data?.estimated_total).toBe(27900000);
      expect(data?.config_snapshot).toMatchObject({
        version: 1,
        estimatedTotal: 27900000,
      });
    } finally {
      await serviceClient?.from('customize_consultations').delete().eq('phone', uniquePhone);
    }
  });

  test('mobile inline step configurator replaces the option drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    // 옵션 구성은 드로어가 아니라 도면 아래 인라인 패널에서 바로 진행된다.
    await expect(page.getByRole('button', { name: '옵션 구성' })).toHaveCount(0);
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await page.getByTestId('customize-step-mood').click();
    await expect(page.getByTestId('customize-step-mood')).toHaveAttribute('aria-current', 'step');
    await expect(page.getByRole('heading', { name: '외장' })).toBeVisible();
    await page.getByRole('button', { name: /적삼목 포인트/ }).click();
    await expect(page.getByTestId('mobile-estimated-total')).toHaveText('₩30,100,000');
    // 구성 단계에서는 다음 단계 CTA가 하단 고정 바의 기본 동작이다.
    await expect(page.getByTestId('mobile-next-cta')).toContainText('다음: 스마트 테크');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('mobile sticky quote bar is never obscured by the dev indicator or fixed widgets', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    const total = page.getByTestId('mobile-estimated-total');
    const cta = page.getByTestId('mobile-next-cta');
    await expect(total).toBeVisible();
    await expect(cta).toBeVisible();

    // 가격/CTA 위 여러 지점을 히트 테스트해 최상단 요소가 고정 바 내부 요소인지 확인한다.
    // Next 데브 인디케이터(N 위젯) 같은 좌하단 고정 위젯이 덮으면 해당 호스트 요소(<nextjs-portal> 등)가
    // 반환되어 실패한다. devIndicators는 next.config.ts에서 비활성화되어 있어야 한다.
    const hitTest = await page.evaluate(() => {
      const targets = [
        document.querySelector('[data-testid="mobile-estimated-total"]'),
        document.querySelector('[data-testid="mobile-next-cta"]'),
      ];
      const failures: string[] = [];

      for (const target of targets) {
        if (!target) {
          failures.push('target element missing');
          continue;
        }
        const rect = target.getBoundingClientRect();
        const points: Array<[number, number]> = [
          [rect.left + 2, rect.top + rect.height / 2],
          [rect.left + rect.width / 2, rect.top + rect.height / 2],
          [rect.left + rect.width / 2, rect.bottom - 2],
        ];
        for (const [x, y] of points) {
          const top = document.elementFromPoint(x, y);
          if (!top) {
            failures.push(`no element at ${Math.round(x)},${Math.round(y)}`);
          } else if (!target.contains(top) && !top.contains(target)) {
            failures.push(`<${top.tagName.toLowerCase()}> covers ${target.getAttribute('data-testid')} at ${Math.round(x)},${Math.round(y)}`);
          }
        }
      }
      return failures;
    });
    expect(hitTest).toEqual([]);
  });

  test('mobile floorplan zoom opens with the selected floorplan and closes safely', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByTestId('floorplan-zoom-open').click();

    const dialog = page.getByRole('dialog').filter({ hasText: '도면 확대' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId('floorplan-zoom-canvas')).toBeVisible();
    await expect(dialog.getByTestId('model-footprint')).toHaveCount(1);
    await expect(dialog.getByTestId('model-footprint')).toHaveAttribute('data-plan-width', '504');

    await dialog.getByTestId('floorplan-zoom-close').click();
    await expect(dialog).not.toBeVisible();
  });

  test('tablet and mobile model changes keep the floorplan image single-rendered', async ({ page }) => {
    for (const viewport of [
      { width: 834, height: 1112 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/customize');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: /Standard 3x9/ }).click();

      await expect(page.getByRole('heading', { level: 1, name: 'Standard 3x9' })).toBeVisible();
      await expect(page.getByTestId('mobile-estimated-total')).toHaveText('₩34,900,000');
      await expect(page.getByTestId('model-footprint')).toHaveCount(1);
      await expect(page.getByTestId('model-footprint')).toHaveAttribute('data-plan-width', '756');
      await expect(page).toHaveURL(/\/customize\?c=/);
    }
  });

});
