'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Slide {
    id: number;
    image_url: string;
    title?: string;
    subtitle?: string;
}

export default function HeroCarouselClient({ initialSlides }: { initialSlides: any[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % initialSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + initialSlides.length) % initialSlides.length);
    };

    // Auto-advance slides every 10 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(timer);
    }, [currentSlide, initialSlides.length]);

    if (initialSlides.length === 0) return null;

    return (
        <section className="relative h-[60vh] md:h-[80vh] lg:h-screen bg-[#EBEBEB] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full"
                    >
                        <div className="w-full h-full relative">
                            <Image
                                src={initialSlides[currentSlide].image_url}
                                alt={initialSlides[currentSlide].title || 'Hero Image'}
                                fill
                                priority
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 lg:left-[60px] top-1/2 -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] flex items-center justify-center hover:opacity-70 transition-opacity z-10 bg-white/20 backdrop-blur-sm rounded-full"
                aria-label="Previous slide"
            >
                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 lg:right-[60px] top-1/2 -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] flex items-center justify-center hover:opacity-70 transition-opacity z-10 bg-white/20 backdrop-blur-sm rounded-full"
                aria-label="Next slide"
            >
                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 md:bottom-12 lg:bottom-[60px] left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
                {initialSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-[3px] md:h-[4px] rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-[30px] md:w-[40px]' : 'bg-white/50 hover:bg-white/80 w-[15px] md:w-[20px]'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
