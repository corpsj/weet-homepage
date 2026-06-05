import { notFound } from 'next/navigation';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import { getGalleryItemForAdmin } from '@/app/actions/gallery-actions';

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">이미지 수정</h1>
        <p className="text-gray-500 text-sm mt-1">프로젝트 이미지를 수정합니다.</p>
      </div>

      <GalleryForm initialData={item} />
    </div>
  );
}
