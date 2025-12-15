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
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ text: "easeOut", duration: 0.2 }}
                            className="relative w-full h-full max-w-7xl max-h-[85vh] md:max-h-[90vh]"
                        >
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    {hasPrev && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev?.();
                            }}
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50 group"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 group-active:scale-95 transition-transform" />
                        </button>
                    )}

                    {hasNext && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext?.();
                            }}
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-50 group"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 group-active:scale-95 transition-transform" />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
