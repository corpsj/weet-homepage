import 'server-only';

const INSTAGRAM_API_BASE = 'https://graph.instagram.com';
const INSTAGRAM_FIELDS = [
  'id',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'caption',
  'timestamp',
] as const;

export type InstagramMedia = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
  timestamp?: string;
};

export type InstagramFeedItem = {
  id: string;
  imageUrl: string;
  link: string;
  alt: string;
  mediaType: InstagramMedia['media_type'];
  timestamp?: string;
};

function getInstagramEndpoint(limit: number) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) return null;

  const params = new URLSearchParams({
    fields: INSTAGRAM_FIELDS.join(','),
    access_token: accessToken,
    limit: String(limit),
  });

  const userId = process.env.INSTAGRAM_USER_ID;
  const path = userId ? `${userId}/media` : 'me/media';

  return `${INSTAGRAM_API_BASE}/${path}?${params.toString()}`;
}

function normalizeCaption(caption: string | undefined, index: number) {
  if (!caption) return `Instagram post ${index + 1}`;
  const firstLine = caption.split('\n')[0] ?? caption;
  return firstLine.length > 100 ? `${firstLine.slice(0, 97)}...` : firstLine;
}

export async function getInstagramFeed(limit = 6): Promise<InstagramFeedItem[]> {
  const endpoint = getInstagramEndpoint(limit);

  if (!endpoint) {
    console.warn('[instagram] Missing INSTAGRAM_ACCESS_TOKEN env var');
    return [];
  }

  try {
    const response = await fetch(endpoint, {
      // Cache for a short period to avoid hammering the API while keeping content fresh
      next: { revalidate: 900 }, // 15 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[instagram] Failed to fetch feed (${response.status})`, errorText);
      return [];
    }

    const data = (await response.json()) as { data?: InstagramMedia[] };
    const items = (data?.data ?? []).slice(0, limit);

    return items
      .map((item, index) => {
        const imageUrl =
          item.media_type === 'VIDEO' ? item.thumbnail_url ?? item.media_url : item.media_url;

        if (!imageUrl || !item.permalink) return null;

        return {
          id: item.id ?? `post-${index}`,
          imageUrl,
          link: item.permalink,
          alt: normalizeCaption(item.caption, index),
          mediaType: item.media_type,
          timestamp: item.timestamp,
        };
      })
      .filter(Boolean) as InstagramFeedItem[];
  } catch (error) {
    console.error('[instagram] Unexpected error while fetching feed', error);
    return [];
  }
}
