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
        <div className="text-xl font-bold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-400">Products Coming Soon</h1>
        <p className="text-gray-500 mt-2">제품 준비 중입니다.</p>
      </div>
    </div>
  );
}
