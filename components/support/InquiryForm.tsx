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

export default function InquiryForm({ category = 'General Inquiry' }: { category?: string }) {
    // @ts-ignore - useActionState is available in React 19 / Next 15 but types might lag
    const [state, formAction] = (typeof window !== 'undefined' && (window as any).React?.useActionState)
        ? (window as any).React.useActionState(submitInquiry, initialState)
        : [initialState, null];

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        try {
            // Append category if not present (though hidden input handles it)
            if (!formData.get('category')) {
                formData.append('category', category);
            }

            const result = await submitInquiry(null, formData);
            if (result.success) {
                setIsSuccess(true);
                setMessage(result.message);
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
            <div className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">문의가 접수되었습니다</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    빠른 시일 내에 답변 드리겠습니다.<br />
                    위트와 함께해주셔서 감사합니다.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:opacity-70 transition-opacity"
                >
                    다른 문의하기
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <form action={handleSubmit} className="space-y-5">
                <input type="hidden" name="category" value={category} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">이름 <span className="text-red-500">*</span></label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full bg-gray-50 border-0 p-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all outline-none"
                            placeholder="이름을 입력해주세요"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">연락처 <span className="text-red-500">*</span></label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            className="w-full bg-gray-50 border-0 p-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all outline-none"
                            placeholder="010-0000-0000"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">이메일</label>
                    <input
                        name="email"
                        type="email"
                        className="w-full bg-gray-50 border-0 p-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all outline-none"
                        placeholder="example@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">문의내용 <span className="text-red-500">*</span></label>
                    <textarea
                        name="message"
                        required
                        className="w-full bg-gray-50 border-0 p-4 rounded-xl h-40 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black/10 focus:bg-white transition-all outline-none resize-none"
                        placeholder="문의하실 내용을 자유롭게 적어주세요."
                    ></textarea>
                </div>

                {message && !isSuccess && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-[0.99] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {isPending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>문의하기</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
