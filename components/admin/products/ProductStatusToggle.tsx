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
            type="button"
            onClick={handleToggle}
            disabled={loading}
            role="switch"
            aria-checked={active}
            aria-label={active ? '노출 켜짐' : '노출 꺼짐'}
            className={`relative inline-flex h-[23px] w-10 shrink-0 items-center rounded-full p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${active
                ? 'bg-admin-accent'
                : 'bg-[#e4e4e7]'
                }`}
        >
            <span
                className={`flex h-[19px] w-[19px] items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform ${active ? 'translate-x-[17px]' : 'translate-x-0'}`}
            >
                {loading && <Loader2 className="h-3 w-3 animate-spin text-admin-accent" />}
            </span>
        </button>
    );
}
