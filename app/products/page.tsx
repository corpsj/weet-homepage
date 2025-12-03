"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// 제품 타입 정의
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

// Figma에서 가져온 하드코딩된 제품 데이터
const productsData: ProductData[] = [
  // S - Private
  {
    id: "01-3x9-house",
    name: "3X9 집",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/01-3x9-house.jpg",
    description: `완벽하게 계산된 3m x 9m의 효율적인 공간. 하지만 이 집의 진짜 매력은 발코니문을 여는 순간 시작됩니다.
나만의 작은 발코니에서 즐기는 아침의 커피 한 잔,
살랑이는 바람을 맞으며 읽는 오후의 책 한 권,
저녁노을을 바라보며 즐기는 시원한 맥주 한 캔.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "박공지붕",
      exterior: "갈바륨 골강판",
      interior: "자작나무,벽지,안타민",
      size: "3.2m X 6.2m X 높이 3.8m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "300%", height: "440%", top: "-111%", left: "0%" },
    },
  },
  {
    id: "02-3x6-house-render",
    name: "3X6 집",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/02-3x6-house-render.jpg",
    description: `우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다.
마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "쉐이드 지붕",
      exterior: "적삼목, 징크",
      interior: "자작나무,벽지,안타민",
      size: "3.2m X 6.2m X 높이 3.6m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "407%", height: "448%", top: "-115%", left: "-137%" },
    },
  },
  {
    id: "03-3x6-house-stucco",
    name: "3X6 집",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/03-3x6-house-stucco.jpg",
    description: `우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다.
마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "평지붕",
      exterior: "스타코",
      interior: "자작나무,벽지,안타민",
      size: "3.2m X 6.2m X 높이 3.2m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "407%", height: "448%", top: "-115%", left: "-137%" },
    },
  },
  {
    id: "04-3x6-house-corrugated",
    name: "3X6 집",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/04-3x6-house-corrugated.jpg",
    description: `우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다.
마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "평지붕",
      exterior: "갈바륨 골강판",
      interior: "자작나무,벽지,안타민",
      size: "3.2m X 6.2m X 높이 3.2m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "407%", height: "448%", top: "-115%", left: "-137%" },
    },
  },
  {
    id: "05-3x6-camper",
    name: "3X6 CAMPER",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/05-3x6-camper.jpg",
    description: `벽을 없애 자연과 하나 되는 개방감을 주되, 생활의 필수 요소인 위생과 조리 시설은 모듈러 공법으로 완벽하게 갖췄습니다.
텐트를 걷으면 탁 트인 파빌리온이 되고, 텐트를 치면 나만의 요새가 됩니다.
물과 불, 그리고 지붕. 인류의 가장 오래된 안식처를 현대 기술로 재해석했습니다.
훗날 벽을 세워 온전한 집이 될 여지까지 남겨둔, 가능성으로 가득 찬 공간입니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "평지붕",
      exterior: "적삼목",
      interior: "자작나무,타일,안타민",
      size: "3.2m X 6.2m X 높이 3.2m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "401%", height: "440%", top: "-112%", left: "-226%" },
    },
  },
  {
    id: "06-3x3-sauna",
    name: "3X3 SAUNA",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/06-3x3-sauna.jpg",
    description: `진정한 휴식은 비워내는 것에서 시작합니다.
그윽한 나무 향기가 가득한 3x3m의 아늑한 방. 뜨거운 공기 속에 땀과 스트레스를 온전히 흘려보내세요.
그리고 문을 열고 나가보세요. 길게 뻗은 처마가 만들어준 프라이빗한 공간 아래, 시원하게 쏟아지는 야외 냉수 샤워가 당신을 기다립니다.
몸은 뜨겁게, 머리는 차갑게. 핀란드의 사우나 문화와 한국의 정자(처마) 감성이 만난 이곳에서, 당신의 몸과 마음은 다시 태어납니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "평지붕",
      exterior: "적삼목",
      interior: "히노끼",
      size: "3.2m X 3.2m X 높이 2.8m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "714%", height: "448%", top: "-115%", left: "-592%" },
    },
  },
  {
    id: "07-3x3-library",
    name: "3X3 내서재",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/07-3x3-library.jpg",
    description: `3면을 채운 책들의 지혜와, 1면을 채운 자연의 영감. 오직 당신만을 위한 '지적 요새'입니다.
누구의 방해도 받지 않는 고요함. 문을 닫는 순간, 등 뒤로는 당신이 사랑하는 장서들이 든든한 벽이 되어주고, 눈앞의 긴 창으로는 계절의 변화가 한 폭의 그림처럼 펼쳐집니다.
창가에 놓인 넓은 책상에 앉아보세요. 시선은 확 트이고, 집중력은 깊어집니다.
글을 쓰든, 연구를 하든, 혹은 그저 사색에 잠기든. 이곳은 당신의 내면이 가장 또렷해지는 세상에 단 하나뿐인 몰입의 공간입니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "쉐이드지붕",
      exterior: "합성데크",
      interior: "자작나무",
      size: "3.2m X 3.2m X 높이 3.2m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "564%", height: "479%", top: "-236%", left: "-7%" },
    },
  },
  {
    id: "08-3x3-retreat",
    name: "3X3 리트릿",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/08-3x3-retreat.jpg",
    description: `소란스러운 세상을 차단하고, 오직 당신의 호흡과 낮은 햇살만이 머무는 공간.
진정한 몰입을 위해 우리는 창의 높이를 과감히 낮췄습니다.
바닥과 맞닿은 낮고 긴 창을 통해 들어온 햇살은 눈을 찌르는 대신, 바닥에 차분하고 깊은 그림자를 만듭니다.
방석 위에 앉아, 혹은 요가 매트 위에 누워 시선을 떨구면 창틀이 담아낸 흙과 풀, 그리고 고요한 빛의 입자만이 보입니다.
따뜻한 차 한 잔을 우리거나 깊은 호흡을 내쉬는 순간. 이 낮은 공간은 당신을 가장 깊은 무의식의 휴식으로 안내할 것입니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "평지붕",
      exterior: "적삼목",
      interior: "자작나무",
      size: "3.2m X 3.2m X 높이 3.2m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "657%", height: "479%", top: "-236%", left: "-137%" },
    },
  },
  {
    id: "09-3x6-manscave",
    name: "3X6 맨스케이브",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/09-3x6-manscave.jpg",
    description: `가족의 행복을 위해, 회사의 목표를 위해 치열하게 살아온 당신. 오직 당신의 룰대로 움직이는 공간이 필요합니다.
외부는 어떤 시선도 허용하지 않는 견고한 디자인입니다.
하지만 육중한 문을 열고 들어서는 순간, 완벽히 다른 세상이 펼쳐집니다.
고가의 오디오 시스템, 수집해온 피규어, 몰입을 위한 게이밍 기어, 혹은 짙은 향의 위스키 바.
누구의 눈치도 볼 필요 없는 이 단단한 벙커 안에서, 잊고 있던 당신의 '소년'을 다시 깨우십시오.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "평지붕",
      exterior: "징크",
      interior: "자작나무,벽지,안타민",
      size: "3.2m X 6.2m X 높이 3.8m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "420%", height: "479%", top: "-236%", left: "-147%" },
    },
  },
  {
    id: "10-3x6-peterpan",
    name: "3X6 피터팬의 모험",
    category: "Small unit",
    subCategory: "Private",
    sizeCategory: "S",
    imageUrl: "/images/products/small/private/10-3x6-peterpan.jpg",
    description: `아이들의 가장 위대한 능력은 보이지 않는 것을 보는 힘입니다.
이 공간은 아이들의 상상력이 더해지는 순간, 완전히 다른 세상으로 변합니다.
어떤 날은 인디언의 비밀 텐트가, 어떤 날은 해적선이, 또 어떤 날은 요정의 숲이 됩니다.
우리는 아이들이 마음껏 상상의 나래를 펼칠 수 있도록, 가장 깨끗하고 안전한 '하얀 도화지' 같은 공간을 만들었습니다.
스마트폰 화면 대신, 아이들 스스로 만들어내는 이야기가 가득 채워지는 곳.
이곳에서 아이들의 꿈은 피터팬의 그림자처럼 늘 함께 자라납니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조 + 목구조",
      roofType: "쉐이드 지붕",
      exterior: "적삼목, 징크",
      interior: "자작나무,벽지",
      size: "3.2m X 6.2m X 높이 3.6m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-private-plans.png",
      crop: { width: "427%", height: "479%", top: "-236%", left: "-251%" },
    },
  },
  // S - Public
  {
    id: "11-3x6-busstop",
    name: "3X6 버스정류장",
    category: "Small unit",
    subCategory: "Public",
    sizeCategory: "S",
    imageUrl: "/images/products/small/public/11-3x6-busstop.jpg",
    description: `시골 버스는 조금 늦게 와도 괜찮습니다. 우리에게는 이야기꽃을 피울 수 있는 넓은 '평상'이 있으니까요.
위트는 시골 어르신들이 버스를 기다리는 시간이 지루하지 않도록, 다리를 펴고 편히 쉬거나 이웃과 담소를 나눌 수 있는 한국적인 평상 구조를 도입했습니다.
또한, 정류장 한편에는 어르신들의 발이 되어주는 유모차(보행기)와 학생들의 자전거가 비를 맞지 않도록 3m x 6m의 넉넉한 공간을 나누어 전용 주차 구역을 마련했습니다.
단순히 버스를 타는 곳이 아닙니다. 마을의 정이 머물고, 사람을 배려하는 따뜻한 쉼터입니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조",
      roofType: "평지붕",
      exterior: "스테인레스",
      interior: "-",
      size: "3.2m X 6.2m X 높이 2.5m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-public-plans.png",
      crop: { width: "407%", height: "628%", top: "-257%", left: "0%" },
    },
  },
  {
    id: "12-4x8-restroom",
    name: "4X8 공중화장실",
    category: "Small unit",
    subCategory: "Public",
    sizeCategory: "S",
    imageUrl: "/images/products/small/public/12-4x8-restroom.jpg",
    description: `시선은 차단하고, 하늘은 열었습니다.
가장 프라이빗한 곳에서 만나는 자유, 'The Sky' 공중화장실의 핵심은 첫째도 청결, 둘째도 유지보수입니다.
우리는 습기와 오염에 가장 강한 소재인 '스테인리스 스틸'을 내외장재로 채택했습니다.
물청소 한 번이면 새것처럼 빛나는 유지 관리의 용이함, 부식이나 파손 걱정 없는 압도적인 내구성, 자연 채광이 쏟아지는 밝은 실내는 세균 번식을 억제하고 심리적으로도 더 깨끗한 환경을 만듭니다.
설치하는 순간부터 관리자의 고민을 덜어주는 가장 스마트한 선택입니다.`,
    details: {
      price: "위트문의",
      structure: "철골구조",
      roofType: "평지붕",
      exterior: "스테인레스",
      interior: "타일,안타민",
      size: "3.2m X 6.2m X 높이 2.5m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-public-plans.png",
      crop: { width: "353%", height: "454%", top: "-185%", left: "-115%" },
    },
  },
  {
    id: "13-3x9-pergola",
    name: "3X9 파고라",
    category: "Small unit",
    subCategory: "Public",
    sizeCategory: "S",
    imageUrl: "/images/products/small/public/13-3x9-pergola.jpg",
    description: `최소한의 기둥, 최대한의 개방감. 철의 강인함으로 나무의 온기를 공중에 띄웠습니다.
아름다운 건축은 풍경을 가리지 않습니다. 단지 풍경이 머물 자리를 만들어줄 뿐입니다.
위트의 파고라는 3m x 9m의 긴 지붕을 지탱하는 구조체를 극한으로 얇게 설계했습니다.
마치 허공에 선을 그은 듯 슬림한 스틸 기둥(Steel Column)은 시각적 무게감을 없애고 압도적인 개방감을 선사합니다.
그리고 그 차가운 금속 프레임 사이를 채우는 것은 따뜻한 물성의 천연 목재(Wood)입니다.
차가움과 따뜻함, 얇음과 견고함. 상반된 두 가치가 만나 완성한 구조적 미학의 정점을 경험해 보세요.`,
    details: {
      price: "위트문의",
      structure: "철골구조",
      roofType: "평지붕",
      exterior: "금속,합성목재",
      interior: "-",
      size: "3.2m X 9.2m X 높이 2.5m",
    },
    floorPlan: {
      src: "/images/products/floor-plans/small-public-plans.png",
      crop: { width: "367%", height: "621%", top: "-254%", left: "-257%" },
    },
  },
];

// 사이드바 구조 생성
const sidebarStructure = {
  S: {
    label: "S",
    subtitle: "",
    Private: productsData.filter(p => p.sizeCategory === "S" && p.subCategory === "Private").map(p => p.id),
    Public: productsData.filter(p => p.sizeCategory === "S" && p.subCategory === "Public").map(p => p.id),
  },
  M: { label: "M", subtitle: "Small unit + Small unit", items: [] as string[] },
  L: { label: "L", subtitle: "Small unit + Small unit\n+ 현장 공사", items: [] as string[] },
  XL: { label: "XL", subtitle: "단지개념", items: [] as string[] },
  SOLUTION: { label: "SOLUTION", subtitle: "", items: [] as string[] },
  DESIGN: { label: "DESIGN", subtitle: "", items: [] as string[] },
};

export default function ProductsPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["S"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeProduct, setActiveProduct] = useState<string>(productsData[0]?.id || "");
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

      for (const product of productsData) {
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
    const product = productsData.find((p) => p.id === id);
    return product?.name || id;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative">
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
      <div className="min-h-screen">
        {/* Products List */}
        <div className="w-full">
          {productsData.map((product) => (
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
