import GalleryList from '@/components/admin/gallery/GalleryList';
import { getGalleryItemsForAdmin } from '@/app/actions/gallery-actions';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const items = await getGalleryItemsForAdmin();

  return <GalleryList initialItems={items} />;
}
