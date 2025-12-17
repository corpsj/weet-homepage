'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { X, Loader2 } from 'lucide-react';
import { Product } from '@/types/supabase';

const ProductForm = dynamic(() => import('@/components/admin/ProductForm'), {
    loading: () => (
        <div className="h-96 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
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
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                        {product ? '제품 수정' : '새 제품 등록'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <ProductForm
                        initialData={product}
                        onSuccess={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
