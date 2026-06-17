'use server';

import { z } from 'zod';
import { getSupabaseAdmin, supabase } from '@/lib/supabase';
import { TablesInsert, TablesUpdate } from '@/types/supabase';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';

export interface Notice {
    id: string;
    title: string;
    content: string;
    is_pinned: boolean;
    is_active: boolean;
    created_at: string;
}

// Explicit allow-list of admin-editable notice columns. id/created_at/updated_at
// and the system-managed view_count are never read from client input.
const noticeCreateSchema = z.object({
    title: z.string().trim().min(1).max(300),
    content: z.string().max(20000),
    is_pinned: z.boolean().optional(),
    is_active: z.boolean().optional(),
});

const noticeUpdateSchema = noticeCreateSchema.partial();

export type NoticeCreateInput = z.input<typeof noticeCreateSchema>;
export type NoticeUpdateInput = z.input<typeof noticeUpdateSchema>;

export async function getNotices() {
    const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching notices:', error);
        return [];
    }

    return data as Notice[];
}

export async function createNotice(notice: NoticeCreateInput) {
    await requireAdmin();

    const parsed = noticeCreateSchema.parse(notice);
    const payload: TablesInsert<'notices'> = {
        title: parsed.title,
        content: parsed.content,
    };
    if (parsed.is_pinned !== undefined) payload.is_pinned = parsed.is_pinned;
    if (parsed.is_active !== undefined) payload.is_active = parsed.is_active;

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('notices')
        .insert(payload)
        .select()
        .single();

    if (error) {
        console.error('Error creating notice:', error);
        return { success: false, message: '공지사항 생성에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/support');
    return { success: true, message: '공지사항이 생성되었습니다.', data };
}

export async function updateNotice(id: string, notice: NoticeUpdateInput) {
    await requireAdmin();

    const parsed = noticeUpdateSchema.parse(notice);
    // Only assign provided keys; id/created_at/updated_at/view_count are never
    // accepted from the client.
    const payload: TablesUpdate<'notices'> = {};
    if (parsed.title !== undefined) payload.title = parsed.title;
    if (parsed.content !== undefined) payload.content = parsed.content;
    if (parsed.is_pinned !== undefined) payload.is_pinned = parsed.is_pinned;
    if (parsed.is_active !== undefined) payload.is_active = parsed.is_active;

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('notices')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating notice:', error);
        return { success: false, message: '공지사항 수정에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/support');
    return { success: true, message: '공지사항이 수정되었습니다.', data };
}

export async function deleteNotice(id: string) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { error } = await admin
        .from('notices')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting notice:', error);
        return { success: false, message: '공지사항 삭제에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/support');
    return { success: true, message: '공지사항이 삭제되었습니다.' };
}
