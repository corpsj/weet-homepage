'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Pencil, Plus, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { deleteGalleryItem } from '@/app/actions/gallery-actions';
import { GalleryItem } from '@/types/supabase';
import { formatKstDate } from '@/lib/date-format';
import {
  ConsolePageHeader,
  ConsolePanel,
  ConsoleStatusPill,
  consolePrimaryButtonClass,
  consoleIconButtonClass
} from '@/components/admin/ConsolePrimitives';

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
      <ConsolePageHeader
        eyebrow="CONTENTS"
        title="갤러리 관리"
        description="프로젝트 사진을 관리합니다."
        actions={
          <Link
            href="/admin/gallery/new"
            className={`${consolePrimaryButtonClass} flex-shrink-0`}
          >
            <Plus className="w-4 h-4" />
            새 이미지 추가
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <ConsolePanel key={item.id} className="group relative overflow-hidden p-0 border-[#e5e5df] transition-colors hover:border-gray-400">
            <div className="aspect-[4/3] relative bg-[#f4f4f1] border-b border-[#e5e5df]">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Link
                  href={`/admin/gallery/${item.id}`}
                  className="p-2 bg-white rounded shadow text-gray-700 hover:text-black transition-colors"
                  aria-label={`${item.title} 수정`}
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id || isPending}
                  className="p-2 bg-white rounded shadow text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  aria-label={`${item.title} 삭제`}
                >
                  {deleting === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-gray-900 truncate">{item.title}</h3>
              {item.description && (
                <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
              )}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400">
                  {formatKstDate(item.created_at)}
                </span>
                <ConsoleStatusPill tone={item.is_active ? 'success' : 'neutral'}>
                  {item.is_active ? '공개' : '비공개'}
                </ConsoleStatusPill>
              </div>
            </div>
          </ConsolePanel>
        ))}
      </div>

      {items.length === 0 && (
        <ConsolePanel className="p-12 flex flex-col items-center justify-center text-gray-400 border-dashed">
          <ImageIcon className="w-8 h-8 mb-3 opacity-20" />
          <p className="text-sm font-bold text-gray-500">등록된 이미지가 없습니다.</p>
        </ConsolePanel>
      )}
    </div>
  );
}
