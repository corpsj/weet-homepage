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
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const mappedData = data.map(mapProductToData);
        setProducts(mappedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
        <div className="text-xl font-bold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBEBEB]">
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
              className="min-h-screen flex flex-col lg:flex-row mb-20 lg:mb-0"
            >
              {/* Image Section - 좌측 */}
              <div className="w-full lg:w-[75%] h-[50vh] lg:h-screen relative">
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
                  <p className="text-[12px] leading-[1.8] whitespace-pre-line text-gray-700">
                    {product.description}
                  </p>
                </div>

                {/* Floor Plan Diagram - CSS Cropped */}
                {product.floorPlan.src && (
                  <div className="mb-6 flex justify-center">
                    <div className="relative w-full max-w-[250px] h-[120px] overflow-hidden border border-gray-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
          ))}
        </div>
      </div>
    </div>
  );
}
