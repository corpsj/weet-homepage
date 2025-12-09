"use client";

import SolutionTemplate from "@/components/solution/SolutionTemplate";

const features = [
  {
    id: "cctv",
    title: "CCTV",
    image: "/images/solution/cctv_camera.png",
    description:
      "4K 초고해상 화질로 주야간 구분 없이 깨끗한 선명함을 제공합니다. 최대 90일 영상 기록을 일체형으로 보다 많은 양의 데이터 및 조회결과를 제공합니다. 앱을 스마트폰과 연동 되어 언제 어디서든 실시간에 내 집을 모니터링하고 녹화 영상의 확인이 수 있어, 집에 있지 비용을 공간에 대한 불안감을 최소화해 해소합니다.",
    detailContent: "위트의 CCTV 솔루션은 단순한 녹화를 넘어 지능형 보안 시스템을 제공합니다.\n\n· 800만 화소 4K UHD 초고화질\n· 야간 컬러 뷰 (Color Vue) 기술 탑재\n· AI 기반 사람/차량 구분 감지\n· 침입 발생 시 실시간 푸시 알림 전송\n· 클라우드 및 로컬 이중 저장 지원"
  },
  {
    id: "smart-doorbell",
    title: "스마트 도어벨",
    image: "/images/solution/cctv_doorbell.png",
    description:
      "방문자가 벨을 누르면 스마트폰으로 즉시 알림받아서, 고화질 양방향으로 상대를 확인하고 실시간 응대 대화가 가능합니다. 원격 모드 선택시가 말아 외래 출동한의 대응에도 보안까지, 편한 응가가 있는 시간대에 문을 열어주는 등시대에 면이라며 집입을 금지를 금지를 유도합니다. 힌다.",
    detailContent: "현관 앞의 상황을 가장 먼저 확인하는 스마트 도어벨입니다.\n\n· 180도 광각 렌즈로 사각지대 최소화\n· 방문자 인식 및 택배 도착 알림\n· 실시간 양방향 음성 대화\n· 외출 중 방문자 자동 녹화 기능\n· 적외선 센서로 야간에도 선명한 식별"
  },
  {
    id: "intrusion-detection",
    title: "침입 감지",
    image: "/images/solution/cctv_intrusion.png",
    description:
      "현관과 창문에 설치된 도어 센서가 무단 열림을 감지합니다. 외부 동작감지 센서에 의한 정확의 싫어 편애를 판독 하고, 주거 내부이등의 무세잡을 도 의하 최밀함과 무세잡 판독으로 예상 동자치 사태로특허기 떼로 언제든 판독하여야 나가지도 편입을 즉각 알려 제방 잡으므로 동의 즉프 동아 있는 있드로 합니다.",
    detailContent: "빈틈없는 센서 네트워크로 외부 침입을 원천 봉쇄합니다.\n\n· 문/창문 열림 감지 센서\n· 유리 파손 감지 센서\n· 실내외 동작 감지 센서\n· 오작동 최소화를 위한 듀얼 센싱 기술\n· 보안업체 긴급 출동 연동 서비스"
  },
  {
    id: "theft-detection",
    title: "도난 감지",
    image: "/images/solution/cctv_theft.png",
    description:
      "귀금속이 보관된 보관 주요 사물함 AI 기능로 24시간 감시합니다. 허용 되지 않는 기능을 활동 모드 통합관리이다, 기동을 유도 음성제품 빠른 진원을 안내하여 검세하고 있습니다. 도형 업체 시 AI 주의 적시반 알려주는 여뉴 신경에 종신하고자 합니다.",
    detailContent: "소중한 자산을 지키기 위한 특수 감지 시스템입니다.\n\n· 귀중품 보관함 전용 진동 및 변위 센서\n· 금고 강제 개방 시도 즉시 경보\n· AI 기반 이상 행동 패턴 분석\n· 정전 시에도 작동하는 비상 배터리 시스템\n· 스마트폰을 통한 24시간 자산 상태 확인"
  },
];

export default function CCTVSolutionPage() {
  return (
    <SolutionTemplate
      title="보안 솔루션"
      subtitle="Security System"
      heroImage="/images/solution/cctv_hero.png"
      description="언제든, 어디서든, 우리 집을 안전하게 지키세요. 24시간 관제 시스템과 긴급 출동 서비스로 당신의 소중한 공간을 보호합니다."
      features={features}
    />
  );
}
