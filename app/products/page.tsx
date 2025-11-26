"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// 제품 데이터 타입 정의
interface ProductDetail {
  가격?: string;
  구조?: string;
  지붕형태?: string;
  외부마감?: string;
  내부마감?: string;
  크기?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: "Private" | "Public";
  sizeCategory: "S" | "M" | "L" | "XL" | "SOLUTION" | "DESIGN";
  image: string;
  tagline: string;
  description: string;
  details: ProductDetail;
}

// 제품 데이터
const products: Product[] = [
  // S - Private
  {
    id: "3x9-박공지붕",
    name: "3X9 박공지붕",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/3x9-gable.jpg",
    tagline: `"카페는 커피 맛 이전에,`,
    description: `'공간의 경험'으로 먼저 기억됩니다.`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "박공지붕",
      외부마감: "징크 + 목재",
      내부마감: "원목 마감",
      크기: "3m x 9m",
    },
  },
  {
    id: "세컨하우스-3x6",
    name: "세컨하우스 3X6",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/second-house-3x6.jpg",
    tagline: `"일상에서 벗어나`,
    description: `나만의 공간에서 쉼을 찾다."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "평지붕",
      외부마감: "징크",
      내부마감: "원목 마감",
      크기: "3m x 6m",
    },
  },
  {
    id: "세컨하우스-4x8",
    name: "세컨하우스 4X8",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/second-house-4x8.jpg",
    tagline: `"더 넓은 공간에서`,
    description: `더 깊은 휴식을 경험하다."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "평지붕",
      외부마감: "징크",
      내부마감: "원목 마감",
      크기: "4m x 8m",
    },
  },
  {
    id: "내-서재",
    name: "내 서재",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/library.png",
    tagline: `"책과 함께하는`,
    description: `나만의 은밀한 공간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "박공지붕",
      외부마감: "목재",
      내부마감: "원목 서가",
      크기: "3m x 4m",
    },
  },
  {
    id: "피터팬의-모험",
    name: "피터팬의 모험",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/peterpan.jpg",
    tagline: `"아이들의 상상력이`,
    description: `현실이 되는 공간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "박공지붕",
      외부마감: "컬러 강판",
      내부마감: "친환경 마감",
      크기: "3m x 3m",
    },
  },
  {
    id: "낭만고양이",
    name: "낭만고양이",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/romantic-cat.jpg",
    tagline: `"고양이와 함께하는`,
    description: `낭만적인 일상."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "박공지붕",
      외부마감: "목재",
      내부마감: "펫 친화 마감",
      크기: "2.5m x 3m",
    },
  },
  {
    id: "리트릿",
    name: "리트릿",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/retreat.png",
    tagline: `"자연 속에서 찾는`,
    description: `진정한 힐링의 시간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "평지붕",
      외부마감: "우드 사이딩",
      내부마감: "미니멀 원목",
      크기: "3m x 6m",
    },
  },
  {
    id: "맨스케이브",
    name: "맨스케이브",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/manscave.jpg",
    tagline: `"남자의 로망,`,
    description: `나만의 아지트."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "평지붕",
      외부마감: "블랙 징크",
      내부마감: "인더스트리얼",
      크기: "3m x 5m",
    },
  },
  {
    id: "리틀포레스트",
    name: "리틀포레스트",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/little-forest.jpg",
    tagline: `"숲 속의 작은 집,`,
    description: `자연과 하나되는 경험."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "박공지붕",
      외부마감: "목재 + 유리",
      내부마감: "내추럴 원목",
      크기: "3.5m x 4.5m",
    },
  },
  {
    id: "파고라",
    name: "파고라",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/pagora.jpg",
    tagline: `"정원의 쉼터,`,
    description: `자연을 품은 공간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "오픈형",
      외부마감: "목재",
      내부마감: "오픈 구조",
      크기: "4m x 4m",
    },
  },
  {
    id: "캠퍼",
    name: "캠퍼",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/camper.png",
    tagline: `"어디서든 집처럼,`,
    description: `이동하는 나의 공간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "곡선형",
      외부마감: "알루미늄",
      내부마감: "컴팩트 인테리어",
      크기: "2.5m x 5m",
    },
  },
  {
    id: "사우나",
    name: "사우나",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    image: "/images/products/sauna.png",
    tagline: `"집에서 즐기는`,
    description: `프라이빗 사우나."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "박공지붕",
      외부마감: "삼나무",
      내부마감: "히노끼",
      크기: "2.5m x 3m",
    },
  },
  // S - Public
  {
    id: "공공-파빌리온",
    name: "공공 파빌리온",
    category: "Small unit",
    subCategory: "Public",
    sizeCategory: "S",
    image: "/images/products/public-pavilion.jpg",
    tagline: `"도시의 쉼터,`,
    description: `모두를 위한 공간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "캐노피형",
      외부마감: "코르텐강",
      내부마감: "노출 콘크리트",
      크기: "5m x 8m",
    },
  },
  {
    id: "버스정류장",
    name: "버스정류장",
    category: "Small unit",
    subCategory: "Public",
    sizeCategory: "S",
    image: "/images/products/bus-stop.png",
    tagline: `"기다림이 즐거운`,
    description: `도시의 새로운 풍경."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "캐노피형",
      외부마감: "강화유리 + 스틸",
      내부마감: "스틸",
      크기: "3m x 1.5m",
    },
  },
  {
    id: "공공-화장실",
    name: "공공 화장실",
    category: "Small unit",
    subCategory: "Public",
    sizeCategory: "S",
    image: "/images/products/public-restroom.jpg",
    tagline: `"깨끗하고 쾌적한`,
    description: `공공 편의시설."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "평지붕",
      외부마감: "스테인리스",
      내부마감: "타일",
      크기: "4m x 6m",
    },
  },
  // M Category
  {
    id: "small-unit-m",
    name: "Small unit + Small unit",
    category: "Medium unit",
    subCategory: "Private",
    sizeCategory: "M",
    image: "/images/products/medium-unit.jpg",
    tagline: `"두 개의 모듈이 만나`,
    description: `더 넓은 가능성을 열다."`,
    details: {
      가격: "문의",
      구조: "경량 철골조",
      지붕형태: "연결형",
      외부마감: "징크",
      내부마감: "원목 마감",
      크기: "6m x 6m",
    },
  },
  // L Category
  {
    id: "small-unit-l",
    name: "Small unit + Small unit + 현장공사",
    category: "Large unit",
    subCategory: "Private",
    sizeCategory: "L",
    image: "/images/products/large-unit.jpg",
    tagline: `"모듈과 현장의 조화,`,
    description: `완벽한 맞춤 공간."`,
    details: {
      가격: "문의",
      구조: "경량 철골조 + RC",
      지붕형태: "복합형",
      외부마감: "복합 마감",
      내부마감: "맞춤 인테리어",
      크기: "맞춤 설계",
    },
  },
  // XL Category
  {
    id: "단지개념",
    name: "단지개념",
    category: "Extra Large",
    subCategory: "Private",
    sizeCategory: "XL",
    image: "/images/products/complex.jpg",
    tagline: `"모듈러의 확장,`,
    description: `단지 규모의 새로운 패러다임."`,
    details: {
      가격: "문의",
      구조: "복합 구조",
      지붕형태: "다양한 조합",
      외부마감: "프로젝트별 상이",
      내부마감: "프로젝트별 상이",
      크기: "대규모 맞춤",
    },
  },
];

