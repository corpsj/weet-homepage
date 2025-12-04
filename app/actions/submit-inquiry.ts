'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitInquiry(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    // Email is optional in the UI mock, but schema might require it. 
    // Based on previous files, email seems required. I'll check the UI again.
    // The UI in support/page.tsx didn't have an email field in the mock form, 
    // but the schema and InquiryList interface show 'email'.
    // I will add email to the form and here.
    const email = formData.get('email') as string;

    if (!name || !phone || !message) {
        return { success: false, message: '필수 항목을 입력해주세요.' };
    }

    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('inquiries')
        .insert({
            name,
            email: email || '', // Handle optional email if allowed, or enforce it
            phone,
            message,
            status: 'new'
        });

    if (error) {
        console.error('Error submitting inquiry:', error);
        return { success: false, message: '문의 등록 중 오류가 발생했습니다.' };
    }

    revalidatePath('/admin/inquiries');
    return { success: true, message: '문의가 성공적으로 등록되었습니다.' };
}
