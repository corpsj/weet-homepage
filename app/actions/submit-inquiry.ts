'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const inquirySchema = z.object({
    name: z.string().trim().min(1, '이름을 입력해주세요.').max(80, '이름은 80자 이하로 입력해주세요.'),
    phone: z
        .string()
        .trim()
        .min(7, '연락처를 입력해주세요.')
        .max(30, '연락처는 30자 이하로 입력해주세요.')
        .regex(/^[0-9+\-\s().]+$/, '연락처 형식이 올바르지 않습니다.'),
    email: z
        .string()
        .trim()
        .max(120, '이메일은 120자 이하로 입력해주세요.')
        .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), '이메일 형식이 올바르지 않습니다.')
        .optional()
        .transform((value) => value || ''),
    message: z.string().trim().min(1, '문의 내용을 입력해주세요.').max(4000, '문의 내용은 4000자 이하로 입력해주세요.'),
    category: z
        .string()
        .trim()
        .max(80, '문의 분류는 80자 이하로 입력해주세요.')
        .optional()
        .transform((value) => value || 'General'),
});

export async function submitInquiry(prevState: any, formData: FormData) {
    const supabase = await createClient();

    if (formData.get('website')) {
        return { success: true, message: '문의가 성공적으로 등록되었습니다.' };
    }

    const parsed = inquirySchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message'),
        category: formData.get('category'),
    });

    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message || '필수 항목을 확인해주세요.' };
    }

    const { name, phone, email, message, category } = parsed.data;

    const { error } = await (supabase as any)
        .from('inquiries')
        .insert({
            name,
            email: email || '',
            phone,
            message,
            category: category || 'General',
            status: 'new'
        });

    if (error) {
        console.error('Error submitting inquiry:', error);
        return { success: false, message: '문의 등록 중 오류가 발생했습니다.' };
    }

    revalidatePath('/admin/inquiries');
    return { success: true, message: '문의가 성공적으로 등록되었습니다.' };
}
