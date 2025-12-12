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
    title: "시큐리티",
    subtitle: "Security",
    description: "집과 자산을 24시간 지켜주는 위트의 시큐리티 서비스입니다. CCTV부터 침입 감지, 스마트 도어벨까지 안전을 책임집니다.",
    features: [
      {
        id: "cctv",
        title: "CCTV",
        image: "/images/solution/cctv_camera.png",
        description: "4K 초고해상도와 AI 분석으로 사각지대 없이 감시합니다. 녹화와 알림을 동시에 제공해 위험 상황을 즉시 파악합니다.",
        detailContent: "· 4K UHD 고화질 / 야간 컬러뷰 지원\n· AI 기반 사람·차량 구분 감지\n· 침입 발생 시 즉시 알림 · 실시간 모니터링\n· 클라우드·로컬 백업 지원",
      },
      {
        id: "smart-doorbell",
        title: "스마트 도어벨",
        image: "/images/solution/cctv_doorbell.png",
        description: "방문자를 실시간으로 확인하고 응대합니다. 녹화와 양방향 통화로 부재중에도 안심할 수 있습니다.",
        detailContent: "· 180° 광각 카메라와 양방향 오디오\n· 방문자 감지 시 즉시 알림 및 녹화\n· 배달·택배 확인 알림\n· 실시간 원격 응대",
      },
      {
        id: "intrusion-detection",
        title: "침입 감지",
        image: "/images/solution/cctv_intrusion.png",
        description: "창문·문 센서로 무단 침입을 감지하고, 사이렌과 알림으로 즉시 대응합니다.",
        detailContent: "· 창문/문 개폐 감지\n· 움직임 센서 기반 알림\n· 긴급 시 사이렌 및 통합 알림\n· 보안 모드 자동 전환",
      },
      {
        id: "theft-detection",
        title: "도난 감지",
        image: "/images/solution/cctv_theft.png",
        description: "귀중품 보관 공간을 집중 감시해 이상 징후를 즉시 알려줍니다.",
        detailContent: "· AI 기반 이상행동 감지\n· 지정 구역 침입/이동 모니터링\n· 24시간 기록 및 알림\n· 맞춤 보안 정책 설정",
      },
    ],
  },
  EN: {
    title: "Security",
    subtitle: "Security",
    description: "WEET security keeps your home and assets safe 24/7—from CCTV to intrusion detection and smart doorbells.",
    features: [
      {
        id: "cctv",
        title: "CCTV",
        image: "/images/solution/cctv_camera.png",
        description: "4K resolution with AI analytics to cover every corner. Alerts and recordings help you respond instantly.",
        detailContent: "· 4K UHD / night color view\n· AI person/vehicle detection\n· Instant alerts on intrusion\n· Cloud/local backup support",
      },
      {
        id: "smart-doorbell",
        title: "Smart Doorbell",
        image: "/images/solution/cctv_doorbell.png",
        description: "See and talk to visitors in real time. Record and respond even when you’re away.",
        detailContent: "· 180° wide camera + two-way audio\n· Alerts and recordings on detection\n· Delivery/visitor notifications\n· Remote response from mobile",
      },
      {
        id: "intrusion-detection",
        title: "Intrusion Detection",
        image: "/images/solution/cctv_intrusion.png",
        description: "Detect unauthorized entry with door/window sensors and motion alerts, backed by sirens if needed.",
        detailContent: "· Door/window open detection\n· Motion-based alerts\n· Siren + consolidated notifications\n· Auto security mode switching",
      },
      {
        id: "theft-detection",
        title: "Theft Monitoring",
        image: "/images/solution/cctv_theft.png",
        description: "Focused monitoring of valuables to flag suspicious behavior immediately.",
        detailContent: "· AI abnormal behavior detection\n· Zone intrusion/movement monitoring\n· 24/7 recording and alerts\n· Custom security policies",
      },
    ],
  },
};

export default function CCTVSolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <SolutionTemplate
      title={copy.title}
      subtitle={copy.subtitle}
      heroImage="/images/solution/cctv_hero.png"
      description={copy.description}
      features={copy.features}
    />
  );
}
