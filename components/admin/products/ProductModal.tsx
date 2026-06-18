'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { X, Loader2 } from 'lucide-react';
import { Product } from '@/types/supabase';

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[12px] border border-admin-line shadow-[0_16px_48px_rgba(17,17,17,0.12)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-admin-line bg-white z-10">
                    <h2 className="text-lg font-black text-admin-ink">
                        {product ? '제품 수정' : '새 제품 등록'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-admin-muted hover:text-admin-ink hover:bg-[#f4f4f5] rounded-[9px] transition-colors"
                        aria-label="제품 모달 닫기"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    <ProductForm
                        initialData={product}
                        onSuccess={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
