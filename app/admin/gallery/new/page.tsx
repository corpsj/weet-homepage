'use client';

import GalleryForm from '@/components/admin/gallery/GalleryForm';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

export default function NewGalleryPage() {
    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="CONTENTS"
                title="새 이미지 추가"
                description="갤러리에 새로운 프로젝트 이미지를 등록합니다."
            />

            <GalleryForm />
        </div>
    );
}
