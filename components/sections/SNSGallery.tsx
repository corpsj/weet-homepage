import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function SNSGallery() {
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    image: null, // TODO: Replace with actual Instagram images
    link: 'https://instagram.com',
    alt: `Instagram post ${i + 1}`,
  }));

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[150px]">
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-8 md:mb-12 lg:mb-16 text-black">SNS</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12 lg:mb-16">
          {images.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Instagram className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-1 md:mb-2" />
                    <span className="text-gray-500 text-xs md:text-sm">Instagram {item.id}</span>
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </Link>
          ))}
        </div>

        {/* Instagram Button */}
        <div className="flex justify-center">
          <Link
            href="https://instagram.com/weet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white font-semibold px-6 py-3 md:px-10 md:py-3.5 lg:px-12 lg:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base lg:text-[18px]"
          >
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
            <span>Instagram에서 더 많은 사진 보기</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
