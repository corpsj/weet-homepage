'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

export default function GalleryPage() {
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
            <div className="min-h-screen pt-[105px] md:pt-[135px] lg:pt-[110px] pb-20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-[105px] md:pt-[135px] lg:pt-[110px] pb-20">
            {/* Header Section */}
            <section className="bg-gray-50 py-16 md:py-24">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[64px]">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                        Weet Gallery
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                        {language === 'KO'
                            ? '위트가 만들어가는 새로운 공간의 이야기를 만나보세요.'
                            : 'Discover the stories of new spaces created by Weet.'}
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 md:py-24">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[64px]">
                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer"
                                    onClick={() => {
                                        // Optional: Implement lightbox or detail view
                                        // For now just valid cursor
                                    }}
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-gray-600 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            {language === 'KO'
                                ? '등록된 프로젝트가 없습니다.'
                                : 'No projects listed yet.'}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
