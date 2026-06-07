import { notFound } from 'next/navigation';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import { getGalleryItemForAdmin } from '@/app/actions/gallery-actions';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

export const dynamic = 'force-dynamic';

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getGalleryItemForAdmin(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ConsolePageHeader
        eyebrow="CONTENTS"
        title="이미지 수정"
        description="프로젝트 이미지를 수정합니다."
      />

      <GalleryForm initialData={item} />
    </div>
  );
}
