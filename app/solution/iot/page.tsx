"use client";

import SolutionTemplate from "@/components/solution/ClassicSolutionTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

const COPY = {
  "KO": {
    "title": "IoT",
    "subtitle": "Smart Home IoT",
    "description": "조명, 냉난방과 출입 장치의 제어 방식을 상담합니다. 기존 설비와의 호환성, 통신과 전원 조건을 확인한 뒤 구성을 정합니다.",
    "features": [
      {
        "id": "smart-lighting",
        "title": "스마트 조명",
        "image": "/images/solution/iot_lighting.webp",
        "description": "스위치와 조명 기구의 사양을 확인하고 필요한 제어 방식을 정합니다.",
        "detailContent": "밝기·색온도 조절, 예약 작동과 센서 연동은 호환 장비에서 가능한지 확인합니다. 배선과 전원 공사 범위도 함께 상담합니다."
      },
      {
        "id": "climate-control",
        "title": "환경 제어",
        "image": "/images/solution/iot_climate.webp",
        "description": "온도·습도 확인과 냉난방 제어에 필요한 센서와 장비를 검토합니다.",
        "detailContent": "현재 냉난방 설비, 지원 제어 방식과 센서 위치를 확인합니다. 자동화 범위와 사용 기록 제공 여부는 장비별로 다르며, 일정한 에너지 절감량을 보장하지 않습니다."
      },
      {
        "id": "smart-lock",
        "title": "스마트 도어락",
        "image": "/images/solution/iot_lock.webp",
        "description": "문과 잠금장치의 규격을 확인하고 출입 관리에 필요한 기능을 검토합니다.",
        "detailContent": "비밀번호, 모바일 키, 출입 기록과 원격 제어 지원 여부를 장비별로 확인합니다. 통신·전원 장애 시 사용 방법도 상담합니다."
      },
      {
        "id": "voice-assistant",
        "title": "음성 제어 연동",
        "image": "/images/solution/iot_voice.webp",
        "description": "음성 제어가 필요한 경우 사용할 기기와 서비스의 호환성을 확인합니다.",
        "detailContent": "지원 언어, 계정·인터넷 연결, 제어 가능한 장치와 기능을 확인합니다. 특정 음성 비서나 모든 장치와의 호환을 일괄 보장하지 않습니다."
      }
    ]
  },
  "EN": {
    "title": "IoT",
    "subtitle": "Smart Home IoT",
    "description": "Discuss controls for lighting, climate and entry equipment. Confirm compatibility, connectivity and power before selecting a configuration.",
    "features": [
      {
        "id": "smart-lighting",
        "title": "Smart Lighting",
        "image": "/images/solution/iot_lighting.webp",
        "description": "Review switch and fixture specifications before choosing lighting controls.",
        "detailContent": "Confirm whether compatible equipment supports dimming, color temperature, schedules or sensors. Discuss wiring and electrical work as part of the scope."
      },
      {
        "id": "climate-control",
        "title": "Climate Control",
        "image": "/images/solution/iot_climate.webp",
        "description": "Review sensors and controls for temperature, humidity and climate equipment.",
        "detailContent": "Check existing heating and cooling devices, control methods and sensor locations. Automation and usage records depend on equipment; fixed energy savings are not guaranteed."
      },
      {
        "id": "smart-lock",
        "title": "Smart Lock",
        "image": "/images/solution/iot_lock.webp",
        "description": "Check door and lock dimensions before choosing entry-management functions.",
        "detailContent": "Confirm PINs, mobile keys, entry logs and remote-control support for the selected device. Discuss operation during power or connection failures."
      },
      {
        "id": "voice-assistant",
        "title": "Voice Control",
        "image": "/images/solution/iot_voice.webp",
        "description": "If voice control is needed, check device and service compatibility.",
        "detailContent": "Confirm language, account and internet requirements, controllable devices and supported functions. Compatibility with any particular assistant or every device is not guaranteed."
      }
    ]
  }
};

export default function IOTSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language === 'KO' ? 'KO' : 'EN'];

  return (
    <SolutionTemplate
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage="/images/solution/iot_hero.webp"
      description={copy.description}
      features={copy.features}
    />
  );
}
