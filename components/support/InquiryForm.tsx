'use client';

import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { submitInquiry } from '@/app/actions/submit-inquiry';

const initialState = {
    success: false,
    message: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-black text-white py-4 rounded font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {pending ? '전송 중...' : '문의하기'}
        </button>
    );
}

export default function InquiryForm() {
    // @ts-ignore - useActionState is available in React 19 / Next 15 but types might lag
    const [state, formAction] = (typeof window !== 'undefined' && (window as any).React?.useActionState)
        ? (window as any).React.useActionState(submitInquiry, initialState)
        : [initialState, null]; // Fallback if not available, but we'll use a standard form action wrapper for safety if needed.

    // Actually, let's stick to a simpler pattern compatible with current Next.js stable if unsure about React 19 types
    // But since this is a new project, let's try the standard useFormState from react-dom if available, or just standard form action.

    // Let's use a standard wrapper for now to avoid type issues with bleeding edge React
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        try {
            const result = await submitInquiry(null, formData);
            if (result.success) {
                setIsSuccess(true);
                setMessage(result.message);
                // Reset form? We can't easily reset FormData here without a ref, 
                // but we can show a success message replacing the form or above it.
            } else {
                setIsSuccess(false);
                setMessage(result.message);
            }
        } catch (e) {
            setMessage('오류가 발생했습니다.');
        } finally {
            setIsPending(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center py-20">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">문의가 접수되었습니다</h3>
                <p className="text-gray-600 mb-6">
                    빠른 시일 내에 답변 드리겠습니다.<br />
                    감사합니다.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    다른 문의하기
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2">이름 <span className="text-red-500">*</span></label>
                    <input
                        name="name"
                        type="text"
                        required
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary"
                        placeholder="홍길동"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">연락처 <span className="text-red-500">*</span></label>
                    <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary"
                        placeholder="010-0000-0000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">이메일</label>
                    <input
                        name="email"
                        type="email"
                        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary"
                        placeholder="example@email.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">문의내용 <span className="text-red-500">*</span></label>
                    <textarea
                        name="message"
                        required
                        className="w-full border border-gray-300 p-3 rounded h-32 focus:outline-none focus:border-primary resize-none"
                        placeholder="문의하실 내용을 입력해주세요."
                    ></textarea>
                </div>

                {message && !isSuccess && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white py-4 rounded font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isPending ? '전송 중...' : '문의하기'}
                </button>
            </form>
        </div>
    );
}
