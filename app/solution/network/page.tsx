"use client";

import SolutionTemplate from "@/components/solution/SolutionTemplate";

const features = [
  {
    id: "lte-router",
    title: "LTE/5G 라우터",
    image: "/images/solution/network_router.png",
    description:
      "이동통신망을 활용한 고성능 라우터로 어디서든 즉시 인터넷 환경을 구축합니다. 다중 통신사 지원으로 최적의 신호를 자동 선택하며, 외부 안테나 연결로 음영지역에서도 강력한 수신 성능을 발휘합니다.",
    detailContent: "인터넷 선이 들어오지 않는 곳에서도 초고속 네트워크를 즐기세요.\n\n· LTE/5G 멀티 밴드 지원으로 안정적 속도 보장\n· 듀얼 심(Dual SIM) 기능으로 통신망 이중화\n· 고성능 외부 안테나로 수신율 극대화\n· VPN 기능 탑재로 보안 접속 지원\n· 플러그 앤 플레이 방식의 간편한 설치"
  },
  {
    id: "cpe-bridge",
    title: "CPE 브릿지",
    image: "/images/solution/network_bridge.png",
    description:
      "장거리 무선 전송 기술을 통해 인터넷 선 설치가 어려운 별채나 외부 공간까지 인터넷을 확장합니다. 복잡한 배선 공사 없이도 본채와 동일한 속도의 안정적인 네트워크를 사용할 수 있습니다.",
    detailContent: "건물과 건물 사이를 무선으로 연결하는 네트워크 브릿지 솔루션입니다.\n\n· 최대 5km 거리까지 무선 전송 가능\n· 기가비트급 전송 속도로 지연 없는 연결\n· IP65 방수방진 등급으로 뛰어난 야외 내구성\n· 빔포밍 기술로 신호 간섭 최소화\n· 포인트-투-포인트 및 포인트-투-멀티포인트 구성 지원"
  },
  {
    id: "satellite",
    title: "위성 인터넷",
    image: "/images/solution/network_satellite.png",
    description:
      "스타링크 등 최신 저궤도 위성 인터넷을 통해 산간 오지에서도 안정적인 고속 인터넷을 제공합니다. 기존 인프라가 없는 지역에서도 최대 200Mbps의 속도로 스트리밍, 화상회의, 원격 근무가 가능합니다.",
    detailContent: "하늘이 보이는 곳이라면 어디서든 연결됩니다.\n\n· 저궤도 위성 통신으로 짧은 지연 시간 (Latency)\n· 최대 200Mbps 이상의 다운로드 속도\n· 폭설, 폭우 등 악천후에도 강한 신호 유지 (히팅 기능)\n· 자가 설치가 가능한 직관적인 안테나 시스템\n· 이동형 안테나 옵션 지원 (Roam)"
  },
  {
    id: "mesh-wifi",
    title: "메시 와이파이",
    image: "/images/solution/network_mesh.png",
    description:
      "주택 전체에 끊김 없는 Wi-Fi 커버리지를 제공하는 메시 네트워크 시스템입니다. 여러 개의 노드가 자동으로 최적의 연결을 유지하여 어느 위치에서든 일관된 속도를 보장합니다.",
    detailContent: "집 안 구석구석 와이파이 데드존을 없앱니다.\n\n· Wi-Fi 6 / 6E 지원으로 초고속 무선 환경\n· 단일 SSID 사용으로 이동 중에도 끊김 없는 로밍\n· AI 기반 트래픽 관리 및 최적화\n· 자녀 보호 및 게스트 네트워크 기능\n· 앱을 통한 간편한 네트워크 관리 및 보안 설정"
  },
];

export default function NetworkSolutionPage() {
  return (
    <SolutionTemplate
      title="네트워크 솔루션"
      subtitle="Network Solution"
      heroImage="/images/solution/network_hero.png"
      description="어디에서도 끊김 없는 인터넷, 산 속에서도 자유로운 소통. 위성 인터넷과 고성능 라우터로 완벽한 연결을 제공합니다."
      features={features}
    />
  );
}
