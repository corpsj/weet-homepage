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
    title: "네트워크",
    subtitle: "Network",
    description: "현장 어디서든 끊김 없는 연결을 제공합니다. LTE/5G 라우터부터 위성 인터넷, 메쉬 Wi-Fi까지 환경에 맞는 최적의 네트워크를 구성합니다.",
    features: [
      {
        id: "lte-router",
        title: "LTE/5G 라우터",
        image: "/images/solution/network_router.webp",
        description: "유선 회선이 없어도 즉시 개통 가능한 고성능 셀룰러 라우터입니다.",
        detailContent: "· LTE/5G 듀얼 SIM 지원\n· 고성능 안테나로 넓은 커버리지\n· VPN/보안 기능 내장\n· 원격 모니터링/관리",
      },
      {
        id: "cpe-bridge",
        title: "무선 브릿지",
        image: "/images/solution/network_bridge.webp",
        description: "건물 간 장거리 포인트 투 포인트 연결로 배선 없이 네트워크를 확장합니다.",
        detailContent: "· 최대 5km 무선 백홀\n· IP65 등급 실외 설치 지원\n· 빔포밍으로 안정된 속도\n· 간편한 설치/정렬",
      },
      {
        id: "satellite",
        title: "위성 인터넷",
        image: "/images/solution/network_satellite.webp",
        description: "도시 외곽이나 산간에서도 사용 가능한 위성 기반 초고속 인터넷입니다.",
        detailContent: "· 최대 200Mbps 다운로드\n· 저지연 위성 연결\n· 넓은 커버리지\n· 이동/임시 현장에 적합",
      },
      {
        id: "mesh-wifi",
        title: "메쉬 Wi-Fi",
        image: "/images/solution/network_mesh.webp",
        description: "넓은 공간을 끊김 없이 커버하는 Wi-Fi 6/6E 메쉬 네트워크입니다.",
        detailContent: "· Wi-Fi 6/6E 지원\n· 단일 SSID 로밍\n· AI 기반 채널 최적화\n· 보안/게스트 네트워크 지원",
      },
    ],
  },
  EN: {
    title: "Network",
    subtitle: "Network",
    description: "Reliable connectivity anywhere. From LTE/5G routers to satellite internet and mesh Wi-Fi, we tailor the best network for each site.",
    features: [
      {
        id: "lte-router",
        title: "LTE/5G Router",
        image: "/images/solution/network_router.webp",
        description: "High-performance cellular router that works even without wired lines.",
        detailContent: "· LTE/5G dual SIM\n· Long-range antennas for wide coverage\n· Built-in VPN and security\n· Remote monitoring/management",
      },
      {
        id: "cpe-bridge",
        title: "Wireless Bridge",
        image: "/images/solution/network_bridge.webp",
        description: "Point-to-point links between buildings to extend network without cabling.",
        detailContent: "· Up to 5km wireless backhaul\n· Outdoor-ready (IP65)\n· Beamforming for stable speed\n· Easy alignment and setup",
      },
      {
        id: "satellite",
        title: "Satellite Internet",
        image: "/images/solution/network_satellite.webp",
        description: "High-speed satellite connectivity for remote or temporary sites.",
        detailContent: "· Up to 200Mbps download\n· Low-latency satellite link\n· Broad coverage\n· Ideal for remote/temporary sites",
      },
      {
        id: "mesh-wifi",
        title: "Mesh Wi-Fi",
        image: "/images/solution/network_mesh.webp",
        description: "Wi-Fi 6/6E mesh that blankets wide spaces without dead zones.",
        detailContent: "· Wi-Fi 6/6E support\n· Single SSID roaming\n· AI channel optimization\n· Secure and guest networks",
      },
    ],
  },
};

export default function NetworkSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

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
