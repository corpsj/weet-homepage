"use client";

import { useState } from "react";
import Image from "next/image";

// Product images mapping
const productImages: Record<string, string> = {
  "버스정류장": "/images/products/bus-stop.png",
  "캠퍼": "/images/products/camper.png",
  "내 서재": "/images/products/library.png",
  "리트릿": "/images/products/retreat.png",
  "사우나": "/images/products/sauna.png",
};

export default function ProductsPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["S"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("피터팬의 모험");

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-[120px] md:top-[160px] lg:top-[200px] left-4 z-50 bg-white border border-gray-300 p-3 rounded-lg shadow-lg transition-all hover:shadow-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ transform: sidebarOpen ? 'translateX(280px)' : 'translateX(0)' }}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform" style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
        </svg>
      </button>

      {/* Overlay for mobile/tablet */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Floating Sidebar */}
      <aside className={`
        fixed top-[100px] md:top-[140px] lg:top-[180px] bottom-0
        w-[280px] md:w-[300px]
        left-0
        bg-white border-r border-gray-300 shadow-xl
        overflow-y-auto
        transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Menu Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between p-4 md:p-6 border-b border-gray-200 z-10">
          <span className="text-base md:text-lg font-bold">제품 카테고리</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-100 rounded p-1 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div className="p-4 md:p-6">
          {/* S Category */}
          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => toggleCategory("S")}
            >
              <h3 className="text-[18px] md:text-[20px] font-bold">S</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${expandedCategories.includes("S") ? "" : "rotate-180"}`}>
                <path d="M7 14l5-5 5 5z" fill="currentColor"/>
              </svg>
            </div>

            {expandedCategories.includes("S") && (
              <>
                <div className="border-t border-gray-300 pt-2 mb-3"></div>

                {/* Private */}
                <div className="mb-4">
                  <p className="text-[11px] md:text-[12px] font-semibold mb-2 text-gray-600">Private</p>
                  <div className="space-y-1 text-[12px] md:text-[13px] ml-4">
                    <p
                      className={`cursor-pointer ${selectedProduct === "세컨하우스 3X6" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("세컨하우스 3X6")}
                    >
                      세컨하우스 3X6
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "세컨하우스 4X8" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("세컨하우스 4X8")}
                    >
                      세컨하우스 4X8
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "내 서재" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("내 서재")}
                    >
                      내 서재
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "피터팬의 모험" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("피터팬의 모험")}
                    >
                      피터팬의 모험
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "낭만고양이" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("낭만고양이")}
                    >
                      낭만고양이
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "리트릿" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("리트릿")}
                    >
                      리트릿
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "맨스케이브" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("맨스케이브")}
                    >
                      맨스케이브
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "리틀포레스트" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("리틀포레스트")}
                    >
                      리틀포레스트
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "파고라" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("파고라")}
                    >
                      파고라
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "캠퍼" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("캠퍼")}
                    >
                      캠퍼
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "사우나" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("사우나")}
                    >
                      사우나
                    </p>
                  </div>
                </div>

                {/* Public */}
                <div className="mb-4">
                  <p className="text-[11px] md:text-[12px] font-semibold mb-2 text-gray-600">Public</p>
                  <div className="space-y-1 text-[12px] md:text-[13px] ml-4">
                    <p
                      className={`cursor-pointer ${selectedProduct === "공공 파빌리온" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("공공 파빌리온")}
                    >
                      공공 파빌리온
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "버스정류장" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("버스정류장")}
                    >
                      버스정류장
                    </p>
                    <p
                      className={`cursor-pointer ${selectedProduct === "공공 화장실" ? "font-bold" : ""}`}
                      onClick={() => setSelectedProduct("공공 화장실")}
                    >
                      공공 화장실
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* M Category */}
          <div className="mb-4 border-t border-gray-300 pt-2">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => toggleCategory("M")}
            >
              <h3 className="text-[18px] md:text-[20px] font-bold">M</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${expandedCategories.includes("M") ? "" : "rotate-180"}`}>
                <path d="M7 14l5-5 5 5z" fill="currentColor"/>
              </svg>
            </div>

            {expandedCategories.includes("M") && (
              <>
                <div className="space-y-1 text-[12px] md:text-[13px] mt-2">
                  <p
                    className={`cursor-pointer ${selectedProduct === "Small unit + Small unit" ? "font-bold" : ""}`}
                    onClick={() => setSelectedProduct("Small unit + Small unit")}
                  >
                    Small unit + Small unit
                  </p>
                </div>
              </>
            )}
          </div>

          {/* L Category */}
          <div className="mb-4 border-t border-gray-300 pt-2">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => toggleCategory("L")}
            >
              <h3 className="text-[18px] md:text-[20px] font-bold">L</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${expandedCategories.includes("L") ? "" : "rotate-180"}`}>
                <path d="M7 14l5-5 5 5z" fill="currentColor"/>
              </svg>
            </div>

            {expandedCategories.includes("L") && (
              <>
                <div className="space-y-1 text-[12px] md:text-[13px] mt-2">
                  <p
                    className={`cursor-pointer ${selectedProduct === "Small unit + Small unit (L)" ? "font-bold" : ""}`}
                    onClick={() => setSelectedProduct("Small unit + Small unit (L)")}
                  >
                    Small unit + Small unit
                  </p>
                  <p
                    className={`cursor-pointer ${selectedProduct === "+ 현장 공사" ? "font-bold" : ""}`}
                    onClick={() => setSelectedProduct("+ 현장 공사")}
                  >
                    + 현장 공사
                  </p>
                </div>
              </>
            )}
          </div>

          {/* XL Category */}
          <div className="mb-4 border-t border-gray-300 pt-2">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => toggleCategory("XL")}
            >
              <h3 className="text-[18px] md:text-[20px] font-bold">XL</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${expandedCategories.includes("XL") ? "" : "rotate-180"}`}>
                <path d="M7 14l5-5 5 5z" fill="currentColor"/>
              </svg>
            </div>

            {expandedCategories.includes("XL") && (
              <>
                <div className="space-y-1 text-[12px] md:text-[13px] mt-2">
                  <p
                    className={`cursor-pointer ${selectedProduct === "단지개념" ? "font-bold" : ""}`}
                    onClick={() => setSelectedProduct("단지개념")}
                  >
                    단지개념
                  </p>
                </div>
              </>
            )}
          </div>

          {/* SOLUTION Category */}
          <div className="mb-4 border-t border-gray-300 pt-2">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => toggleCategory("SOLUTION")}
            >
              <h3 className="text-[16px] md:text-[18px] font-bold">SOLUTION</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${expandedCategories.includes("SOLUTION") ? "" : "rotate-180"}`}>
                <path d="M7 14l5-5 5 5z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* DESIGN Category */}
          <div className="mb-4 border-t border-gray-300 pt-2">
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => toggleCategory("DESIGN")}
            >
              <h3 className="text-[16px] md:text-[18px] font-bold">DESIGN</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${expandedCategories.includes("DESIGN") ? "" : "rotate-180"}`}>
                <path d="M7 14l5-5 5 5z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Full Width */}
      <div className="w-full min-h-screen px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold mb-8 md:mb-12">{selectedProduct}</h1>

          {productImages[selectedProduct] ? (
            <div className="mb-8">
              <div className="relative w-full max-w-[1200px] aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={productImages[selectedProduct]}
                  alt={selectedProduct}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-8 space-y-4">
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold">제품 정보</h2>
                <p className="text-[14px] md:text-[16px] text-gray-600 leading-relaxed">
                  제품 상세 정보가 여기에 표시됩니다.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 md:p-12 lg:p-16 shadow-md">
              <p className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-600 text-center">
                제품 상세 정보가 준비 중입니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
