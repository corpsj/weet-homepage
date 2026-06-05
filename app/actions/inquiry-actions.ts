'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { Inquiry, InquiryUpdate } from '@/types/supabase';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';

export async function getInquiries(page = 1, limit = 20, status?: string) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    let query = admin
        .from('inquiries')
        .select('*', { count: 'exact' });

    if (status && status !== 'all') {
        query = query.eq('status', status as any);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query
        .order('created_at', { ascending: false })
        .range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching inquiries:', error);
        return { data: [], count: 0 };
    }

    return { data: data as Inquiry[], count: count || 0 };
}

export async function getInquiry(id: string) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('inquiries')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching inquiry:', error);
        return null;
    }

    return data as Inquiry;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'read' | 'replied') {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { error } = await admin
        .from('inquiries')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating inquiry status:', error);
        return { success: false, message: '상태 업데이트 실패' };
    }

    revalidatePath('/admin/inquiries');
    return { success: true };
}

export async function replyToInquiry(id: string, replyContent: string) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { error } = await admin
        .from('inquiries')
        .update({
            reply_content: replyContent,
            replied_at: new Date().toISOString(),
            status: 'replied'
        })
        .eq('id', id);

    if (error) {
        console.error('Error replying to inquiry:', error);
        return { success: false, message: '답변 등록 실패' };
    }

    // TODO: Send email notification here using a mail provider (e.g. Resend, SendGrid)

    revalidatePath('/admin/inquiries');
    revalidatePath(`/admin/inquiries/${id}`);
    return { success: true, message: '답변이 등록되었습니다.' };
}

export async function deleteInquiry(id: string) {
    await requireAdmin();

    const admin = getSupabaseAdmin();
    const { error } = await admin
        .from('inquiries')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting inquiry:', error);
        return { success: false, message: '문의 삭제 실패' };
    }

    revalidatePath('/admin/inquiries');
    return { success: true };
}
