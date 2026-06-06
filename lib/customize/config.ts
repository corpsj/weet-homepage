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

export const DEFAULT_MODEL_ID = 'compact-3x6';
