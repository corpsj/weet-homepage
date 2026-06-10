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
    await expect(page.getByText('₩27,900,000', { exact: true })).toBeVisible();
    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /compact-3x6-base\.svg/);
    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    await expect(page.getByTestId('floorplan-length-rail')).toContainText('6m');
    await expect(page.getByTestId('model-footprint')).toHaveCount(0);
    await expect(page.getByTestId('customize-step-space')).toHaveAttribute('aria-current', 'step');
    await expect(page.getByTestId('customize-step-space')).toContainText('모델');
    await expect(page.getByTestId('customize-step-included')).toContainText('공간 구성');
    await expect(page.getByTestId('customize-step-mood')).toContainText('무드 & 소재');
    await expect(page.getByTestId('customize-step-smart')).toContainText('스마트 테크');
    await expect(page.getByTestId('customize-step-included')).toBeVisible();
    await expect(page.getByTestId('customize-step-mood')).toBeVisible();
    await expect(page.getByTestId('customize-step-smart')).toBeVisible();
    await expect(page.getByRole('heading', { name: '어떤 모델이 적합할까요?' })).toHaveCount(0);

    await page.getByRole('button', { name: /Standard 3x9/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Standard 3x9' })).toBeVisible();
    await expect(page.getByText('₩34,900,000', { exact: true })).toBeVisible();
    await expect(page.getByTestId('base-floorplan-image')).toHaveCount(1);
    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /standard-3x9-base\.svg/);
    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    await expect(page.getByTestId('floorplan-length-rail')).toContainText('9m');
    await expect(page.getByTestId('model-footprint')).toHaveCount(0);

    const floorplanSvgGeometry = await page.evaluate(async () => {
      const [compactSvg, standardSvg] = await Promise.all([
        fetch('/images/customize/compact-3x6-base.svg').then((response) => response.text()),
        fetch('/images/customize/standard-3x9-base.svg').then((response) => response.text()),
      ]);
      return { compactSvg, standardSvg };
    });
    expect(floorplanSvgGeometry.compactSvg).toContain('<rect x="200" y="60" width="600" height="300"');
    expect(floorplanSvgGeometry.standardSvg).toContain('<rect x="50" y="60" width="900" height="300"');

    await page.getByTestId('customize-step-mood').click();
    await expect(page.getByTestId('customize-step-mood')).toHaveAttribute('aria-current', 'step');
    await page.getByRole('button', { name: /적삼목 포인트/ }).click();
    await expect(page.getByText('₩37,100,000')).toBeVisible();

    await page.getByTestId('customize-step-smart').click();
    await page.getByRole('button', { name: /태양광 패널/ }).click();
    // 모바일 인라인 패널(lg:hidden)에도 동일 칩이 DOM에 남아 있으므로 데스크톱 aside로 한정한다.
    await expect(page.locator('aside').getByText('협의').first()).toBeVisible();
    await expect(page).toHaveURL(/\/customize\?c=/);

    await page.getByTestId('customize-step-space').click();
    await page.getByRole('button', { name: /Compact 3x6/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Compact 3x6' })).toBeVisible();
    await expect(page.getByText('₩30,100,000', { exact: true })).toBeVisible();
  });

  test('order modal opens without submitting consultation', async ({ page }) => {
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '상담·견적 요청' }).last().click();

    const dialog = page.getByRole('dialog', { name: '구성 상담·견적 요청' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('운반/설치 별도')).toBeVisible();
    await expect(dialog.getByText('이름')).toBeVisible();
    await expect(dialog.getByText('연락처')).toBeVisible();
    await expect(dialog.locator('label').filter({ hasText: '지역' })).toBeVisible();
    await expect(dialog.getByText('선택 입력이지만 알려주시면 더 정확한 견적 안내에 도움이 됩니다. 아직 정해지지 않았다면 비워두셔도 됩니다.')).toBeVisible();
    await expect(dialog.getByText('생산·설치 일정 제안에만 참고합니다.')).toBeVisible();
  });

  test('consultation submission succeeds with insert-only RLS and stores snapshot', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required for consultation cleanup.');

    const uniquePhone = `010${Date.now().toString().slice(-8)}`;
    const uniqueName = `Codex E2E ${Date.now()}`;

    try {
      await page.goto('/customize');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: '상담·견적 요청' }).last().click();
      await page.getByTestId('consultation-name').fill(uniqueName);
      await page.getByTestId('consultation-phone').fill(uniquePhone);
      await page.getByTestId('consultation-region').fill('테스트 지역');
      await page.getByTestId('consultation-submit').click();

      await expect(page.getByText('상담 신청이 접수되었습니다. 입력하신 연락처로 안내드리겠습니다.')).toBeVisible({ timeout: 15000 });

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
    await expect(page.getByText('₩30,100,000', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test('mobile floorplan zoom opens with the selected floorplan and closes safely', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByTestId('floorplan-zoom-open').click();

    const dialog = page.getByRole('dialog').filter({ hasText: '도면 확대' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId('floorplan-zoom-canvas')).toBeVisible();
    await expect(dialog.getByTestId('base-floorplan-image')).toHaveCount(1);
    await expect(dialog.getByTestId('base-floorplan-image')).toHaveAttribute('href', /compact-3x6-base\.svg/);
    await expect(dialog.getByTestId('model-footprint')).toHaveCount(0);

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
      await expect(page.getByText('₩34,900,000', { exact: true })).toBeVisible();
      await expect(page.getByTestId('base-floorplan-image')).toHaveCount(1);
      await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /standard-3x9-base\.svg/);
      await expect(page.getByTestId('model-footprint')).toHaveCount(0);
      await expect(page).toHaveURL(/\/customize\?c=/);
    }
  });

  test('floorplan falls back to generated footprint when the base image fails', async ({ page }) => {
    await page.route('**/compact-3x6-base.svg', (route) => route.abort());
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { level: 1, name: 'Compact 3x6' })).toBeVisible();
    await expect(page.getByTestId('base-floorplan-image')).toHaveCount(0);
    await expect(page.getByTestId('model-footprint')).toHaveCount(1);
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '600');
  });

});
