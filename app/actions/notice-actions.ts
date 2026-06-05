'use server';

import { getSupabaseAdmin, supabase } from '@/lib/supabase';
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

export async function createNotice(notice: { title: string; content: string; is_pinned?: boolean; is_active?: boolean }) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('notices')
        .insert(notice as any)
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

export async function updateNotice(id: string, notice: any) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('notices')
        .update(notice)
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
