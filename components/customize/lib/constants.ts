export const OPTION_IMAGE_VERSION = '20260610-0137';

export type ConfigStep = 'space' | 'included' | 'mood' | 'smart' | 'review';
export type OptionStep = Exclude<ConfigStep, 'review'>;
export const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
  { id: 'space', label: '모델', categories: ['model'] },
  { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
  { id: 'mood', label: '무드 & 소재', categories: ['exterior', 'interior', 'flooring'] },
  { id: 'smart', label: '스마트 테크', categories: ['energy', 'connectivity'] },
  { id: 'review', label: '검토·요청' },
];
export const SWATCH_CATEGORY_KEYS = new Set(['exterior', 'interior', 'flooring']);

// 시안(B안) 무드 옵션 색상 스와치(22px). 옵션 key → 정확한 hex. 평면도 색 반영과 동일 값.
export const OPTION_SWATCH: Record<string, string> = {
  'ribbed-steel-white': '#E4DFD4',
  'zinc-gray': '#6B6E70',
  'cedar-point': '#9B6A42',
  'paper-wall': '#EFE9DD',
  'silk-wallpaper': '#E2D6C2',
  'birch-panel': '#D8B98A',
  'spc-white-oak': '#D9C7A8',
  'spc-natural-oak': '#B58E5E',
  'porcelain-tile': '#BFC0BC',
};

// 가격/신뢰 문구는 한 곳에서 관리한다. 보수적 표현만 사용한다(결제·할인·보증 약속 금지).
export const COPY = {
  basePrice: '기본 제품가',
  optionSubtotal: '옵션 합계',
  estimatedAmount: '예상 제품 금액',
  consultNeeded: '상담 필요',
  transportNote: '운반/설치 별도 · 현장 조건에 따라 최종 견적 확정',
  notPayment: '상담 요청이며 결제는 진행되지 않습니다.',
  finalQuote: '최종 견적은 상담 후 확정됩니다.',
  privacyUse: '입력하신 정보는 견적 안내와 상담 연락을 위해 사용됩니다.',
  consultExplain: '상담 필요 항목은 담당자가 설치 가능 여부와 금액을 확인해 안내드립니다.',
} as const;

export type ConsultationDraft = {
  customerName: string;
  phone: string;
  region: string;
  purchaseTimeline: string;
  landType: string;
  installAddress: string;
  budgetRange: string;
  memo: string;
};

export const inputClass = 'h-11 rounded-lg border-gray-300 bg-weet-surface text-sm focus-visible:ring-weet-gold-deep';
export const selectClass = 'h-11 w-full rounded-lg border border-gray-300 bg-weet-surface px-3 text-sm outline-none focus:ring-2 focus:ring-weet-gold-deep/30';

