"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/supabase";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// 제품 타입 정의 (Frontend View Model)
interface ProductData {
    id: string;
    name: string;
    subCategory: "Private" | "Public";
    sizeCategory: "S" | "M" | "L" | "XL" | "SOLUTION" | "DESIGN";
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
        sizeCategory: p.size_category as "S" | "M" | "L" | "XL" | "SOLUTION" | "DESIGN",
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

export default function ProductsPage() {
    const { language } = useLanguage();
    const isKO = language === 'KO';
    const TEXT = {
        loading: isKO ? '불러오는 중...' : 'Loading...',
        description: isKO ? '설명' : 'Description',
        specs: isKO ? '상세 정보' : 'Specifications',
        price: isKO ? '가격' : 'Price',
        size: isKO ? '크기' : 'Size',
        structure: isKO ? '구조' : 'Structure',
        roof: isKO ? '지붕재' : 'Roof',
        exterior: isKO ? '외부마감' : 'Exterior',
        interior: isKO ? '내부마감' : 'Interior',
        floorPlan: isKO ? '평면도' : 'Floor Plan',
        floorPlanWaiting: isKO ? '평면 준비중' : 'Floor plan coming soon',
    };
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(["S", "M", "L", "XL", "SOLUTION", "DESIGN"]);
    const [activeProduct, setActiveProduct] = useState<string>("");
    const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
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
    const [direction, setDirection] = useState(0);
    const prevActiveProduct = useRef<string>("");

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

    useEffect(() => {
        if (prevActiveProduct.current && activeProduct !== prevActiveProduct.current) {
            const prevIndex = products.findIndex(p => p.id === prevActiveProduct.current);
            const currIndex = products.findIndex(p => p.id === activeProduct);
            if (prevIndex !== -1 && currIndex !== -1) {
                setDirection(currIndex > prevIndex ? 1 : -1);
            }
        }
        prevActiveProduct.current = activeProduct;
    }, [activeProduct, products]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                const mappedData = data.map(mapProductToData);

                // Sort by Category Order
                const categoryOrder = ["S", "M", "L", "XL", "SOLUTION", "DESIGN"];
                mappedData.sort((a, b) => {
                    const idxA = categoryOrder.indexOf(a.sizeCategory);
                    const idxB = categoryOrder.indexOf(b.sizeCategory);
                    return idxA - idxB;
                });

                setProducts(mappedData);
                if (mappedData.length > 0) {
                    setActiveProduct(mappedData[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Scroll to Hash on Load
    useEffect(() => {
        if (!loading && products.length > 0 && window.location.hash) {
            const hash = window.location.hash.substring(1); // remove #
            // use timeout to ensure rendering
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Also expand the category if needed
                    const productCategory = products.find(p => p.sizeCategory.toLowerCase() === hash)?.sizeCategory;
                    if (productCategory) {
                        setExpandedCategories(prev => {
                            if (!prev.includes(productCategory)) return [...prev, productCategory];
                            return prev;
                        });
                    }
                }
            }, 100);
        }
    }, [loading, products]);

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
        SOLUTION: {
            label: "SOLUTION",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "SOLUTION").map(p => p.id)
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

    // Auto-expand category based on active Product
    useEffect(() => {
        if (!activeProduct) return;

        const activeProductData = products.find(p => p.id === activeProduct);
        if (activeProductData) {
            const category = activeProductData.sizeCategory;
            // Also expand S if subcategory private/public? "S" is the key in sidebarStructure
            if (!expandedCategories.includes(category)) {
                setExpandedCategories(prev => [...prev, category]);
            }
        }
    }, [activeProduct, products]);

    const scrollToProduct = (productId: string) => {
        const element = productRefs.current[productId];
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveProduct(productId);
        }
    };

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

            // Active Product Logic
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if we are at bottom
            if (currentScrollY + windowHeight + 100 >= documentHeight) {
                // Optional: Set active to last product?
            }

            // Find visible product
            // Strategy: Find the product that occupies the most screen space or whose top is closest to a "reading line" (e.g., top 1/3)
            let maxOverlap = 0;
            let visibleProductId = "";

            const readingTop = currentScrollY + 150; // Offset for header
            const readingBottom = currentScrollY + windowHeight;

            for (const product of products) {
                const element = productRefs.current[product.id];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    const elementBottom = offsetTop + offsetHeight;

                    // Calculate overlap
                    const overlapTop = Math.max(readingTop, offsetTop);
                    const overlapBottom = Math.min(readingBottom, elementBottom);
                    const overlap = Math.max(0, overlapBottom - overlapTop);

                    if (overlap > maxOverlap) {
                        maxOverlap = overlap;
                        visibleProductId = product.id;
                    }
                }
            }

