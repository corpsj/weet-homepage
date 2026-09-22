"use client";

import SolutionTemplate from "@/components/solution/ClassicSolutionTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

const COPY = {
  "KO": {
    "title": "네트워크",
    "subtitle": "Network",
    "description": "설치 지역의 통신 환경을 확인하고 이동통신 라우터, 무선 연결, 위성 인터넷과 Wi-Fi 구성을 검토합니다. 개통 여부와 속도는 현장·장비·요금제에 따라 달라집니다.",
    "features": [
      {
        "id": "lte-router",
        "title": "LTE/5G 라우터",
        "image": "/images/solution/network_router.webp",
        "description": "유선 인터넷 연결이 어려운 곳에서 이동통신망을 이용하는 방식을 검토합니다.",
        "detailContent": "설치 지역의 수신 상태, 통신사와 요금제, 데이터 사용량, 장비 호환성을 확인합니다. 개통 가능 여부와 예상 속도는 현장 확인이 필요합니다."
      },
      {
        "id": "cpe-bridge",
        "title": "무선 브릿지",
        "image": "/images/solution/network_bridge.webp",
        "description": "두 지점 사이에 무선 연결을 구성할 수 있는지 확인합니다.",
        "detailContent": "지점 사이 거리와 시야, 장애물, 전원, 장비의 실외 설치 사양을 확인합니다. 지원 거리나 속도를 일괄 보장하지 않습니다."
      },
      {
        "id": "satellite",
        "title": "위성 인터넷",
        "image": "/images/solution/network_satellite.webp",
        "description": "다른 회선 사용이 어려운 현장의 위성 인터넷 적용 가능성을 검토합니다.",
        "detailContent": "서비스 제공 지역, 안테나 시야와 설치 위치, 전원, 요금제와 이용 조건을 확인합니다. 속도와 지연은 서비스·현장 조건에 따라 달라집니다."
      },
      {
        "id": "mesh-wifi",
        "title": "메쉬 Wi-Fi",
        "image": "/images/solution/network_mesh.webp",
        "description": "공간의 배치와 사용 기기에 맞춰 Wi-Fi 장비 위치와 연결 방식을 계획합니다.",
        "detailContent": "면적, 벽체, 유선 연결 가능 여부와 동시 접속 기기를 확인합니다. 무선 규격, 로밍과 게스트 네트워크 지원은 장비별로 검토합니다."
      }
    ]
  },
  "EN": {
    "title": "Network",
    "subtitle": "Network",
    "description": "Review cellular routers, wireless links, satellite internet and Wi-Fi against local connectivity. Service availability and performance depend on the site, equipment and plan.",
    "features": [
      {
        "id": "lte-router",
        "title": "LTE/5G Router",
        "image": "/images/solution/network_router.webp",
        "description": "Consider cellular connectivity where a wired line is difficult to install.",
        "detailContent": "Check signal reception, carrier coverage, data plan, usage and device compatibility. Activation and expected speeds require a site-specific check."
      },
      {
        "id": "cpe-bridge",
        "title": "Wireless Bridge",
        "image": "/images/solution/network_bridge.webp",
        "description": "Assess whether a wireless connection can link two locations.",
        "detailContent": "Check distance, line of sight, obstructions, power and outdoor equipment specifications. A fixed distance or speed is not guaranteed."
      },
      {
        "id": "satellite",
        "title": "Satellite Internet",
        "image": "/images/solution/network_satellite.webp",
        "description": "Assess satellite service where other connection options are limited.",
        "detailContent": "Check service availability, antenna view and mounting, power, plans and service terms. Speed and latency depend on the service and site."
      },
      {
        "id": "mesh-wifi",
        "title": "Mesh Wi-Fi",
        "image": "/images/solution/network_mesh.webp",
        "description": "Plan Wi-Fi equipment and connections for the layout and devices in use.",
        "detailContent": "Review floor area, walls, wired backhaul and simultaneous devices. Wireless standards, roaming and guest access depend on equipment."
      }
    ]
  }
};

export default function NetworkSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language === 'KO' ? 'KO' : 'EN'];

  return (
    <SolutionTemplate
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage="/images/solution/network_hero.webp"
      description={copy.description}
      features={copy.features}
    />
  );
}
