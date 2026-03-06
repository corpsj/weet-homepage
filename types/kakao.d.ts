interface KakaoStatic {
  init(appKey: string): void;
  isInitialized(): boolean;
  Channel: {
    chat(params: { channelPublicId: string }): void;
  };
  Share: {
    sendDefault(params: Record<string, unknown>): void;
  };
}

interface Window {
  Kakao?: KakaoStatic;
}
