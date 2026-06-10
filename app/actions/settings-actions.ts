'use server';

import { getSupabaseAdmin, supabase } from '@/lib/supabase';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';
import { SITE_SETTING_LABELS, type SiteSettings } from '@/lib/site-settings';

export async function getSiteSettingRows() {
  const { data, error } = await (supabase as any)
    .from('site_settings')
    .select('key, value, label')
    .order('key');

  if (error) {
    console.error('Error fetching site setting rows:', error);
    return [];
  }

  return data as { key: string; value: string; label: string }[];
}

export async function updateSiteSettings(entries: Partial<SiteSettings>) {
  await requireAdmin();

  const admin = getSupabaseAdmin();
  const validKeys = Object.keys(SITE_SETTING_LABELS);

  for (const [key, value] of Object.entries(entries)) {
    if (!validKeys.includes(key)) continue;

    const { error } = await (admin as any)
      .from('site_settings')
      .upsert(
        {
          key,
          value: (value ?? '').trim(),
          label: SITE_SETTING_LABELS[key as keyof SiteSettings],
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      );

    if (error) {
      console.error('Error updating site setting:', key, error);
      return { success: false, message: `'${key}' 저장에 실패했습니다.` };
    }
  }

  revalidateTag('site-settings', 'max');
  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  return { success: true, message: '사이트 정보가 저장되었습니다.' };
}
