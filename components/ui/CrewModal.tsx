'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface CrewModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        name: string;
        role: string;
        description: string;
        education: string[];
        experience: string[];
        awards: string[];
        images: string[];
    } | null;
}

export default function CrewModal({ isOpen, onClose, data }: CrewModalProps) {
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

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-[#EBEBEB] w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                    <X className="w-6 h-6 text-black" />
                </button>

                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-1 bg-white">
                    {data.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] bg-gray-200">
                            {/* Placeholder for actual crew photos */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                Image {idx + 1}
                            </div>
                            {/* Uncomment when real images are available
               <Image src={img} alt={`Crew ${idx + 1}`} fill className="object-cover" />
               */}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-10 text-black">
                    {/* Header */}
                    <div>
                        <h2 className="text-[28px] font-bold mb-6">{data.name}</h2>
                        <p className="text-[15px] leading-relaxed whitespace-pre-line text-gray-800">
                            {data.description}
                        </p>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-[16px] font-bold mb-4">건축학력</h3>
                        <ul className="space-y-1">
                            {data.education.map((item, idx) => (
                                <li key={idx} className="text-[14px] text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Experience */}
                    <div>
                        <h3 className="text-[16px] font-bold mb-4">건축/디자인 경력</h3>
                        <ul className="space-y-1">
                            {data.experience.map((item, idx) => (
                                <li key={idx} className="text-[14px] text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Awards */}
                    <div>
                        <h3 className="text-[16px] font-bold mb-4">건축/디자인 공모전 수상</h3>
                        <ul className="space-y-1">
                            {data.awards.map((item, idx) => (
                                <li key={idx} className="text-[14px] text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
