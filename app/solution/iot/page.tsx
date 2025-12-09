"use client";

import SolutionTemplate from "@/components/solution/SolutionTemplate";

const features = [
  {
    id: "smart-lighting",
    title: "스마트 조명",
    image: "/images/solution/iot_lighting.png",
    description:
      "음성 명령이나 앱으로 조명을 제어합니다. 시간대별 자동 조절, 분위기에 맞는 색온도 변경, 외출 시 자동 소등 등 스마트한 조명 관리로 에너지를 절약하고 편리한 생활을 누리세요.",
    detailContent: "빛으로 공간의 분위기를 바꾸고 에너지를 절약합니다.\n\n· 1600만 가지 컬러 및 색온도 조절\n· 기상/취침 시간에 맞춘 서카디언 리듬 조명\n· 영화, 독서, 파티 등 상황별 프리셋 모드\n· 인체 감지 센서 연동 자동 점소등\n· 음성 명령(Google Home, Alexa) 지원"
  },
  {
    id: "climate-control",
    title: "냉난방 제어",
    image: "/images/solution/iot_climate.png",
    description:
      "AI가 사용 패턴을 학습하여 최적의 실내 온도를 유지합니다. 외출 전 미리 에어컨이나 난방을 가동하고, 불필요한 에너지 낭비를 줄여 쾌적하면서도 경제적인 주거 환경을 만들어 드립니다.",
    detailContent: "사계절 내내 가장 쾌적한 온도를 유지하는 AI 냉난방 시스템입니다.\n\n· 실시간 온습도 모니터링 및 자동 제어\n· GPS 연동 도착 전 냉난방 가동 (Geofencing)\n· 수면 패턴 분석을 통한 쾌적 수면 모드\n· 에너지 사용량 실시간 확인 및 절전 가이드\n· 창문 열림 감지 시 냉난방 자동 중단"
  },
  {
    id: "smart-lock",
    title: "스마트 도어락",
    image: "/images/solution/iot_lock.png",
    description:
      "지문, 비밀번호, 카드, 앱 등 다양한 방식으로 출입을 관리합니다. 방문자에게 임시 비밀번호를 발급하고, 출입 기록을 실시간으로 확인하여 안전하고 편리한 출입 환경을 제공합니다.",
    detailContent: "키 없이도 안전하고 편리하게 출입할 수 있습니다.\n\n· 생체 인식 (지문, 안면 인식) 잠금 해제\n· 1회성 임시 비밀번호 및 정기 방문자 키 발급\n· 실시간 출입 기록 및 가족 귀가 알림\n· 문 닫힘 확인 및 자동 잠금 기능\n· 화재 등 비상 상황 시 자동 개폐 시스템"
  },
  {
    id: "voice-assistant",
    title: "음성 비서",
    image: "/images/solution/iot_voice.png",
    description:
      "구글 어시스턴트, 아마존 알렉사, 애플 시리 등과 연동하여 음성으로 모든 스마트 기기를 제어합니다. 손을 사용하지 않고도 조명, 에어컨, TV 등을 간편하게 조작할 수 있습니다.",
    detailContent: "말로 하면 이루어지는 스마트홈의 중심입니다.\n\n· 주요 AI 스피커(Google, Alexa, Siri) 완벽 호환\n· '굿모닝', '외출' 등 상황별 시나리오 음성 실행\n· 가전기기 원격 제어 및 상태 확인\n· 뉴스, 날씨, 교통 정보 실시간 브리핑\n· 인터폰 및 도어벨 연동 음성 통화"
  },
];

export default function IOTSolutionPage() {
  return (
    <SolutionTemplate
      title="IOT 솔루션"
      subtitle="Smart Home IoT"
      heroImage="/images/solution/iot_hero.png"
      description="집 전체를 스마트하게, 이동식 주택의 편리함을 극대화하세요. AI 기반 자동화로 당신의 라이프스타일을 업그레이드합니다."
      features={features}
    />
  );
}
