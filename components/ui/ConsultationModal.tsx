'use client';

import { useEffect, useRef, useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormState = {
  success: boolean;
  error: string | null;
  message: string | null;
};

const initialState: FormState = {
  success: false,
  error: null,
  message: null,
};

async function submitConsultation(_prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const productInterest = formData.get('productInterest') as string;
  const message = formData.get('message') as string;

  if (!name || !phone || !message) {
    return { success: false, error: '필수 항목을 모두 입력해주세요', message: null };
  }

  try {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase.from('inquiries').insert({
      name,
      phone,
      email: email || '',
      category: productInterest || '일반 상담',
      message,
      status: 'new' as const,
    });
    if (error) throw error;
    return {
      success: true,
      error: null,
      message: '상담 신청이 완료되었어요! 빠른 시일 내에 연락드릴게요 :)',
    };
  } catch {
    return {
      success: false,
      error: '이런, 뭔가 잘못됐어요. 다시 한 번 시도해주세요.',
      message: null,
    };
  }
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const productOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'S (3X6)', label: 'S (3X6 집)' },
  { value: 'M (3X9)', label: 'M (3X9 집)' },
  { value: 'L (18평)', label: 'L (18평 단독주택)' },
  { value: 'XL (30평)', label: 'XL (30평 단독주택)' },
  { value: '기타', label: '기타' },
];

const inputStyles = cn(
  'w-full px-4 py-3 border border-gray-200 rounded-xl',
  'focus:border-[#FEBD16] focus:ring-1 focus:ring-[#FEBD16] outline-none',
  'transition-colors duration-200 text-gray-900 placeholder:text-gray-400'
);

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [state, formAction, isPending] = useActionState(submitConsultation, initialState);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">상담 신청</h2>
              <p className="text-gray-500 mb-6">궁금한 점을 남겨주시면, 빠르게 연락드릴게요 :)</p>

              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-900">{state.message}</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors min-h-[44px]"
                  >
                    닫기
                  </button>
                </motion.div>
              ) : (
                <form action={formAction} className="space-y-4">
                  {state.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                      {state.error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="홍길동"
                      className={inputStyles}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      className={inputStyles}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className={inputStyles}
                    />
                  </div>

                  <div>
                    <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-1">
                      관심 제품
                    </label>
                    <select
                      id="productInterest"
                      name="productInterest"
                      className={inputStyles}
                    >
                      {productOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="궁금한 점을 자유롭게 적어주세요"
                      className={cn(inputStyles, 'min-h-[120px] resize-none')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                      'w-full py-3 rounded-full font-semibold min-h-[44px] transition-colors',
                      'bg-[#FEBD16] text-black hover:bg-[#E5A410]',
                      'disabled:opacity-60 disabled:cursor-not-allowed',
                      'flex items-center justify-center gap-2'
                    )}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        보내는 중...
                      </>
                    ) : (
                      '상담 신청하기'
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-400 mb-1">또는 전화로 문의하기</p>
                    <a
                      href="tel:010-9645-2348"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors min-h-[44px]"
                    >
                      <Phone className="w-4 h-4" />
                      010-9645-2348
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
