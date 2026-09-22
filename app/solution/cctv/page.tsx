"use client";

import SolutionTemplate from "@/components/solution/ClassicSolutionTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

const COPY = {
  "KO": {
    "title": "시큐리티",
    "subtitle": "Security",
    "description": "CCTV, 방문자 확인과 출입 감지 구성을 상담합니다. 필요한 장비와 녹화·알림 방식은 사용 목적과 설치 환경에 맞춰 확인합니다.",
    "features": [
      {
        "id": "cctv",
        "title": "CCTV",
        "image": "/images/solution/cctv_camera.webp",
        "description": "확인하려는 구역과 설치 위치를 정한 뒤 카메라와 녹화 장비를 검토합니다.",
        "detailContent": "상담 확인 항목: 촬영 범위, 화질과 야간 촬영 사양, 녹화 저장 방식·기간, 네트워크 연결, 알림 지원 여부. 기능은 선택 장비에 따라 다릅니다."
      },
      {
        "id": "smart-doorbell",
        "title": "스마트 도어벨",
        "image": "/images/solution/cctv_doorbell.webp",
        "description": "방문자 확인이 필요한 출입구에 적용할 수 있는 장비를 검토합니다.",
        "detailContent": "설치 공간과 전원, 통신 환경을 먼저 확인합니다. 영상 확인·통화·녹화·휴대폰 알림 지원 여부와 이용 요금은 장비별로 상담합니다."
      },
      {
        "id": "intrusion-detection",
        "title": "출입 감지",
        "image": "/images/solution/cctv_intrusion.webp",
        "description": "문과 창문의 개폐 상태를 확인하는 센서 구성을 검토합니다.",
        "detailContent": "감지 위치, 센서 설치 방식, 알림을 받을 기기와 연동 가능 여부를 확인합니다. 감지·통신 범위는 현장 조건에 따라 달라집니다."
      },
      {
        "id": "theft-detection",
        "title": "지정 구역 모니터링",
        "image": "/images/solution/cctv_theft.webp",
        "description": "보관 공간 등 확인이 필요한 구역을 정하고 촬영·감지 방식을 검토합니다.",
        "detailContent": "촬영 범위, 가림 요소, 전원과 저장 장치를 확인합니다. 보안 장비가 도난 방지나 즉시 대응을 보장하지는 않습니다."
      }
    ]
  },
  "EN": {
    "title": "Security",
    "subtitle": "Security",
    "description": "Discuss cameras, visitor monitoring and entry sensors. Equipment, recording and alerts are selected after checking your use and site conditions.",
    "features": [
      {
        "id": "cctv",
        "title": "CCTV",
        "image": "/images/solution/cctv_camera.webp",
        "description": "Identify the areas to monitor before choosing cameras and recording equipment.",
        "detailContent": "Confirm coverage, image and night-view specifications, storage method and duration, connectivity and alert support. Features depend on the selected equipment."
      },
      {
        "id": "smart-doorbell",
        "title": "Smart Doorbell",
        "image": "/images/solution/cctv_doorbell.webp",
        "description": "Review visitor-monitoring equipment for the entrance where it is needed.",
        "detailContent": "Check mounting space, power and connectivity. Video, audio, recording, mobile notifications and any service fees depend on the selected device."
      },
      {
        "id": "intrusion-detection",
        "title": "Entry Sensors",
        "image": "/images/solution/cctv_intrusion.webp",
        "description": "Review sensors for monitoring door and window opening.",
        "detailContent": "Confirm sensor locations, mounting, receiving devices and compatibility. Detection and communication ranges depend on site conditions."
      },
      {
        "id": "theft-detection",
        "title": "Zone Monitoring",
        "image": "/images/solution/cctv_theft.webp",
        "description": "Plan camera or sensor coverage for storage and other specified areas.",
        "detailContent": "Review obstructions, power, coverage and storage. Security equipment does not guarantee theft prevention or an immediate response."
      }
    ]
  }
};

export default function CCTVSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language === 'KO' ? 'KO' : 'EN'];

  return (
    <SolutionTemplate
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage="/images/solution/cctv_hero.webp"
      description={copy.description}
      features={copy.features}
    />
  );
}
