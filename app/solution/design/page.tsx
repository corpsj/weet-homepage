"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "brand",
  href: "/solution/design",
  image: "/images/solution/generated/kr-brandfit-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "SITE FINISH OPTION",
      title: "상권과 브랜드에 어긋나지 않게",
      lead:
        "모듈러가 ‘그냥 놓인 건물’처럼 보이지 않도록 외장, 간판 자리, 데크 동선, 조경과 배수까지 현장에 맞춰 마무리합니다.",
      imageAlt: "한국 상업지 모듈러 공간의 외장재, 간판 프레임, 데크, 조경 마감 실사 이미지",
      problemTitle: "첫인상은 매출과 신뢰로 이어집니다",
      problem:
        "상업 공간은 설치 속도만큼 현장 적응력이 중요합니다. 외장재, 간판 위치, 데크 동선, 조경이 어긋나면 고객은 완성된 브랜드 공간이 아니라 임시 구조물처럼 느낍니다.",
      fitTitle: "추천 현장",
      fit: ["프랜차이즈 카페와 로컬 브랜드 쇼룸", "관광지 판매 공간과 체험형 매장", "외관 첫인상이 중요한 독채 스테이", "도로변 접근과 배수가 중요한 상업 부지"],
      includedTitle: "구성 범위",
      included: ["브랜드 톤에 맞는 외장재와 포인트 컬러 제안", "간판 프레임, 야간 조명, 시야 방향 계획", "데크, 계단, 진입 동선과 대기 공간 정리", "조경, 자갈, 배수 라인 등 현장 마감 디테일"],
      decisionsTitle: "상담 때 확정할 것",
      decisions: ["브랜드가 고객에게 먼저 보여야 할 인상과 소재 톤", "간판이 보이는 거리와 야간 조명 밝기", "고객이 어디서 들어오고 어디서 머무는지", "비, 눈, 흙먼지, 배수 문제를 어떻게 처리할지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["공간이 현장에 자연스럽게 자리 잡아 임시 구조물 느낌이 줄어듭니다.", "간판과 조명이 영업 전부터 계획되어 첫인상이 선명해집니다.", "데크와 조경이 고객 동선을 유도해 이용 경험이 정돈됩니다.", "배수와 외부 마감까지 챙겨 유지관리 리스크가 줄어듭니다."],
      ctaPrimary: "주문 옵션에서 현장 완성 확인",
      ctaSecondary: "브랜드 현장 상담",
    },
    EN: {
      eyebrow: "SITE FINISH OPTION",
      title: "Fit The Brand And Local Market",
      lead:
        "We finish facade, signage position, deck flow, planting, and drainage so the module does not look like a temporary object placed on site.",
      imageAlt: "Photorealistic facade, blank sign frame, deck, and planting detail for a Korean modular commercial site",
      problemTitle: "First impression becomes trust and revenue",
      problem:
        "Commercial spaces need site fit as much as installation speed. If facade, signage, deck flow, and planting feel disconnected, customers see a temporary structure instead of a finished brand space.",
      fitTitle: "Recommended sites",
      fit: ["Franchise cafes and local brand showrooms", "Tourism retail and experience stores", "Private stays where exterior impression matters", "Commercial roadside sites needing access and drainage planning"],
      includedTitle: "Scope",
      included: ["Facade material and accent color direction", "Sign frame, night lighting, and sight-line planning", "Deck, stairs, entrance flow, and waiting-zone alignment", "Planting, gravel, drainage, and exterior finish details"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["What first impression and material tone the brand needs", "Where the sign is visible from and how bright night lighting should be", "Where customers enter, wait, and move", "How to handle rain, snow, dust, and drainage"],
      outcomesTitle: "Operational outcomes",
      outcomes: ["The space sits naturally on site instead of feeling temporary.", "Signage and lighting are planned before opening, sharpening first impression.", "Deck and planting guide customer flow with less confusion.", "Exterior finish and drainage reduce maintenance risk."],
      ctaPrimary: "Check site finish in order options",
      ctaSecondary: "Discuss brand site fit",
    },
  },
};

export default function DesignSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