            if (visibleProductId && visibleProductId !== activeProduct) {
                // Prevent "jump" by only updating if significantly different or manual override needed
                // Actually, react state update won't cause scroll jump unless layout shifts.
                // The user reported "scrolling up jumps to 3x9". This usually happens if `expandedCategories` state resets or something causes re-render that loses scroll position.
                // But here we are just setting activeProduct.
                // Let's ensure we don't accidentally select the first product when scrolling up from L if overlap logic is weird.

                setActiveProduct(visibleProductId);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [products, activeProduct]); // Added activeProduct to dependency if needed, but handled inside. Actually checking visibleProductId !== activeProduct uses closure state if not in dep array?
    // Better to use ref for current active if we want to avoid re-binding listener, OR rely on setState batching.
    // The previous implementation was fine dependency-wise. 
    // The "Jump" to 3x9 suggests that when `setActiveProduct` changes, maybe `toggleCategory` logic or some effect forces a scroll?
    // Ah, `toggleCategory` expands/collapses. If scrolling up changes active product to one in a CLOSED category, does it force close sections?
    // No, `expandedCategories` is separate.

    // The issue might be that `scrollToProduct` was being called automatically? No, only on click.

    // Let's stick to the overlap logic which is improved.
    // Also, one issue with the "Scroll Cutoff" might be `overflow-y-auto` on the sidebar itself within the flex container not having a defined height.
    // In the Sidebar replacement above, I added `h-screen sticky top-0 ... pb-20`.
    // The container needs `h-screen` to scroll internally if content is long.
    // The previous code had `h-screen overflow-y-auto`, which is correct for sticky sidebar.
    // But if the sidebar is taller than viewport, `sticky` behaves weirdly if not handled.
    // `overflow-y-auto` handles internal scroll.

    // The "Cutoff after M" might be because the Main Content ended too early?
    // I added `space-y-[20vh]` to main content to ensure spacing.
    // I will checking the sidebar `overflow` class in the previous tool call.
    // I used `overflow-hidden` on parent and `overflow-y-auto` on child. This is good flex pattern.

    const getProductName = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product?.name || id;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
                <div className="text-xl font-bold text-gray-500">{TEXT.loading}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EBEBEB]">
            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
                {/* Sidebar */}
                <aside className="w-[280px] h-screen sticky top-0 hidden lg:flex flex-col pt-[140px] pb-10 pl-[60px] overflow-hidden">
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
                <div className={`lg:hidden sticky z-40 bg-[#EBEBEB]/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-[top] duration-300 ${isHeaderVisible ? 'top-[105px] md:top-[135px] lg:top-[110px]' : 'top-0'}`}>
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
                                    className={`whitespace-nowrap text-sm font-bold transition-colors ${isActiveCategory ? 'text-[#FEBD16]' : 'text-gray-500'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 min-h-screen pt-[100px] md:pt-[190px] lg:pt-[140px] px-4 lg:px-20 pb-40">
                    {/* Active Product Overlay for Desktop (Optional, maybe minimal breadcrumb instead?) */}
                    {/* Removing the sticky header inside main content to prevent conflicts, Sidebar handles navigation */}

                    <div className="max-w-5xl mx-auto space-y-[20vh]"> {/* Increased spacing for better scroll detection */}
                        {products.map((product, index) => {
                            // Check if this is the first product of its category to render the anchor
                            const isFirstOfCategory = index === 0 || products[index - 1].sizeCategory !== product.sizeCategory;
                            const categoryId = product.sizeCategory.toLowerCase(); // s, m, l, xl, solution, design

                            return (
                                <div key={product.id} className="relative">
                                    {/* Anchor for Scroll */}
                                    {isFirstOfCategory && (
                                        <div id={categoryId} className="absolute -top-[140px] invisible" />
                                    )}

                                    <div
                                        ref={(el) => { productRefs.current[product.id] = el; }}
                                        className="scroll-mt-32"
                                    >
                                        {/* Product Header */}
                                        <div className="mb-8">
                                            <div className="flex items-baseline gap-4 mb-2">
                                                <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
                                            </div>
                                            {product.tagline && (
                                                <p className="text-lg text-gray-600">{product.tagline}</p>
                                            )}
                                        </div>

                                        {/* Main Image */}
                                        <div
                                            className="relative w-full aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden mb-12 shadow-sm cursor-pointer group"
                                            onClick={() => openGallery(product)}
                                        >
                                            {product.imageUrl ? (
                                                <>
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, 80vw"
                                                        priority={products.indexOf(product) < 2}
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
                                                            + {product.subImages.length + 1} Images
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
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
                                                <div className="w-full aspect-[4/3] rounded-xl flex items-center justify-center relative overflow-hidden border border-gray-100">
                                                    {product.floorPlan.src ? (
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={product.floorPlan.src}
                                                                alt="Floor Plan"
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-400 text-sm">{TEXT.floorPlanWaiting}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
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
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white z-50 p-2"
                            onClick={() => setGalleryOpen(false)}
                        >
                            <X className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        <div className="relative w-full max-w-7xl max-h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>

                            {/* Main Display */}
                            <div className="relative w-full aspect-[16/9] md:aspect-[16/10] max-h-[80vh] bg-black">
                                <Image
                                    src={currentGalleryImages[currentImageIndex]}
                                    alt="Gallery"
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />

                                {/* Nav Arrows */}
                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all"
                                    onClick={prevImage}
                                >
                                    <ChevronDown className="w-8 h-8 rotate-90" />
                                </button>
                                <button
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
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-[#FEBD16] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumb ${idx}`}
                                            fill
                                            className="object-cover"
                                        />
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
