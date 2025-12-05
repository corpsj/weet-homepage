"use client";

import SolutionTemplate from "@/components/solution/SolutionTemplate";

const features = [
  {
    id: "smart-lighting",
    title: "스마트 조명",
    image: "/images/solution/iot_lighting.png",
    description:
      "음성 명령이나 앱으로 조명을 제어합니다. 시간대별 자동 조절, 분위기에 맞는 색온도 변경, 외출 시 자동 소등 등 스마트한 조명 관리로 에너지를 절약하고 편리한 생활을 누리세요.",
  },
  {
    id: "climate-control",
    title: "냉난방 제어",
    image: "/images/solution/iot_climate.png",
    description:
      "AI가 사용 패턴을 학습하여 최적의 실내 온도를 유지합니다. 외출 전 미리 에어컨이나 난방을 가동하고, 불필요한 에너지 낭비를 줄여 쾌적하면서도 경제적인 주거 환경을 만들어 드립니다.",
  },
  {
    id: "smart-lock",
    title: "스마트 도어락",
    image: "/images/solution/iot_lock.png",
    description:
      "지문, 비밀번호, 카드, 앱 등 다양한 방식으로 출입을 관리합니다. 방문자에게 임시 비밀번호를 발급하고, 출입 기록을 실시간으로 확인하여 안전하고 편리한 출입 환경을 제공합니다.",
  },
  {
    id: "voice-assistant",
    title: "음성 비서",
    image: "/images/solution/iot_voice.png",
    description:
      "구글 어시스턴트, 아마존 알렉사, 애플 시리 등과 연동하여 음성으로 모든 스마트 기기를 제어합니다. 손을 사용하지 않고도 조명, 에어컨, TV 등을 간편하게 조작할 수 있습니다.",
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