export const FALLBACK_CATALOG: Record<string, { desc: string; specs: string[] }> = {
  'ribbed-steel-white': { desc: '화이트 리브 강판은 가장 기본적인 외장 레이어입니다. 밝은 색으로 작은 공간을 가볍게 보이게 하고, 세로 골 패턴이 빗물 흐름과 표면 오염을 정돈해 주기 때문에 유지관리 부담이 낮습니다.', specs: ['세로 리브 패턴', '밝은 외장 톤', '기본 외피'] },
  'zinc-gray': { desc: '징크 그레이는 금속 패널의 선이 또렷하게 보이는 외장 옵션입니다. 상업용 팝업이나 숙박 공간처럼 차분하고 테크적인 인상을 원할 때 잘 맞으며, 창호와 모서리 몰딩 색을 함께 맞추면 완성도가 올라갑니다.', specs: ['메탈 패널', '저채도 그레이', '프리미엄 외피'] },
  'cedar-point': { desc: '적삼목 포인트는 현관, 창 주변, 입면 일부에 따뜻한 질감을 더하는 옵션입니다. 전체를 목재로 덮기보다 포인트 면에 적용해 관리 범위를 줄이고, 흰색·그레이 외장과 대비를 만들어 줍니다.', specs: ['목재 포인트', '입면 대비', '부분 적용'] },
  'basic-window': { desc: '기본 창호는 채광, 환기, 단열의 균형을 맞춘 표준 사양입니다. 작은 평면에서도 가구 배치가 막히지 않도록 창 위치와 열림 방향을 함께 확인합니다.', specs: ['표준 창호', '채광/환기', '단열 검토'] },
  'extra-window': { desc: '추가 창호는 주방, 침실, 작업 공간처럼 더 많은 자연광이나 환기가 필요한 면에 넣는 옵션입니다. 벽면 수납, 침대 위치, 외부 시선 방향과 충돌하지 않게 배치합니다.', specs: ['추가 채광', '환기 강화', '가구 간섭 검토'] },
  'wide-window': { desc: '와이드 창호는 풍경을 크게 받아들이는 파노라마형 옵션입니다. 거실형 사용, 스테이, 카페처럼 내부 체류 경험이 중요한 공간에 적합하며, 일사량과 프라이버시까지 같이 검토합니다.', specs: ['파노라마 뷰', '대형 개구부', '프라이버시 검토'] },
  'standard-lock': { desc: '표준 도어락은 비밀번호와 카드키 중심의 기본 출입 장치입니다. 가족용, 별채, 상주형 공간처럼 관리자가 현장에 가까이 있을 때 단순하고 안정적인 선택입니다.', specs: ['비밀번호', '카드키', '기본 출입'] },
  'smart-lock': { desc: '스마트락은 앱 기반 권한 부여와 출입 이력을 확인해야 하는 운영형 공간에 적합합니다. 숙박, 무인 매장, 직원 교대 공간에서는 게스트 권한 만료와 관리자 접근 방식을 상담 때 확정합니다.', specs: ['앱 권한', '출입 로그', '운영형 출입'] },
  'paper-wall': { desc: '합지 벽지는 비용 효율과 부드러운 실내 톤을 우선할 때 선택하는 기본 내장 마감입니다. 밝은 컬러를 쓰면 3x6 소형 공간에서도 답답함이 줄어듭니다.', specs: ['기본 내장', '밝은 톤', '비용 효율'] },
  'silk-wallpaper': { desc: '실크 벽지는 표면 내구성과 마감감을 높이는 내장 옵션입니다. 오염이 잦은 숙박·상업 공간이나 사진에 많이 노출되는 벽면에서 관리성과 인상이 좋아집니다.', specs: ['표면 내구', '오염 관리', '고급 질감'] },
  'birch-panel': { desc: '자작나무 패널은 벽면 일부를 목재 질감으로 정리해 작은 공간에 따뜻한 깊이를 줍니다. 침대 헤드월, 데스크 벽, 입구 포인트처럼 손이 닿는 면에 적용하기 좋습니다.', specs: ['자작나무 톤', '포인트 월', '내장 패널'] },
  'spc-white-oak': { desc: '화이트 오크 SPC 바닥은 밝고 깨끗한 인상을 주는 기본 바닥 옵션입니다. 물과 스크래치에 강한 편이라 주말주택, 사무실, 스테이 모두에서 관리가 쉽습니다.', specs: ['SPC 바닥', '화이트 오크', '생활 방수'] },
  'spc-natural-oak': { desc: '내추럴 오크 SPC 바닥은 가장 무난하고 따뜻한 생활감의 바닥 옵션입니다. 목재 가구, 베이지 벽지, 금속 외장과 모두 잘 어울려 장기 사용에 안정적입니다.', specs: ['내추럴 오크', '스크래치 대응', '따뜻한 톤'] },
  'porcelain-tile': { desc: '포세린 타일은 현관, 욕실 앞, 주방처럼 물과 오염이 많은 구간에 어울리는 고내구 바닥 옵션입니다. 무광 논슬립 계열을 쓰면 상업 공간과 숙박 공간의 청소 동선이 쉬워집니다.', specs: ['고내구 표면', '논슬립 검토', '오염 관리'] },
  'basic-sink': { desc: '기본 싱크는 간단한 조리와 세척을 위한 표준 주방 모듈입니다. 상판 길이, 수전 위치, 하부 수납을 평면에 맞춰 적용해 작은 공간에서도 동선이 끊기지 않게 합니다.', specs: ['상판/수전', '하부 수납', '표준 주방'] },
  'built-in-fridge': { desc: '빌트인 냉장고는 바닥 면적을 덜 쓰고 주방 라인을 깔끔하게 유지하는 옵션입니다. 스테이, 사무실, 쇼룸처럼 노출된 생활가전을 줄이고 싶을 때 적합합니다.', specs: ['빌트인 수납', '저소음 검토', '주방 라인 정리'] },
  'mini-washer': { desc: '미니 세탁기는 장기 체류, 숙박 운영, 작업복 세탁이 필요한 공간에서 검토하는 설비 옵션입니다. 급수, 배수, 진동 방지, 주변 수납 간섭을 함께 확인해야 합니다.', specs: ['급수/배수', '진동 검토', '장기 체류'] },
  'basic-bathroom': { desc: '기본 욕실은 샤워, 세면, 배수를 한 공간에 모은 표준 습식 모듈입니다. 방수층과 환기, 문 열림 방향을 함께 검토해 소형 평면에서도 사용성을 확보합니다.', specs: ['습식 욕실', '환기/배수', '방수 마감'] },
  'bidet': { desc: '비데는 장기 거주나 숙박 운영에서 체감 만족도가 높은 위생 옵션입니다. 전원 위치, 콘센트 방수, 세정수 연결을 욕실 설계와 함께 확인합니다.', specs: ['전원 위치', '위생 설비', '욕실 연동'] },
  'dry-vanity': { desc: '건식 세면대는 욕실 밖에서 손 씻기와 간단한 정리를 할 수 있게 만드는 옵션입니다. 카페, 사무실, 스테이처럼 여러 사람이 쓰는 공간에서 동선 분리가 좋아집니다.', specs: ['건식 동선', '거울/수납', '공용 사용'] },
  'built-in-storage': { desc: '빌트인 수납은 침구, 청소도구, 장비 박스를 숨기기 위한 맞춤 수납 옵션입니다. 작은 면적일수록 이동 동선을 막지 않는 깊이와 문 열림 방식을 같이 정합니다.', specs: ['맞춤 수납', '동선 확보', '댐퍼 힌지'] },
  'folding-table': { desc: '접이식 테이블은 식사, 노트북 작업, 상담 테이블을 한 면에서 해결하는 공간 절약 옵션입니다. 접었을 때 통로 폭이 남는지와 벽 보강 위치를 함께 검토합니다.', specs: ['접이식 구조', '벽 보강', '작업/식사 겸용'] },
  'bed-frame': { desc: '침대 프레임은 수면 공간을 고정하고 하부를 수납으로 활용하는 옵션입니다. 3x6에서는 접이식·수납형, 3x9에서는 독립 침대형까지 사용 목적에 맞춰 상담합니다.', specs: ['하부 수납', '수면 영역', '평면 맞춤'] },
  'solar-panel': { desc: '태양광 패널은 전기 사용량이 큰 운영 공간에서 전력 비용을 줄이기 위한 에너지 옵션입니다. 지붕 방향, 음영, 인버터 위치, 한전 계통 연계 가능성을 상담 때 확정합니다.', specs: ['지붕 통합', '인버터 연동', '음영 검토'] },
  'ess': { desc: 'ESS는 태양광이나 야간 전력 운용을 저장해 정전 대응과 부하 분산을 돕는 저장 장치입니다. 설치 공간, 환기, 안전 거리, 주요 부하 우선순위를 함께 설계합니다.', specs: ['배터리 저장', '백업 부하', '안전 거리'] },
  'ev-charger': { desc: 'EV 충전기는 방문객, 운영자, 숙박 이용자의 전기차 충전을 고려하는 옵션입니다. 완속 충전 용량, 차단기 여유, 주차 위치, 결제/사용 권한 방식을 함께 확인합니다.', specs: ['완속 충전', '부하 설계', '주차 동선'] },
  'iot-package': { desc: 'IoT 패키지는 조명, 냉난방, 환기, 도어 상태를 원격으로 확인하고 제어하기 위한 운영 옵션입니다. 무인 운영이나 입실 전 공간 준비가 필요한 경우 효과가 큽니다.', specs: ['원격 제어', '상태 알림', '스케줄링'] },
  'security-package': { desc: '보안 패키지는 CCTV, 센서등, 출입 감지, 알림 범위를 하나로 묶는 운영 옵션입니다. 녹화 구역, 야간 알림, 개인정보 노출 구역을 상담 때 정리합니다.', specs: ['CCTV/센서', '야간 알림', '출입 감지'] },
  'satellite-internet': { desc: '위성 인터넷은 유선망이 약하거나 LTE 품질이 흔들리는 외곽 부지에서 검토하는 통신 옵션입니다. 안테나 시야, 설치 위치, 날씨 영향을 고려해 백업망으로 설계합니다.', specs: ['외곽 통신', '안테나 시야', '백업망'] },
  'cellular-router': { desc: 'LTE/5G 라우터는 공사 초기나 유선망이 없는 부지에서 빠르게 네트워크를 열기 위한 옵션입니다. 신호 세기, 외부 안테나, POS·IoT 장비 분리 구성을 함께 봅니다.', specs: ['LTE/5G', '외부 안테나', '장비망 분리'] },
};

export const REQUIRED_FIELDS = ['customerName', 'phone', 'region'] as const;
export type RequiredFieldName = (typeof REQUIRED_FIELDS)[number];

export type FieldRenderArgs = { id: string; describedBy: string | undefined; invalid: boolean };
