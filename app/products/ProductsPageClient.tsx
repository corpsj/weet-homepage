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
    const productRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
    const didHandleInitialHash = useRef(false);

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

    // 사이드바 라인업 아이템 (활성 = 잉크/골드 점, 비활성 = muted)
    const renderSidebarItem = (id: string) => {
        const active = activeProduct === id;
        return (
            <li
                key={id}
                ref={el => { sidebarItemRefs.current[id] = el; }}
                onClick={() => scrollToProduct(id)}
                className={`relative cursor-pointer text-[13.5px] transition-all duration-200 hover:translate-x-1 ${active ? 'font-semibold text-weet-ink translate-x-0.5' : 'font-normal text-weet-muted hover:text-weet-sub'}`}
            >
                <span
                    className={`absolute -left-[22px] top-[7px] h-1.5 w-1.5 rounded-full bg-weet-gold transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
                />
                {getProductName(id)}
            </li>
        );
    };

    return (
        <div className="min-h-screen bg-weet-paper text-weet-ink">
            <div className="relative mx-auto flex max-w-[1440px] flex-col lg:flex-row">
                {/* ===== SIDEBAR (라인업, sticky) ===== */}
                <aside className="sticky top-[72px] z-10 hidden h-[calc(100vh-72px)] w-[260px] flex-none flex-col overflow-hidden bg-weet-paper pb-10 pl-[5vw] pt-14 lg:flex">
                    <div className="mb-9 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-weet-gold-deep">
                        Lineup · 라인업
                    </div>
                    <div ref={sidebarRef} className="custom-scrollbar flex-1 space-y-8 overflow-y-auto pr-4">
                        {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
                            const category = sidebarStructure[key];
                            const isExpanded = expandedCategories.includes(key);
                            const hasItems = (category.items && category.items.length > 0) ||
                                (category.Private && category.Private.length > 0) ||
                                (category.Public && category.Public.length > 0);

                            if (!hasItems) return null;

                            // 활성 카테고리: 현재 보고 있는 제품이 속한 카테고리
                            const activeData = products.find(p => p.id === activeProduct);
                            const isActiveCat = activeData?.sizeCategory === key;

                            return (
                                <div key={key} className="group">
                                    <h2
                                        onClick={() => handleCategoryClick(key)}
                                        className={`m-0 mb-3 cursor-pointer font-bold tracking-[-0.04em] transition-all duration-300 group-hover:translate-x-1.5 ${key === 'DESIGN' ? 'text-[26px] tracking-[-0.02em]' : 'text-[40px]'} ${isActiveCat ? 'text-weet-ink' : 'text-[#C9BFAE] group-hover:text-weet-muted'}`}
                                    >
                                        {category.label}
                                    </h2>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-5 pb-1 pt-1">
                                                    {/* S만 세부 카테고리(Private/Public) 지원 */}
                                                    {key === 'S' ? (
                                                        <>
                                                            {category.Private && category.Private.length > 0 && (
                                                                <div>
                                                                    <div className="mb-3 flex items-center gap-2">
                                                                        <span className="h-px w-3 bg-weet-line-2" />
                                                                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-weet-muted">Private</h3>
                                                                    </div>
                                                                    <ul className="ml-1 flex list-none flex-col gap-3 border-l border-weet-line-2 pl-4">
                                                                        {category.Private.map(renderSidebarItem)}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {category.Public && category.Public.length > 0 && (
                                                                <div>
                                                                    <div className="mb-3 flex items-center gap-2">
                                                                        <span className="h-px w-3 bg-weet-line-2" />
                                                                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-weet-muted">Public</h3>
                                                                    </div>
                                                                    <ul className="ml-1 flex list-none flex-col gap-3 border-l border-weet-line-2 pl-4">
                                                                        {category.Public.map(renderSidebarItem)}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <ul className="ml-1 flex list-none flex-col gap-3 border-l border-weet-line-2 pl-4">
                                                            {category.items?.map(renderSidebarItem)}
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

                {/* ===== Mobile Top Navigation ===== */}
                <div className="sticky top-[72px] z-40 border-b border-weet-line bg-weet-paper/95 backdrop-blur-sm lg:hidden">
                    <div className="no-scrollbar flex gap-6 overflow-x-auto px-[5vw] py-3">
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
                                    className={`flex min-h-[44px] items-center whitespace-nowrap px-1 text-sm font-semibold transition-colors duration-200 hover:text-weet-gold-deep ${isActiveCategory ? 'text-weet-gold-deep' : 'text-weet-muted'}`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ===== Main Content ===== */}
                <main className="min-h-screen flex-1 px-[5vw] pb-40 pt-8 lg:max-w-[1000px] lg:pt-14">
                    <div className="mb-12 lg:mb-20">
                        <h1 className="mb-4 text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.03em]">{t('제품 소개', 'Products', 'Productos')}</h1>
                        <p className="mb-3.5 max-w-[54ch] text-[clamp(15px,1.4vw,18px)] leading-[1.7] text-weet-sub kr-balance">
                            {t('작고 단단한 내 집. 필요한 크기와 목적에 맞는 구성을 찾아보세요.', 'Find the right size and layout for your needs.', 'Encuentre el tamaño y la distribución que se ajusten a sus necesidades.')}
                        </p>
                        {products.length > visibleCount && (
                            <p className="mb-2 text-[13.5px] font-medium text-weet-muted">
                                {t(
                                    `대표 모델 ${visibleCount}개부터 확인하고 전체 ${products.length}개 라인업으로 이어집니다.`,
                                    `${visibleCount} representative models first, followed by the full ${products.length}-model lineup.`,
                                    `Primero ${visibleCount} modelos representativos y, a continuación, la gama completa de ${products.length} modelos.`,
                                )}
                            </p>
                        )}
                        <p className="max-w-[60ch] text-[13.5px] leading-[1.7] text-weet-muted kr-balance">
                            {language === 'KO' ? (
                                <>
                                    라인업 제품은 구성과 마감에 따라 가격이 달라져 상담으로 안내드립니다. 기준 모델(3x6·3x9)의 공개 가격은{' '}
                                    <Link href="/customize" className="font-semibold text-weet-gold-deep underline underline-offset-2">
                                        맞춤 구성
                                    </Link>
                                    에서 바로 확인할 수 있고, 운반·설치 등 별도 비용 구성은{' '}
                                    <Link href="/support#cost" className="font-semibold text-weet-gold-deep underline underline-offset-2">
                                        비용 안내
                                    </Link>
                                    에 정리되어 있습니다.
                                </>
                            ) : language === 'ES' ? (
                                <>
                                    Los precios de la gama varían según la configuración. Consulte los precios base publicados en el{' '}
                                    <Link href="/customize" className="font-semibold text-weet-gold-deep underline underline-offset-2">
                                        configurador
                                    </Link>
                                    .
                                </>
                            ) : (
                                <>
                                    Lineup prices vary by configuration. Check the published base prices in the{' '}
                                    <Link href="/customize" className="font-semibold text-weet-gold-deep underline underline-offset-2">
                                        configurator
                                    </Link>
                                    .
                                </>
                            )}
                        </p>
                    </div>

                    <div className="flex flex-col gap-20 lg:gap-[120px]">
                        {visibleProducts.map((product) => {
                            // Check if this is the first product of its category to render the anchor
                            const globalIndex = products.findIndex((item) => item.id === product.id);
                            const isFirstOfCategory = globalIndex === 0 || products[globalIndex - 1]?.sizeCategory !== product.sizeCategory;
                            const categoryId = product.sizeCategory.toLowerCase(); // s, m, l, xl, design
                            const imageCount = (product.subImages?.filter(Boolean).length || 0) + (product.imageUrl ? 1 : 0);

                            return (
                                <div key={product.id} className="relative">
                                    {/* Anchor for Scroll */}
                                    {isFirstOfCategory && (
                                        <div id={categoryId} className="invisible absolute -top-[140px]" />
                                    )}

                                    <article
                                        id={product.id}
                                        ref={(el) => { productRefs.current[product.id] = el; }}
                                        className="wt-reveal scroll-mt-[100px] overflow-hidden rounded-[12px] border border-weet-line-2 bg-weet-surface shadow-weet-card lg:overflow-visible lg:rounded-none lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
                                    >
                                        <div className="p-5 lg:p-0">
                                            {/* Product Header */}
                                            <div className="mb-5 lg:mb-6">
                                                <div className="flex items-baseline gap-3.5">
                                                    <span className="font-mono text-[13px] font-semibold text-weet-gold-deep">{product.sizeCategory}</span>
                                                    <h2 className="text-[clamp(24px,3vw,38px)] font-semibold tracking-[-0.02em]">{product.name}</h2>
                                                </div>
                                                {product.tagline && (
                                                    <p className="mt-2 text-[15px] text-weet-sub kr-balance lg:text-base">{product.tagline}</p>
                                                )}
                                            </div>

                                            {/* Main Image (hover hint + count pill, click → gallery) */}
                                            <div
                                                className="group relative mb-8 aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-[10px] bg-weet-line lg:mb-10"
                                                onClick={() => openGallery(product)}
                                            >
                                                {product.imageUrl && !failedImages.has(product.imageUrl) ? (
                                                    <>
                                                        <Image
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                                                            sizes="(max-width: 768px) 100vw, 80vw"
                                                            loading={globalIndex < 2 ? 'eager' : 'lazy'}
                                                            onError={() => markImageFailed(product.imageUrl)}
                                                        />
                                                        {/* "자세히 보기" hint pill */}
                                                        <div className="pointer-events-none absolute bottom-4 left-4 flex translate-y-2.5 items-center gap-1.5 rounded-full bg-weet-paper/95 px-3.5 py-2 text-[12px] font-semibold text-weet-ink opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                            {t('자세히 보기', 'View details', 'Ver detalles')} →
                                                        </div>
                                                        {/* Image count indicator if multiple */}
                                                        {imageCount > 1 && (
                                                            <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-weet-ink/60 px-3 py-1.5 text-[12px] font-semibold text-weet-paper backdrop-blur-sm">
                                                                + {imageCount}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-weet-paper-alt text-weet-muted">
                                                        <Home className="mb-2 h-8 w-8 opacity-50" />
                                                        <span className="text-sm font-semibold">{t('제품 사진 준비 중', 'Photo coming soon', 'Foto próximamente')}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mobile Accordion Toggle */}
                                            <button
                                                className="mt-2 flex w-full items-center justify-between px-1 py-2 font-semibold text-weet-sub hover:text-weet-ink lg:hidden"
                                                onClick={() => toggleMobileProduct(product.id)}
                                            >
                                                <span>{expandedMobileProducts.includes(product.id) ? t('상세정보 닫기', 'Hide Details', 'Ocultar detalles') : t('상세정보 보기', 'View Details', 'Ver detalles')}</span>
                                                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedMobileProducts.includes(product.id) ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>

                                        {/* Details Grid (Collapsible on Mobile) */}
                                        <div className={`lg:block ${expandedMobileProducts.includes(product.id) ? 'block px-5 pb-5' : 'hidden'} lg:px-0 lg:pb-0`}>
                                            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
                                                {/* Left: Description & Specs */}
                                                <div className="flex flex-col gap-8">
                                                    <div>
                                                        <h3 className="mb-3.5 border-b border-weet-line-2 pb-2.5 text-base font-semibold text-weet-ink">{TEXT.description}</h3>
                                                        <p className="whitespace-pre-line text-[14.5px] leading-[1.8] text-weet-sub kr-balance">
                                                            {product.description}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="mb-4 border-b border-weet-line-2 pb-2.5 text-base font-semibold text-weet-ink">{TEXT.specs}</h3>
                                                        <dl className="grid grid-cols-2 gap-x-4 gap-y-[18px]">
                                                            <div>
                                                                <dt className="text-[12.5px] font-medium text-weet-muted">{TEXT.price}</dt>
                                                                <dd className="mt-1 text-[14px] text-weet-ink">{product.details.price}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-[12.5px] font-medium text-weet-muted">{TEXT.size}</dt>
                                                                <dd className="mt-1 text-[14px] text-weet-ink">{product.details.size}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-[12.5px] font-medium text-weet-muted">{TEXT.structure}</dt>
                                                                <dd className="mt-1 text-[14px] text-weet-ink">{product.details.structure}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-[12.5px] font-medium text-weet-muted">{TEXT.roof}</dt>
                                                                <dd className="mt-1 text-[14px] text-weet-ink">{product.details.roofType}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-[12.5px] font-medium text-weet-muted">{TEXT.exterior}</dt>
                                                                <dd className="mt-1 text-[14px] text-weet-ink">{product.details.exterior}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-[12.5px] font-medium text-weet-muted">{TEXT.interior}</dt>
                                                                <dd className="mt-1 text-[14px] text-weet-ink">{product.details.interior}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>

                                                {/* Right: Floor Plan + CTA */}
                                                <div>
                                                    <h3 className="mb-3.5 border-b border-weet-line-2 pb-2.5 text-base font-semibold text-weet-ink">{TEXT.floorPlan}</h3>
                                                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[10px] border border-weet-line-2 bg-white">
                                                        {product.floorPlan.src && !failedImages.has(product.floorPlan.src) ? (
                                                            <div className="relative h-full w-full p-4">
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
                                                            <div className="text-[13px] text-weet-muted">{TEXT.floorPlanWaiting}</div>
                                                        )}
                                                    </div>

                                                    {/* Soft CTA */}
                                                    <div className="mt-7 flex justify-center border-t border-weet-line-2 pt-5 lg:justify-start">
                                                        <Link
                                                            href="/customize"
                                                            className="inline-flex items-center gap-2 rounded-[6px] border border-weet-line-2 bg-white px-5 py-3 text-sm font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
                                                        >
                                                            {t('구성 상담 시작하기', 'Start a consultation', 'Iniciar una consulta')} →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}

                        {visibleCount < products.length && (
                            <div className="flex justify-center pt-4">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((current) => Math.min(products.length, current + 8))}
                                    className="inline-flex h-12 items-center justify-center rounded-[8px] border border-weet-line-2 bg-white px-6 text-sm font-semibold text-weet-ink transition-colors hover:bg-weet-surface"
                                >
                                    {t('더 많은 제품 보기', 'View more products', 'Ver más productos')} ({Math.min(products.length, visibleCount + 8)} / {products.length})
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Gallery Modal (Lightbox) */}
            <AnimatePresence>
                {galleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setGalleryOpen(false)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-weet-ink-deep/95 p-4 md:p-10"
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label={t('갤러리 닫기', 'Close gallery', 'Cerrar galería')}
                            className="absolute right-4 top-4 z-50 p-2 text-weet-paper/60 transition-colors hover:text-weet-paper md:right-8 md:top-8"
                            onClick={() => setGalleryOpen(false)}
                        >
                            <X className="h-8 w-8 md:h-10 md:w-10" />
                        </button>

                        <div className="relative flex max-h-full w-full max-w-7xl flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                            {/* Main Display */}
                            <div className="relative aspect-[16/9] max-h-[80vh] w-full bg-black md:aspect-[16/10]">
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
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-weet-paper/60">
                                        <Home className="mb-2 h-8 w-8 opacity-50" />
                                        <span className="text-sm font-semibold">{t('이미지 점검 필요', 'Image unavailable', 'Imagen no disponible')}</span>
                                    </div>
                                )}

                                {/* Nav Arrows */}
                                <button
                                    type="button"
                                    aria-label={t('이전 이미지', 'Previous image', 'Imagen anterior')}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-weet-paper/10 p-3 text-weet-paper backdrop-blur-md transition-all hover:bg-weet-paper/20"
                                    onClick={prevImage}
                                >
                                    <ChevronDown className="h-8 w-8 rotate-90" />
                                </button>
                                <button
                                    type="button"
                                    aria-label={t('다음 이미지', 'Next image', 'Imagen siguiente')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-weet-paper/10 p-3 text-weet-paper backdrop-blur-md transition-all hover:bg-weet-paper/20"
                                    onClick={nextImage}
                                >
                                    <ChevronDown className="h-8 w-8 -rotate-90" />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="hide-scrollbar mt-6 flex max-w-full gap-3 overflow-x-auto px-4 pb-2">
                                {currentGalleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        aria-label={t(`이미지 ${idx + 1} 보기`, `View image ${idx + 1}`, `Ver imagen ${idx + 1}`)}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-24 md:w-24 ${currentImageIndex === idx ? 'border-weet-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        {failedImages.has(img) ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-weet-ink text-weet-muted">
                                                <Home className="h-5 w-5 opacity-50" />
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
