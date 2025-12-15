'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

export default function GallerySection() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();
    const supabase = createClient();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true })
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setItems(data || []);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <section id="gallery" className="bg-white py-16 lg:py-24 scroll-mt-[180px]">
                <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" className="bg-white py-16 lg:py-24 scroll-mt-[180px]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                    {/* Left: Section Title */}
                    <div className="flex-shrink-0 mb-4 lg:mb-0">
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H40L0 40Z" fill="#2D2D2D" />
                                </svg>
                            </div>
                            <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black">
                                {language === 'KO' ? 'weet Gallery' : 'weet Gallery'}
                            </span>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 w-full">
                        {/* Intro Text */}
                        <p className="text-lg text-gray-600 mb-12">
                            {language === 'KO'
                                ? '위트가 만들어가는 새로운 공간의 이야기를 만나보세요.'
                                : 'Discover the stories of new spaces created by Weet.'}
                        </p>

                        {/* Grid */}
                        {items.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group cursor-default"
                                    >
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-sm hover:shadow-md transition-shadow">
                                            <Image
                                                src={item.image_url}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-black mb-2">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-600 line-clamp-2 text-sm">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
                                {language === 'KO'
                                    ? '등록된 프로젝트가 없습니다.'
                                    : 'No projects listed yet.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
