"use client";

import ClassicSolutionTemplate from '@/components/solution/ClassicSolutionTemplate';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EnergySolutionPage() {
  const { language } = useLanguage();
  const ko = language === 'KO';
  return <ClassicSolutionTemplate title={ko ? '에너지' : 'Energy'} subtitle="Energy" heroImage="/images/solution/generated/kr-energy-realphoto.webp" description={ko ? '태양광, 전력 저장 장치와 전기차 충전 설비를 선택 옵션으로 검토합니다. 설치 조건과 필요한 전력, 장비 호환성을 확인한 뒤 구성과 비용을 정합니다.' : 'Explore solar power, storage and EV charging as optional equipment. Configuration and cost depend on site conditions, power demand and compatibility.'} features={[
    { id: 'solar', title: ko ? '태양광' : 'Solar power', image: '/images/customize/options/solar-panel.webp', description: ko ? '지붕 면적과 방향, 구조와 배선 조건을 확인합니다. 발전량은 설치 환경과 설비 사양에 따라 달라집니다.' : 'Review roof area, orientation, structure and wiring. Output depends on the installation and equipment.' },
    { id: 'ess', title: ko ? '전력 저장 장치 (ESS)' : 'Energy storage (ESS)', image: '/images/customize/options/ess.webp', description: ko ? '사용할 회로와 전력량을 기준으로 용량을 검토합니다. 정전 시 작동 범위와 시간은 장비 및 회로 구성에 따라 달라집니다.' : 'Size storage for the intended circuits and loads. Backup coverage and duration depend on the equipment and circuit design.' },
    { id: 'ev', title: ko ? '전기차 충전기' : 'EV charging', image: '/images/customize/options/ev-charger.webp', description: ko ? '계약 전력, 충전기 위치와 배선 거리를 확인합니다. 다른 전기 설비의 사용량도 함께 검토합니다.' : 'Check available power, charger location, cable distance and other electrical loads.' },
  ]} />;
}
