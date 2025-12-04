"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/supabase";

// 제품 타입 정의 (Frontend View Model)
interface ProductData {
  id: string;
  name: string;
  category: string;
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
    category: p.category,
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["S"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeProduct, setActiveProduct] = useState<string>("");
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(null);
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  const sidebarStructure = useMemo<Record<string, SidebarCategory>>(() => {
    return {
      S: {
        label: "S",
        subtitle: "",
        Private: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Private").map(p => p.id),
        Public: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Public").map(p => p.id),
      },
      M: {
        label: "M",
        subtitle: "Small unit + Small unit",
        items: products.filter(p => p.sizeCategory === "M").map(p => p.id)
      },
      L: {
        label: "L",
        subtitle: "Small unit + Small unit\n+ 현장 공사",
        items: products.filter(p => p.sizeCategory === "L").map(p => p.id)
      },
      XL: {
        label: "XL",
        subtitle: "단지개념",
        items: products.filter(p => p.sizeCategory === "XL").map(p => p.id)
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
  }, [products]);

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
      const headerOffset = 100; // Adjusted for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveProduct(productId);

      // Mobile: Close sidebar after selection
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      for (const product of products) {
        const element = productRefs.current[product.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveProduct(product.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
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
    <div className="min-h-screen bg-[#EBEBEB] relative">
      {/* Floor Plan Modal */}
      {selectedFloorPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedFloorPlan(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video bg-white rounded-xl overflow-hidden shadow-2xl">
            <button
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
              onClick={() => setSelectedFloorPlan(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedFloorPlan}
                alt="Floor Plan Full View"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      {/* ... existing button ... */}

      {/* Floating Sidebar */}
      <aside
        className={`
        fixed top-[116px] md:top-[156px] lg:top-[196px]
        w-[200px] md:w-[220px]
        left-4 lg:left-6
        bg-white/95 backdrop-blur-md
        overflow-y-auto
        transition-all duration-300 ease-in-out z-40
        ${sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-[250px] opacity-0 lg:translate-x-0 lg:opacity-100"}
        rounded-xl shadow-2xl
        max-h-[calc(100vh-220px)]
      `}
      >
        {/* ... existing sidebar content ... */}
        {/* Update Sidebar Items to match products-1 style more closely if needed */}
        {/* Categories */}
        <div className="p-4 pt-6 space-y-8">
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
                  className="flex items-start justify-between cursor-pointer mb-2"
                  onClick={() => toggleCategory(key)}
                >
                  <div>
                    <h3 className={`text-[20px] font-bold transition-colors ${isExpanded ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      {category.label}
                    </h3>
                    {category.subtitle && (
                      <p className="text-[11px] text-gray-400 mt-1 whitespace-pre-line leading-relaxed">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <path d="M7 10l5 5 5-5z" fill={isExpanded ? "currentColor" : "#9CA3AF"} />
                  </svg>
                </div>

                {isExpanded && (
                  <div className="space-y-4 pl-1 mt-3">
                    {/* S Category Special Handling */}
                    {key === 'S' ? (
                      <>
                        {category.Private && category.Private.length > 0 && (
                          <div className="mb-3">
                            <p className="text-[11px] font-semibold mb-2 text-gray-400 uppercase tracking-wider">Private</p>
                            <div className="space-y-1 text-[12px]">
                              {category.Private.map((id: string) => (
                                <p
                                  key={id}
                                  className={`cursor-pointer py-0.5 transition-colors hover:text-[#FEBD16] ${activeProduct === id ? "text-[#FEBD16] font-bold bg-[#FEBD16]/10 px-2 -mx-2 rounded" : "text-gray-500"
                                    }`}
                                  onClick={() => scrollToProduct(id)}
                                >
                                  {getProductName(id)}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        {category.Public && category.Public.length > 0 && (
                          <div className="mb-3">
                            <p className="text-[11px] font-semibold mb-2 text-gray-400 uppercase tracking-wider">Public</p>
                            <div className="space-y-1 text-[12px]">
                              {category.Public.map((id: string) => (
                                <p
                                  key={id}
                                  className={`cursor-pointer py-0.5 transition-colors hover:text-[#FEBD16] ${activeProduct === id ? "text-[#FEBD16] font-bold bg-[#FEBD16]/10 px-2 -mx-2 rounded" : "text-gray-500"
                                    }`}
                                  onClick={() => scrollToProduct(id)}
                                >
                                  {getProductName(id)}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      // Other Categories
                      <div className="space-y-1 text-[12px]">
                        {category.items?.map((id: string) => (
                          <p
                            key={id}
                            className={`cursor-pointer py-0.5 transition-colors hover:text-[#FEBD16] ${activeProduct === id ? "text-[#FEBD16] font-bold bg-[#FEBD16]/10 px-2 -mx-2 rounded" : "text-gray-500"
                              }`}
                            onClick={() => scrollToProduct(id)}
                          >
                            {getProductName(id)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="min-h-screen pt-[100px] md:pt-[140px] lg:pt-[180px]">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          {products.map((product) => (
            <div
              key={product.id}
              id={product.id}
              ref={(el) => {
                productRefs.current[product.id] = el;
              }}
              className="min-h-screen flex flex-col lg:flex-row mb-20 lg:mb-32 border-b border-gray-300 pb-20 lg:pb-32 last:border-b-0"
            >
              {/* Image Section */}
              <div className="w-full lg:w-[75%] aspect-[4/3] relative">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority={products.indexOf(product) < 2}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="w-full lg:w-[25%] bg-[#ebebeb] p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  {/* Category Tag with full-width line */}
                  <div className="mb-4">
                    <div className="flex justify-end mb-2">
                      <span className="text-[15px] font-medium">{product.category}</span>
                    </div>
                    <div className="h-[1px] w-full bg-black"></div>
                  </div>

                  {/* Product Name */}
                  <h2 className="text-[28px] md:text-[32px] font-bold mb-3 leading-tight">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-[12px] leading-[1.8] whitespace-pre-line text-gray-700">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Floor Plan Diagram - Clickable for Modal */}
                  {product.floorPlan.src && (
                    <div className="mb-10 mt-10 flex justify-center">
                      <div
                        className="relative w-full max-w-[300px] h-[160px] overflow-hidden border border-gray-200 cursor-zoom-in hover:border-[#FEBD16] transition-colors group"
                        onClick={() => setSelectedFloorPlan(product.floorPlan.src)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.floorPlan.src}
                          alt={`${product.name} 도면`}
                          className="absolute max-w-none group-hover:scale-105 transition-transform duration-300"
                          style={{
                            width: product.floorPlan.crop.width,
                            height: product.floorPlan.crop.height,
                            top: product.floorPlan.crop.top,
                            left: product.floorPlan.crop.left,
                            objectFit: 'contain'
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-xs px-2 py-1 rounded">크게 보기</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detail Section */}
                  <div className="mt-auto">
                    <h3 className="text-[20px] font-bold mb-2">Detail</h3>
                    <div>
                      <div className="border-t border-gray-400 py-1.5">
                        <span className="text-[12px]">가격 : {product.details.price}</span>
                      </div>
                      <div className="border-t border-gray-400 py-1.5">
                        <span className="text-[12px]">구조 : {product.details.structure}</span>
                      </div>
                      <div className="border-t border-gray-400 py-1.5">
                        <span className="text-[12px]">지붕형태 : {product.details.roofType}</span>
                      </div>
                      <div className="border-t border-gray-400 py-1.5">
                        <span className="text-[12px]">외부마감 : {product.details.exterior}</span>
                      </div>
                      <div className="border-t border-gray-400 py-1.5">
                        <span className="text-[12px]">내부마감 : {product.details.interior}</span>
                      </div>
                      <div className="border-t border-gray-400 py-1.5">
                        <span className="text-[12px]">크기 : {product.details.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
