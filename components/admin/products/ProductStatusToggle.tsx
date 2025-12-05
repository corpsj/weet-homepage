'use client';

import { useState, useEffect } from 'react';
import { toggleProductStatus } from '@/app/actions/product-actions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductStatusToggleProps {
    id: string;
    isActive: boolean;
}

export default function ProductStatusToggle({ id, isActive: initialActive }: ProductStatusToggleProps) {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(initialActive);

    // Sync with prop changes
    useEffect(() => {
        setActive(initialActive);
    }, [initialActive]);

    const handleToggle = async () => {
        const newActive = !active;

        // Optimistic update
        setActive(newActive);
        setLoading(true);

        try {
            await toggleProductStatus(id, newActive);
            toast.success(newActive ? '제품이 활성화되었습니다' : '제품이 비활성화되었습니다');
        } catch (error) {
            // Rollback on error
            setActive(!newActive);
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
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${active
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
        >
            {loading ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
            ) : (
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${active ? 'bg-green-600' : 'bg-gray-500'}`} />
            )}
            {active ? '활성' : '비활성'}
        </button>
    );
}
