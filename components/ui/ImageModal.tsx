'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    imageAlt?: string;
    title?: string;
    description?: string | null;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
    /** Element to return focus to when the modal closes. */
    triggerRef?: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ImageModal({
    isOpen,
    onClose,
    images,
    imageAlt = 'Gallery Image',
    title,
    description,
    onNext,
    onPrev,
    hasNext = false,
    hasPrev = false,
    triggerRef,
}: ImageModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const titleId = useId();

    const handleClose = useCallback(() => {
        setCurrentIndex(0);
        onClose();
    }, [onClose]);

    // Handle keyboard navigation and focus trapping
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
                return;
            }

            // Trap focus within the dialog
            if (e.key === 'Tab') {
                const dialog = dialogRef.current;
                if (!dialog) return;
                const focusable = Array.from(
                    dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
                ).filter((el) => el.offsetParent !== null || el === document.activeElement);
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const active = document.activeElement;
                if (e.shiftKey) {
                    if (active === first || !dialog.contains(active)) {
                        e.preventDefault();
                        last.focus();
                    }
                } else if (active === last || !dialog.contains(active)) {
                    e.preventDefault();
                    first.focus();
                }
                return;
            }

            // Internal carousel navigation
            if (e.key === 'ArrowRight') {
                if (currentIndex < images.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else if (onNext && hasNext) {
                    onNext();
                }
            }
            if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                } else if (onPrev && hasPrev) {
                    onPrev();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleClose, onNext, onPrev, hasNext, hasPrev, currentIndex, images.length]);

    // Move focus into the dialog on open and restore it on close
    useEffect(() => {
        if (!isOpen) return;
        const previouslyFocused =
            triggerRef?.current ?? (document.activeElement as HTMLElement | null);
        closeButtonRef.current?.focus();

        return () => {
            previouslyFocused?.focus?.();
        };
    }, [isOpen, triggerRef]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex < images.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (onNext && hasNext) {
            onNext();
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else if (onPrev && hasPrev) {
            onPrev();
        }
    };

    if (!isOpen) return null;

    // Use images as key to force remount when images change
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key={images.join(',')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
                    onClick={handleClose}
                >
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title ? undefined : imageAlt}
                        aria-labelledby={title ? titleId : undefined}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 1. Image Section (Left / Top) */}
                        <div className="relative flex-1 bg-black min-h-[300px] md:min-h-0 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={images[currentIndex]}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={images[currentIndex]}
                                        alt={`${imageAlt} - ${currentIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 70vw"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons (Over Image) */}
                            {(hasPrev || currentIndex > 0) && (
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    aria-label="이전 이미지"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}
                            {(hasNext || currentIndex < images.length - 1) && (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    aria-label="다음 이미지"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}

                            {/* Image Counter */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full text-white text-xs z-20 backdrop-blur-sm">
                                    {currentIndex + 1} / {images.length}
                                </div>
                            )}
                        </div>

                        {/* 2. Content Section (Right / Bottom) */}
                        <div className="w-full md:w-[400px] flex-shrink-0 bg-white flex flex-col border-l border-gray-100">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-end">
                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="닫기"
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-black" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar flex flex-col">
                                <div className="flex-1">
                                    {title && (
                                        <h2 id={titleId} className="text-2xl font-bold mb-8 text-black">{title}</h2>
                                    )}

                                    {description && (
                                        <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                            {description}
                                        </div>
                                    )}
                                </div>

                                {/* Extra details or branding */}
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <p className="text-xs text-gray-400">
                                        Designed by weet:)
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
