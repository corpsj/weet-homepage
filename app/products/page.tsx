"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/supabase";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 제품 타입 정의 (Frontend View Model)
interface ProductData {
    id: string;
    name: string;
    subCategory: "Private" | "Public";
    sizeCategory: "S" | "M" | "L" | "XL" | "SOLUTION" | "DESIGN";
    imageUrl: string;
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
    };
};

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(["S", "M", "L", "XL", "SOLUTION", "DESIGN"]);
    const [activeProduct, setActiveProduct] = useState<string>("");
    const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [direction, setDirection] = useState(0);
    const prevActiveProduct = useRef<string>("");

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

    const toggleCategory = (category: string) => {
        if (expandedCategories.includes(category)) {
            setExpandedCategories(expandedCategories.filter((c) => c !== category));
        } else {
            setExpandedCategories([...expandedCategories, category]);
        }
    };

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
            // Use a center-screen offset for better UX
            const checkPoint = currentScrollY + (window.innerHeight / 3);

            for (const product of products) {
                const element = productRefs.current[product.id];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    // Check if the product section contains the checkpoint
                    if (checkPoint >= offsetTop && checkPoint < offsetTop + offsetHeight) {
                        setActiveProduct(product.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [products]);

    const getProductName = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product?.name || id;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
                <div className="text-xl font-bold text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#EBEBEB]">
            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
                {/* Sidebar */}
                <aside className="w-[300px] h-screen sticky top-0 overflow-y-auto hidden lg:block pt-[120px] pb-20 pl-[60px]">
                    <div className="space-y-12">
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
                                        className="flex items-start justify-between cursor-pointer mb-4"
                                        onClick={() => toggleCategory(key)}
                                    >
                                        <div>
                                            <h2 className={`text-2xl font-bold transition-colors ${isExpanded ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                                {category.label}
                                            </h2>
                                            {category.subtitle && (
                                                <p className="text-xs text-gray-400 mt-1 whitespace-pre-line leading-relaxed">
                                                    {category.subtitle}
                                                </p>
                                            )}
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>

                                    {isExpanded && (
                                        <div className="space-y-6 pl-2 border-l border-gray-200 ml-1">
                                            {/* S만 세부 카테고리(Private/Public) 지원 */}
                                            {key === 'S' ? (
                                                <>
                                                    {category.Private && category.Private.length > 0 && (
                                                        <div className="mb-4">
                                                            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Private</h3>
                                                            <ul className="space-y-2">
                                                                {category.Private.map((id: string) => (
                                                                    <li
                                                                        key={id}
                                                                        className={`text-sm cursor-pointer transition-colors ${activeProduct === id ? 'text-[#FEBD16] font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                                                                        onClick={() => scrollToProduct(id)}
                                                                    >
                                                                        {getProductName(id)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {category.Public && category.Public.length > 0 && (
                                                        <div>
                                                            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Public</h3>
                                                            <ul className="space-y-2">
                                                                {category.Public.map((id: string) => (
                                                                    <li
                                                                        key={id}
                                                                        className={`text-sm cursor-pointer transition-colors ${activeProduct === id ? 'text-[#FEBD16] font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                                                                        onClick={() => scrollToProduct(id)}
                                                                    >
                                                                        {getProductName(id)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                // M, L, XL, SOLUTION, DESIGN - 세부 카테고리 없음
                                                <ul className="space-y-2">
                                                    {category.items?.map((id: string) => (
                                                        <li
                                                            key={id}
                                                            className={`text-sm cursor-pointer transition-colors ${activeProduct === id ? 'text-[#FEBD16] font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                                                            onClick={() => scrollToProduct(id)}
                                                        >
                                                            {getProductName(id)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Mobile Top Navigation */}
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
                    {/* Active Product Info Bar */}
                    {activeProduct && (() => {
                        const activeIndex = products.findIndex(p => p.id === activeProduct);
                        const prevProduct = products[activeIndex - 1];
                        const nextProduct = products[activeIndex + 1];

                        const slideVariants = {
                            enter: (direction: number) => ({
                                x: direction > 0 ? 20 : -20,
                                opacity: 0
                            }),
                            center: {
                                x: 0,
                                opacity: 1
                            },
                            exit: (direction: number) => ({
                                x: direction > 0 ? -20 : 20,
                                opacity: 0
                            })
                        };

                        return (
                            <div className="px-4 py-2 bg-white/80 backdrop-blur-md border-t border-gray-100 grid grid-cols-[1fr_auto_1fr] items-center text-sm gap-4 overflow-hidden h-[42px]">
                                <div className="text-left min-w-0">
                                    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                                        {prevProduct && (
                                            <motion.div
                                                key={prevProduct.id}
                                                custom={direction}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                className="truncate text-xs text-gray-400 cursor-pointer hover:text-gray-600 block"
                                                onClick={() => scrollToProduct(prevProduct.id)}
                                            >
                                                {prevProduct.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="text-center flex justify-center min-w-[120px]">
                                    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                                        <motion.div
                                            key={activeProduct}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                            className="font-bold text-black text-base truncate"
                                        >
                                            {getProductName(activeProduct)}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="text-right min-w-0">
                                    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                                        {nextProduct && (
                                            <motion.div
                                                key={nextProduct.id}
                                                custom={direction}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                className="truncate text-xs text-gray-400 cursor-pointer hover:text-gray-600 block ml-auto"
                                                onClick={() => nextProduct && scrollToProduct(nextProduct.id)}
                                            >
                                                {nextProduct.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Main Content */}
                <main className="flex-1 min-h-screen pt-[160px] md:pt-[190px] lg:pt-[120px] px-4 lg:px-20 pb-40">
                    <div className="max-w-5xl mx-auto space-y-40">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                ref={(el) => { productRefs.current[product.id] = el; }}
                                className="scroll-mt-32"
                            >
                                {/* Product Header */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
                                        <span className="text-xl text-[#FEBD16] font-medium">{product.sizeCategory}</span>
                                    </div>
                                    {product.tagline && (
                                        <p className="text-lg text-gray-600">{product.tagline}</p>
                                    )}
                                </div>

                                {/* Main Image */}
                                <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden mb-12 shadow-sm">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                            priority={products.indexOf(product) < 2}
                                        />
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
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Description</h3>
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                                {product.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Specifications</h3>
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">가격</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{product.details.price}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">사이즈</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{product.details.size}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">구조</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{product.details.structure}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">지붕재</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{product.details.roofType}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">외부마감</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{product.details.exterior}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">내부마감</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{product.details.interior}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    {/* Right: Floor Plan */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Floor Plan</h3>
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
                                                <div className="text-gray-400 text-sm">도면 준비중</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
