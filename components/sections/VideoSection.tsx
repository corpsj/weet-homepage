'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslation();

  const handlePlay = () => {
    setIsPlaying(true);
    // TODO: Add actual video play logic here
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[150px]">
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-8 md:mb-12 lg:mb-16 text-black uppercase">
          {t.main.video.title}
        </h2>

        <div className="relative w-full max-w-[1200px] mx-auto aspect-video bg-gray-800 rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-2xl group cursor-pointer">
          {/* Video Thumbnail/Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
            {/* TODO: Replace with actual video thumbnail */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-base lg:text-lg">Video Thumbnail</span>
            </div>
          </div>

          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-all duration-300 z-10"
              aria-label="Play video"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="black" />
              </div>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {/* TODO: Replace with actual video embed (YouTube, Vimeo, etc.) */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="weet video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Video Overlay Title */}
          {!isPlaying && (
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 z-10">
              <h3 className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-2">{t.main.video.overlayTitle}</h3>
              <p className="text-gray-300 text-xs md:text-sm">{t.main.video.overlayDesc}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
