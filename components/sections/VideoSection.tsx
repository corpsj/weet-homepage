'use client';

import { PlayCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function VideoSection() {
  const t = useTranslation();

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[150px]">
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-8 md:mb-12 lg:mb-16 text-black uppercase">
          {t.main.video.title}
        </h2>

        <div className="relative w-full max-w-[1200px] mx-auto aspect-video bg-zinc-900 rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-2xl flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <PlayCircle className="w-16 h-16 md:w-20 md:h-20 text-white/60 mb-4 md:mb-6 transition-transform duration-500 hover:scale-110 hover:text-white/80 cursor-pointer" strokeWidth={1} />
            <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mb-2 md:mb-3">
              영상 준비 중입니다
            </h3>
            <p className="text-white/50 text-sm md:text-base font-light tracking-wide">
              weet의 이야기를 곧 만나보세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
