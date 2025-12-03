"use client";

import { useState, useRef, useEffect } from "react";
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
  const sidebarStructure = {
    S: {
      label: "S",
      subtitle: "",
      Private: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Private").map(p => p.id),
      Public: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Public").map(p => p.id),
    },
    M: { label: "M", subtitle: "Small unit + Small unit", items: [] as string[] },
    L: { label: "L", subtitle: "Small unit + Small unit\n+ 현장 공사", items: [] as string[] },
    XL: { label: "XL", subtitle: "단지개념", items: [] as string[] },
    SOLUTION: { label: "SOLUTION", subtitle: "", items: [] as string[] },
    DESIGN: { label: "DESIGN", subtitle: "", items: [] as string[] },
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
      const headerOffset = 200;
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
        <div className="text-xl font-bold text-gray-500">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBEBEB] relative">
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-[120px] md:top-[160px] lg:top-[200px] left-4 z-50 bg-white border border-gray-300 p-3 rounded-lg shadow-lg transition-all hover:shadow-xl lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
        {/* Menu Header - Mobile only */}
        <div className="lg:hidden sticky top-0 bg-white/95 backdrop-blur-md flex items-center justify-end p-4 border-b border-gray-200 rounded-t-xl">
          <button onClick={() => setSidebarOpen(false)} className="hover:bg-gray-100 rounded-full p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div className="p-4 pt-6">
          {/* S Category */}
          <div className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer pb-2 border-b border-black"
              onClick={() => toggleCategory("S")}
            >
              <h3 className="text-[20px] font-bold">S</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${expandedCategories.includes("S") ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>

            {expandedCategories.includes("S") && (
              <div className="pt-3">
                {/* Private */}
                {sidebarStructure.S.Private.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold mb-2 text-gray-500">Private</p>
                    <div className="space-y-1 text-[12px]">
                      {sidebarStructure.S.Private.map((productId) => (
                        <p
                          key={productId}
                          className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${activeProduct === productId ? "text-primary font-bold bg-primary/20 px-2 -mx-2" : ""
                            }`}
                          onClick={() => scrollToProduct(productId)}
                        >
                          {getProductName(productId)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Public */}
                {sidebarStructure.S.Public.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold mb-2 text-gray-500">Public</p>
                    <div className="space-y-1 text-[12px]">
                      {sidebarStructure.S.Public.map((productId) => (
                        <p
                          key={productId}
                          className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${activeProduct === productId ? "text-primary font-bold bg-primary/20 px-2 -mx-2" : ""
                            }`}
                          onClick={() => scrollToProduct(productId)}
                        >
                          {getProductName(productId)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* M Category */}
          <div className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer pb-2 border-b border-black"
              onClick={() => toggleCategory("M")}
            >
              <h3 className="text-[20px] font-bold">M</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${expandedCategories.includes("M") ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Small unit + Small unit</p>
          </div>

          {/* L Category */}
          <div className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer pb-2 border-b border-black"
              onClick={() => toggleCategory("L")}
            >
              <h3 className="text-[20px] font-bold">L</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${expandedCategories.includes("L") ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 whitespace-pre-line">{sidebarStructure.L.subtitle}</p>
          </div>

          {/* XL Category */}
          <div className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer pb-2 border-b border-black"
              onClick={() => toggleCategory("XL")}
            >
              <h3 className="text-[20px] font-bold">XL</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${expandedCategories.includes("XL") ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">{sidebarStructure.XL.subtitle}</p>
          </div>

          {/* SOLUTION Category */}
          <div className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer pb-2 border-b border-black"
              onClick={() => toggleCategory("SOLUTION")}
            >
              <h3 className="text-[16px] font-bold">SOLUTION</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${expandedCategories.includes("SOLUTION") ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* DESIGN Category */}
          <div className="mb-2">
            <div
              className="flex items-center justify-between cursor-pointer pb-2 border-b border-black"
              onClick={() => toggleCategory("DESIGN")}
            >
              <h3 className="text-[16px] font-bold">DESIGN</h3>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${expandedCategories.includes("DESIGN") ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="min-h-screen pt-[100px] md:pt-[140px] lg:pt-[180px]">
        {/* Products List */}
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          {products.map((product) => (
            <div
              key={product.id}
              id={product.id}
              ref={(el) => {
                productRefs.current[product.id] = el;
              }}
              className="min-h-screen flex flex-col lg:flex-row"
            >
              {/* Image Section - 좌측 */}
              <div className="w-full lg:w-[75%] h-[50vh] lg:h-screen relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>

              {/* Info Section - 우측 */}
              <div className="w-full lg:w-[25%] bg-[#ebebeb] p-4 md:p-6 lg:p-8 flex flex-col">
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
                  <p className="text-[12px] leading-[1.8] whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Floor Plan Diagram - CSS Cropped */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-full max-w-[250px] h-[120px] overflow-hidden">
                    <img
                      src={product.floorPlan.src}
                      alt={`${product.name} 도면`}
                      className="absolute max-w-none"
                      style={{
                        width: product.floorPlan.crop.width,
                        height: product.floorPlan.crop.height,
                        top: product.floorPlan.crop.top,
                        left: product.floorPlan.crop.left,
                      }}
                    />
                  </div>
                </div>

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
          ))}
        </div>
      </div>
    </div>
  );
}
