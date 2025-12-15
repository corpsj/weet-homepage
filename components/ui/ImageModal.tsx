'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    imageAlt?: string;
    title?: string;
    description?: string | null;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export default function ImageModal({
    isOpen,
    onClose,
    imageUrl,
    imageAlt = 'Gallery Image',
    title,
    description,
    onNext,
    onPrev,
    hasNext = false,
    hasPrev = false,
}: ImageModalProps) {
    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
            if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 1. Image Section (Left / Top) */}
                        <div className="relative flex-1 bg-black min-h-[300px] md:min-h-0 flex items-center justify-center">
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 70vw"
                                priority
                            />

                            {/* Navigation Buttons (Over Image) */}
                            {hasPrev && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPrev?.();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}
                            {hasNext && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNext?.();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}
                        </div>

                        {/* 2. Content Section (Right / Bottom) */}
                        <div className="w-full md:w-[400px] flex-shrink-0 bg-white flex flex-col border-l border-gray-100">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">
                                        W
                                    </div>
                                    <span className="font-bold text-sm">Weet Gallery</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-black" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                {title && (
                                    <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
                                )}

                                {description && (
                                    <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                        {description}
                                    </div>
                                )}

                                {/* Extra details or branding could go here */}
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">
                                        Designed by Weet Architecture
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
