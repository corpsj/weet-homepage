'use client';

import Script from 'next/script';
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type KakaoState = 'loading' | 'ready' | 'error' | 'disabled';

interface KakaoContextType {
  state: KakaoState;
  isReady: boolean;
}

const KakaoContext = createContext<KakaoContextType>({ state: 'disabled', isReady: false });

export function useKakao() {
  return useContext(KakaoContext);
}

export function KakaoProvider({ children }: { children: ReactNode }) {
  const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const [state, setState] = useState<KakaoState>(jsKey ? 'loading' : 'disabled');

  const handleLoad = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized() && jsKey) {
        window.Kakao.init(jsKey);
        setState('ready');
      }
    } catch {
      setState('error');
    }
  }, [jsKey]);

  const handleError = useCallback(() => {
    setState('error');
  }, []);

  return (
    <KakaoContext.Provider value={{ state, isReady: state === 'ready' }}>
      {jsKey && (
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          strategy="afterInteractive"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {children}
    </KakaoContext.Provider>
  );
}
