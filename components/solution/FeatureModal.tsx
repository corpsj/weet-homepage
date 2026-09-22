'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { X } from 'lucide-react';
import { useModalDismiss } from '@/components/customize/lib/hooks';

type Feature = { title: string; image: string; description: string; detailContent?: string };
function OpenFeature({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  const close = useCallback(() => onClose(), [onClose]);
  useModalDismiss(close);
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
    <div role="dialog" aria-modal="true" aria-labelledby="feature-title" className="relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto bg-white text-black" onClick={(event) => event.stopPropagation()}>
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white"><X /></button>
      <div className="relative aspect-[16/9] bg-gray-100"><Image src={feature.image} alt={feature.title} fill sizes="(max-width: 768px) 100vw, 900px" className="object-contain" /></div>
      <div className="p-6 md:p-10"><h2 id="feature-title" className="text-2xl font-bold">{feature.title}</h2><p className="mt-4 leading-7">{feature.description}</p>{feature.detailContent && <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">{feature.detailContent}</p>}<p className="mt-6 text-sm text-gray-600">적용 제품과 지원 기능은 선택 사양과 설치 환경에 따라 달라집니다. 상담 시 확인해 주세요.</p></div>
    </div>
  </div>;
}

export default function FeatureModal({ isOpen, feature, onClose }: { isOpen: boolean; feature: Feature | null; onClose: () => void }) {
  return isOpen && feature ? <OpenFeature feature={feature} onClose={onClose} /> : null;
}
