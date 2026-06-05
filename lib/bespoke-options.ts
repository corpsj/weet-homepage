import { supabase } from '@/lib/supabase';
import { BespokeOption, BespokeOptionGroup, BespokeOptionGroupWithOptions } from '@/types/supabase';

export const fallbackBespokeOptionGroups: BespokeOptionGroupWithOptions[] = [
  {
    id: 'fallback-space-type',
    key: 'space_type',
    title: '공간 용도',
    description: '브랜드와 운영 방식에 맞는 기본 공간 유형을 선택합니다.',
    selection_type: 'single',
    required: true,
    display_order: 10,
    is_active: true,
    created_at: '',
    updated_at: '',
    options: [
      {
        id: 'fallback-small-cafe',
        group_id: 'fallback-space-type',
        label: '스몰 카페',
        description: '동선, 픽업, 좌석 밀도를 함께 설계하는 소형 상업 공간',
        price_delta: 0,
        lead_time_note: '브랜드 컨셉 정리 후 제안',
        badge: 'COMMERCIAL',
        display_order: 10,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
      {
        id: 'fallback-popup-store',
        group_id: 'fallback-space-type',
        label: '팝업 스토어 / 쇼룸',
        description: '짧은 행사 기간과 이동 설치를 전제로 한 브랜드 경험 공간',
        price_delta: 0,
        lead_time_note: '행사 일정 우선 검토',
        badge: 'RETAIL',
        display_order: 20,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
      {
        id: 'fallback-smart-farm',
        group_id: 'fallback-space-type',
        label: '스마트팜',
        description: '단열, 기밀, 환경 제어, 데이터 인프라를 통합하는 재배 공간',
        price_delta: 0,
        lead_time_note: '설비 요구사항 확인 필요',
        badge: 'AGRITECH',
        display_order: 30,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
    ],
  },
  {
    id: 'fallback-module-scale',
    key: 'module_scale',
    title: '규모',
    description: '설치 부지와 예산에 맞는 모듈 규모를 선택합니다.',
    selection_type: 'single',
    required: true,
    display_order: 20,
    is_active: true,
    created_at: '',
    updated_at: '',
    options: [
      {
        id: 'fallback-scale-s',
        group_id: 'fallback-module-scale',
        label: 'S: 1개 모듈',
        description: '3x3, 3x6, 3x9 등 빠르게 설치 가능한 단일 모듈',
        price_delta: 0,
        lead_time_note: '가장 빠른 제작 가능',
        badge: null,
        display_order: 10,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
      {
        id: 'fallback-scale-m',
        group_id: 'fallback-module-scale',
        label: 'M: 2개 모듈 조합',
        description: '운영실, 창고, 좌석 등 기능을 분리할 수 있는 확장형 구성',
        price_delta: 0,
        lead_time_note: '기본 설계 협의 필요',
        badge: null,
        display_order: 20,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
      {
        id: 'fallback-scale-l',
        group_id: 'fallback-module-scale',
        label: 'L: 모듈 + 현장 공사',
        description: '테라스, 캐노피, 데크, 외부 동선을 포함한 복합 구성',
        price_delta: 0,
        lead_time_note: '현장 실측 권장',
        badge: null,
        display_order: 30,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
    ],
  },
  {
    id: 'fallback-operation',
    key: 'operation_package',
    title: '운영 패키지',
    description: '전기, 설비, 브랜딩, 스마트 제어 등 필요한 기능을 추가합니다.',
    selection_type: 'multiple',
    required: false,
    display_order: 40,
    is_active: true,
    created_at: '',
    updated_at: '',
    options: [
      {
        id: 'fallback-utility',
        group_id: 'fallback-operation',
        label: '상하수 / 위생 설비',
        description: '카페, 화장실, 숙박 운영에 필요한 기본 설비 패키지',
        price_delta: 0,
        lead_time_note: '현장 인입 조건 확인',
        badge: null,
        display_order: 10,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
      {
        id: 'fallback-branding',
        group_id: 'fallback-operation',
        label: '브랜딩 그래픽',
        description: '외부 래핑, 내부 그래픽, 촬영 포인트를 함께 설계',
        price_delta: 0,
        lead_time_note: '로고 원본 필요',
        badge: null,
        display_order: 20,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
      {
        id: 'fallback-iot',
        group_id: 'fallback-operation',
        label: 'IoT / 원격 제어',
        description: '온습도, 조명, 보안, 스마트팜 제어 등 원격 운영 기능',
        price_delta: 0,
        lead_time_note: '운영 시나리오 필요',
        badge: null,
        display_order: 30,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
    ],
  },
];

function combineGroupsAndOptions(groups: BespokeOptionGroup[], options: BespokeOption[]) {
  return groups.map((group) => ({
    ...group,
    options: options.filter((option) => option.group_id === group.id),
  }));
}

export async function getPublicBespokeOptionGroups(): Promise<BespokeOptionGroupWithOptions[]> {
  try {
    const { data: groups, error: groupsError } = await supabase
      .from('bespoke_option_groups')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (groupsError || !groups?.length) {
      return fallbackBespokeOptionGroups;
    }

    const groupIds = groups.map((group) => group.id);
    const { data: options, error: optionsError } = await supabase
      .from('bespoke_options')
      .select('*')
      .eq('is_active', true)
      .in('group_id', groupIds)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (optionsError) {
      return fallbackBespokeOptionGroups;
    }

    const combined = combineGroupsAndOptions(groups as BespokeOptionGroup[], (options || []) as BespokeOption[])
      .filter((group) => group.options.length > 0);

    return combined.length ? combined : fallbackBespokeOptionGroups;
  } catch {
    return fallbackBespokeOptionGroups;
  }
}

export function formatPriceDelta(value: number) {
  if (!value) return '견적 포함';
  const sign = value > 0 ? '+' : '-';
  return `${sign}${Math.abs(value).toLocaleString('ko-KR')}원`;
}
