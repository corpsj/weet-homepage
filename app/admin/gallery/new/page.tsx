'use client';

import GalleryForm from '@/components/admin/gallery/GalleryForm';

export default function NewGalleryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">새 이미지 추가</h1>
                <p className="text-gray-500 text-sm mt-1">갤러리에 새로운 프로젝트 이미지를 등록합니다.</p>
            </div>

            <GalleryForm />
        </div>
    );
}
