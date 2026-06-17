"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/supabase";
import { ChevronDown, Home, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// 제품 타입 정의 (Frontend View Model)
interface ProductData {
    id: string;
    name: string;
    subCategory: "Private" | "Public";
    sizeCategory: "S" | "M" | "L" | "XL" | "DESIGN";
    imageUrl: string;
    subImages: string[];
    tagline: string;
    description: string;
    details: {
        price: string;
        structure: string;
        roofType: string;
        exterior: string;
        interior: string;
        size: string;
    };
    floorPlan: {
        src: string;
        crop: {
            width: string;
            height: string;
            top: string;
            left: string;
        };
    };
}

// Helper to parse crop data from URL
const parseFloorPlan = (url: string | null) => {
    if (!url) return { src: "", crop: { width: "100%", height: "100%", top: "0%", left: "0%" } };

    const [baseUrl, query] = url.split('?');
    const params = new URLSearchParams(query);

    return {
        src: baseUrl,
        crop: {
            width: params.get('crop_w') || "100%",
            height: params.get('crop_h') || "100%",
            top: params.get('crop_t') || "0%",
            left: params.get('crop_l') || "0%",
        }
    };
};

// Helper to map Supabase Product to ProductData
const mapProductToData = (p: Product): ProductData => {
    const floorPlan = parseFloorPlan(p.floor_plan_url);

    return {
        id: p.id,
        name: p.name,
        subCategory: p.sub_category as "Private" | "Public",
        sizeCategory: p.size_category as "S" | "M" | "L" | "XL" | "DESIGN",
        imageUrl: p.image_url,
        tagline: p.tagline || "",
        description: p.description,
        details: {
            price: p.price || "-",
            structure: p.structure || "-",
            roofType: p.roof_type || "-",
            exterior: p.exterior_finish || "-",
            interior: p.interior_finish || "-",
            size: p.size || "-",
        },
        floorPlan: floorPlan,
        subImages: p.sub_images || [],
    };
};

const sortProducts = (products: ProductData[]) => {
    const categoryOrder = ["S", "M", "L", "XL", "DESIGN"];

    return [...products].sort((a, b) => {
        const idxA = categoryOrder.indexOf(a.sizeCategory);
        const idxB = categoryOrder.indexOf(b.sizeCategory);

        if (idxA !== idxB) {
            return idxA - idxB;
        }

        if (a.sizeCategory === 'S') {
            if (a.subCategory === 'Private' && b.subCategory !== 'Private') return -1;
            if (a.subCategory !== 'Private' && b.subCategory === 'Private') return 1;
        }

        return 0;
    });
};

interface ProductsPageClientProps {
    initialProducts: Product[];
}

export default function ProductsPageClient({ initialProducts }: ProductsPageClientProps) {
    const { language } = useLanguage();
    const t = (ko: string, en: string, es: string) => ({ KO: ko, EN: en, ES: es }[language]);
    const TEXT = {
        description: t('설명', 'Description', 'Descripción'),
        specs: t('상세 정보', 'Specifications', 'Especificaciones'),
        price: t('가격', 'Price', 'Precio'),
        size: t('크기', 'Size', 'Tamaño'),
        structure: t('구조', 'Structure', 'Estructura'),
        roof: t('지붕재', 'Roof', 'Cubierta'),
        exterior: t('외부마감', 'Exterior', 'Acabado exterior'),
        interior: t('내부마감', 'Interior', 'Acabado interior'),
        floorPlan: t('도면', 'Floor Plan', 'Plano'),
        floorPlanWaiting: t('도면 요청 시 제공', 'Floor plan available on request', 'Plano disponible bajo petición'),
    };
    const [products] = useState<ProductData[]>(() => sortProducts(initialProducts.map(mapProductToData)));
    const [visibleCount, setVisibleCount] = useState(() => Math.min(8, products.length));
    const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(["S", "M", "L", "XL", "DESIGN"]);
    const [expandedMobileProducts, setExpandedMobileProducts] = useState<string[]>([]);

    const toggleMobileProduct = (id: string) => {
        setExpandedMobileProducts(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
    };

    const [activeProduct, setActiveProduct] = useState<string>(() => products[0]?.id ?? "");
    const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
    const markImageFailed = useCallback((src: string) => {
        setFailedImages((prev) => {
            if (prev.has(src)) return prev;
            const next = new Set(prev);
            next.add(src);
            return next;
        });
    }, []);
    const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
    const didHandleInitialHash = useRef(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Sidebar Auto-Scroll Logic
    useEffect(() => {
        if (activeProduct && sidebarItemRefs.current[activeProduct] && sidebarRef.current) {
            const item = sidebarItemRefs.current[activeProduct];
            const container = sidebarRef.current;

            if (item && container) {
                // Calculate relative position to center the item
                const itemRect = item.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const currentScroll = container.scrollTop;

                // Position within the viewport relative to container
                const relativeTop = itemRect.top - containerRect.top;

                // Desired position: Center of container
                const targetRelativeTop = (containerRect.height / 2) - (itemRect.height / 2);

                const scrollAmount = relativeTop - targetRelativeTop;

                container.scrollTo({
                    top: currentScroll + scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeProduct]);
    const lastScrollY = useRef(0);
    // Gallery Modal State
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openGallery = (product: ProductData) => {
        const images = [product.imageUrl, ...(product.subImages || [])].filter(Boolean);
        if (images.length === 0) return;
        setCurrentGalleryImages(images);
        setCurrentImageIndex(0);
        setGalleryOpen(true);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % currentGalleryImages.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
    };

    // 사이드바 구조 생성 (Dynamic)
    interface SidebarCategory {
        label: string;
        subtitle: string;
        items?: string[];
        Private?: string[];
        Public?: string[];
    }

    const sidebarStructure: Record<string, SidebarCategory> = {
        S: {
            label: "S",
            subtitle: "",
            Private: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Private").map(p => p.id),
            Public: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Public").map(p => p.id),
        },
        M: {
            label: "M",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "M").map(p => p.id),
        },
        L: {
            label: "L",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "L").map(p => p.id),
        },
        XL: {
            label: "XL",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "XL").map(p => p.id),
        },
        DESIGN: {
            label: "DESIGN",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "DESIGN").map(p => p.id)
        },
    };

    const handleCategoryClick = (category: string) => {
        // 1. Expand immediately
        if (!expandedCategories.includes(category)) {
            setExpandedCategories([...expandedCategories, category]);
        }

        // 2. Scroll to first product in category
        const catData = sidebarStructure[category];
        let firstProductId = "";

        if (category === 'S') {
            firstProductId = catData.Private?.[0] || catData.Public?.[0] || "";
        } else {
            firstProductId = catData.items?.[0] || "";
        }

        if (firstProductId) {
            scrollToProduct(firstProductId);
        }
    };

    const scrollToProduct = useCallback((productId: string) => {
        const scrollWhenReady = () => {
            const element = productRefs.current[productId];
            if (!element) return;

            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveProduct(productId);
        };

        const productIndex = products.findIndex((product) => product.id === productId);
        if (productIndex >= visibleCount) {
            setVisibleCount((current) => Math.max(current, productIndex + 1));
            window.setTimeout(scrollWhenReady, 120);
            return;
        }

        scrollWhenReady();
    }, [products, visibleCount]);

    // Scroll to category or product hash after staged rendering has enough items.
    useEffect(() => {
        if (didHandleInitialHash.current || products.length === 0 || !window.location.hash) return;

        didHandleInitialHash.current = true;
        const hash = decodeURIComponent(window.location.hash.substring(1));
        const productMatch = products.find((product) => product.id === hash);
        let scrollTimer: number | undefined;
        const setupTimer = window.setTimeout(() => {
            if (productMatch) {
                scrollToProduct(productMatch.id);
                return;
            }

            const categoryMatch = products.find((product) => product.sizeCategory.toLowerCase() === hash.toLowerCase());
            if (!categoryMatch) return;

            setExpandedCategories((prev) => {
                if (prev.includes(categoryMatch.sizeCategory)) return prev;
                return [...prev, categoryMatch.sizeCategory];
            });

            const firstCategoryIndex = products.findIndex((product) => product.sizeCategory === categoryMatch.sizeCategory);
            if (firstCategoryIndex < 0) return;

            setVisibleCount((current) => Math.max(current, firstCategoryIndex + 1));
            scrollTimer = window.setTimeout(() => {
                const element = document.getElementById(categoryMatch.sizeCategory.toLowerCase());
                if (!element) {
                    scrollToProduct(products[firstCategoryIndex].id);
                    return;
                }

                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                setActiveProduct(products[firstCategoryIndex].id);
            }, 150);
        }, 0);

        return () => {
            window.clearTimeout(setupTimer);
            if (scrollTimer) window.clearTimeout(scrollTimer);
        };
    }, [products, scrollToProduct]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Header Visibility Logic
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            lastScrollY.current = currentScrollY;

            // Active Product Logic using getBoundingClientRect (Viewport Relative)
            // Trigger point: 30% down from top of viewport
            const triggerPoint = window.innerHeight * 0.3;

            let closestProductId = "";
            let minDistanceToTrigger = Infinity;

            // Check bottom of page first
            const documentHeight = document.documentElement.scrollHeight;
            if (window.innerHeight + currentScrollY >= documentHeight - 50) {
                if (visibleProducts.length > 0) {
                    setActiveProduct(visibleProducts[visibleProducts.length - 1].id);
                    return;
                }
            }

            for (const product of visibleProducts) {
                const element = productRefs.current[product.id];
                if (element) {
                    const rect = element.getBoundingClientRect();

                    // Check overlap with trigger point
                    if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                        closestProductId = product.id;
                        break;
                    }

                    // Fallback: track closest element top to trigger
                    const distance = Math.abs(rect.top - triggerPoint);
                    if (distance < minDistanceToTrigger) {
                        minDistanceToTrigger = distance;
                        closestProductId = product.id;
                    }
                }
            }

            if (closestProductId && closestProductId !== activeProduct) {
                setActiveProduct(closestProductId);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleProducts, activeProduct]);


    const getProductName = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product?.name || id;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
                {/* Sidebar */}
                <aside className="w-[280px] h-screen sticky top-0 hidden lg:flex flex-col pt-[140px] pb-10 pl-[60px] overflow-hidden bg-gray-50 border-r border-gray-100 z-10">
                    <div ref={sidebarRef} className="flex-1 overflow-y-auto pr-6 custom-scrollbar space-y-12">
                        {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
                            const category = sidebarStructure[key];
                            const isExpanded = expandedCategories.includes(key);
                            const hasItems = (category.items && category.items.length > 0) ||
                                (category.Private && category.Private.length > 0) ||
                                (category.Public && category.Public.length > 0);

                            if (!hasItems) return null;

                            return (
                                <div key={key} className="group">
                                    <div
                                        className="flex items-center justify-between cursor-pointer mb-4 select-none group/header py-2" // Added padding for click area
                                        onClick={() => handleCategoryClick(key)}
                                    >
                                        <div className="transiton-transform duration-300 group-hover/header:translate-x-2"> {/* Increased movement */}
                                            <h2 className={`text-5xl font-black tracking-tighter transition-colors duration-300 ${isExpanded ? 'text-black' : 'text-gray-200 group-hover:text-gray-400'}`}> {/* Larger font, lighter inactive color */}
                                                {category.label}
                                            </h2>
                                            {category.subtitle && (
                                                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide uppercase opacity-0 group-hover/header:opacity-100 transition-opacity transformtranslate-y-1 group-hover/header:translate-y-0">
                                                    {category.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-1 space-y-6 pt-2 pb-4">
                                                    {/* S만 세부 카테고리(Private/Public) 지원 */}
                                                    {key === 'S' ? (
                                                        <>
                                                            {category.Private && category.Private.length > 0 && (
                                                                <div className="mb-6">
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <div className="h-[1px] w-3 bg-gray-300"></div>
                                                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Private</h3>
                                                                    </div>
                                                                    <ul className="space-y-3 pl-5 border-l border-gray-100">
                                                                        {category.Private.map((id: string) => (
                                                                            <li
                                                                                key={id}
                                                                                ref={el => { sidebarItemRefs.current[id] = el; }} // Attach Ref
                                                                                className={`text-[13px] cursor-pointer transition-all duration-200 relative ${activeProduct === id ? 'text-black font-bold translate-x-1' : 'text-gray-400 hover:text-gray-600 hover:translate-x-1'}`}
                                                                                onClick={() => scrollToProduct(id)}
                                                                            >
                                                                                {activeProduct === id && (
                                                                                    <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 bg-[#FEBD16] rounded-full" />
                                                                                )}
                                                                                {getProductName(id)}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {category.Public && category.Public.length > 0 && (
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <div className="h-[1px] w-3 bg-gray-300"></div>
                                                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Public</h3>
                                                                    </div>
                                                                    <ul className="space-y-3 pl-5 border-l border-gray-100">
                                                                        {category.Public.map((id: string) => (
                                                                            <li
                                                                                key={id}
                                                                                ref={el => { sidebarItemRefs.current[id] = el; }} // Attach Ref
                                                                                className={`text-[13px] cursor-pointer transition-all duration-200 relative ${activeProduct === id ? 'text-black font-bold translate-x-1' : 'text-gray-400 hover:text-gray-600 hover:translate-x-1'}`}
                                                                                onClick={() => scrollToProduct(id)}
                                                                            >
                                                                                {activeProduct === id && (
                                                                                    <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 bg-[#FEBD16] rounded-full" />
                                                                                )}
                                                                                {getProductName(id)}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <ul className="space-y-3 pl-5 border-l border-gray-100">
                                                            {category.items?.map((id: string) => (
                                                                <li
                                                                    key={id}
                                                                    ref={el => { sidebarItemRefs.current[id] = el; }} // Attach Ref
                                                                    className={`text-[13px] cursor-pointer transition-all duration-200 relative ${activeProduct === id ? 'text-black font-bold translate-x-1' : 'text-gray-400 hover:text-gray-600 hover:translate-x-1'}`}
                                                                    onClick={() => scrollToProduct(id)}
                                                                >
                                                                    {activeProduct === id && (
                                                                        <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 bg-[#FEBD16] rounded-full" />
                                                                    )}
                                                                    {getProductName(id)}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Mobile Top Navigation */}
                <div className={`lg:hidden sticky z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-[top] duration-300 ${isHeaderVisible ? 'top-[70px] md:top-[80px]' : 'top-0'}`}>
                    <div className="flex overflow-x-auto px-4 py-3 gap-6 no-scrollbar">
                        {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
                            const category = sidebarStructure[key];
                            let isActiveCategory = false;
                            if (key === 'S') {
                                isActiveCategory = !!(category?.Private?.includes(activeProduct) || category?.Public?.includes(activeProduct));
                            } else {
                                isActiveCategory = !!category?.items?.includes(activeProduct);
                            }

                            const firstProductId = key === 'S'
                                ? (category.Private?.[0] || category.Public?.[0])
                                : category.items?.[0];

                            if (!firstProductId) return null;

                            return (
                                <button
                                    key={key}
                                    onClick={() => scrollToProduct(firstProductId)}
                                    className={`whitespace-nowrap text-sm font-bold transition-colors min-h-[44px] flex items-center px-1 duration-200 hover:text-primary ${isActiveCategory ? 'text-primary' : 'text-gray-500'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-h-screen pt-[120px] md:pt-[160px] lg:pt-[140px] px-4 lg:px-20 pb-40 bg-white lg:bg-transparent">
                    <div className="max-w-5xl mx-auto mb-10 lg:mb-32 text-center lg:text-left mt-4 lg:mt-0">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{t('제품 소개', 'Products', 'Productos')}</h1>
                        <p className="text-gray-600 text-sm md:text-lg">
                            {t('작고 단단한 내 집, 필요한 크기와 목적에 맞는 구성을 찾아보세요.', 'Find the right size and layout for your needs.', 'Encuentre el tamaño y la distribución que se ajusten a sus necesidades.')}
                        </p>
                        {products.length > visibleCount && (
                            <p className="mt-3 text-xs font-semibold text-gray-400 md:text-sm">
                                {t(
                                    `대표 모델 ${visibleCount}개부터 확인하고 전체 ${products.length}개 라인업으로 이어집니다.`,
                                    `${visibleCount} representative models first, followed by the full ${products.length}-model lineup.`,
                                    `Primero ${visibleCount} modelos representativos y, a continuación, la gama completa de ${products.length} modelos.`,
                                )}
                            </p>
                        )}
                        <p className="mt-4 text-xs leading-5 text-gray-500 md:text-sm md:leading-6">
                            {language === 'KO' ? (
                                <>
                                    라인업 제품은 구성과 마감에 따라 가격이 달라져 상담으로 안내드립니다. 기준 모델(3x6·3x9)의 공개 가격은{' '}
                                    <Link href="/customize" className="font-bold text-[#0d6e66] underline underline-offset-2">
                                        맞춤 구성
                                    </Link>
                                    에서 바로 확인할 수 있고, 운반·설치 등 별도 비용 구성은{' '}
                                    <Link href="/support#cost" className="font-bold text-[#0d6e66] underline underline-offset-2">
                                        비용 안내
                                    </Link>
                                    에 정리되어 있습니다.
                                </>
                            ) : language === 'ES' ? (
                                <>
                                    Los precios de la gama varían según la configuración. Consulte los precios base publicados en el{' '}
                                    <Link href="/customize" className="font-bold text-[#0d6e66] underline underline-offset-2">
                                        configurador
                                    </Link>
                                    .
                                </>
                            ) : (
                                <>
                                    Lineup prices vary by configuration. Check the published base prices in the{' '}
                                    <Link href="/customize" className="font-bold text-[#0d6e66] underline underline-offset-2">
                                        configurator
                                    </Link>
                                    .
                                </>
                            )}
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-12 lg:space-y-[20vh]"> {/* Increased spacing for better scroll detection */}
                        {visibleProducts.map((product) => {
                            // Check if this is the first product of its category to render the anchor
                            const globalIndex = products.findIndex((item) => item.id === product.id);
                            const isFirstOfCategory = globalIndex === 0 || products[globalIndex - 1]?.sizeCategory !== product.sizeCategory;
                            const categoryId = product.sizeCategory.toLowerCase(); // s, m, l, xl, solution, design

                            return (
                                <div key={product.id} className="relative">
                                    {/* Anchor for Scroll */}
                                    {isFirstOfCategory && (
                                        <div id={categoryId} className="absolute -top-[140px] invisible" />
                                    )}

                                    <div
                                        id={product.id}
                                        ref={(el) => { productRefs.current[product.id] = el; }}
                                        className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm scroll-mt-32 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
                                    >
                                        <div className="p-5 lg:p-0">
                                            {/* Product Header */}
                                            <div className="mb-4 lg:mb-8">
                                                <div className="flex items-baseline gap-4 mb-1 lg:mb-2">
                                                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">{product.name}</h2>
                                                </div>
                                                {product.tagline && (
                                                    <p className="text-sm lg:text-lg text-gray-600">{product.tagline}</p>
                                                )}
                                            </div>

                                            {/* Main Image */}
                                            <div
                                                className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 lg:mb-12"
                                                onClick={() => openGallery(product)}
                                            >
                                                {product.imageUrl && !failedImages.has(product.imageUrl) ? (
                                                    <>
                                                        <Image
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            sizes="(max-width: 768px) 100vw, 80vw"
                                                            loading={globalIndex < 2 ? 'eager' : 'lazy'}
                                                            onError={() => markImageFailed(product.imageUrl)}
                                                        />
                                                        {/* Gallery hint icon */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                                                            </div>
                                                        </div>
                                                        {/* Image count indicator if multiple */}
                                                        {(product.subImages && product.subImages.length > 0) && (
                                                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                                                                + {product.subImages.length + 1}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                                                        <Home className="w-8 h-8 mb-2 opacity-50" />
                                                        <span className="text-sm font-bold">제품 사진 준비 중</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mobile Accordion Toggle */}
                                            <button
                                                className="w-full mt-4 flex items-center justify-between lg:hidden text-gray-600 font-bold py-2 px-1 hover:text-gray-900"
                                                onClick={() => toggleMobileProduct(product.id)}
                                            >
                                                <span>{expandedMobileProducts.includes(product.id) ? t('상세정보 닫기', 'Hide Details', 'Ocultar detalles') : t('상세정보 보기', 'View Details', 'Ver detalles')}</span>
                                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileProducts.includes(product.id) ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>

                                        {/* Details Grid (Collapsible on Mobile) */}
                                        <div className={`lg:block ${expandedMobileProducts.includes(product.id) ? 'block px-5 pb-5' : 'hidden'} lg:px-0 lg:pb-0`}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
                                            {/* Left: Description & Specs */}
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{TEXT.description}</h3>
                                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                                        {product.description}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{TEXT.specs}</h3>
                                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{TEXT.price}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{product.details.price}</dd>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{TEXT.size}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{product.details.size}</dd>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{TEXT.structure}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{product.details.structure}</dd>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{TEXT.roof}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{product.details.roofType}</dd>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{TEXT.exterior}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{product.details.exterior}</dd>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <dt className="text-sm font-medium text-gray-500">{TEXT.interior}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{product.details.interior}</dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>

                                            {/* Right: Floor Plan */}
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{TEXT.floorPlan}</h3>
                                                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-100">
                                                    {product.floorPlan.src && !failedImages.has(product.floorPlan.src) ? (
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={product.floorPlan.src}
                                                                alt="Floor Plan"
                                                                fill
                                                                className="object-contain"
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 36vw"
                                                                onError={() => markImageFailed(product.floorPlan.src)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-400 text-sm">{TEXT.floorPlanWaiting}</div>
                                                    )}
                                            </div>

                                            {/* Soft CTA */}
                                            <div className="mt-8 lg:mt-12 pt-6 border-t border-gray-100 flex justify-center lg:justify-start">
                                                <a
                                                    href="/customize"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 font-bold text-sm transition-colors hover:bg-gray-50"
                                                >
                                                    {t('구성 상담 시작하기', 'Start a consultation', 'Iniciar una consulta')}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                                </a>
                                            </div>
                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {visibleCount < products.length && (
                            <div className="flex justify-center pt-4">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((current) => Math.min(products.length, current + 8))}
                                    className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
                                >
                                    더 많은 제품 보기 ({Math.min(products.length, visibleCount + 8)} / {products.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Gallery Modal */}
            <AnimatePresence>
                {galleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setGalleryOpen(false)}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label={t('갤러리 닫기', 'Close gallery', 'Cerrar galería')}
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white z-50 p-2"
                            onClick={() => setGalleryOpen(false)}
                        >
                            <X className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        <div className="relative w-full max-w-7xl max-h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>

                            {/* Main Display */}
                            <div className="relative w-full aspect-[16/9] md:aspect-[16/10] max-h-[80vh] bg-black">
                                {currentGalleryImages[currentImageIndex] && !failedImages.has(currentGalleryImages[currentImageIndex]) ? (
                                    <Image
                                        src={currentGalleryImages[currentImageIndex]}
                                        alt="Gallery"
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                        onError={() => markImageFailed(currentGalleryImages[currentImageIndex])}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
                                        <Home className="w-8 h-8 mb-2 opacity-50" />
                                        <span className="text-sm font-bold">이미지 점검 필요</span>
                                    </div>
                                )}

                                {/* Nav Arrows */}
                                <button
                                    type="button"
                                    aria-label={t('이전 이미지', 'Previous image', 'Imagen anterior')}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all"
                                    onClick={prevImage}
                                >
                                    <ChevronDown className="w-8 h-8 rotate-90" />
                                </button>
                                <button
                                    type="button"
                                    aria-label={t('다음 이미지', 'Next image', 'Imagen siguiente')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all"
                                    onClick={nextImage}
                                >
                                    <ChevronDown className="w-8 h-8 -rotate-90" />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-6 flex gap-3 overflow-x-auto max-w-full pb-2 hide-scrollbar px-4">
                                {currentGalleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        aria-label={t(`이미지 ${idx + 1} 보기`, `View image ${idx + 1}`, `Ver imagen ${idx + 1}`)}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-[#FEBD16] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        {failedImages.has(img) ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
                                                <Home className="w-5 h-5 opacity-50" />
                                            </div>
                                        ) : (
                                            <Image
                                                src={img}
                                                alt={`Thumb ${idx}`}
                                                fill
                                                className="object-cover"
                                                sizes="96px"
                                                onError={() => markImageFailed(img)}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
