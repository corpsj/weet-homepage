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
    title: "IoT",
    subtitle: "Smart Home IoT",
    description: "조명, 환경, 보안을 하나의 플랫폼에서 제어해 편리하고 안전한 생활을 만듭니다.",
    features: [
      {
        id: "smart-lighting",
        title: "스마트 조명",
        image: "/images/solution/iot_lighting.png",
        description: "밝기·색온도·스케줄을 자유롭게 설정하고, 음성으로 제어합니다.",
        detailContent: "· 밝기/색온도 조절\n· 일정/장면 프리셋\n· 음성 제어(Google/Alexa)\n· 존재 감지 기반 자동 on/off",
      },
      {
        id: "climate-control",
        title: "환경 제어",
        image: "/images/solution/iot_climate.png",
        description: "난방/냉방/환기를 자동으로 최적화해 쾌적함과 에너지 절약을 동시에 달성합니다.",
        detailContent: "· 온습도 센서 기반 제어\n· 위치 기반 귀가/외출 모드\n· 창문 열림 감지 연동\n· 에너지 사용 리포트",
      },
      {
        id: "smart-lock",
        title: "스마트 도어락",
        image: "/images/solution/iot_lock.png",
        description: "비밀번호·모바일키·원격 제어로 안전하게 출입을 관리합니다.",
        detailContent: "· 모바일키/일회용 비밀번호\n· 방문 기록 확인 알림\n· 원격 잠금/해제\n· 경보 및 알림 연동",
      },
      {
        id: "voice-assistant",
        title: "음성 비서",
        image: "/images/solution/iot_voice.png",
        description: "조명, 온도, 보안 장치를 음성으로 제어하고 정보를 확인합니다.",
        detailContent: "· 주요 음성 비서 연동\n· 장치 제어/자동화 실행\n· 정보 조회 및 알림\n· 멀티 디바이스 그룹 제어",
      },
    ],
  },
  EN: {
    title: "IoT",
    subtitle: "Smart Home IoT",
    description: "Control lighting, climate, and security from one platform for a safer, easier life.",
    features: [
      {
        id: "smart-lighting",
        title: "Smart Lighting",
        image: "/images/solution/iot_lighting.png",
        description: "Set brightness, color temperature, schedules, and control by voice.",
        detailContent: "· Dimming and CCT control\n· Schedules and scenes\n· Voice control (Google/Alexa)\n· Presence-based auto on/off",
      },
      {
        id: "climate-control",
        title: "Climate Control",
        image: "/images/solution/iot_climate.png",
        description: "Automate heating/cooling/ventilation for comfort and energy savings.",
        detailContent: "· Temp/humidity sensor control\n· Geofenced home/away modes\n· Window-open detection link\n· Energy usage reports",
      },
      {
        id: "smart-lock",
        title: "Smart Lock",
        image: "/images/solution/iot_lock.png",
        description: "Manage entry with PINs, mobile keys, and remote control.",
        detailContent: "· Mobile/one-time PINs\n· Entry logs and alerts\n· Remote lock/unlock\n· Alarms and notifications",
      },
      {
        id: "voice-assistant",
        title: "Voice Assistant",
        image: "/images/solution/iot_voice.png",
        description: "Control devices and get information hands-free.",
        detailContent: "· Works with major assistants\n· Device control/automation\n· Info queries and alerts\n· Multi-device group control",
      },
    ],
  },
};

export default function IOTSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <SolutionTemplate
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage="/images/solution/iot_hero.png"
      description={copy.description}
      features={copy.features}
    />
  );
}
