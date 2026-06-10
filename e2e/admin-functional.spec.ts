import { expect, test, type Page } from '@playwright/test';
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

async function loginAsAdmin(page: Page, credentials: { id: string; password: string }) {
  await page.goto('/login');
  await page.getByLabel('아이디').fill(credentials.id);
  await page.getByLabel('비밀번호').fill(credentials.password);
  await page.getByRole('button', { name: '로그인' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await expect(page.getByRole('heading', { name: '작업실' })).toBeVisible();
}

async function acceptNextDialog(page: Page) {
  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });
}

async function waitForRecordId(table: string, key: string, value: string) {
  await expect.poll(async () => {
    const { data } = await serviceClient!
      .from(table)
      .select('id')
      .eq(key, value)
      .maybeSingle();
    return data?.id ?? '';
  }).not.toBe('');

  const { data, error } = await serviceClient!
    .from(table)
    .select('id')
    .eq(key, value)
    .single();

  expect(error).toBeNull();
  expect(data?.id).toBeTruthy();
  return data!.id as string;
}

test.describe.serial('Admin functional operations', () => {
  test('landing page tab persists hero slide CRUD and signature product changes', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required for admin functional CRUD checks.');

    const credentials = await createE2EAdminCredentials();
    const suffix = randomUUID().slice(0, 8);
    const slideTitle = `E2E 랜딩 슬라이드 ${suffix}`;
    const supportSlideTitle = `E2E 보조 슬라이드 ${suffix}`;
    const productId = randomUUID();
    const productName = `E2E 시그니처 제품 ${suffix}`;

    const { data: activeSignatureProducts } = await serviceClient!
      .from('products')
      .select('id')
      .eq('is_active', true)
      .eq('is_signature', true);
    const hasSignatureCapacity = (activeSignatureProducts?.length ?? 0) < 10;

    await serviceClient!.from('products').insert({
      id: productId,
      name: productName,
      sub_category: 'Private',
      size_category: 'S',
      image_url: '/images/hero_main.webp',
      tagline: 'E2E signature product',
      description: '관리자 시그니처 토글 검증을 위한 충분한 설명입니다.',
      price: '테스트가',
      is_active: true,
      is_signature: hasSignatureCapacity,
      display_order: 9999,
    } as any);
    await serviceClient!.from('hero_slides').insert({
      title: supportSlideTitle,
      subtitle: 'E2E 보조 공개 슬라이드',
      image_url: '/images/hero_main.webp',
      link_url: null,
      is_active: true,
      sort_order: 9998,
    } as any);

    try {
      await loginAsAdmin(page, credentials);
      await page.goto('/admin/main');
      await expect(page.getByRole('heading', { name: '랜딩 페이지 관리' })).toBeVisible();

      await page.getByRole('button', { name: /새 슬라이드/ }).click();
      const createForm = page.locator('form').last();
      await createForm.locator('input[name="title"]').fill(slideTitle);
      await createForm.locator('input[name="subtitle"]').fill('처음 저장된 부제');
      await createForm.getByPlaceholder('/images/hero_main.webp 또는 https://...').fill('/images/hero_main.webp');
      await createForm.getByPlaceholder('/customize 또는 https://...').fill('/customize?source=e2e');
      await createForm.getByRole('button', { name: '저장' }).click();
      await expect(page.getByText(slideTitle)).toBeVisible();

      await expect.poll(async () => {
        const { data } = await serviceClient!
          .from('hero_slides')
          .select('subtitle, image_url, link_url, is_active')
          .eq('title', slideTitle)
          .maybeSingle();
        return data;
      }).toMatchObject({
        subtitle: '처음 저장된 부제',
        image_url: '/images/hero_main.webp',
        link_url: '/customize?source=e2e',
        is_active: true,
      });

      await page.getByLabel(`${slideTitle} 숨기기`).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!
          .from('hero_slides')
          .select('is_active')
          .eq('title', slideTitle)
          .maybeSingle();
        return data?.is_active;
      }).toBe(false);

      await page.getByRole('button', { name: `${slideTitle} 수정` }).click();
      const editForm = page.locator('form').last();
      await editForm.locator('input[name="subtitle"]').fill('수정된 부제');
      await editForm.getByRole('button', { name: '저장' }).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!
          .from('hero_slides')
          .select('subtitle')
          .eq('title', slideTitle)
          .maybeSingle();
        return data?.subtitle;
      }).toBe('수정된 부제');

      await acceptNextDialog(page);
      await page.getByLabel(`${slideTitle} 삭제`).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!
          .from('hero_slides')
          .select('id')
          .eq('title', slideTitle);
        return data?.length ?? -1;
      }).toBe(0);

      await page.getByRole('button', { name: /시그니처 제품/ }).click();
      const signatureProductCard = page.getByRole('button', { name: new RegExp(productName) });
      if (hasSignatureCapacity) {
        await signatureProductCard.click();
        await expect.poll(async () => {
          const { data } = await serviceClient!
            .from('products')
            .select('is_signature')
            .eq('id', productId)
            .single();
          return data?.is_signature;
        }).toBe(false);
        await expect(signatureProductCard).toHaveAttribute('aria-pressed', 'false');
        await expect(signatureProductCard).not.toHaveClass(/opacity-70/);

        await signatureProductCard.click();
        await expect.poll(async () => {
          const { data } = await serviceClient!
            .from('products')
            .select('is_signature')
            .eq('id', productId)
            .single();
          return data?.is_signature;
        }).toBe(true);
      } else {
        await expect(signatureProductCard).toHaveAttribute('aria-pressed', 'false');
        await signatureProductCard.click();
        await expect.poll(async () => {
          const { data } = await serviceClient!
            .from('products')
            .select('is_signature')
            .eq('id', productId)
            .single();
          return data?.is_signature;
        }).toBe(false);
        await expect(signatureProductCard).toHaveAttribute('aria-pressed', 'false');
      }
    } finally {
      await serviceClient!.from('hero_slides').delete().eq('title', slideTitle);
      await serviceClient!.from('hero_slides').delete().eq('title', supportSlideTitle);
      await serviceClient!.from('products').delete().eq('id', productId);
      await credentials.cleanup();
    }
  });

  test('customize manager persists create, edit, toggle, and delete operations', async ({ page }) => {
    test.skip(!serviceClient, 'Supabase service role env is required for admin functional CRUD checks.');

    const credentials = await createE2EAdminCredentials();
    const suffix = randomUUID().slice(0, 8);
    const modelId = `e2e-model-${suffix}`;
    const modelName = `E2E 모델 ${suffix}`;
    const categoryKey = `e2e-category-${suffix}`;
    const categoryName = `E2E 카테고리 ${suffix}`;
    const optionKey = `e2e-option-${suffix}`;
    const optionName = `E2E 옵션 ${suffix}`;
    const conflictOptionId = randomUUID();
    const conflictOptionKey = `e2e-conflict-option-${suffix}`;
    const conflictOptionName = `E2E 충돌 옵션 ${suffix}`;
    const specKey = `e2e-spec-${suffix}`;
    const specName = `E2E 포함 사양 ${suffix}`;

    try {
      await loginAsAdmin(page, credentials);
      await page.goto('/admin/customize');
      await expect(page.getByRole('heading', { name: '주문 구성 관리' })).toBeVisible();

      const modelPanel = page.locator('#customize-panel-models');
      await modelPanel.getByLabel('ID').fill(modelId);
      await modelPanel.getByLabel('Code').fill(`m-${suffix}`);
      await modelPanel.getByLabel('모델명').fill(modelName);
      await modelPanel.getByLabel('영문명').fill(`Model ${suffix}`);
      await modelPanel.getByLabel('기본가').fill('12345678');
      await modelPanel.getByRole('button', { name: '저장' }).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!.from('customize_models').select('name_ko, base_price').eq('id', modelId).maybeSingle();
        return data;
      }).toMatchObject({ name_ko: modelName, base_price: 12345678 });

      await page.getByRole('tab', { name: /카테고리/ }).click();
      const categoryPanel = page.locator('#customize-panel-categories');
      await categoryPanel.getByLabel('Key').fill(categoryKey);
      await categoryPanel.getByLabel('카테고리명').fill(categoryName);
      await categoryPanel.getByRole('button', { name: '저장' }).click();
      const categoryId = await waitForRecordId('customize_categories', 'key', categoryKey);

      await page.getByRole('tab', { name: /옵션/ }).click();
      const optionPanel = page.locator('#customize-panel-options');
      await optionPanel.getByRole('button', { name: /새 옵션/ }).click();
      await optionPanel.getByLabel('카테고리').selectOption({ label: categoryName });
      await optionPanel.getByLabel('Key').fill(optionKey);
      await optionPanel.getByLabel('옵션명').fill(optionName);
      await optionPanel.getByLabel('가격', { exact: true }).fill('987654');
      await optionPanel.getByLabel('짧은 설명').fill('E2E 옵션 설명');
      await optionPanel.getByLabel(modelName).check();
      await optionPanel.getByRole('button', { name: '저장' }).first().click();
      const optionId = await waitForRecordId('customize_options', 'key', optionKey);

      await serviceClient!.from('customize_options').insert({
        id: conflictOptionId,
        category_id: categoryId,
        key: conflictOptionKey,
        name_ko: conflictOptionName,
        short_description_ko: 'E2E 충돌 대상 옵션',
        price_type: 'fixed',
        price: 12345,
        is_default: false,
        available_model_ids: [],
        display_order: 9998,
        is_active: true,
      } as any);
      await serviceClient!.from('customize_option_conflicts').insert([
        {
          option_id: optionId,
          conflicts_with_option_id: conflictOptionId,
          reason_ko: 'E2E 충돌 검증',
        },
        {
          option_id: conflictOptionId,
          conflicts_with_option_id: optionId,
          reason_ko: 'E2E 충돌 검증',
        },
      ] as any);

      await page.getByRole('tab', { name: /기본 포함 사양/ }).click();
      const includedPanel = page.locator('#customize-panel-included');
      await includedPanel.getByLabel('Key', { exact: true }).fill(specKey);
      await includedPanel.getByLabel('사양명').fill(specName);
      await includedPanel.getByRole('button', { name: '저장' }).click();
      const specId = await waitForRecordId('customize_included_specs', 'key', specKey);

      await page.getByRole('tab', { name: /모델/ }).click();
      await acceptNextDialog(page);
      await page.getByLabel(`${modelName} 모델 삭제`).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!.from('customize_models').select('id').eq('id', modelId);
        return data?.length ?? -1;
      }).toBe(0);
      await expect.poll(async () => {
        const { data } = await serviceClient!
          .from('customize_options')
          .select('available_model_ids')
          .eq('id', optionId)
          .single();
        return data?.available_model_ids ?? [];
      }).toEqual([]);

      await page.getByRole('tab', { name: /기본 포함 사양/ }).click();
      await acceptNextDialog(page);
      await page.getByLabel(`${specName} 포함 사양 삭제`).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!.from('customize_included_specs').select('id').eq('id', specId);
        return data?.length ?? -1;
      }).toBe(0);

      await page.getByRole('tab', { name: /옵션/ }).click();
      await acceptNextDialog(page);
      await page.getByLabel(`${optionName} 옵션 삭제`).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!.from('customize_options').select('id').eq('id', optionId);
        return data?.length ?? -1;
      }).toBe(0);
      await expect.poll(async () => {
        const { data } = await serviceClient!
          .from('customize_option_conflicts')
          .select('option_id')
          .or(`option_id.eq.${optionId},conflicts_with_option_id.eq.${optionId}`);
        return data?.length ?? -1;
      }).toBe(0);

      await serviceClient!.from('customize_options').delete().eq('id', conflictOptionId);

      await page.getByRole('tab', { name: /카테고리/ }).click();
      await acceptNextDialog(page);
      await page.getByLabel(`${categoryName} 카테고리 삭제`).click();
      await expect.poll(async () => {
        const { data } = await serviceClient!.from('customize_categories').select('id').eq('id', categoryId);
        return data?.length ?? -1;
      }).toBe(0);
    } finally {
      await serviceClient!.from('customize_option_conflicts').delete().eq('option_id', conflictOptionId);
      await serviceClient!.from('customize_option_conflicts').delete().eq('conflicts_with_option_id', conflictOptionId);
      await serviceClient!.from('customize_options').delete().eq('key', optionKey);
      await serviceClient!.from('customize_options').delete().eq('id', conflictOptionId);
      await serviceClient!.from('customize_categories').delete().eq('key', categoryKey);
      await serviceClient!.from('customize_included_specs').delete().eq('key', specKey);
      await serviceClient!.from('customize_models').delete().eq('id', modelId);
      await credentials.cleanup();
    }
  });
});
