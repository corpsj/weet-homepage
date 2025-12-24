'use server';

import { getSupabaseAdmin, supabase } from '@/lib/supabase';
import { Faq, FaqInsert, FaqUpdate } from '@/types/supabase';
import { revalidatePath } from 'next/cache';

export async function getFaqs() {
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching FAQs:', error);
        return [];
    }

    return data as Faq[];
}

export async function getFaq(id: number) {
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching FAQ:', error);
        return null;
    }

    return data as Faq;
}

export async function createFaq(faq: FaqInsert) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('faqs')
        .insert(faq)
        .select()
        .single();

    if (error) {
        console.error('Error creating FAQ:', error);
        return { success: false, message: 'FAQ 생성에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/faqs');
    return { success: true, message: 'FAQ가 생성되었습니다.', data };
}

export async function updateFaq(id: number, faq: FaqUpdate) {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('faqs')
        .update(faq)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating FAQ:', error);
        return { success: false, message: 'FAQ 수정에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/faqs');
    return { success: true, message: 'FAQ가 수정되었습니다.', data };
}

export async function deleteFaq(id: number) {
    const admin = getSupabaseAdmin();
    const { error } = await admin
        .from('faqs')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting FAQ:', error);
        return { success: false, message: 'FAQ 삭제에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/faqs');
    return { success: true, message: 'FAQ가 삭제되었습니다.' };
}

export async function updateFaqOrder(items: { id: number; order_index: number }[]) {
    const admin = getSupabaseAdmin();

    // This might be better as a loop or a stored procedure for bulk updates
    // For simplicity, we'll loop sequentially as traffic is likely low
    for (const item of items) {
        await admin
            .from('faqs')
            .update({ order_index: item.order_index })
            .eq('id', item.id);
    }

    revalidatePath('/support');
    revalidatePath('/admin/faqs');
    return { success: true };
}
