"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "energy",
  href: "/solution/energy",
  image: "/images/customize/options/solar-panel.webp",
  copy: {
    KO: {
      eyebrow: "ENERGY STACK OPTION",
      title: "전력 부하까지 예측되게",
      lead:
        "태양광, ESS, EV 충전기, 냉난방 부하를 따로 보지 않고 하나의 에너지 스택으로 설계합니다. 작은 공간도 전력 흐름이 정리되어야 안정적으로 운영됩니다.",
      imageAlt: "한국형 모듈러 주택 지붕의 태양광 패널과 전력 장비 실사 이미지",
      problemTitle: "작은 공간도 전력 설계가 필요합니다",
      problem:
        "냉난방, 온수, 조명, IoT, EV 충전이 동시에 작동하면 전력 부하가 빠르게 올라갑니다. 전력 경로가 정리되지 않으면 차단기 트립, 전기요금 증가, 장비 수명 저하가 생길 수 있습니다.",
      fitTitle: "추천 구성",
      fit: ["전기차 충전이 필요한 주말주택", "냉난방 사용량이 큰 독채 숙박", "무인 운영 장비가 많은 상업 공간", "전력 인입 여유를 효율적으로 써야 하는 모듈러 공간"],
      includedTitle: "구성 범위",
      included: ["태양광 패널 지붕 통합 방향", "ESS 용량과 백업 회로 구성", "EV 완속 충전기 위치와 전력 분기", "냉난방, 온수, 조명, IoT 부하 분리 기준"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["일 평균 전력 사용량과 피크 부하를 어느 수준으로 볼지", "ESS를 백업 전력 중심으로 둘지 전기요금 절감 중심으로 둘지", "EV 충전기를 상시 개방할지 운영자 전용으로 둘지", "태양광 발전량과 필수 회로를 어떤 우선순위로 연결할지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["전력 사용량과 피크 부하가 더 예측 가능해집니다.", "핵심 장비는 백업 회로로 분리해 운영 안정성이 올라갑니다.", "태양광과 ESS가 공간 목적에 맞게 연결됩니다.", "EV 충전과 냉난방을 동시에 고려해 전력 리스크가 줄어듭니다."],
      ctaPrimary: "주문 옵션에서 에너지 확인",
      ctaSecondary: "전력 옵션 문의",
    },
    EN: {
      eyebrow: "ENERGY STACK OPTION",
      title: "Predict Power Load Before Operation",
      lead:
        "Solar, ESS, EV charging, and HVAC load are planned as one energy stack. Even a small modular space needs a clear power flow to operate reliably.",
      imageAlt: "Photorealistic solar panels and power equipment on a Korean modular home roof",
      problemTitle: "Small spaces still need power planning",
      problem:
        "HVAC, hot water, lighting, IoT, and EV charging can quickly raise peak load. Without a clear power path, operators risk breaker trips, higher utility bills, and shorter equipment life.",
      fitTitle: "Recommended configuration",
      fit: ["Weekend homes needing EV charging", "Private stays with high HVAC use", "Commercial spaces with many unmanned devices", "Modular spaces that need efficient power input usage"],
      includedTitle: "Scope",
      included: ["Roof-integrated solar direction", "ESS capacity and backup-circuit design", "EV slow charger position and branch power", "Load separation for HVAC, hot water, lighting, and IoT"],
      decisionsTitle: "System values to define",
      decisions: ["Expected daily power use and peak load", "Whether ESS prioritizes backup power or utility savings", "Whether EV charging is public or operator-only", "How solar generation and essential circuits are prioritized"],
      outcomesTitle: "Operational outcomes",
      outcomes: ["Power use and peak load become more predictable.", "Core devices can be separated into backup circuits.", "Solar and ESS connect to the real purpose of the space.", "EV charging and HVAC are planned together, reducing power risk."],
      ctaPrimary: "Check energy in order options",
      ctaSecondary: "Discuss power options",
    },
  },
};

export default function EnergySolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
