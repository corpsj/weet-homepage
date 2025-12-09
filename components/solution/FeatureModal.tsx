'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
            <div
                className="bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm md:hidden"
                >
                    <X className="w-6 h-6 text-black" />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-[45%] bg-gray-100 relative items-center justify-center hidden md:flex">
                    {feature.image ? (
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="text-gray-400">No Image</div>
                    )}
                </div>

                {/* Mobile Image (Banner) */}
                <div className="w-full h-48 relative md:hidden bg-gray-100">
                    {feature.image ? (
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                        />
                    ) : null}
                </div>

                {/* Right: Content */}
                <div className="flex-1 overflow-y-auto relative bg-white flex flex-col">
                    {/* Desktop Close */}
                    <button
                        onClick={onClose}
                        className="hidden md:block absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="p-8 md:p-12 space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-2">{feature.title}</h2>
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                            {/* Priority: detailContent -> description */}
                            {feature.detailContent ? feature.detailContent : feature.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
