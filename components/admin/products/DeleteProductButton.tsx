'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteProduct } from '@/app/actions/product-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { confirmToast } from '@/lib/ui/confirm';

interface DeleteProductButtonProps {
    productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!(await confirmToast('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.', { confirmLabel: '삭제' }))) {
            return;
        }

        setLoading(true);
        try {
            await deleteProduct(productId);
            toast.success('제품이 삭제되었습니다');
            router.refresh();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('삭제에 실패했습니다');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            aria-label="제품 삭제"
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </button>
    );
}
