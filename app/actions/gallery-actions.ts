'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GalleryItem, GalleryInsert, GalleryUpdate } from '@/types/supabase';

const gallerySchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1, '제목을 입력해주세요.').max(120),
  description: z
    .string()
    .trim()
    .max(1000, '설명은 1000자 이하로 입력해주세요.')
    .optional()
    .transform((value) => value || null),
  image_url: z.string().trim().url('대표 이미지 URL이 올바르지 않습니다.'),
  sub_images: z.array(z.string().trim().url()).max(30).default([]),
  display_order: z.coerce.number().int().min(0).max(9999).default(0),
  is_active: z.boolean().default(true),
});

function revalidateGallery() {
  revalidatePath('/admin/gallery');
  revalidatePath('/company');
}

export async function getGalleryItemsForAdmin(): Promise<GalleryItem[]> {
  await requireAdmin();
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('gallery')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery items:', error);
    throw new Error('갤러리 목록을 불러오지 못했습니다.');
  }

  return (data || []) as GalleryItem[];
}

export async function getGalleryItemForAdmin(id: string): Promise<GalleryItem | null> {
  await requireAdmin();
  const parsedId = z.string().uuid().parse(id);
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('gallery')
    .select('*')
    .eq('id', parsedId)
    .single();

  if (error) {
    console.error('Error fetching gallery item:', error);
    return null;
  }

  return data as GalleryItem;
}

export async function saveGalleryItem(input: unknown) {
  await requireAdmin();
  const data = gallerySchema.parse(input);
  const admin = getSupabaseAdmin();
  const { id, ...payload } = data;

  const query = id
    ? admin.from('gallery').update(payload as GalleryUpdate).eq('id', id).select().single()
    : admin.from('gallery').insert(payload as GalleryInsert).select().single();

  const { data: saved, error } = await query;

  if (error) {
    console.error('Error saving gallery item:', error);
    return { success: false, message: error.message };
  }

  revalidateGallery();
  return { success: true, data: saved as GalleryItem };
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();
  const parsedId = z.string().uuid().parse(id);
  const admin = getSupabaseAdmin();

  const { error } = await admin.from('gallery').delete().eq('id', parsedId);

  if (error) {
    console.error('Error deleting gallery item:', error);
    return { success: false, message: error.message };
  }

  revalidateGallery();
  return { success: true };
}
