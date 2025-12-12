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
    subtitle: "Interior Design",
    description: "브랜드와 라이프스타일을 반영한 공간을 설계합니다. 콘셉트, 마감, 동선을 통합해 완성도 높은 결과물을 만듭니다.",
    features: [
      {
        id: "space-planning",
        title: "공간 기획",
        image: "/images/solution/design_hero.png",
        description: "브랜드 스토리와 용도에 맞춰 공간 콘셉트와 동선을 설계합니다.",
        detailContent: "· 콘셉트/무드 보드\n· 동선·존 배치 계획\n· 2D/3D 시안 제공",
      },
      {
        id: "materials",
        title: "마감·자재 선정",
        image: "/images/solution/design_hero.png",
        description: "내구성과 미감을 모두 고려해 최적의 마감·가구·조명을 제안합니다.",
        detailContent: "· 마감/컬러 팔레트\n· 가구·조명 셀렉션\n· 샘플링 및 비교",
      },
      {
        id: "build-coordination",
        title: "시공 코디네이션",
        image: "/images/solution/design_hero.png",
        description: "시공 도면과 일정, 예산을 관리하며 완성도를 유지합니다.",
        detailContent: "· 시공도서/디테일 도면\n· 일정·예산 관리\n· 품질 점검 및 인도",
      },
    ],
  },
  EN: {
    title: "Design",
    subtitle: "Interior Design",
    description: "We craft spaces that reflect your brand and lifestyle—aligning concept, finishes, and flow for a cohesive result.",
    features: [
      {
        id: "space-planning",
        title: "Space Planning",
        image: "/images/solution/design_hero.png",
        description: "Plan concepts and circulation based on your story and use case.",
        detailContent: "· Concept/mood boards\n· Zoning and circulation plans\n· 2D/3D visuals",
      },
      {
        id: "materials",
        title: "Finishes & Materials",
        image: "/images/solution/design_hero.png",
        description: "Curate durable, beautiful finishes, furniture, and lighting.",
        detailContent: "· Finish/color palette\n· Furniture and lighting selection\n· Sampling and comparisons",
      },
      {
        id: "build-coordination",
        title: "Build Coordination",
        image: "/images/solution/design_hero.png",
        description: "Manage drawings, schedule, and budget to deliver quality.",
        detailContent: "· Construction docs/detail drawings\n· Schedule and budget control\n· QA and handover",
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
      heroImage="/images/solution/design_hero.png"
      description={copy.description}
      features={copy.features}
    />
  );
}
