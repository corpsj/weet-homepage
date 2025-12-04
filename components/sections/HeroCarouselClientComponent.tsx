'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface Slide {
    id: number;
    image_url: string;
    title?: string;
    subtitle?: string;
}

export default function HeroCarouselClient({ initialSlides }: { initialSlides: Slide[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % initialSlides.length);
    }, [initialSlides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + initialSlides.length) % initialSlides.length);
    }, [initialSlides.length]);

    // Auto-advance slides every 10 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (initialSlides.length === 0) return null;

    return (
        <section ref={containerRef} className="relative bg-[#EBEBEB] overflow-hidden w-full h-[calc(100vh-70px)] md:h-[calc(100vh-90px)] lg:h-[calc(100vh-110px)]">
            {/* Blurred Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={initialSlides[currentSlide].image_url}
                        alt="Background"
                        fill
                        className="object-cover blur-2xl opacity-60 scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </motion.div>
            </AnimatePresence>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto h-full shadow-2xl">
                {/* Main Image - Static */}
                <div className="absolute inset-0 w-full h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="w-full h-full absolute inset-0"
                        >
                            <Image
                                src={initialSlides[currentSlide].image_url}
                                alt={initialSlides[currentSlide].title || 'Hero Image'}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1400px) 100vw, 1400px"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows - Moved outside constrained container to be at screen edges if desired, or just ensure visibility */}
            {/* Actually, keeping them inside the max-w container is better for the "contained" look, but let's ensure they are visible. 
               I will add a background to them and ensure z-index is correct. 
               Also removing the pointer-events-none wrapper approach if it was causing issues, 
               but actually I'll just make them absolute to the section again to be safe and simple. */}

            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 lg:left-[60px] top-1/2 -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md transition-all z-30 rounded-full group"
                aria-label="Previous slide"
            >
                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 lg:right-[60px] top-1/2 -translate-y-1/2 w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md transition-all z-30 rounded-full group"
                aria-label="Next slide"
            >
                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 md:bottom-16 lg:bottom-[60px] left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                {initialSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-[3px] md:h-[4px] rounded-full transition-all duration-500 ${idx === currentSlide ? 'bg-white w-[40px] md:w-[50px]' : 'bg-white/40 hover:bg-white/70 w-[20px] md:w-[30px]'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-white/80 text-xs tracking-widest uppercase mb-2">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
