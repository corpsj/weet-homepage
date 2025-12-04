'use client';

import { useState } from 'react';
import { toggleProductStatus } from '@/app/actions/product-actions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductStatusToggleProps {
    id: string;
    isActive: boolean;
}

export default function ProductStatusToggle({ id, isActive }: ProductStatusToggleProps) {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            await toggleProductStatus(id, !isActive);
        } catch (error) {
            console.error(error);
            toast.error('상태 변경에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${isActive
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
        >
            {loading ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
            ) : (
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-green-600' : 'bg-gray-500'}`} />
            )}
            {isActive ? '활성' : '비활성'}
        </button>
    );
}
