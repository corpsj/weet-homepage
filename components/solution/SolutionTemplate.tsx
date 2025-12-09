'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import FeatureModal from './FeatureModal';

interface Feature {
    id: string;
    title: string;
    image: string;
    description: string;
    detailContent?: string;
}

interface SolutionTemplateProps {
    title: string;
    subtitle: string;
    heroImage: string;
    description: string;
    features: Feature[];
}

const solutionLinks = [
    { name: '보안 솔루션', href: '/solution/cctv' },
    { name: '네트워크 솔루션', href: '/solution/network' },
    { name: 'IOT 솔루션', href: '/solution/iot' },
    { name: '디자인 솔루션', href: '/solution/design' },
];

export default function SolutionTemplate({
    title,
    subtitle,
    heroImage,
    description,
    features,
}: SolutionTemplateProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (feature: Feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="min-h-screen bg-white" ref={containerRef}>
            {/* Hero Section with Parallax */}
            <div className="relative h-[35vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>

                <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-3"
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-medium tracking-wider uppercase text-primary">
                            {subtitle}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                            {title}
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Floating Segmented Control Navigation */}
            <div className="sticky top-[70px] md:top-[90px] lg:top-[110px] z-40 flex justify-center py-4 pointer-events-none">
                <div className="bg-gray-100/80 backdrop-blur-md p-1.5 rounded-full pointer-events-auto shadow-sm border border-gray-200/50 inline-flex overflow-x-auto max-w-[90vw] no-scrollbar">
                    <div className="flex items-center relative">
                        {solutionLinks.map((link) => {
                            const isActive = title === link.name;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors rounded-full z-10 whitespace-nowrap",
                                        isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSegment"
                                            className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-200/50 -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openModal(feature)}>
                                    {feature.image ? (
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={index < 2}
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{feature.title}</h3>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                        {feature.description}
                                    </p>
                                    <button
                                        onClick={() => openModal(feature)}
                                        className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform cursor-pointer w-fit"
                                    >
                                        자세히 보기 <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <FeatureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                feature={selectedFeature}
            />
        </div>
    );
}
