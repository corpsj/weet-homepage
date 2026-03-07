'use client';

import { useActionState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitInquiry } from '@/app/actions/submit-inquiry';
import { successMessages, errorMessages } from '@/lib/witty-copy';
import { toast } from 'sonner';

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

const initialState = { success: false, message: '' };

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(successMessages.inquiry);
      formRef.current?.reset();
      setTimeout(onClose, 1500);
    } else if (state.message && !state.success) {
      toast.error(state.message || errorMessages.submitFailed);
    }
  }, [state, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-md bg-background rounded-2xl shadow-xl p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>

            <h2
              id="consultation-title"
              className="text-xl font-semibold text-foreground mb-2"
            >
              상담 신청
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              궁금한 점을 남겨주시면 빠르게 연락드릴게요
            </p>

            <form ref={formRef} action={formAction} className="space-y-4">
              <input type="hidden" name="category" value="Consultation" />

              <div>
                <label htmlFor="modal-name" className="text-sm font-medium text-foreground mb-1.5 block">
                  이름 <span className="text-destructive">*</span>
                </label>
                <Input
                  id="modal-name"
                  name="name"
                  placeholder="홍길동"
                  required
                  autoComplete="name"
                  className="h-11"
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="text-sm font-medium text-foreground mb-1.5 block">
                  연락처 <span className="text-destructive">*</span>
                </label>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  required
                  autoComplete="tel"
                  className="h-11"
                />
              </div>

              <div>
                <label htmlFor="modal-email" className="text-sm font-medium text-foreground mb-1.5 block">
                  이메일
                </label>
                <Input
                  id="modal-email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  className="h-11"
                />
              </div>

              <div>
                <label htmlFor="modal-message" className="text-sm font-medium text-foreground mb-1.5 block">
                  문의 내용 <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="modal-message"
                  name="message"
                  placeholder="궁금한 점이나 요청사항을 자유롭게 적어주세요"
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-xl text-base"
              >
                {isPending ? '전송 중...' : '상담 신청하기'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
