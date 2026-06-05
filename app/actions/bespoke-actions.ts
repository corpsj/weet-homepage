'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  BespokeOption,
  BespokeOptionGroup,
  BespokeOptionGroupWithOptions,
} from '@/types/supabase';

const nullableText = z
  .string()
  .trim()
  .transform((value) => (value.length ? value : null))
  .nullable()
  .optional();

const groupSchema = z.object({
  id: z.string().uuid().optional(),
  key: z
    .string()
    .trim()
    .min(2, '관리 키는 2자 이상이어야 합니다.')
    .max(64, '관리 키는 64자 이하로 입력해주세요.')
    .regex(/^[a-z0-9_]+$/, '관리 키는 영문 소문자, 숫자, 밑줄만 사용할 수 있습니다.'),
  title: z.string().trim().min(1, '그룹명을 입력해주세요.').max(80),
  description: nullableText,
  selection_type: z.enum(['single', 'multiple']),
  required: z.boolean().default(true),
  display_order: z.coerce.number().int().min(0).max(9999).default(0),
  is_active: z.boolean().default(true),
});

const optionSchema = z.object({
  id: z.string().uuid().optional(),
  group_id: z.string().uuid(),
  label: z.string().trim().min(1, '옵션명을 입력해주세요.').max(100),
  description: nullableText,
  price_delta: z.coerce.number().int().min(-999999999).max(999999999).default(0),
  lead_time_note: nullableText,
  badge: nullableText,
  display_order: z.coerce.number().int().min(0).max(9999).default(0),
  is_active: z.boolean().default(true),
});

function revalidateBespoke() {
  revalidatePath('/bespoke');
  revalidatePath('/admin/bespoke');
}

function combineGroupsAndOptions(groups: BespokeOptionGroup[], options: BespokeOption[]) {
  return groups.map((group) => ({
    ...group,
    options: options.filter((option) => option.group_id === group.id),
  }));
}

export async function getBespokeOptionGroupsForAdmin(): Promise<BespokeOptionGroupWithOptions[]> {
  await requireAdmin();
  const admin = getSupabaseAdmin();

  const { data: groups, error: groupsError } = await admin
    .from('bespoke_option_groups')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (groupsError) {
    console.error('Error fetching bespoke option groups:', groupsError);
    throw new Error('주문제작 옵션 그룹을 불러오지 못했습니다.');
  }

  const { data: options, error: optionsError } = await admin
    .from('bespoke_options')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (optionsError) {
    console.error('Error fetching bespoke options:', optionsError);
    throw new Error('주문제작 옵션을 불러오지 못했습니다.');
  }

  return combineGroupsAndOptions((groups || []) as BespokeOptionGroup[], (options || []) as BespokeOption[]);
}

export async function saveBespokeOptionGroup(input: unknown) {
  await requireAdmin();
  const data = groupSchema.parse(input);
  const admin = getSupabaseAdmin();
  const { id, ...payload } = data;

  const query = id
    ? admin.from('bespoke_option_groups').update(payload).eq('id', id).select().single()
    : admin.from('bespoke_option_groups').insert(payload).select().single();

  const { data: saved, error } = await query;

  if (error) {
    console.error('Error saving bespoke option group:', error);
    return { success: false, message: error.message };
  }

  revalidateBespoke();
  return { success: true, data: saved as BespokeOptionGroup };
}

export async function deleteBespokeOptionGroup(id: string) {
  await requireAdmin();
  const parsedId = z.string().uuid().parse(id);
  const admin = getSupabaseAdmin();

  const { error } = await admin.from('bespoke_option_groups').delete().eq('id', parsedId);

  if (error) {
    console.error('Error deleting bespoke option group:', error);
    return { success: false, message: error.message };
  }

  revalidateBespoke();
  return { success: true };
}

export async function saveBespokeOption(input: unknown) {
  await requireAdmin();
  const data = optionSchema.parse(input);
  const admin = getSupabaseAdmin();
  const { id, ...payload } = data;

  const query = id
    ? admin.from('bespoke_options').update(payload).eq('id', id).select().single()
    : admin.from('bespoke_options').insert(payload).select().single();

  const { data: saved, error } = await query;

  if (error) {
    console.error('Error saving bespoke option:', error);
    return { success: false, message: error.message };
  }

  revalidateBespoke();
  return { success: true, data: saved as BespokeOption };
}

export async function deleteBespokeOption(id: string) {
  await requireAdmin();
  const parsedId = z.string().uuid().parse(id);
  const admin = getSupabaseAdmin();

  const { error } = await admin.from('bespoke_options').delete().eq('id', parsedId);

  if (error) {
    console.error('Error deleting bespoke option:', error);
    return { success: false, message: error.message };
  }

  revalidateBespoke();
  return { success: true };
}
