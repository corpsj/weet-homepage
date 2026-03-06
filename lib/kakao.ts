/**
 * Check if KakaoTalk SDK is loaded and initialized
 */
export function isKakaoReady(): boolean {
  if (typeof window === 'undefined') return false;
  return !!window.Kakao?.isInitialized();
}

/**
 * Open KakaoTalk channel chat
 * Falls back gracefully if SDK not ready
 */
export function openKakaoChannel(channelId?: string): boolean {
  const id = channelId || process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
  if (!id) return false;
  
  if (isKakaoReady()) {
    window.Kakao!.Channel.chat({ channelPublicId: id });
    return true;
  }
  
  // Fallback: open KakaoTalk channel page in browser
  window.open(`https://pf.kakao.com/${id}`, '_blank');
  return false;
}

/**
 * Share content via KakaoTalk
 * Falls back to Web Share API or clipboard
 */
export function shareToKakao(params: {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
}): boolean {
  if (isKakaoReady()) {
    window.Kakao!.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: params.title,
        description: params.description,
        imageUrl: params.imageUrl || '',
        link: { webUrl: params.link, mobileWebUrl: params.link },
      },
    });
    return true;
  }
  
  // Fallback: use native Web Share API
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({ title: params.title, text: params.description, url: params.link });
    return false;
  }
  
  return false;
}
