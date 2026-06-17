'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ImageModal from '@/components/ui/ImageModal';

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

export default function GallerySection() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();
    const supabase = useMemo(() => createClient(), []);

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
    }, [supabase]);

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const paginatedItems = items.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Optional: Scroll to top of gallery section
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                const headerOffset = 100;
                const elementPosition = gallerySection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleImageClick = (index: number) => {
        // Adjust index for global list based on pagination
        const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
        setSelectedImageIndex(globalIndex);
    };

    const handleCloseModal = () => {
        setSelectedImageIndex(null);
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) =>
            prev !== null && prev < items.length - 1 ? prev + 1 : prev
        );
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : prev
        );
    };

    if (loading) {
        return (
            <section id="gallery" className="bg-white py-16 lg:py-24 scroll-mt-[88px]">
                <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" className="bg-white py-16 lg:py-24 scroll-mt-[88px]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
                <div className="flex flex-col gap-12 lg:gap-20">
                    {/* Section Title */}
                    <div>
                        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-4 text-black uppercase">
                            weet Gallery
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="w-full">
                        {/* Grid */}
                        {items.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
                                    {paginatedItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="group cursor-pointer"
                                            onClick={() => handleImageClick(index)} // Using paginated index is fine if we updated handler, but better pass actual item ID or correct index
                                        >
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-sm hover:shadow-md transition-shadow">
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                />
                                                {/* Hover overlay hint */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                        <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full bg-black/20 backdrop-blur-sm text-sm">
                                                            View
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-black mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                                {item.title}
                                            </h3>
                                            {item.description && (
                                                <p className="text-gray-600 line-clamp-1 text-xs">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 18l-6-6 6-6" />
                                            </svg>
                                        </button>

                                        <div className="flex gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${currentPage === page
                                                        ? 'bg-black text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 18l6-6-6-6" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
                                {{
                                    KO: '등록된 프로젝트가 없습니다.',
                                    EN: 'No projects listed yet.',
                                    ES: 'Todavía no hay proyectos publicados.',
                                }[language]}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImageIndex !== null && items[selectedImageIndex] && (
                <ImageModal
                    isOpen={selectedImageIndex !== null}
                    onClose={handleCloseModal}
                    images={[
                        items[selectedImageIndex].image_url,
                        ...(items[selectedImageIndex].sub_images || [])
                    ]}
                    imageAlt={items[selectedImageIndex].title}
                    title={items[selectedImageIndex].title}
                    description={items[selectedImageIndex].description}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                    hasNext={selectedImageIndex < items.length - 1}
                    hasPrev={selectedImageIndex > 0}
                />
            )}
        </section>
    );
}
