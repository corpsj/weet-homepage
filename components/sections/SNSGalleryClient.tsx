'use client';

import Link from 'next/link';
import { Instagram } from 'lucide-react';
import NextImage from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface SNSGalleryItem {
    id: string;
    imageUrl: string;
    link: string;
    alt: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

interface SNSGalleryClientProps {
    items: SNSGalleryItem[];
    profileUrl: string;
}

export default function SNSGalleryClient({ items, profileUrl }: SNSGalleryClientProps) {
    const t = useTranslation();

    return (
        <section className="py-10 md:py-12 lg:py-16 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[150px]">
                <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-8 md:mb-10 lg:mb-12 text-black">
                    {t.main.sns.title || 'SNS'}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
                    {items.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                {item.imageUrl ? (
                                    <NextImage
                                        src={item.imageUrl}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        className="object-cover"
                                        priority={index < 3}
                                    />
                                ) : (
                                    <div className="text-center">
                                        <Instagram className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-1 md:mb-2" />
                                        <span className="text-gray-500 text-xs md:text-sm">Instagram {index + 1}</span>
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
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 md:gap-3 bg-[#2D2D2D] hover:bg-black text-white font-semibold px-8 py-3 md:px-10 md:py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                        <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                        <span>{t.main.sns.description || 'Instagram'}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
