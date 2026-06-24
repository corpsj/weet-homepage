'use client';

import { useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { X, Loader2 } from 'lucide-react';
import { Product } from '@/types/supabase';
import { confirmToast } from '@/lib/ui/confirm';

const ProductForm = dynamic(() => import('@/components/admin/ProductForm'), {
    loading: () => (
        <div className="h-96 flex flex-col items-center justify-center text-admin-muted">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-admin-accent" />
            <p>Loading form...</p>
        </div>
    ),
    ssr: false // No need for SSR for a client-side modal
});

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    // ProductForm owns its own isDirty state and isn't in this file's edit set, so
    // dirtiness is tracked here by watching input/change events bubble out of the
    // form body. A successful save calls onSuccess (handleClean) which clears the
    // flag before closing, so save-close never trips the unsaved-changes guard.
    // A ref (not state) is enough — nothing renders off the dirty flag.
    const dirtyRef = useRef(false);

    // Reset the dirty flag whenever the modal (re)opens.
    useEffect(() => {
        if (isOpen) {
            dirtyRef.current = false;
        }
    }, [isOpen]);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const markDirty = useCallback(() => {
        dirtyRef.current = true;
    }, []);

    // Close without confirmation (used after a successful save).
    const handleClean = useCallback(() => {
        dirtyRef.current = false;
        onClose();
    }, [onClose]);

    // Guarded close for backdrop / X: confirm if there are unsaved edits.
    const handleRequestClose = useCallback(async () => {
        if (dirtyRef.current) {
            const ok = await confirmToast('저장하지 않은 변경 사항이 있습니다. 닫으시겠습니까?', {
                confirmLabel: '닫기',
                cancelLabel: '계속 편집',
            });
            if (!ok) return;
        }
        handleClean();
    }, [handleClean]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={handleRequestClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[12px] border border-admin-line shadow-[0_16px_48px_rgba(17,17,17,0.12)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-admin-line bg-white z-10">
                    <h2 className="text-lg font-black text-admin-ink">
                        {product ? '제품 수정' : '새 제품 등록'}
                    </h2>
                    <button
                        onClick={handleRequestClose}
                        className="p-2 text-admin-muted hover:text-admin-ink hover:bg-[#f4f4f5] rounded-[9px] transition-colors"
                        aria-label="제품 모달 닫기"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body (Scrollable) — input/change bubbling marks the form dirty */}
                <div className="flex-1 overflow-y-auto p-6 bg-white" onInput={markDirty} onChange={markDirty}>
                    <ProductForm
                        initialData={product}
                        onSuccess={handleClean}
                    />
                </div>
            </div>
        </div>
    );
}
