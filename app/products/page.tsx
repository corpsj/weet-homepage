"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";

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

      if (data && data.length > 0) {
        setProducts(data);
        setActiveProduct(data[0].id);

        // 사이드바 구조 생성
        const structure: SidebarStructure = {
          S: { label: "S", subtitle: "", Private: [], Public: [] },
          M: { label: "M", subtitle: "Small unit + Small unit", items: [] },
          L: { label: "L", subtitle: "Small unit + Small unit\n+ 현장 공사", items: [] },
          XL: { label: "XL", subtitle: "단지개념", items: [] },
          SOLUTION: { label: "SOLUTION", subtitle: "", items: [] },
          DESIGN: { label: "DESIGN", subtitle: "", items: [] },
        };

        data.forEach((product) => {
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
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  onError={(e) => {
                    // 이미지 로드 실패 시 placeholder
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/1200x800/e5e5e5/999999?text=" + encodeURIComponent(product.name);
                  }}
                />
              </div>

              {/* Info Section - 우측 */}
              <div className="w-full lg:w-[35%] bg-[#F5F5F5] p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] w-8 bg-black"></div>
                  <span className="text-[13px] font-medium">{product.category}</span>
                </div>

                {/* Product Name */}
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold mb-6 leading-tight">
                  {product.name}
                </h2>

                {/* Tagline */}
                <div className="mb-8">
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
                    {product.tagline}
                  </p>
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Detail Section */}
                <div className="border-t border-black pt-6">
                  <h3 className="text-[18px] md:text-[20px] font-bold mb-4">Detail</h3>
                  <div className="space-y-2">
                    {Object.entries(getProductDetails(product)).map(([key, value]) => (
                      <div key={key} className="flex border-b border-gray-300 pb-2">
                        <span className="text-[14px] w-24 text-gray-600">{key} :</span>
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
