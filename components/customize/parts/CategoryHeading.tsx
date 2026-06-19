import type { ReactNode } from 'react';

export function CategoryHeading({ title, status, icon }: { title: string; status: string; icon: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {/* 시안: 28×28 라운드 #efe6d4 박스 + Lucide layers */}
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-customize-dune text-customize-ink">{icon}</span>
        <h3 className="text-sm font-extrabold text-customize-ink">{title}</h3>
      </div>
      {/* 상태 텍스트 색 #7a6a3a */}
      {status && <p className="text-xs font-bold text-customize-olive">{status}</p>}
    </div>
  );
}