// 사이드바 메뉴 구조
const sidebarStructure = {
  S: {
    label: "S",
    subtitle: "",
    Private: ["3x9-박공지붕", "세컨하우스-3x6", "세컨하우스-4x8", "내-서재", "피터팬의-모험", "낭만고양이", "리트릿", "맨스케이브", "리틀포레스트", "파고라", "캠퍼", "사우나"],
    Public: ["공공-파빌리온", "버스정류장", "공공-화장실"],
  },
  M: {
    label: "M",
    subtitle: "Small unit + Small unit",
    items: ["small-unit-m"],
  },
  L: {
    label: "L",
    subtitle: "Small unit + Small unit\n+ 현장 공사",
    items: ["small-unit-l"],
  },
  XL: {
    label: "XL",
    subtitle: "단지개념",
    items: ["단지개념"],
  },
  SOLUTION: {
    label: "SOLUTION",
    subtitle: "",
    items: [],
  },
  DESIGN: {
    label: "DESIGN",
    subtitle: "",
    items: [],
  },
};

export default function ProductsPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["S"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeProduct, setActiveProduct] = useState<string>("3x9-박공지붕");
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
  }, []);

  const getProductName = (id: string) => {
    const product = products.find((p) => p.id === id);
    return product?.name || id;
  };

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

                {/* Public */}
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

            {expandedCategories.includes("M") && (
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

            {expandedCategories.includes("L") && (
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

            {expandedCategories.includes("XL") && (
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
                  src={product.image}
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
                    {Object.entries(product.details).map(([key, value]) => (
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
