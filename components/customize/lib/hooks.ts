import { useEffect, useState } from 'react';
import type { FloorplanImageStatus } from './constants';

// 모달 공통 동작: ESC로 닫기 + 열려 있는 동안 본문 스크롤 잠금.
export function useModalDismiss(onClose: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
}

export function useFloorplanImageStatus(path: string | null): FloorplanImageStatus {
  const [result, setResult] = useState<{ path: string; status: 'loaded' | 'failed' } | null>(null);

  useEffect(() => {
    if (!path) return;

    let cancelled = false;
    const image = new window.Image();

    image.onload = () => {
      if (!cancelled) setResult({ path, status: 'loaded' });
    };
    image.onerror = () => {
      if (!cancelled) setResult({ path, status: 'failed' });
    };
    image.src = path;

    return () => {
      cancelled = true;
    };
  }, [path]);

  if (!path) return 'missing';
  if (result?.path !== path) return 'loading';
  return result.status;
}
