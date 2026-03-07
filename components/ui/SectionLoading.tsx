"use client";

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const loadingStates = [
  '집 짓는 중...',
  '모듈 조립하는 중...',
  '인테리어 마무리 중...',
  '거의 다 왔어요...',
  '기초 공사 중...',
] as const;

interface SectionLoadingProps {
  className?: string;
  lines?: number;
}

export function SectionLoading({ className, lines = 3 }: SectionLoadingProps) {
  const lineKeys = useMemo(() => Array.from({ length: lines }).map(() => crypto.randomUUID()), [lines]);
  const loadingMessage = useMemo(
    () => loadingStates[Math.floor(Math.random() * loadingStates.length)],
    []
  );

  return (
    <div className={cn('animate-pulse space-y-4 p-8', className)}>
      <div className="flex items-center gap-2 text-gray-400">
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
          <title>Loading</title>
          <path d="M12 2v4m0 12v4m-8-10H0m24 0h-4m-2.343-5.657L15.314 8.686m-6.628 6.628L6.343 17.657m0-11.314L8.686 8.686m6.628 6.628l2.343 2.343" />
        </svg>
        <span className="text-sm font-medium">{loadingMessage}</span>
      </div>
      {lineKeys.map((key, i) => (
        <div key={key} className="space-y-2">
          <div className={cn('h-4 bg-gray-200 rounded', i === 0 ? 'w-3/4' : i === 1 ? 'w-full' : 'w-1/2')} />
        </div>
      ))}
    </div>
  );
}
