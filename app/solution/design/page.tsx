"use client";

import SolutionTemplate from "@/components/solution/SolutionTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  title: string;
  subtitle: string;
  description: string;
  features: {
    id: string;
    title: string;
    image: string;
    description: string;
    detailContent?: string;
  }[];
}> = {
  KO: {
    title: "디자인",
    subtitle: "Design",
    description: "브랜드와 라이프스타일을 반영한 공간을 설계합니다. 콘셉트, 마감, 동선을 통합해 완성도 높은 결과물을 만듭니다.",
    features: [
      {
        id: "materials",
        title: "재료 디자인 솔루션",
        image: "/images/solution/design_material.webp",
        description: '"지속 가능성과 내구성을 고려한 최적의 물성 선택" 단순한 마감을 넘어 기후와 환경, 그리고 에너지 효율까지 고려합니다.',
        detailContent: "· 검증된 친환경 자재 사용\n· 고성능 단열재 적용\n· 시간이 흘러도 변하지 않는 가치",
      },
      {
        id: "exterior",
        title: "외관 디자인 솔루션",
        image: "/images/solution/design_exterior.webp",
        description: '"모듈러의 한계를 넘어서는 조형적 완성" 규격화된 모듈 안에서도 독창적인 조형미를 구현합니다.',
        detailContent: "· 주변 환경과 조화를 이루는 파사드\n· 건물의 정체성을 드러내는 디자인\n· 독창적인 조형미 구현",
      },
      {
        id: "planning",
        title: "설계 디자인 솔루션",
        image: "/images/solution/design_planning.webp",
        description: '"생활의 동선까지 계산된 치밀한 공간 설계" 사용자의 라이프스타일을 분석하여 불필요한 공간은 줄이고 실용성은 극대화합니다.',
        detailContent: "· 라이프스타일 분석 기반 설계\n· 실용성 극대화 및 불필요한 공간 최소화\n· 오차 없는 정밀한 모듈 조합",
      },
      {
        id: "site",
        title: "사이트 배치 디자인 솔루션",
        image: "/images/solution/design_site.webp",
        description: '"땅의 잠재력을 깨우는 대지 분석과 배치" 일조량, 통풍, 조망권, 그리고 진입 동선까지 면밀히 분석합니다.',
        detailContent: "· 대지 조건 100% 활용\n· 일조, 통풍, 조망, 동선 분석\n· 자연과 건축물이 공존하는 최적 배치",
      },
    ],
  },
  EN: {
    title: "Design",
    subtitle: "Design",
    description: "We craft spaces that reflect your brand and lifestyle—aligning concept, finishes, and flow for a cohesive result.",
    features: [
      {
        id: "materials",
        title: "Material Design Solution",
        image: "/images/solution/design_material.webp",
        description: '"Optimal material selection considering sustainability and durability." We consider climate, environment, and energy efficiency beyond simple finishing.',
        detailContent: "· Use of verified eco-friendly materials\n· High-performance insulation\n· Enduring value that stands the test of time",
      },
      {
        id: "exterior",
        title: "Exterior Design Solution",
        image: "/images/solution/design_exterior.webp",
        description: '"Sculptural perfection beyond the limits of modularity." We implement unique structural beauty even within standardized modules.',
        detailContent: "· Facade harmonizing with surroundings\n· Design revealing the building's identity\n· Implementation of unique aesthetics",
      },
      {
        id: "planning",
        title: "Planning Design Solution",
        image: "/images/solution/design_planning.webp",
        description: '"Precise spatial design calculated down to daily flow." We analyze lifestyles to minimize waste and maximize practicality.',
        detailContent: "· Lifestyle analysis-based design\n· Maximized practicality, minimized waste\n· Flawless module combination without errors",
      },
      {
        id: "site",
        title: "Site Design Solution",
        image: "/images/solution/design_site.webp",
        description: '"Site analysis and layout that awakens the land\'s potential." We carefully analyze sunlight, ventilation, views, and access paths.',
        detailContent: "· 100% utilization of site conditions\n· Analysis of sunlight, wind, views, flow\n· Optimal layout where nature and architecture coexist",
      },
    ],
  },
};

export default function DesignSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <SolutionTemplate
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage="/images/solution/design_hero.webp"
      description={copy.description}
      features={copy.features}
    />
  );
}
