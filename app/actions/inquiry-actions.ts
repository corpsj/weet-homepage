'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getInquiries() {
    const supabase = await createClient();
    // eslint-disable-next-line
    const { data, error } = await (supabase as any)
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching inquiries:', error);
        return [];
    }

    return data;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'read' | 'replied') {
    const supabase = await createClient();
    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('inquiries')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating inquiry status:', error);
        throw new Error('Failed to update status');
    }

    revalidatePath('/admin/inquiries');
}

export async function deleteInquiry(id: string) {
    const supabase = await createClient();
    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('inquiries')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting inquiry:', error);
        throw new Error('Failed to delete inquiry');
    }

    revalidatePath('/admin/inquiries');
}

export async function updateInquiryAnswer(id: string, answer: string) {
    const supabase = await createClient();
    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('inquiries')
        .update({
            answer,
            status: 'replied',
            replied_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating inquiry answer:', error);
        throw new Error('Failed to save answer');
    }

    revalidatePath('/admin/inquiries');
}

export async function createInquiry(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        throw new Error('필수 항목을 입력해주세요.');
    }

    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('inquiries')
        .insert({
            name,
            email,
            phone,
            message,
            status: 'new'
        });

    if (error) {
        console.error('Error creating inquiry:', error);
        throw new Error('문의 등록 중 오류가 발생했습니다.');
    }

    return { success: true };
}
