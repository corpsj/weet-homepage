'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Pencil } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/types/supabase';

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('display_order', { ascending: true })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Error fetching gallery items:', error);
            toast.error('갤러리 목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        setDeleting(id);
        try {
            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setItems(prev => prev.filter(item => item.id !== id));
            toast.success('삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('삭제 중 오류가 발생했습니다.');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">갤러리 관리</h1>
                    <p className="text-gray-500 text-sm mt-1">프로젝트 사진을 관리합니다.</p>
                </div>
                <Link
                    href="/admin/gallery/new"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    새 이미지 추가
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] relative bg-gray-100">
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <Link
                                    href={`/admin/gallery/${item.id}`}
                                    className="p-2 bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    <Pencil className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    disabled={deleting === item.id}
                                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors shadow-lg"
                                >
                                    {deleting === item.id ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                            {item.description && (
                                <p className="text-sm text-gray-500 truncate mt-1">{item.description}</p>
                            )}
                            <div className="mt-2 text-xs text-gray-400 flex justify-between">
                                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                <span className={item.is_active ? 'text-green-600' : 'text-gray-400'}>
                                    {item.is_active ? '공개' : '비공개'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                    <p className="text-gray-500">등록된 이미지가 없습니다.</p>
                </div>
            )}
        </div>
    );
}
