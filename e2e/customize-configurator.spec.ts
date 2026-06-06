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
  test('desktop model and option flow updates estimated total and URL config', async ({ page }) => {
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Compact 3x6' })).toBeVisible();
    await expect(page.getByText('₩27,900,000', { exact: true })).toBeVisible();
    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /dummy-base\.svg/);
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('x', '400');
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '600');

    await page.getByRole('button', { name: /Standard 3x9/ }).click();
    await expect(page.getByRole('heading', { name: 'Standard 3x9' })).toBeVisible();
    await expect(page.getByText('₩34,900,000', { exact: true })).toBeVisible();
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('x', '100');
    await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '900');

    await page.getByRole('button', { name: /적삼목 포인트/ }).click();
    await expect(page.getByText('₩37,100,000')).toBeVisible();

    await page.getByRole('button', { name: /태양광 패널/ }).click();
    await expect(page.getByText('상담').first()).toBeVisible();
    await expect(page).toHaveURL(/\/customize\?c=/);
  });

  test('order modal opens without submitting consultation', async ({ page }) => {
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '주문하기' }).last().click();

    await expect(page.getByRole('heading', { name: '상담 요청' })).toBeVisible();
    await expect(page.getByText('상담 후 최종 확정')).toBeVisible();
    await expect(page.getByText('이름')).toBeVisible();
    await expect(page.getByText('연락처')).toBeVisible();
    await expect(page.getByText('지역')).toBeVisible();
  });

  test('consultation submission succeeds with insert-only RLS and stores snapshot', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required for consultation cleanup.');

    const uniquePhone = `010${Date.now().toString().slice(-8)}`;
    const uniqueName = `Codex E2E ${Date.now()}`;

    try {
      await page.goto('/customize');
      await page.waitForLoadState('networkidle');

      await page.getByRole('button', { name: '주문하기' }).last().click();
      await page.getByTestId('consultation-name').fill(uniqueName);
      await page.getByTestId('consultation-phone').fill(uniquePhone);
      await page.getByTestId('consultation-region').fill('테스트 지역');
      await page.getByTestId('consultation-submit').click();

      await expect(page.getByText('상담 요청이 접수되었습니다.')).toBeVisible({ timeout: 15000 });

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

  test('mobile option drawer is available before order CTA', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '옵션 구성' }).click();

    const drawer = page.getByRole('dialog').filter({ hasText: '옵션 구성' });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('heading', { name: '외장' })).toBeVisible();
    await drawer.getByRole('button', { name: /적삼목 포인트/ }).click();
    await expect(page.getByText('₩30,100,000', { exact: true })).toBeVisible();
  });
});
