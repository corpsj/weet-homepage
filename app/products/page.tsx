"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

// 로컬 도면 이미지 매핑 (제품명 기반)
const floorPlanMap: { [key: string]: string } = {
  "3x9": "/images/products/floor-plans/3x9-plan.png",
  "3X9": "/images/products/floor-plans/3x9-plan.png",
  "리트릿": "/images/products/floor-plans/retreat-plan.png",
  "36": "/images/products/floor-plans/36-plan.png",
};

// 제품에 맞는 도면 이미지 URL 가져오기
function getFloorPlanImage(product: Product): string | null {
  // 1. DB의 floor_plan_url 사용
  if (product.floor_plan_url) {
    return product.floor_plan_url;
  }

  // 2. 로컬 도면 매핑에서 찾기 (제품명 부분 일치)
  for (const [key, value] of Object.entries(floorPlanMap)) {
    if (product.name.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return null;
}

// 로컬 이미지 매핑 (제품명 기반)
const localImageMap: { [key: string]: string } = {
  // Small Private
  "리트릿": "/images/products/small/private/retreat.jpg",
  "캠퍼": "/images/products/small/private/camper.jpg",
  "사우나": "/images/products/small/private/sauna.jpg",
  "내서재": "/images/products/small/private/my-library.jpg",
  "맨즈케이브": "/images/products/small/private/mans-cave.jpg",
  "36골강판": "/images/products/small/private/36-corrugated.jpg",
  "36렌더링": "/images/products/small/private/36-render.jpg",
  "36스타코": "/images/products/small/private/36-stucco.jpg",
  "3x9": "/images/products/small/private/3x9.jpg",
  "리트릿2": "/images/products/small/private/retreat2.jpg",
  "피터팬의모험": "/images/products/small/private/peter-pan.jpg",
  // Small Public
  "버스정류장": "/images/products/small/public/bus-stop.jpg",
  "파고라": "/images/products/small/public/pergola.jpg",
  "화장실": "/images/products/small/public/restroom.jpg",
  // Medium
  "M36조합": "/images/products/medium/m36-combo.jpg",
  "M36 조합": "/images/products/medium/m36-combo.jpg",
  // Large
  "L-2": "/images/products/large/l-2-render.jpg",
  // XLarge
  "단지": "/images/products/xlarge/complex-render.jpg",
};

// 제품에 맞는 이미지 URL 가져오기
function getProductImage(product: Product): string {
  // 1. 로컬 이미지 매핑에서 찾기 (제품명 부분 일치)
  for (const [key, value] of Object.entries(localImageMap)) {
    if (product.name.includes(key)) {
      return value;
    }
  }

  // 2. 카테고리별 기본 이미지
  const categoryDefaults: { [key: string]: string } = {
    "S": "/images/products/small/private/retreat.jpg",
    "M": "/images/products/medium/m36-combo.jpg",
    "L": "/images/products/large/l-2-render.jpg",
    "XL": "/images/products/xlarge/complex-render.jpg",
  };

  if (categoryDefaults[product.size_category]) {
    return categoryDefaults[product.size_category];
  }

  // 3. DB의 image_url 사용 (폴백)
  return product.image_url;
}

// 사이드바 구조 타입
interface SidebarStructure {
  [key: string]: {
    label: string;
    subtitle: string;
    Private?: string[];
    Public?: string[];
    items?: string[];
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sidebarStructure, setSidebarStructure] = useState<SidebarStructure>({
    S: { label: "S", subtitle: "", Private: [], Public: [] },
    M: { label: "M", subtitle: "Small unit + Small unit", items: [] },
    L: { label: "L", subtitle: "Small unit + Small unit\n+ 현장 공사", items: [] },
    XL: { label: "XL", subtitle: "단지개념", items: [] },
    SOLUTION: { label: "SOLUTION", subtitle: "", items: [] },
    DESIGN: { label: "DESIGN", subtitle: "", items: [] },
  });
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["S"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeProduct, setActiveProduct] = useState<string>("");
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Supabase에서 제품 데이터 가져오기
  useEffect(() => {
    async function fetchProducts() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Supabase credentials not found");
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        return;
      }

      const productsData = data as Product[] | null;
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
        setActiveProduct(productsData[0].id);

        // 사이드바 구조 생성
        const structure: SidebarStructure = {
          S: { label: "S", subtitle: "", Private: [], Public: [] },
          M: { label: "M", subtitle: "Small unit + Small unit", items: [] },
          L: { label: "L", subtitle: "Small unit + Small unit\n+ 현장 공사", items: [] },
          XL: { label: "XL", subtitle: "단지개념", items: [] },
          SOLUTION: { label: "SOLUTION", subtitle: "", items: [] },
          DESIGN: { label: "DESIGN", subtitle: "", items: [] },
        };

        productsData.forEach((product) => {
          const category = product.size_category;
          if (category === "S") {
            if (product.sub_category === "Private") {
              structure.S.Private?.push(product.id);
            } else {
              structure.S.Public?.push(product.id);
            }
          } else if (structure[category]) {
            structure[category].items?.push(product.id);
          }
        });

        setSidebarStructure(structure);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  // 제품으로 스크롤
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

  // 스크롤 시 활성 제품 업데이트
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

  // 제품 상세 정보 객체 생성
  const getProductDetails = (product: Product) => {
    const details: { [key: string]: string } = {};
    if (product.price) details["가격"] = product.price;
    if (product.structure) details["구조"] = product.structure;
    if (product.roof_type) details["지붕형태"] = product.roof_type;
    if (product.exterior_finish) details["외부마감"] = product.exterior_finish;
    if (product.interior_finish) details["내부마감"] = product.interior_finish;
    if (product.size) details["크기"] = product.size;
    return details;
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">제품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 제품이 없는 경우
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">등록된 제품이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative">
      {/* Sidebar Toggle Button - 항상 표시 */}
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
                {sidebarStructure.S.Private && sidebarStructure.S.Private.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold mb-2 text-gray-500">Private</p>
                    <div className="space-y-1 text-[12px]">
                      {sidebarStructure.S.Private.map((productId) => (
                        <p
                          key={productId}
                          className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${
                            activeProduct === productId ? "text-primary font-bold bg-yellow-100 px-2 -mx-2" : ""
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
                {sidebarStructure.S.Public && sidebarStructure.S.Public.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold mb-2 text-gray-500">Public</p>
                    <div className="space-y-1 text-[12px]">
                      {sidebarStructure.S.Public.map((productId) => (
                        <p
                          key={productId}
                          className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${
                            activeProduct === productId ? "text-primary font-bold bg-yellow-100 px-2 -mx-2" : ""
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

            {expandedCategories.includes("M") && sidebarStructure.M.items && sidebarStructure.M.items.length > 0 && (
              <div className="pt-2 space-y-1 text-[12px]">
                {sidebarStructure.M.items.map((productId) => (
                  <p
                    key={productId}
                    className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${
                      activeProduct === productId ? "text-primary font-bold bg-yellow-100 px-2 -mx-2" : ""
                    }`}
                    onClick={() => scrollToProduct(productId)}
                  >
                    {getProductName(productId)}
                  </p>
                ))}
              </div>
            )}
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

            {expandedCategories.includes("L") && sidebarStructure.L.items && sidebarStructure.L.items.length > 0 && (
              <div className="pt-2 space-y-1 text-[12px]">
                {sidebarStructure.L.items.map((productId) => (
                  <p
                    key={productId}
                    className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${
                      activeProduct === productId ? "text-primary font-bold bg-yellow-100 px-2 -mx-2" : ""
                    }`}
                    onClick={() => scrollToProduct(productId)}
                  >
                    {getProductName(productId)}
                  </p>
                ))}
              </div>
            )}
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

            {expandedCategories.includes("XL") && sidebarStructure.XL.items && sidebarStructure.XL.items.length > 0 && (
              <div className="pt-2 space-y-1 text-[12px]">
                {sidebarStructure.XL.items.map((productId) => (
                  <p
                    key={productId}
                    className={`cursor-pointer py-0.5 transition-colors hover:text-primary ${
                      activeProduct === productId ? "text-primary font-bold bg-yellow-100 px-2 -mx-2" : ""
                    }`}
                    onClick={() => scrollToProduct(productId)}
                  >
                    {getProductName(productId)}
                  </p>
                ))}
              </div>
            )}
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
      <div className="min-h-screen">
        {/* Products List */}
        <div className="w-full">
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
              <div className="w-full lg:w-[65%] h-[50vh] lg:h-screen relative">
                <Image
                  src={getProductImage(product)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              {/* Info Section - 우측 */}
              <div className="w-full lg:w-[35%] bg-[#ebebeb] p-6 md:p-8 lg:p-10 flex flex-col">
                {/* Category Tag */}
                <div className="flex items-center justify-end mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-[100px] bg-black"></div>
                    <span className="text-[15px] font-medium">{product.category}</span>
                  </div>
                </div>

                {/* Product Name */}
                <h2 className="text-[32px] md:text-[36px] font-bold mb-4 leading-tight">
                  {product.name}
                </h2>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-[12px] leading-[1.8] whitespace-pre-line">
                    {product.tagline}
                  </p>
                  {product.description && (
                    <p className="text-[12px] leading-[1.8] mt-2 whitespace-pre-line">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Floor Plan Diagram */}
                {getFloorPlanImage(product) && (
                  <div className="mb-6 flex justify-center">
                    <div className="relative w-[280px] h-[140px]">
                      <Image
                        src={getFloorPlanImage(product)!}
                        alt={`${product.name} 도면`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Detail Section */}
                <div className="mt-auto">
                  <h3 className="text-[24px] font-bold mb-4">Detail</h3>
                  <div className="space-y-0">
                    {Object.entries(getProductDetails(product)).map(([key, value]) => (
                      <div key={key} className="flex py-2 border-b border-gray-400">
                        <span className="text-[14px] w-[100px] flex-shrink-0">{key} :</span>
                        <span className="text-[14px]">{value}</span>
                      </div>
                    ))}
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
