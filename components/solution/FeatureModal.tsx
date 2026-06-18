'use client';

import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    feature: {
        title: string;
        image: string;
        description: string;
        detailContent?: string;
    } | null;
}

export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
    const { language } = useLanguage();
    const imagePendingLabel =
        language === 'KO' ? '이미지 준비 중' : language === 'ES' ? 'Imagen en preparación' : 'Image pending';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !feature) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(10,8,5,0.7)] backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="relative bg-weet-ink w-full max-w-4xl max-h-[85vh] rounded-[18px] border border-weet-paper/16 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-weet-ink-deep/70 backdrop-blur-sm transition-[transform,background] duration-200 hover:rotate-90 hover:bg-weet-paper/[0.16] md:hidden"
                >
                    <X className="h-[15px] w-[15px] text-weet-paper" />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-[45%] bg-weet-ink-deep relative items-center justify-center hidden md:flex">
                    {feature.image ? (
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 text-weet-paper/45">
                            <ImageIcon className="h-7 w-7" />
                            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em]">{imagePendingLabel}</span>
                        </div>
                    )}
                </div>

                {/* Mobile Image (Banner) */}
                <div className="w-full h-48 relative md:hidden bg-weet-ink-deep">
                    {feature.image ? (
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-weet-paper/45">
                            <ImageIcon className="h-7 w-7" />
                            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em]">{imagePendingLabel}</span>
                        </div>
                    )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 overflow-y-auto relative bg-weet-ink flex flex-col">
                    {/* Desktop Close */}
                    <button
                        onClick={onClose}
                        className="hidden md:flex absolute top-6 right-6 h-[38px] w-[38px] items-center justify-center rounded-full bg-weet-ink-deep/70 backdrop-blur-sm text-weet-paper/70 transition-[transform,background,color] duration-200 hover:rotate-90 hover:bg-weet-paper/[0.16] hover:text-weet-paper z-10"
                    >
                        <X className="h-[15px] w-[15px]" />
                    </button>

                    <div className="p-8 md:p-12 space-y-6">
                        <div>
                            <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.025em] text-weet-paper mb-3">{feature.title}</h2>
                            <div className="w-12 h-1 bg-weet-gold rounded-full"></div>
                        </div>

                        <div className="text-[15px] leading-[1.8] text-weet-paper/70 whitespace-pre-line kr-balance">
                            {/* Priority: detailContent -> description */}
                            {feature.detailContent ? feature.detailContent : feature.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
