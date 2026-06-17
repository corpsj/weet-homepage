'use server';

import { z } from 'zod';
import { getSupabaseAdmin, supabase } from '@/lib/supabase';
import { Faq, FaqInsert, FaqUpdate } from '@/types/supabase';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';

const optionalText = z
    .string()
    .max(10000)
    .nullish()
    .transform((value) => value ?? null);

const optionalInt = z.coerce.number().int().nullish().transform((value) => value ?? null);

// Explicit allow-list of admin-editable FAQ columns. id/created_at/updated_at
// are never read from client input.
const faqSchema = z.object({
    question_ko: optionalText,
    answer_ko: optionalText,
    question_en: optionalText,
    answer_en: optionalText,
    question: optionalText,
    answer: optionalText,
    category: z.string().max(120).nullish().transform((value) => value ?? null),
    order_index: optionalInt,
    sort_order: optionalInt,
    is_active: z.boolean().nullish().transform((value) => value ?? null),
});

const faqUpdateSchema = faqSchema.partial();

function buildFaqPayload(parsed: Partial<z.infer<typeof faqSchema>>): FaqUpdate {
    const payload: FaqUpdate = {};
    if (parsed.question_ko !== undefined) payload.question_ko = parsed.question_ko;
    if (parsed.answer_ko !== undefined) payload.answer_ko = parsed.answer_ko;
    if (parsed.question_en !== undefined) payload.question_en = parsed.question_en;
    if (parsed.answer_en !== undefined) payload.answer_en = parsed.answer_en;
    if (parsed.question !== undefined) payload.question = parsed.question;
    if (parsed.answer !== undefined) payload.answer = parsed.answer;
    if (parsed.category !== undefined) payload.category = parsed.category;
    if (parsed.order_index !== undefined) payload.order_index = parsed.order_index;
    if (parsed.sort_order !== undefined) payload.sort_order = parsed.sort_order;
    if (parsed.is_active !== undefined) payload.is_active = parsed.is_active;
    return payload;
}

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

export async function getFaq(id: string) {
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
    await requireAdmin();

    const parsed = faqSchema.parse(faq);
    const payload = buildFaqPayload(parsed) as FaqInsert;

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('faqs')
        .insert(payload)
        .select()
        .single();

    if (error) {
        console.error('Error creating FAQ:', error);
        return { success: false, message: 'FAQ 생성에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/support');
    return { success: true, message: 'FAQ가 생성되었습니다.', data };
}

export async function updateFaq(id: string, faq: FaqUpdate) {
    await requireAdmin();

    // id/created_at/updated_at are intentionally not accepted from the client.
    const parsed = faqUpdateSchema.parse(faq);
    const payload = buildFaqPayload(parsed);

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
        .from('faqs')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating FAQ:', error);
        return { success: false, message: 'FAQ 수정에 실패했습니다.' };
    }

    revalidatePath('/support');
    revalidatePath('/admin/support');
    return { success: true, message: 'FAQ가 수정되었습니다.', data };
}

export async function deleteFaq(id: string) {
    await requireAdmin();

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
    revalidatePath('/admin/support');
    return { success: true, message: 'FAQ가 삭제되었습니다.' };
}

export async function updateFaqOrder(items: { id: string; order_index: number }[]) {
    await requireAdmin();

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
    revalidatePath('/admin/support');
    return { success: true };
}
