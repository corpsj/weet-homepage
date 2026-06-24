import {
  Bath,
  BedDouble,
  Bolt,
  DoorOpen,
  Home,
  LampDesk,
  Layers,
  Lock,
  PaintBucket,
  PanelTop,
  PlugZap,
  Sofa,
  Waves,
  Wifi,
} from 'lucide-react';
import type { Language } from '@/contexts/LanguageContext';

export const MODEL_IDS = ['compact-3x6', 'standard-3x9'] as const;

export const CATEGORY_ORDER = [
  'model',
  'exterior',
  'windows',
  'door',
  'interior',
  'flooring',
  'sink',
  'bathroom',
  'furniture',
  'energy',
  'connectivity',
] as const;

export const CATEGORY_META = {
  model: { icon: Home, tone: 'text-[#2f3432]' },
  exterior: { icon: PaintBucket, tone: 'text-[#7d6a39]' },
  windows: { icon: PanelTop, tone: 'text-[#536b73]' },
  door: { icon: DoorOpen, tone: 'text-[#4f4b42]' },
  interior: { icon: Layers, tone: 'text-[#65584d]' },
  flooring: { icon: LampDesk, tone: 'text-[#80613d]' },
  sink: { icon: Waves, tone: 'text-[#4f6f75]' },
  bathroom: { icon: Bath, tone: 'text-[#52636b]' },
  furniture: { icon: Sofa, tone: 'text-[#5f544c]' },
  energy: { icon: Bolt, tone: 'text-[#a57a1c]' },
  connectivity: { icon: Wifi, tone: 'text-[#3f5960]' },
} as const;

export const INCLUDED_SPEC_ICON_META = {
  DoorOpen,
  PanelTop,
  Waves,
  Bath,
  BedDouble,
  PlugZap,
  Lock,
} as const;

export const PURCHASE_TIMELINES = ['1개월 이내', '3개월 이내', '6개월 이내', '올해 안', '미정'] as const;
export const LAND_TYPES = ['대지', '전', '답', '임야', '건물옥상', '기타'] as const;
export const BUDGET_RANGES = ['2,000만원 미만', '2,000~3,000만원', '3,000~4,000만원', '4,000~5,000만원', '5,000만원 이상'] as const;

// 상담 폼 드롭다운: 저장 값(value)은 KO 원문으로 고정하고, 표시 라벨만 언어별로 고른다(ConsultForm과 동일 원칙).
// EN/ES만 매핑하고 KO는 value 그대로 폴백한다 → KO byte-identical 보존.
const CHOICE_LABELS: Record<string, { EN: string; ES: string }> = {
  // PURCHASE_TIMELINES
  '1개월 이내': { EN: 'Within 1 month', ES: 'En 1 mes' },
  '3개월 이내': { EN: 'Within 3 months', ES: 'En 3 meses' },
  '6개월 이내': { EN: 'Within 6 months', ES: 'En 6 meses' },
  '올해 안': { EN: 'Within this year', ES: 'Este año' },
  '미정': { EN: 'Undecided', ES: 'Sin definir' },
  // LAND_TYPES (지목/설치 위치)
  '대지': { EN: 'Building lot', ES: 'Terreno edificable' },
  '전': { EN: 'Dry field', ES: 'Campo de secano' },
  '답': { EN: 'Paddy field', ES: 'Arrozal' },
  '임야': { EN: 'Forest land', ES: 'Terreno forestal' },
  '건물옥상': { EN: 'Building rooftop', ES: 'Azotea de edificio' },
  '기타': { EN: 'Other', ES: 'Otro' },
  // BUDGET_RANGES
  '2,000만원 미만': { EN: 'Under ₩20M', ES: 'Menos de ₩20M' },
  '2,000~3,000만원': { EN: '₩20M–30M', ES: '₩20M–30M' },
  '3,000~4,000만원': { EN: '₩30M–40M', ES: '₩30M–40M' },
  '4,000~5,000만원': { EN: '₩40M–50M', ES: '₩40M–50M' },
  '5,000만원 이상': { EN: '₩50M or more', ES: '₩50M o más' },
};

// 드롭다운 옵션 값(KO)을 현재 언어 표시 라벨로 변환한다. 매핑 없으면 value(KO) 그대로.
export function choiceLabel(value: string, language: Language): string {
  if (language === 'KO') return value;
  const entry = CHOICE_LABELS[value];
  if (!entry) return value;
  return language === 'ES' ? entry.ES : entry.EN;
}

export const DEFAULT_MODEL_ID = 'compact-3x6';
