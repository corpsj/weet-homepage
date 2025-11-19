'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    subtitle: 'Welcome to weet:)',
    title: 'We make dreams come true',
    image: null, // TODO: Add actual image path
  },
  {
    id: 2,
    subtitle: 'Modular Architecture',
    title: '혁신적인 모듈러 건축',
    image: null,
  },
  {
    id: 3,
    subtitle: 'BESPOKE Service',
    title: '맞춤형 건축 솔루션',
    image: null,
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-screen bg-gray-200 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
          {slides[currentSlide].image || <span className="text-sm md:text-lg lg:text-xl">Hero Image {currentSlide + 1}</span>}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-start justify-center px-4 md:px-8 lg:px-[150px] max-w-[1920px] mx-auto"
          >
            <div className="space-y-3 md:space-y-4 max-w-full md:max-w-xl lg:max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[28px] md:text-[40px] lg:text-[56px] leading-tight font-medium text-black"
              >
                {slides[currentSlide].subtitle}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[28px] md:text-[40px] lg:text-[56px] leading-tight font-medium text-black"
              >
                {slides[currentSlide].title}
              </motion.h1>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 lg:left-[60px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] flex items-center justify-center hover:opacity-70 transition-opacity z-10"
          aria-label="Previous slide"
        >
          <svg className="w-full h-full" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 15L20 30L40 45V15Z" fill="black" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 lg:right-[60px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] flex items-center justify-center hover:opacity-70 transition-opacity z-10"
          aria-label="Next slide"
        >
          <svg className="w-full h-full" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 15L40 30L20 45V15Z" fill="black" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 md:bottom-12 lg:bottom-[60px] left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-[10px] md:h-[12px] rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-black w-[30px] md:w-[40px]' : 'bg-gray-400 hover:bg-gray-500 w-[10px] md:w-[12px]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
