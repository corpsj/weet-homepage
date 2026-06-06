'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteGalleryItem } from '@/app/actions/gallery-actions';
import { GalleryItem } from '@/types/supabase';

export default function GalleryList({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    setDeleting(id);
    startTransition(async () => {
      const result = await deleteGalleryItem(id);
      if (!result.success) {
        toast.error(result.message || '삭제 중 오류가 발생했습니다.');
        setDeleting(null);
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('삭제되었습니다.');
      setDeleting(null);
    });
  };

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
        {items.map((item, index) => (
          <div key={item.id} className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] relative bg-gray-100">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, 25vw"
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
                  disabled={deleting === item.id || isPending}
                  className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors shadow-lg disabled:opacity-50"
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
