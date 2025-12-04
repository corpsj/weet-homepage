'use client';

import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/app/actions/product-actions';

interface DeleteProductButtonProps {
    productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const handleDelete = async () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            await deleteProduct(productId);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
