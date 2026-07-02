'use server';

import { randomUUID } from 'crypto';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin, supabase } from '@/lib/supabase';
import { assertPublicSubmissionAllowed } from '@/lib/public-submission-guard';
import {
  calculateEstimate,
  encodeConfig,
  hasConflict,
  sanitizeConfig,
  selectedOptionIds,
} from '@/lib/customize/priceCalculator';
import type {
  ConsultationFormInput,
  ConsultationStatus,
  CustomizeCatalog,
  CustomizeCategory,
  CustomizeConsultation,
  CustomizeIncludedSpec,
  CustomizeModel,
  CustomizeOption,
  CustomizeOptionConflict,
  PriceType,
  SelectedOptions,
  SelectionType,
} from '@/lib/customize/types';

const stringField = (max: number, message: string) => z.string().trim().min(1, message).max(max);
const optionalString = (max: number) => z.string().trim().max(max).optional().transform((value) => value || undefined);
const uuidField = z.string().uuid();

const phoneSchema = z
  .string()
  .trim()
  .min(7, '연락처를 입력해주세요.')
  .max(30, '연락처는 30자 이하로 입력해주세요.')
  .regex(/^[0-9+\-\s().]+$/, '연락처 형식이 올바르지 않습니다.');

const selectedOptionsSchema = z.record(z.string(), z.array(z.string().uuid()).max(20)).default({});

const consultationSchema = z.object({
  modelId: z.string().trim().min(1),
  selectedOptions: selectedOptionsSchema,
  configQuery: z.string().trim().max(3000).optional(),
  customerName: stringField(80, '이름을 입력해주세요.'),
  phone: phoneSchema,
  region: stringField(120, '지역을 입력해주세요.'),
  purchaseTimeline: optionalString(40),
  landType: optionalString(40),
  installAddress: optionalString(200),
  budgetRange: optionalString(60),
  memo: optionalString(1000),
});

