"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/supabase";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductData {
  id: string;
  name: string;
  subCategory: "Private" | "Public" | null;
  sizeCategory: "S" | "M" | "L" | "XL" | "DESIGN";
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
    crop: { width: string; height: string; top: string; left: string };
  } | null;
  subImages: string[];
}

const parseFloorPlan = (url: string | null) => {
  if (!url) return null;
  const [baseUrl, query] = url.split("?");
  const params = new URLSearchParams(query || "");
  return {
    src: baseUrl,
    crop: {
      width: params.get("crop_w") || "100%",
      height: params.get("crop_h") || "100%",
      top: params.get("crop_t") || "0%",
      left: params.get("crop_l") || "0%",
    },
  };
};

const mapProductToData = (p: Product): ProductData => {
  const floorPlan = parseFloorPlan(p.floor_plan_url);
  return {
    id: p.id,
    name: p.name,
    subCategory: p.sub_category as "Private" | "Public" | null,
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

const CATEGORIES = ["ALL", "S", "M", "L", "XL", "DESIGN"] as const;

export default function ProductsV2Page() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const mappedData = data
          .map(mapProductToData)
          .filter((p) => p.sizeCategory !== "SOLUTION" as any);

        const categoryOrder = ["S", "M", "L", "XL", "DESIGN"];
        mappedData.sort((a, b) => {
          const idxA = categoryOrder.indexOf(a.sizeCategory);
          const idxB = categoryOrder.indexOf(b.sizeCategory);
          if (idxA !== idxB) return idxA - idxB;
          return a.name.localeCompare(b.name);
        });

        setProducts(mappedData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) => selectedCategory === "ALL" || p.sizeCategory === selectedCategory
  );

  const rows: ProductData[][] = [];
  for (let i = 0; i < filteredProducts.length; i += cols) {
    rows.push(filteredProducts.slice(i, i + cols));
  }

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedId(null);
    const footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FEBD16]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      <section className="relative w-full h-[35vh] md:h-[40vh] min-h-[300px] bg-gray-900 flex flex-col justify-end pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-b from-gray-900/50 to-gray-900 absolute inset-0 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            제품 소개
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl mb-10"
          >
            S부터 XL까지, 당신에게 맞는 크기를 찾아보세요
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 overflow-x-auto w-full max-w-3xl mx-auto pb-2 hide-scrollbar justify-start md:justify-center px-4"
            role="tablist"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedId(null);
                }}
                className={cn(
                  "px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 min-h-[44px]",
                  selectedCategory === cat
                    ? "bg-[#FEBD16] text-black shadow-lg"
                    : "text-white/60 border border-white/20 hover:text-white hover:border-white/40 hover:bg-white/5"
                )}
              >
                {cat === "ALL" ? "전체보기" : cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col gap-6 md:gap-12">
          <AnimatePresence mode="wait">
            {rows.map((row) => (
              <motion.div
                key={row[0].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {row.map((p) => {
                    const isExpanded = expandedId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : p.id)}
                        className={cn(
                          "group text-left cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300",
                          isExpanded ? "ring-4 ring-[#FEBD16]/50 shadow-md" : "hover:shadow-xl"
                        )}
                      >
                        <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                        <div className="p-6 md:p-8">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">{p.name}</h3>
                              <p className="text-gray-500 mt-1 line-clamp-1">{p.tagline}</p>
                            </div>
                            <span className="px-3 py-1 bg-gray-50 text-sm font-bold text-gray-600 rounded-full border border-gray-100">
                              {p.sizeCategory}
                            </span>
                          </div>
                          <div className="mt-8 flex justify-between items-end">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400 font-bold tracking-wider mb-1">
                                TOTAL PRICE
                              </span>
                              <span className="text-xl md:text-2xl font-bold text-gray-900">
                                {p.details.price}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "font-bold flex items-center gap-1 transition-colors",
                                isExpanded ? "text-[#FEBD16]" : "text-gray-400 group-hover:text-[#FEBD16]"
                              )}
                            >
                              {isExpanded ? "닫기" : "자세히 보기"}
                              <ArrowRight className={cn("w-5 h-5 transition-transform", isExpanded && "-rotate-90")} />
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {row.some((p) => p.id === expandedId) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: -16 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: -16 }}
                      className="w-full hidden md:block overflow-hidden"
                    >
                      <ExpandedDetail
                        product={row.find((p) => p.id === expandedId)!}
                        onClose={() => setExpandedId(null)}
                        onConsultClick={handleConsultationClick}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-gray-500 text-lg">해당 카테고리의 제품이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {expandedId && cols === 1 && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="fixed inset-0 z-50 bg-white md:hidden overflow-y-auto"
          >
            <ExpandedDetail
              product={products.find((p) => p.id === expandedId)!}
              onClose={() => setExpandedId(null)}
              onConsultClick={handleConsultationClick}
              isMobile
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollReveal>
        <div className="fixed bottom-0 left-0 w-full z-40 p-4 md:p-6 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
          <div className="max-w-xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-4 md:p-5 flex items-center justify-between pointer-events-auto">
            <div className="flex flex-col">
              <span className="font-bold md:text-lg">궁금한 게 있으신가요?</span>
              <span className="text-sm text-gray-400">편하게 물어보세요</span>
            </div>
            <button
              type="button"
              onClick={handleConsultationClick}
              className="px-6 py-3 bg-[#FEBD16] text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors min-h-[44px]"
            >
              상담 신청
            </button>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}

function ExpandedDetail({
  product,
  onClose,
  onConsultClick,
  isMobile = false,
}: {
  product: ProductData;
  onClose: () => void;
  onConsultClick: (e: React.MouseEvent) => void;
  isMobile?: boolean;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const images = [product.imageUrl, ...(product.subImages || [])].filter(Boolean);

  return (
    <div
      className={cn(
        "bg-white",
        !isMobile ? "rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12" : "min-h-screen pb-32"
      )}
    >
      {isMobile && (
        <div className="sticky top-0 z-10 flex justify-end p-4 bg-white/80 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {!isMobile && (
        <div className="flex justify-end mb-6 -mt-4 -mr-4">
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className={cn("grid grid-cols-1", !isMobile && "lg:grid-cols-2 gap-12")}>
        <div className={cn("space-y-4", isMobile ? "px-4" : "")}>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all min-h-[44px]",
                    activeImage === idx
                      ? "border-[#FEBD16] shadow-sm"
                      : "border-transparent opacity-60 hover:opacity-100 bg-gray-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={cn("flex flex-col", isMobile ? "px-6 py-8" : "")}>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-gray-100 text-sm font-bold text-gray-600 rounded-full mb-3">
              {product.sizeCategory}
              {product.subCategory ? ` · ${product.subCategory}` : ""}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              {product.name}
            </h2>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
              {product.description || product.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 mb-10 p-6 bg-gray-50 rounded-2xl">
            <SpecItem label="가격" value={product.details.price} highlight />
            <SpecItem label="크기" value={product.details.size} />
            <SpecItem label="구조" value={product.details.structure} />
            <SpecItem label="지붕재" value={product.details.roofType} />
            <SpecItem label="외부마감" value={product.details.exterior} />
            <SpecItem label="내부마감" value={product.details.interior} />
          </div>

          {product.floorPlan?.src && (
            <div className="mb-10">
              <h4 className="text-sm font-bold text-gray-400 mb-4 tracking-wider">도면</h4>
              <div className="rounded-2xl bg-white p-6 border border-gray-100 flex justify-center shadow-sm">
                <img
                  src={product.floorPlan.src}
                  alt="Floor plan"
                  className="max-h-64 object-contain mix-blend-multiply"
                />
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 pb-4">
            <button
              type="button"
              onClick={onConsultClick}
              className="inline-flex items-center justify-center w-full md:w-auto px-10 py-4 min-h-[56px] bg-[#FEBD16] hover:bg-yellow-500 text-black font-bold rounded-xl transition-all shadow-md hover:shadow-lg text-lg"
            >
              상담 신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-bold text-gray-400 mb-1">{label}</span>
      <span className={cn("text-base font-medium", highlight ? "text-gray-900 font-bold text-xl" : "text-gray-900")}>
        {value}
      </span>
    </div>
  );
}
