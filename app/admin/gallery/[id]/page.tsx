'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import { Loader2 } from 'lucide-react';

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

export default function EditGalleryPage() {
    const params = useParams();
    const [item, setItem] = useState<GalleryItem | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const itemId = (() => {
        const raw = params?.id;
        if (typeof raw === 'string') return raw;
        if (Array.isArray(raw)) return raw[0];
        return undefined;
    })();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .eq('id', itemId)
                    .single();

                if (error) throw error;
                setItem(data);
            } catch (error) {
                console.error('Error fetching gallery item:', error);
            } finally {
                setLoading(false);
            }
        };

        if (itemId) {
            fetchItem();
        } else {
            setLoading(false);
        }
    }, [itemId, supabase]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!item) {
        return <div>이 아이템을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">이미지 수정</h1>
                <p className="text-gray-500 text-sm mt-1">프로젝트 이미지를 수정합니다.</p>
            </div>

            <GalleryForm initialData={item} />
        </div>
    );
}