const modelSchema = z.object({
  id: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
  code: z.string().trim().min(2).max(40),
  nameKo: stringField(80, '모델명을 입력해주세요.'),
  nameEn: optionalString(80),
  widthM: z.coerce.number().positive().max(99),
  lengthM: z.coerce.number().positive().max(99),
  areaSqm: z.coerce.number().positive().max(999),
  basePrice: z.coerce.number().int().min(0),
  floorplanImagePath: optionalString(300),
  floorplanOverlayPath: optionalString(300),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

const categorySchema = z.object({
  id: z.string().uuid().optional(),
  key: z.string().trim().min(2).max(60).regex(/^[a-z0-9-]+$/),
  nameKo: stringField(60, '카테고리명을 입력해주세요.'),
  nameEn: optionalString(60),
  descriptionKo: optionalString(300),
  descriptionEn: optionalString(300),
  selectionType: z.enum(['single', 'multiple']),
  required: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

const optionSchema = z.object({
  id: z.string().uuid().optional(),
  categoryId: uuidField,
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
  nameKo: stringField(80, '옵션명을 입력해주세요.'),
  nameEn: optionalString(80),
  shortDescriptionKo: stringField(160, '짧은 설명을 입력해주세요.'),
  shortDescriptionEn: optionalString(160),
  detailDescriptionKo: optionalString(800),
  detailDescriptionEn: optionalString(800),
  priceType: z.enum(['included', 'fixed', 'consult']),
  price: z.coerce.number().int().min(0).default(0),
  isDefault: z.boolean().default(false),
  availableModelIds: z.array(z.string().trim().min(1).max(80)).default([]),
  imagePath: optionalString(300),
  overlayImagePath: optionalString(300),
  overlayLabelKo: optionalString(80),
  overlayLabelEn: optionalString(80),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

const includedSpecSchema = z.object({
  id: z.string().uuid().optional(),
  modelId: z.string().trim().max(80).optional().transform((value) => value || null),
  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
  nameKo: stringField(80, '포함 사양명을 입력해주세요.'),
  nameEn: optionalString(80),
  descriptionKo: optionalString(300),
  descriptionEn: optionalString(300),
  categoryKey: optionalString(60),
  iconName: optionalString(60),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

function normalizePhone(value: string) {
  const compact = value.replace(/[^\d+]/g, '');
  return compact.startsWith('+') ? `+${compact.replace(/[^\d]/g, '')}` : compact.replace(/\D/g, '');
}

function asText(value: string | undefined | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function mapModel(row: any): CustomizeModel {
  return {
    id: row.id,
    code: row.code,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    widthM: Number(row.width_m),
    lengthM: Number(row.length_m),
    areaSqm: Number(row.area_sqm),
    basePrice: row.base_price,
    floorplanImagePath: row.floorplan_image_path,
    floorplanOverlayPath: row.floorplan_overlay_path,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

function mapCategory(row: any): CustomizeCategory {
  return {
    id: row.id,
    key: row.key,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    descriptionKo: row.description_ko,
    descriptionEn: row.description_en,
    selectionType: row.selection_type as SelectionType,
    required: row.required,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

function mapOption(row: any, categoryKeyById: Map<string, string>): CustomizeOption {
  return {
    id: row.id,
    categoryId: row.category_id,
    categoryKey: categoryKeyById.get(row.category_id) ?? '',
    key: row.key,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    shortDescriptionKo: row.short_description_ko,
    shortDescriptionEn: row.short_description_en,
    detailDescriptionKo: row.detail_description_ko,
    detailDescriptionEn: row.detail_description_en,
    priceType: row.price_type as PriceType,
    price: row.price,
    isDefault: row.is_default,
    availableModelIds: row.available_model_ids ?? [],
    imagePath: row.image_path,
    overlayImagePath: row.overlay_image_path,
    overlayLabelKo: row.overlay_label_ko,
    overlayLabelEn: row.overlay_label_en,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

function mapIncludedSpec(row: any): CustomizeIncludedSpec {
  return {
    id: row.id,
    modelId: row.model_id,
    key: row.key,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    descriptionKo: row.description_ko,
    descriptionEn: row.description_en,
    categoryKey: row.category_key,
    iconName: row.icon_name,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

function mapConflict(row: any): CustomizeOptionConflict {
  return {
    optionId: row.option_id,
    conflictsWithOptionId: row.conflicts_with_option_id,
    reasonKo: row.reason_ko,
    reasonEn: row.reason_en,
  };
}

function mapConsultation(row: any): CustomizeConsultation {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    region: row.region,
    purchaseTimeline: row.purchase_timeline,
    landType: row.land_type,
    installAddress: row.install_address,
    budgetRange: row.budget_range,
    memo: row.memo,
    status: row.status,
    internalMemo: row.internal_memo,
    selectedModelId: row.selected_model_id,
    selectedOptionIds: row.selected_option_ids ?? [],
    estimatedTotal: row.estimated_total,
    configQuery: row.config_query,
    configSnapshot: row.config_snapshot,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function loadCatalog(client: any, includeInactive = false): Promise<CustomizeCatalog> {
  const activeFilter = includeInactive ? undefined : true;
  const modelQuery = client.from('customize_models').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
  const categoryQuery = client.from('customize_categories').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
  const optionQuery = client.from('customize_options').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
  const includedQuery = client.from('customize_included_specs').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
  const conflictQuery = client.from('customize_option_conflicts').select('*').order('created_at', { ascending: true });

  if (activeFilter) {
    modelQuery.eq('is_active', true);
    categoryQuery.eq('is_active', true);
    optionQuery.eq('is_active', true);
    includedQuery.eq('is_active', true);
  }

  const [modelsResult, categoriesResult, optionsResult, includedResult, conflictsResult] = await Promise.all([
    modelQuery,
    categoryQuery,
    optionQuery,
    includedQuery,
    conflictQuery,
  ]);

  for (const result of [modelsResult, categoriesResult, optionsResult, includedResult, conflictsResult]) {
    if (result.error) throw result.error;
  }

  const categories = ((categoriesResult.data ?? []) as any[]).map(mapCategory);
  const categoryKeyById = new Map(categories.map((category: CustomizeCategory) => [category.id, category.key]));

  return {
    models: ((modelsResult.data ?? []) as any[]).map(mapModel),
    categories,
    options: ((optionsResult.data ?? []) as any[]).map((row: any) => mapOption(row, categoryKeyById)),
    includedSpecs: ((includedResult.data ?? []) as any[]).map(mapIncludedSpec),
    conflicts: ((conflictsResult.data ?? []) as any[]).map(mapConflict),
  };
}

// 공개 카탈로그는 관리자만 수정하는 준정적 데이터 — site-settings와 동일 패턴으로 캐시한다.
const fetchPublicCatalog = unstable_cache(
  async () => loadCatalog(supabase, false),
  ['customize-catalog'],
  { tags: ['customize-catalog'], revalidate: 300 }
);

export async function getPublicCustomizeCatalog() {
  try {
    return await fetchPublicCatalog();
  } catch (error) {
    console.error('Error loading public customize catalog:', error);
    return { models: [], categories: [], options: [], includedSpecs: [], conflicts: [] } satisfies CustomizeCatalog;
  }
}

export async function getCustomizeAdminData() {
  await requireAdmin();

  const admin = getSupabaseAdmin() as any;
  const [catalog, consultationsResult] = await Promise.all([
    loadCatalog(admin, true),
    admin
      .from('customize_consultations')
      .select('id, customer_name, phone, region, purchase_timeline, land_type, install_address, budget_range, memo, status, internal_memo, selected_model_id, selected_option_ids, estimated_total, config_query, config_snapshot, created_at, updated_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  if (consultationsResult.error) throw consultationsResult.error;

  return {
    catalog,
    consultations: (consultationsResult.data ?? []).map(mapConsultation),
    consultationCount: consultationsResult.count ?? 0,
  };
}

export async function getAdminConsultations(page = 1, status: ConsultationStatus | 'all' = 'all') {
  await requireAdmin();

  const admin = getSupabaseAdmin() as any;
  const from = Math.max(0, page - 1) * 20;
  const to = from + 19;
  let query = admin
    .from('customize_consultations')
    .select('id, customer_name, phone, region, purchase_timeline, land_type, install_address, budget_range, memo, status, internal_memo, selected_model_id, selected_option_ids, estimated_total, config_query, config_snapshot, created_at, updated_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (status !== 'all') query = query.eq('status', status);

  const { data, error, count } = await query;
  if (error) throw error;

  return { consultations: (data ?? []).map(mapConsultation), count: count ?? 0 };
}

export async function submitCustomizeConsultation(input: ConsultationFormInput) {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' };
  }

  try {
    await assertPublicSubmissionAllowed('customize-consultation');
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.' };
  }

  try {
    const catalog = await loadCatalog(supabase, false);
    const safe = sanitizeConfig(catalog, parsed.data.modelId, parsed.data.selectedOptions);
    const estimate = calculateEstimate(catalog, safe.modelId, safe.selections);

    if (!estimate) {
      return { success: false, message: '선택한 모델을 확인해주세요.' };
    }

    const ids = selectedOptionIds(safe.selections);
    if (hasConflict(catalog, ids)) {
      return { success: false, message: '동시에 선택할 수 없는 옵션이 포함되어 있습니다.' };
    }

    const validOptionIds = estimate.selectedOptions.map((option) => option.id);
    const selectedOptions: SelectedOptions = Object.fromEntries(
      Object.entries(safe.selections).map(([categoryId, optionIds]) => [
        categoryId,
        optionIds.filter((id) => validOptionIds.includes(id)),
      ])
    );
    const configQuery = parsed.data.configQuery || encodeConfig(estimate.model.id, selectedOptions);
    const includedSpecs = catalog.includedSpecs.filter((spec) => !spec.modelId || spec.modelId === estimate.model.id);
    const snapshot = {
      version: 1,
      model: estimate.model,
      selectedOptions: estimate.selectedOptions,
      includedSpecs,
      optionTotal: estimate.optionTotal,
      estimatedTotal: estimate.estimatedTotal,
      consultOptionCount: estimate.consultOptionCount,
      selectedOptionsByCategory: selectedOptions,
      createdAt: new Date().toISOString(),
    };

    const consultationId = randomUUID();
    const admin = getSupabaseAdmin();
    const { error } = await (admin as any)
      .from('customize_consultations')
      .insert({
        id: consultationId,
        customer_name: parsed.data.customerName,
        phone: normalizePhone(parsed.data.phone),
        region: parsed.data.region,
        purchase_timeline: asText(parsed.data.purchaseTimeline),
        land_type: asText(parsed.data.landType),
        install_address: asText(parsed.data.installAddress),
        budget_range: asText(parsed.data.budgetRange),
        memo: asText(parsed.data.memo),
        status: '신규',
        selected_model_id: estimate.model.id,
        selected_option_ids: validOptionIds,
        estimated_total: estimate.estimatedTotal,
        config_query: configQuery,
        config_snapshot: snapshot,
      });

    if (error) throw error;

    revalidatePath('/admin/consultations');
    revalidatePath('/admin');

    return { success: true, message: '상담 신청이 접수되었습니다. 입력하신 연락처로 안내드리겠습니다.', id: consultationId };
  } catch (error) {
    console.error('Error submitting customize consultation:', error);
    return { success: false, message: '상담 신청 저장 중 오류가 발생했습니다.' };
  }
}

export async function upsertCustomizeModel(input: unknown) {
  await requireAdmin();
  const parsed = modelSchema.parse(input);
  const admin = getSupabaseAdmin() as any;

  const { error } = await admin.from('customize_models').upsert({
    id: parsed.id,
    code: parsed.code,
    name_ko: parsed.nameKo,
    name_en: asText(parsed.nameEn),
    width_m: parsed.widthM,
    length_m: parsed.lengthM,
    area_sqm: parsed.areaSqm,
    base_price: parsed.basePrice,
    floorplan_image_path: asText(parsed.floorplanImagePath),
    floorplan_overlay_path: asText(parsed.floorplanOverlayPath),
    display_order: parsed.displayOrder,
    is_active: parsed.isActive,
  });

  if (error) throw error;
  revalidateCustomizePaths();
  return { success: true };
}

export async function upsertCustomizeCategory(input: unknown) {
  await requireAdmin();
  const parsed = categorySchema.parse(input);
  const admin = getSupabaseAdmin() as any;
  const payload = {
    key: parsed.key,
    name_ko: parsed.nameKo,
    name_en: asText(parsed.nameEn),
    description_ko: asText(parsed.descriptionKo),
    description_en: asText(parsed.descriptionEn),
    selection_type: parsed.selectionType,
    required: parsed.required,
    display_order: parsed.displayOrder,
    is_active: parsed.isActive,
  };

  const query = parsed.id
    ? admin.from('customize_categories').update(payload).eq('id', parsed.id)
    : admin.from('customize_categories').insert(payload);
  const { error } = await query;

  if (error) throw error;
  revalidateCustomizePaths();
  return { success: true };
}

export async function upsertCustomizeOption(input: unknown) {
  await requireAdmin();
  const parsed = optionSchema.parse(input);
  const admin = getSupabaseAdmin() as any;
  const payload = {
    category_id: parsed.categoryId,
    key: parsed.key,
    name_ko: parsed.nameKo,
    name_en: asText(parsed.nameEn),
    short_description_ko: parsed.shortDescriptionKo,
    short_description_en: asText(parsed.shortDescriptionEn),
    detail_description_ko: asText(parsed.detailDescriptionKo),
    detail_description_en: asText(parsed.detailDescriptionEn),
    price_type: parsed.priceType,
    price: parsed.priceType === 'fixed' ? parsed.price : 0,
    is_default: parsed.isDefault,
    available_model_ids: parsed.availableModelIds,
    image_path: asText(parsed.imagePath),
    overlay_image_path: asText(parsed.overlayImagePath),
    overlay_label_ko: asText(parsed.overlayLabelKo),
    overlay_label_en: asText(parsed.overlayLabelEn),
    display_order: parsed.displayOrder,
    is_active: parsed.isActive,
  };

  const query = parsed.id
    ? admin.from('customize_options').update(payload).eq('id', parsed.id)
    : admin.from('customize_options').insert(payload);
  const { error } = await query;

  if (error) throw error;
  revalidateCustomizePaths();
  return { success: true };
}

export async function upsertCustomizeIncludedSpec(input: unknown) {
  await requireAdmin();
  const parsed = includedSpecSchema.parse(input);
  const admin = getSupabaseAdmin() as any;
  const payload = {
    model_id: parsed.modelId,
    key: parsed.key,
    name_ko: parsed.nameKo,
    name_en: asText(parsed.nameEn),
    description_ko: asText(parsed.descriptionKo),
    description_en: asText(parsed.descriptionEn),
    category_key: asText(parsed.categoryKey),
    icon_name: asText(parsed.iconName),
    display_order: parsed.displayOrder,
    is_active: parsed.isActive,
  };

  const query = parsed.id
    ? admin.from('customize_included_specs').update(payload).eq('id', parsed.id)
    : admin.from('customize_included_specs').insert(payload);
  const { error } = await query;

  if (error) throw error;
  revalidateCustomizePaths();
  return { success: true };
}

export async function setCustomizeEntityActive(entity: 'category' | 'option' | 'includedSpec' | 'model', id: string, isActive: boolean) {
  await requireAdmin();
  const admin = getSupabaseAdmin() as any;
  const table = {
    category: 'customize_categories',
    option: 'customize_options',
    includedSpec: 'customize_included_specs',
    model: 'customize_models',
  }[entity];
  const key = entity === 'model' ? 'id' : 'id';
  const { error } = await admin.from(table).update({ is_active: isActive }).eq(key, id);

  if (error) throw error;
  revalidateCustomizePaths();
  return { success: true };
}

export async function deleteCustomizeModel(id: string) {
  await requireAdmin();
  const parsedId = z.string().trim().min(2).max(80).parse(id);
  const admin = getSupabaseAdmin() as any;

  const { data: scopedOptions, error: scopedOptionsError } = await admin
    .from('customize_options')
    .select('id, available_model_ids')
    .contains('available_model_ids', [parsedId]);

  if (scopedOptionsError) throw scopedOptionsError;

  for (const option of scopedOptions ?? []) {
    const nextModelIds = ((option.available_model_ids ?? []) as string[]).filter((modelId) => modelId !== parsedId);
    const { error } = await admin
      .from('customize_options')
      .update({ available_model_ids: nextModelIds })
      .eq('id', option.id);
    if (error) throw error;
  }

  const { error } = await admin.from('customize_models').delete().eq('id', parsedId);
  if (error) throw error;

  revalidateCustomizePaths();
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteCustomizeCategory(id: string) {
  await requireAdmin();
  const parsedId = uuidField.parse(id);
  const admin = getSupabaseAdmin() as any;

  const { count, error: countError } = await admin
    .from('customize_options')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', parsedId);

  if (countError) throw countError;
  if ((count ?? 0) > 0) {
    throw new Error('이 카테고리에 연결된 옵션이 있습니다. 옵션을 먼저 삭제하거나 다른 카테고리로 이동해주세요.');
  }

  const { error } = await admin.from('customize_categories').delete().eq('id', parsedId);
  if (error) throw error;

  revalidateCustomizePaths();
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteCustomizeOption(id: string) {
  await requireAdmin();
  const parsedId = uuidField.parse(id);
  const admin = getSupabaseAdmin() as any;

  const { error: forwardConflictError } = await admin
    .from('customize_option_conflicts')
    .delete()
    .eq('option_id', parsedId);

  const { error: reverseConflictError } = await admin
    .from('customize_option_conflicts')
    .delete()
    .eq('conflicts_with_option_id', parsedId);

  if (forwardConflictError || reverseConflictError) {
    throw forwardConflictError || reverseConflictError;
  }

  const { error } = await admin.from('customize_options').delete().eq('id', parsedId);
  if (error) throw error;

  revalidateCustomizePaths();
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteCustomizeIncludedSpec(id: string) {
  await requireAdmin();
  const parsedId = uuidField.parse(id);
  const admin = getSupabaseAdmin() as any;

  const { error } = await admin.from('customize_included_specs').delete().eq('id', parsedId);
  if (error) throw error;

  revalidateCustomizePaths();
  revalidatePath('/admin');
  return { success: true };
}

export async function createCustomizeOptionConflict(optionId: string, conflictsWithOptionId: string, reasonKo?: string) {
  await requireAdmin();
  const parsedOptionId = uuidField.parse(optionId);
  const parsedConflictId = uuidField.parse(conflictsWithOptionId);

  if (parsedOptionId === parsedConflictId) {
    throw new Error('같은 옵션끼리는 충돌 관계를 만들 수 없습니다.');
  }

  const admin = getSupabaseAdmin() as any;
  const payload = {
    option_id: parsedOptionId,
    conflicts_with_option_id: parsedConflictId,
    reason_ko: asText(reasonKo) || '동시에 선택할 수 없는 옵션입니다.',
  };
  const reversePayload = {
    option_id: parsedConflictId,
    conflicts_with_option_id: parsedOptionId,
    reason_ko: payload.reason_ko,
  };
  const { error } = await admin.from('customize_option_conflicts').upsert([payload, reversePayload]);

  if (error) throw error;
  revalidateCustomizePaths();
  return { success: true };
}

export async function deleteCustomizeOptionConflict(optionId: string, conflictsWithOptionId: string) {
  await requireAdmin();
  const parsedOptionId = uuidField.parse(optionId);
  const parsedConflictId = uuidField.parse(conflictsWithOptionId);
  const admin = getSupabaseAdmin() as any;

  const { error: forwardError } = await admin
    .from('customize_option_conflicts')
    .delete()
    .eq('option_id', parsedOptionId)
    .eq('conflicts_with_option_id', parsedConflictId);

  const { error: reverseError } = await admin
    .from('customize_option_conflicts')
    .delete()
    .eq('option_id', parsedConflictId)
    .eq('conflicts_with_option_id', parsedOptionId);

  if (forwardError || reverseError) throw forwardError || reverseError;
  revalidateCustomizePaths();
  return { success: true };
}

export async function updateCustomizeConsultationStatus(id: string, status: ConsultationStatus) {
  await requireAdmin();
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin
    .from('customize_consultations')
    .update({ status })
    .eq('id', uuidField.parse(id));

  if (error) throw error;
  revalidatePath('/admin/consultations');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateCustomizeConsultationMemo(id: string, internalMemo: string) {
  await requireAdmin();
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin
    .from('customize_consultations')
    .update({ internal_memo: internalMemo.trim().slice(0, 2000) })
    .eq('id', uuidField.parse(id));

  if (error) throw error;
  revalidatePath('/admin/consultations');
  return { success: true };
}

export async function deleteCustomizeConsultation(id: string) {
  await requireAdmin();
  const admin = getSupabaseAdmin() as any;
  const { error } = await admin.from('customize_consultations').delete().eq('id', uuidField.parse(id));

  if (error) throw error;
  revalidatePath('/admin/consultations');
  revalidatePath('/admin');
  return { success: true };
}

function revalidateCustomizePaths() {
  revalidatePath('/customize');
  revalidatePath('/admin/customize');
  revalidateTag('customize-catalog', 'max');
}
