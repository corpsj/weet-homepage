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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
            <div
                className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button (Mobile: Top Right, Desktop: Absolute) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm md:hidden"
                >
                    <X className="w-6 h-6 text-black" />
                </button>

                {/* Left Side: Image & Key Info (Sticky on Desktop) */}
                <div className="w-full md:w-[40%] bg-gray-100 relative flex-shrink-0 md:h-full">
                    <div className="h-[300px] md:h-full relative">
                        {/* Main Cover Image */}
                        <div className="absolute inset-0 bg-gray-300">
                            {data.images[0] ? (
                                <div className="relative w-full h-full">
                                    {/* Placeholder for actual image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium bg-gray-200">
                                        Profile Image
                                    </div>
                                    {/* Uncomment when real images are available
                   <Image src={data.images[0]} alt={data.name} fill className="object-cover" priority />
                   */}
                                    {/* Gradient Overlay for Text Visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                                </div>
                            ) : null}
                        </div>

                        {/* Mobile Name Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white md:hidden">
                            <h2 className="text-3xl font-bold mb-1">{data.name}</h2>
                            <p className="text-primary font-medium tracking-wide text-sm uppercase">{data.role}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Detailed Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto relative bg-white">
                    {/* Desktop Close Button */}
                    <button
                        onClick={onClose}
                        className="hidden md:block absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="p-8 md:p-12 lg:p-16 space-y-12">
                        {/* Desktop Header */}
                        <div className="hidden md:block">
                            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-3 tracking-tight">{data.name}</h2>
                            <p className="text-primary text-lg font-medium tracking-wider uppercase">{data.role}</p>
                        </div>

                        {/* Bio Section */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px] md:text-[16px]">
                                {data.description}
                            </p>
                        </div>

                        <div className="w-full h-px bg-gray-100" />

                        {/* Details Grid */}
                        <div className="space-y-10">
                            {/* Education */}
                            <section>
                                <h3 className="text-[18px] font-bold text-black mb-4 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    건축학력
                                </h3>
                                <ul className="space-y-2 pl-5 border-l-2 border-gray-100 ml-0.5">
                                    {data.education.map((item, idx) => (
                                        <li key={idx} className="text-[15px] text-gray-700 hover:text-black transition-colors">{item}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* Experience */}
                            <section>
                                <h3 className="text-[18px] font-bold text-black mb-4 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    건축/디자인 경력
                                </h3>
                                <ul className="space-y-2 pl-5 border-l-2 border-gray-100 ml-0.5">
                                    {data.experience.map((item, idx) => (
                                        <li key={idx} className="text-[15px] text-gray-700 hover:text-black transition-colors">{item}</li>
                                    ))}
                                </ul>
                            </section>

                            {/* Awards */}
                            <section>
                                <h3 className="text-[18px] font-bold text-black mb-4 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    건축/디자인 공모전 수상
                                </h3>
                                <ul className="space-y-2 pl-5 border-l-2 border-gray-100 ml-0.5">
                                    {data.awards.map((item, idx) => (
                                        <li key={idx} className="text-[15px] text-gray-700 hover:text-black transition-colors">{item}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
