import { getInstagramFeed } from '@/lib/instagram';
import SNSGalleryClient from './SNSGalleryClient';

export default async function SNSGallery() {
  const profileUrl = process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL || 'https://instagram.com/weet';
  const feed = await getInstagramFeed(6);

  const placeholders = Array.from({ length: 6 }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    imageUrl: '',
    link: profileUrl,
    alt: `Instagram post ${i + 1}`,
    mediaType: 'IMAGE' as const,
  }));

  const items = feed.length ? feed : placeholders;

  return <SNSGalleryClient items={items} profileUrl={profileUrl} />;
}
