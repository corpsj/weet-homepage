import type { Language } from '@/contexts/LanguageContext';

export const OPTION_IMAGE_VERSION = '20260610-0137';

export type ConfigStep = 'space' | 'included' | 'mood' | 'smart' | 'review';
export type OptionStep = Exclude<ConfigStep, 'review'>;
// STEP id/순서/카테고리 매핑은 언어무관 구조다. 사람이 읽는 라벨은 UI_COPY.stepLabels로 분리한다.
export const STEPS: { id: ConfigStep; categories?: string[] }[] = [
  { id: 'space', categories: ['model'] },
  { id: 'included', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
  { id: 'mood', categories: ['exterior', 'interior', 'flooring'] },
  { id: 'smart', categories: ['energy', 'connectivity'] },
  { id: 'review' },
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

// 시안(B안) 가격색. 상담 #a16207 / 유료 #18181b 은 시안 그대로,
// 기본포함은 시안 #9ca3af가 대비 2.43:1(AA 미달)이라 사용자 승인 하에 #6b7280(4.6:1)으로 보정(2026-07-02).
export const PRICE_TONE: Record<'consult' | 'fixed' | 'included', string> = {
  consult: 'text-[#a16207]',
  fixed: 'text-[#18181b]',
  included: 'text-[#6b7280]',
};

// 정적 UI chrome 카피. KO는 byte-identical(e2e/SSR 기본). EN 원어민, ES 중남미 중립.
// 가격/신뢰 문구는 보수적 표현만 사용한다(결제·할인·보증 약속 금지).
export interface CustomizeUiCopy {
  // 가격/신뢰
  basePrice: string;
  optionSubtotal: string;
  estimatedAmount: string;
  consultNeeded: string;
  transportNote: string;
  notPayment: string;
  finalQuote: string;
  privacyUse: string;
  consultExplain: string;
  // STEP 라벨 (구조적 id → 표시 라벨)
  stepLabels: Record<ConfigStep, string>;
  // 단계 이동 CTA (nextStepCta)
  ctaNextIncluded: string;
  ctaNextMood: string;
  ctaNextSmart: string;
  ctaReview: string;
  ctaRequest: string;
  // 옵션 가격 라벨
  optionIncluded: string;
  optionConsult: string;
  // 단계 상태 라벨
  stepStatusDone: string;
  stepStatusFinal: string;
  stepStatusCount: (count: number) => string;
  // 견적 PDF
  quoteDocLang: string;
  quoteDocTitle: string;
  quoteSummaryTitle: string;
  quoteSubheadPrefix: string;
  quoteColItem: string;
  quoteColPrice: string;
  quoteConsultItems: (count: number) => string;
  // 충돌/모델 변경 toast
  modelChangeRemoved: (count: number) => string;
  conflictWithReason: (selected: string, removed: string, reason: string) => string;
  conflictNoReason: (selected: string, removed: string) => string;
  // 견적 저장/링크 toast
  quotePopupBlocked: string;
  copyLinkSuccess: string;
  copyLinkFail: string;
  // 빈 카탈로그
  emptyTitle: string;
  emptyBody: string;
  // 모바일 고정 바
  consultBadge: (count: number) => string;
  transportSeparateShort: string;
  finalQuoteShort: string;
  // 앱바
  homeAriaLabel: string;
  appbarTitle: string;
  appbarSubtitle: string;
  appbarCallAriaLabel: string;
  // 스테퍼
  stepperStepWord: string;
  stepperProgressAria: string;
  stepStateComplete: string;
  stepStateCurrent: string;
  stepStateUpcoming: string;
  stepNumberWord: string;
  stepAria: (index: number, label: string, state: string) => string;
  // 옵션 패널
  panelModelHeading: string;
  panelModelHelp: string;
  modelTagWeekend: string;
  modelTagPremium: string;
  includedTitle: string;
  includedBody: string;
  noOptionsAvailable: string;
  catCountWithPrice: (count: number, price: string) => string;
  catConsultCount: (count: number) => string;
  catIncluded: string;
  catNone: string;
  panelRailTitle: string;
  panelRailStepCount: (index: number, total: number) => string;
  optionDetailAria: string;
  // 도면
  floorPlanBadge: (baseM: number, lengthM: number) => string;
  zoomOpenAria: string;
  zoomCloseAria: string;
  zoomTitle: string;
  zoomAreaAria: string;
  planBath: string;
  planKitchen: string;
  planLivingBed: string;
  planLabel: (modelName: string, widthM: number, lengthM: number) => string;
  planExteriorLabel: (name: string) => string;
  planFlooringLabel: (name: string) => string;
  planSmartLock: string;
  // 레일/인라인 푸터
  prevWord: string;
  prevAria: (label: string) => string;
  skipToReview: string;
  footerSiteCondition: string;
  // 요약 보드
  selectedModel: string;
  selectedOptions: string;
  estimatedAmountWord: string;
  noExtraOptions: string;
  consultSeparate: (count: number) => string;
  summaryDisclaimer: string;
  costInfoLink: string;
  // 검토 단계
  reviewTitle: string;
  reviewIntro: string;
  reviewSummaryAria: string;
  reviewPriceAria: string;
  editModel: string;
  editStep: (label: string) => string;
  planView: string;
  noStepOptions: string;
  consultItemsTitle: (count: number) => string;
  consultItemsBody: string;
  priceSummaryTitle: string;
  consultItemsLabel: string;
  saveQuote: string;
  copyLink: string;
  submittedTitle: string;
  submittedBody: string;
  receivedModel: string;
  writeNewRequest: string;
  formTitle: string;
  formIntro: string;
  editWord: string;
  fieldName: string;
  fieldPhone: string;
  fieldRegion: string;
  fieldRegionPlaceholder: string;
  errName: string;
  errPhone: string;
  errRegion: string;
  optionalToggle: string;
  optionalHint: string;
  fieldTimeline: string;
  fieldTimelineHelp: string;
  fieldLandType: string;
  fieldLandTypeHelp: string;
  fieldBudget: string;
  fieldBudgetHelp: string;
  fieldAddress: string;
  fieldAddressHelp: string;
  fieldMemo: string;
  fieldMemoHelp: string;
  formDisclaimer: string;
  selectNone: string;
  requiredBadge: string;
  optionalBadge: string;
  // 옵션 상세 모달
  detailPending: string;
  imageAltSuffix: (name: string) => string;
  figcaption: string;
  consultMemoTitle: string;
  consultMemoBody: string;
  closeWord: string;
}

export const UI_COPY: Record<Language, CustomizeUiCopy> = {
  KO: {
    basePrice: '기본 제품가',
    optionSubtotal: '옵션 합계',
    estimatedAmount: '예상 제품 금액',
    consultNeeded: '상담 필요',
    transportNote: '운반/설치 별도 · 현장 조건에 따라 최종 견적 확정',
    notPayment: '상담 요청이며 결제는 진행되지 않습니다.',
    finalQuote: '최종 견적은 상담 후 확정됩니다.',
    privacyUse: '입력하신 정보는 견적 안내와 상담 연락을 위해 사용됩니다.',
    consultExplain: '상담 필요 항목은 담당자가 설치 가능 여부와 금액을 확인해 안내드립니다.',
    stepLabels: { space: '모델', included: '공간 구성', mood: '무드 & 소재', smart: '스마트 테크', review: '검토·요청' },
    ctaNextIncluded: '다음: 공간 구성',
    ctaNextMood: '다음: 무드 & 소재',
    ctaNextSmart: '다음: 스마트 테크',
    ctaReview: '구성 검토하기',
    ctaRequest: '상담·견적 요청하기',
    optionIncluded: '기본 포함',
    optionConsult: '상담 필요',
    stepStatusDone: '선택 완료',
    stepStatusFinal: '최종 확인',
    stepStatusCount: (count) => `${count}개 선택`,
    quoteDocLang: 'ko',
    quoteDocTitle: '위트 견적 요약',
    quoteSummaryTitle: '위트 이동식주택 견적 요약',
    quoteSubheadPrefix: '상담 요청용 예상 금액 · ',
    quoteColItem: '항목',
    quoteColPrice: '가격',
    quoteConsultItems: (count) => `${count}개 · 견적 별도`,
    modelChangeRemoved: (count) => `새 모델에 맞지 않는 옵션 ${count}개를 제외했습니다.`,
    conflictWithReason: (selected, removed, reason) => `‘${selected}’ 선택으로 ${removed} 옵션을 제외했습니다. ${reason}`,
    conflictNoReason: (selected, removed) => `‘${selected}’과(와) 함께 쓸 수 없어 ${removed} 옵션을 제외했습니다.`,
    quotePopupBlocked: '견적 창을 열 수 없습니다. 팝업 설정을 확인해주세요.',
    copyLinkSuccess: '구성 링크를 복사했습니다.',
    copyLinkFail: '링크 복사에 실패했습니다. 주소창의 URL을 직접 복사해주세요.',
    emptyTitle: '주문 구성을 준비 중입니다.',
    emptyBody: '관리자에서 모델과 옵션을 활성화하면 페이지가 표시됩니다.',
    consultBadge: (count) => `+ 상담 ${count}건`,
    transportSeparateShort: '운반/설치 별도',
    finalQuoteShort: '최종 견적은 상담 후 확정됩니다.',
    homeAriaLabel: '위트 홈으로',
    appbarTitle: '위트 맞춤제작',
    appbarSubtitle: '나만의 위트 만들기',
    appbarCallAriaLabel: '전화 상담',
    stepperStepWord: '단계',
    stepperProgressAria: '구성 진행 단계',
    stepStateComplete: '완료',
    stepStateCurrent: '진행 중',
    stepStateUpcoming: '대기',
    stepNumberWord: '단계',
    stepAria: (index, label, state) => `${index}단계 ${label} · ${state}`,
    panelModelHeading: '공간 모델',
    panelModelHelp: '설치할 공간의 크기와 목적에 맞는 모델을 선택하세요.',
    modelTagWeekend: '소형 주말주택',
    modelTagPremium: '프리미엄 거주',
    includedTitle: '위트 기본 포함 내역',
    includedBody: '골조, 단열, 내/외장재, 바닥재, 도어, 창호, 싱크대 등 생활에 필요한 필수 구성요소가 기본 가격에 포함되어 있습니다.',
    noOptionsAvailable: '현재 선택 가능한 옵션이 없습니다.',
    catCountWithPrice: (count, price) => `${count}개 선택 · +${price}`,
    catConsultCount: (count) => `상담 필요 ${count}개`,
    catIncluded: '기본 포함',
    catNone: '선택 안 함',
    panelRailTitle: '이동식주택 구성',
    panelRailStepCount: (index, total) => `${index} / ${total} 단계`,
    optionDetailAria: '옵션 상세 보기',
    floorPlanBadge: (baseM, lengthM) => `${baseM}m 기준에서 ${lengthM}m로 확장됨`,
    zoomOpenAria: '도면 크게 보기',
    zoomCloseAria: '도면 확대 닫기',
    zoomTitle: '도면 확대',
    zoomAreaAria: '확대 도면 보기 영역',
    planBath: '욕실',
    planKitchen: '주방',
    planLivingBed: '거실 · 침실',
    planLabel: (modelName, widthM, lengthM) => `${modelName} 평면도, 가로 ${widthM}m 세로 ${lengthM}m`,
    planExteriorLabel: (name) => `외장 ${name}`,
    planFlooringLabel: (name) => `바닥 ${name}`,
    planSmartLock: '스마트락 현관',
    prevWord: '이전',
    prevAria: (label) => `이전 단계: ${label}`,
    skipToReview: '구성 검토·상담 요청으로 이동',
    footerSiteCondition: '운반/설치 및 현장 조건에 따라 최종 견적이 달라질 수 있습니다.',
    selectedModel: '선택 모델',
    selectedOptions: '선택 옵션',
    estimatedAmountWord: '예상 제품 금액',
    noExtraOptions: '추가 선택 옵션 없음 · 기본 구성',
    consultSeparate: (count) => `+ 상담 필요 ${count}개 · 견적 별도`,
    summaryDisclaimer: '상담 요청용 예상 금액입니다. 결제 단계가 아니며, 운반/설치 및 현장 조건에 따라 최종 견적이 달라질 수 있습니다.',
    costInfoLink: '별도 비용 안내',
    reviewTitle: '구성 검토 및 상담 요청',
    reviewIntro: '선택하신 구성을 확인한 뒤 상담을 요청하세요.',
    reviewSummaryAria: '선택 구성 요약',
    reviewPriceAria: '가격 요약 및 상담 요청',
    editModel: '모델 수정',
    editStep: (label) => `${label} 수정`,
    planView: '평면 구성 보기',
    noStepOptions: '선택한 옵션이 없습니다. 비워두셔도 상담에서 함께 정할 수 있습니다.',
    consultItemsTitle: (count) => `상담 필요 항목 ${count}개`,
    consultItemsBody: '선택한 구성은 상담 요청서에 함께 전달됩니다.',
    priceSummaryTitle: '가격 요약',
    consultItemsLabel: '상담 필요 항목',
    saveQuote: '견적 요약 저장',
    copyLink: '구성 링크 복사',
    submittedTitle: '상담 요청이 접수되었습니다',
    submittedBody: '담당자가 확인 후 입력하신 연락처로 연락드립니다.',
    receivedModel: '접수 모델',
    writeNewRequest: '새 상담 요청 작성',
    formTitle: '상담 요청 정보',
    formIntro: '구성 확인과 연락을 위한 최소 정보만 받습니다.',
    editWord: '수정',
    fieldName: '이름',
    fieldPhone: '연락처',
    fieldRegion: '지역',
    fieldRegionPlaceholder: '경기도 양평군',
    errName: '이름을 입력해주세요.',
    errPhone: '연락처를 입력해주세요.',
    errRegion: '지역을 입력해주세요.',
    optionalToggle: '더 정확한 견적을 위한 선택 정보',
    optionalHint: '아직 정하지 못한 항목은 비워두셔도 됩니다.',
    fieldTimeline: '예상 구매 시기',
    fieldTimelineHelp: '생산·설치 일정 제안에만 참고합니다.',
    fieldLandType: '설치할 장소 지목',
    fieldLandTypeHelp: '대지, 전·답, 임야 등 설치 조건 검토에 참고합니다.',
    fieldBudget: '구매 예산',
    fieldBudgetHelp: '가능한 사양 조합을 빠르게 제안하기 위한 참고값입니다.',
    fieldAddress: '설치 주소',
    fieldAddressHelp: '정확한 번지 전이라도 읍·면·동 수준이면 괜찮습니다.',
    fieldMemo: '추가 메모',
    fieldMemoHelp: '사용 목적, 예상 인원, 필요한 옵션을 자유롭게 적어주세요.',
    formDisclaimer: '운반/설치는 별도이며 현장 조건에 따라 달라질 수 있습니다.',
    selectNone: '선택 안 함',
    requiredBadge: '필수',
    optionalBadge: '선택',
    detailPending: '상세 정보가 준비 중입니다.',
    imageAltSuffix: (name) => `${name} 상세 설명 이미지`,
    figcaption: '실제 선택 시 확인해야 하는 재료감, 설치 위치, 주변 설비 관계를 보여주는 참고 이미지입니다.',
    consultMemoTitle: '상담 메모',
    consultMemoBody: '이 이미지는 옵션 이해를 돕기 위한 예시입니다. 최종 사양은 모델 크기, 설치 위치, 현장 조건, 전기·급배수 여건을 확인한 뒤 상담 과정에서 확정됩니다.',
    closeWord: '닫기',
  },
  EN: {
    basePrice: 'Base unit price',
    optionSubtotal: 'Options subtotal',
    estimatedAmount: 'Estimated unit price',
    consultNeeded: 'Consultation needed',
    transportNote: 'Transport/installation separate · final quote confirmed by site conditions',
    notPayment: 'This is a consultation request — no payment is processed.',
    finalQuote: 'The final quote is confirmed after consultation.',
    privacyUse: 'The information you enter is used to provide quotes and arrange consultation.',
    consultExplain: 'For consultation-needed items, our team confirms feasibility and pricing and gets back to you.',
    stepLabels: { space: 'Model', included: 'Layout', mood: 'Mood & Materials', smart: 'Smart Tech', review: 'Review & Request' },
    ctaNextIncluded: 'Next: Layout',
    ctaNextMood: 'Next: Mood & Materials',
    ctaNextSmart: 'Next: Smart Tech',
    ctaReview: 'Review configuration',
    ctaRequest: 'Request consultation & quote',
    optionIncluded: 'Included',
    optionConsult: 'Consultation needed',
    stepStatusDone: 'Selected',
    stepStatusFinal: 'Final review',
    stepStatusCount: (count) => `${count} selected`,
    quoteDocLang: 'en',
    quoteDocTitle: 'Weet quote summary',
    quoteSummaryTitle: 'Weet modular home quote summary',
    quoteSubheadPrefix: 'Estimated amount for consultation · ',
    quoteColItem: 'Item',
    quoteColPrice: 'Price',
    quoteConsultItems: (count) => `${count} · quoted separately`,
    modelChangeRemoved: (count) => `Removed ${count} option(s) that don't fit the new model.`,
    conflictWithReason: (selected, removed, reason) => `Selecting "${selected}" removed the ${removed} option(s). ${reason}`,
    conflictNoReason: (selected, removed) => `Removed the ${removed} option(s) because they can't be used with "${selected}".`,
    quotePopupBlocked: 'Could not open the quote window. Please check your pop-up settings.',
    copyLinkSuccess: 'Configuration link copied.',
    copyLinkFail: 'Failed to copy the link. Please copy the URL from the address bar manually.',
    emptyTitle: 'The order configurator is being prepared.',
    emptyBody: 'The page appears once models and options are activated in the admin.',
    consultBadge: (count) => `+ ${count} consultation item(s)`,
    transportSeparateShort: 'Transport/installation separate',
    finalQuoteShort: 'The final quote is confirmed after consultation.',
    homeAriaLabel: 'Back to Weet home',
    appbarTitle: 'Weet Custom Build',
    appbarSubtitle: 'Build your own Weet',
    appbarCallAriaLabel: 'Phone consultation',
    stepperStepWord: 'Step',
    stepperProgressAria: 'Configuration progress steps',
    stepStateComplete: 'complete',
    stepStateCurrent: 'in progress',
    stepStateUpcoming: 'pending',
    stepNumberWord: 'Step',
    stepAria: (index, label, state) => `Step ${index} ${label} · ${state}`,
    panelModelHeading: 'Space model',
    panelModelHelp: 'Choose the model that fits the size and purpose of your space.',
    modelTagWeekend: 'Compact weekend home',
    modelTagPremium: 'Premium living',
    includedTitle: "Weet's standard inclusions",
    includedBody: 'Essential elements for daily living — frame, insulation, interior/exterior finishes, flooring, doors, windows, sink and more — are included in the base price.',
    noOptionsAvailable: 'No options are available right now.',
    catCountWithPrice: (count, price) => `${count} selected · +${price}`,
    catConsultCount: (count) => `${count} consultation needed`,
    catIncluded: 'Included',
    catNone: 'None selected',
    panelRailTitle: 'Modular home configuration',
    panelRailStepCount: (index, total) => `Step ${index} / ${total}`,
    optionDetailAria: 'View option details',
    floorPlanBadge: (baseM, lengthM) => `Extended from ${baseM}m to ${lengthM}m`,
    zoomOpenAria: 'Enlarge floor plan',
    zoomCloseAria: 'Close enlarged floor plan',
    zoomTitle: 'Enlarged floor plan',
    zoomAreaAria: 'Enlarged floor plan viewing area',
    planBath: 'Bath',
    planKitchen: 'Kitchen',
    planLivingBed: 'Living · Bedroom',
    planLabel: (modelName, widthM, lengthM) => `${modelName} floor plan, ${widthM}m wide by ${lengthM}m long`,
    planExteriorLabel: (name) => `Exterior ${name}`,
    planFlooringLabel: (name) => `Flooring ${name}`,
    planSmartLock: 'Smart-lock entrance',
    prevWord: 'Back',
    prevAria: (label) => `Previous step: ${label}`,
    skipToReview: 'Go to review & consultation request',
    footerSiteCondition: 'The final quote may vary by transport/installation and site conditions.',
    selectedModel: 'Selected model',
    selectedOptions: 'Selected options',
    estimatedAmountWord: 'Estimated unit price',
    noExtraOptions: 'No extra options · base configuration',
    consultSeparate: (count) => `+ ${count} consultation needed · quoted separately`,
    summaryDisclaimer: 'This is an estimated amount for consultation. It is not a payment step, and the final quote may vary by transport/installation and site conditions.',
    costInfoLink: 'Additional cost guide',
    reviewTitle: 'Review configuration & request consultation',
    reviewIntro: 'Review your configuration, then request a consultation.',
    reviewSummaryAria: 'Selected configuration summary',
    reviewPriceAria: 'Price summary and consultation request',
    editModel: 'Edit model',
    editStep: (label) => `Edit ${label}`,
    planView: 'View floor layout',
    noStepOptions: "No options selected. You can leave it blank and decide together during consultation.",
    consultItemsTitle: (count) => `${count} consultation-needed item(s)`,
    consultItemsBody: 'Your selected configuration is sent along with the consultation request.',
    priceSummaryTitle: 'Price summary',
    consultItemsLabel: 'Consultation-needed items',
    saveQuote: 'Save quote summary',
    copyLink: 'Copy configuration link',
    submittedTitle: 'Your consultation request has been received',
    submittedBody: 'Our team will review it and contact you at the number you provided.',
    receivedModel: 'Received model',
    writeNewRequest: 'Write a new consultation request',
    formTitle: 'Consultation request details',
    formIntro: 'We only collect the minimum needed to confirm your configuration and reach you.',
    editWord: 'Edit',
    fieldName: 'Name',
    fieldPhone: 'Phone',
    fieldRegion: 'Region',
    fieldRegionPlaceholder: 'Yangpyeong-gun, Gyeonggi-do',
    errName: 'Please enter your name.',
    errPhone: 'Please enter your phone number.',
    errRegion: 'Please enter your region.',
    optionalToggle: 'Optional details for a more accurate quote',
    optionalHint: "You can leave items you haven't decided yet blank.",
    fieldTimeline: 'Expected purchase timing',
    fieldTimelineHelp: 'Used only as a reference for production/installation scheduling.',
    fieldLandType: 'Land category for installation',
    fieldLandTypeHelp: 'Used as a reference for reviewing site conditions (lot, farmland, forest, etc.).',
    fieldBudget: 'Purchase budget',
    fieldBudgetHelp: 'A reference value to quickly suggest feasible spec combinations.',
    fieldAddress: 'Installation address',
    fieldAddressHelp: "Before an exact lot number, eup/myeon/dong level is fine.",
    fieldMemo: 'Additional notes',
    fieldMemoHelp: 'Feel free to note your purpose, expected occupancy, and options you need.',
    formDisclaimer: 'Transport/installation is separate and may vary by site conditions.',
    selectNone: 'Not selected',
    requiredBadge: 'Required',
    optionalBadge: 'Optional',
    detailPending: 'Details are being prepared.',
    imageAltSuffix: (name) => `${name} detail image`,
    figcaption: 'A reference image showing the material feel, installation position, and relation to nearby fixtures you should confirm before selecting.',
    consultMemoTitle: 'Consultation note',
    consultMemoBody: 'This image is an example to aid understanding of the option. The final spec is confirmed during consultation after checking model size, installation position, site conditions, and electrical/plumbing readiness.',
    closeWord: 'Close',
  },
  ES: {
    basePrice: 'Precio base de la unidad',
    optionSubtotal: 'Subtotal de opciones',
    estimatedAmount: 'Precio estimado de la unidad',
    consultNeeded: 'Requiere asesoría',
    transportNote: 'Transporte/instalación aparte · cotización final según condiciones del sitio',
    notPayment: 'Esta es una solicitud de asesoría — no se procesa ningún pago.',
    finalQuote: 'La cotización final se confirma tras la asesoría.',
    privacyUse: 'La información que ingresa se usa para entregar cotizaciones y coordinar la asesoría.',
    consultExplain: 'Para los ítems que requieren asesoría, nuestro equipo confirma la viabilidad y el precio y le responde.',
    stepLabels: { space: 'Modelo', included: 'Distribución', mood: 'Ambiente y materiales', smart: 'Tecnología inteligente', review: 'Revisión y solicitud' },
    ctaNextIncluded: 'Siguiente: Distribución',
    ctaNextMood: 'Siguiente: Ambiente y materiales',
    ctaNextSmart: 'Siguiente: Tecnología inteligente',
    ctaReview: 'Revisar la configuración',
    ctaRequest: 'Solicitar asesoría y cotización',
    optionIncluded: 'Incluido',
    optionConsult: 'Requiere asesoría',
    stepStatusDone: 'Seleccionado',
    stepStatusFinal: 'Revisión final',
    stepStatusCount: (count) => `${count} seleccionados`,
    quoteDocLang: 'es',
    quoteDocTitle: 'Resumen de cotización de Weet',
    quoteSummaryTitle: 'Resumen de cotización de casa modular Weet',
    quoteSubheadPrefix: 'Monto estimado para asesoría · ',
    quoteColItem: 'Ítem',
    quoteColPrice: 'Precio',
    quoteConsultItems: (count) => `${count} · cotizado aparte`,
    modelChangeRemoved: (count) => `Se quitaron ${count} opción(es) que no corresponden al nuevo modelo.`,
    conflictWithReason: (selected, removed, reason) => `Al seleccionar "${selected}" se quitó la(s) opción(es) ${removed}. ${reason}`,
    conflictNoReason: (selected, removed) => `Se quitó la(s) opción(es) ${removed} porque no se pueden usar con "${selected}".`,
    quotePopupBlocked: 'No se pudo abrir la ventana de cotización. Revise la configuración de ventanas emergentes.',
    copyLinkSuccess: 'Enlace de configuración copiado.',
    copyLinkFail: 'No se pudo copiar el enlace. Copie la URL de la barra de direcciones manualmente.',
    emptyTitle: 'El configurador de pedidos se está preparando.',
    emptyBody: 'La página aparece cuando se activan modelos y opciones en el panel de administración.',
    consultBadge: (count) => `+ ${count} ítem(es) de asesoría`,
    transportSeparateShort: 'Transporte/instalación aparte',
    finalQuoteShort: 'La cotización final se confirma tras la asesoría.',
    homeAriaLabel: 'Volver al inicio de Weet',
    appbarTitle: 'Weet a medida',
    appbarSubtitle: 'Crea tu propia Weet',
    appbarCallAriaLabel: 'Asesoría telefónica',
    stepperStepWord: 'Paso',
    stepperProgressAria: 'Pasos de progreso de la configuración',
    stepStateComplete: 'completado',
    stepStateCurrent: 'en curso',
    stepStateUpcoming: 'pendiente',
    stepNumberWord: 'Paso',
    stepAria: (index, label, state) => `Paso ${index} ${label} · ${state}`,
    panelModelHeading: 'Modelo de espacio',
    panelModelHelp: 'Elija el modelo que se ajuste al tamaño y propósito de su espacio.',
    modelTagWeekend: 'Casa de fin de semana compacta',
    modelTagPremium: 'Vivienda premium',
    includedTitle: 'Inclusiones estándar de Weet',
    includedBody: 'Los elementos esenciales para vivir —estructura, aislamiento, acabados interiores/exteriores, pisos, puertas, ventanas, fregadero y más— están incluidos en el precio base.',
    noOptionsAvailable: 'No hay opciones disponibles por ahora.',
    catCountWithPrice: (count, price) => `${count} seleccionados · +${price}`,
    catConsultCount: (count) => `${count} requieren asesoría`,
    catIncluded: 'Incluido',
    catNone: 'Sin seleccionar',
    panelRailTitle: 'Configuración de casa modular',
    panelRailStepCount: (index, total) => `Paso ${index} / ${total}`,
    optionDetailAria: 'Ver detalles de la opción',
    floorPlanBadge: (baseM, lengthM) => `Ampliado de ${baseM}m a ${lengthM}m`,
    zoomOpenAria: 'Ampliar el plano',
    zoomCloseAria: 'Cerrar el plano ampliado',
    zoomTitle: 'Plano ampliado',
    zoomAreaAria: 'Área de visualización del plano ampliado',
    planBath: 'Baño',
    planKitchen: 'Cocina',
    planLivingBed: 'Sala · Dormitorio',
    planLabel: (modelName, widthM, lengthM) => `Plano de ${modelName}, ${widthM}m de ancho por ${lengthM}m de largo`,
    planExteriorLabel: (name) => `Exterior ${name}`,
    planFlooringLabel: (name) => `Piso ${name}`,
    planSmartLock: 'Entrada con cerradura inteligente',
    prevWord: 'Atrás',
    prevAria: (label) => `Paso anterior: ${label}`,
    skipToReview: 'Ir a revisión y solicitud de asesoría',
    footerSiteCondition: 'La cotización final puede variar según el transporte/instalación y las condiciones del sitio.',
    selectedModel: 'Modelo seleccionado',
    selectedOptions: 'Opciones seleccionadas',
    estimatedAmountWord: 'Precio estimado de la unidad',
    noExtraOptions: 'Sin opciones adicionales · configuración base',
    consultSeparate: (count) => `+ ${count} requieren asesoría · cotizado aparte`,
    summaryDisclaimer: 'Este es un monto estimado para asesoría. No es un paso de pago, y la cotización final puede variar según el transporte/instalación y las condiciones del sitio.',
    costInfoLink: 'Guía de costos adicionales',
    reviewTitle: 'Revisar la configuración y solicitar asesoría',
    reviewIntro: 'Revise su configuración y luego solicite una asesoría.',
    reviewSummaryAria: 'Resumen de la configuración seleccionada',
    reviewPriceAria: 'Resumen de precios y solicitud de asesoría',
    editModel: 'Editar modelo',
    editStep: (label) => `Editar ${label}`,
    planView: 'Ver la distribución',
    noStepOptions: 'No hay opciones seleccionadas. Puede dejarlo en blanco y decidirlo juntos durante la asesoría.',
    consultItemsTitle: (count) => `${count} ítem(es) que requieren asesoría`,
    consultItemsBody: 'Su configuración seleccionada se envía junto con la solicitud de asesoría.',
    priceSummaryTitle: 'Resumen de precios',
    consultItemsLabel: 'Ítems que requieren asesoría',
    saveQuote: 'Guardar resumen de cotización',
    copyLink: 'Copiar enlace de configuración',
    submittedTitle: 'Su solicitud de asesoría ha sido recibida',
    submittedBody: 'Nuestro equipo la revisará y lo contactará al número que proporcionó.',
    receivedModel: 'Modelo recibido',
    writeNewRequest: 'Escribir una nueva solicitud de asesoría',
    formTitle: 'Datos de la solicitud de asesoría',
    formIntro: 'Solo recopilamos lo mínimo necesario para confirmar su configuración y contactarlo.',
    editWord: 'Editar',
    fieldName: 'Nombre',
    fieldPhone: 'Teléfono',
    fieldRegion: 'Región',
    fieldRegionPlaceholder: 'Yangpyeong-gun, Gyeonggi-do',
    errName: 'Ingrese su nombre.',
    errPhone: 'Ingrese su número de teléfono.',
    errRegion: 'Ingrese su región.',
    optionalToggle: 'Datos opcionales para una cotización más precisa',
    optionalHint: 'Puede dejar en blanco los ítems que aún no haya decidido.',
    fieldTimeline: 'Fecha estimada de compra',
    fieldTimelineHelp: 'Se usa solo como referencia para programar producción/instalación.',
    fieldLandType: 'Categoría del terreno de instalación',
    fieldLandTypeHelp: 'Se usa como referencia para revisar las condiciones del sitio (lote, terreno agrícola, bosque, etc.).',
    fieldBudget: 'Presupuesto de compra',
    fieldBudgetHelp: 'Un valor de referencia para sugerir rápidamente combinaciones de especificaciones viables.',
    fieldAddress: 'Dirección de instalación',
    fieldAddressHelp: 'Antes de un número de lote exacto, el nivel de eup/myeon/dong está bien.',
    fieldMemo: 'Notas adicionales',
    fieldMemoHelp: 'Anote con libertad su propósito, la ocupación prevista y las opciones que necesita.',
    formDisclaimer: 'El transporte/instalación es aparte y puede variar según las condiciones del sitio.',
    selectNone: 'Sin seleccionar',
    requiredBadge: 'Obligatorio',
    optionalBadge: 'Opcional',
    detailPending: 'Los detalles se están preparando.',
    imageAltSuffix: (name) => `Imagen de detalle de ${name}`,
    figcaption: 'Una imagen de referencia que muestra la textura del material, la posición de instalación y la relación con las instalaciones cercanas que debe confirmar antes de elegir.',
    consultMemoTitle: 'Nota de asesoría',
    consultMemoBody: 'Esta imagen es un ejemplo para ayudar a entender la opción. La especificación final se confirma durante la asesoría tras revisar el tamaño del modelo, la posición de instalación, las condiciones del sitio y la disponibilidad eléctrica/de agua.',
    closeWord: 'Cerrar',
  },
};

// 언어가 없는 순수 함수/PDF 빌더에서 쓰는 KO 기본값. 컴포넌트는 UI_COPY[language]를 사용한다.
export const COPY = UI_COPY.KO;

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

export const inputClass = 'h-11 rounded-lg border-weet-line-2 bg-weet-surface text-sm focus-visible:ring-weet-gold-deep aria-[invalid=true]:border-customize-error aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-customize-error/40';
export const selectClass = 'h-11 w-full rounded-lg border border-weet-line-2 bg-weet-surface px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep';

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
  'ev-charger': { desc: 'EV 충전기는 방문객, 운영자, 숙박 이용자의 전기차 충전을 고려하는 옵션입니다. 완속 충전 용량, 차단기 여유, 주차 위치, 사용 권한 방식을 함께 확인합니다.', specs: ['완속 충전', '부하 설계', '주차 동선'] },
  'iot-package': { desc: 'IoT 패키지는 조명, 냉난방, 환기, 도어 상태를 원격으로 확인하고 제어하기 위한 운영 옵션입니다. 무인 운영이나 입실 전 공간 준비가 필요한 경우 효과가 큽니다.', specs: ['원격 제어', '상태 알림', '스케줄링'] },
  'security-package': { desc: '보안 패키지는 CCTV, 센서등, 출입 감지, 알림 범위를 하나로 묶는 운영 옵션입니다. 녹화 구역, 야간 알림, 개인정보 노출 구역을 상담 때 정리합니다.', specs: ['CCTV/센서', '야간 알림', '출입 감지'] },
  'satellite-internet': { desc: '위성 인터넷은 유선망이 약하거나 LTE 품질이 흔들리는 외곽 부지에서 검토하는 통신 옵션입니다. 안테나 시야, 설치 위치, 날씨 영향을 고려해 백업망으로 설계합니다.', specs: ['외곽 통신', '안테나 시야', '백업망'] },
  'cellular-router': { desc: 'LTE/5G 라우터는 공사 초기나 유선망이 없는 부지에서 빠르게 네트워크를 열기 위한 옵션입니다. 신호 세기, 외부 안테나, IoT 장비 분리 구성을 함께 봅니다.', specs: ['LTE/5G', '외부 안테나', '장비망 분리'] },
};

export const OPTION_DETAIL_GUIDE: Record<string, { bestFor: string; confirm: string; imageAlt: string }> = {
  'ribbed-steel-white': {
    bestFor: '추천 사용: 밝고 단정한 기본 외관을 원하거나 주변 농가, 별채, 소형 사무실과 자연스럽게 어울리는 외장을 찾을 때 적합합니다.',
    confirm: '상담 때 확인할 점: 설치지의 먼지, 빗물 방향, 창호 프레임 색상, 코너 몰딩 색을 함께 맞추면 실제 완성도가 안정됩니다.',
    imageAlt: '화이트 세로 골강판 외벽과 창호 디테일이 보이는 이동식주택 외장 예시',
  },
  'zinc-gray': {
    bestFor: '추천 사용: 카페, 쇼룸, 사무실처럼 차분하고 현대적인 인상이 필요한 공간에 잘 맞습니다.',
    confirm: '상담 때 확인할 점: 징크 톤은 조명과 주변 포장 색의 영향을 크게 받으므로 데크, 난간, 창호 색을 함께 정하는 것이 좋습니다.',
    imageAlt: '징크 그레이 금속 패널과 창호 마감이 보이는 이동식주택 외장 예시',
  },
  'cedar-point': {
    bestFor: '추천 사용: 기본 외장에 따뜻한 첫인상을 더하고 싶을 때 현관, 창 주변, 데크와 연결되는 면에 효과적입니다.',
    confirm: '상담 때 확인할 점: 목재 포인트는 적용 면적과 비를 맞는 방향에 따라 관리 방식이 달라지므로 위치를 먼저 확정합니다.',
    imageAlt: '적삼목 포인트 외벽과 출입구 마감이 보이는 이동식주택 외장 예시',
  },
  'basic-window': {
    bestFor: '추천 사용: 채광, 단열, 환기의 균형을 우선하는 기본 거주형·업무형 공간에 적합합니다.',
    confirm: '상담 때 확인할 점: 침대, 싱크, 수납장 위치와 창문 열림 방향이 겹치지 않도록 평면과 함께 확인합니다.',
    imageAlt: '기본 창호가 적용된 이동식주택 외벽과 실내 채광 예시',
  },
  'extra-window': {
    bestFor: '추천 사용: 주방, 작업실, 침실처럼 낮 시간 체류가 길고 자연광이 중요한 면에 어울립니다.',
    confirm: '상담 때 확인할 점: 외부 시선, 햇빛 방향, 에어컨 배관, 벽면 수납 위치를 함께 검토해야 합니다.',
    imageAlt: '추가 창호로 채광이 보강된 이동식주택 외벽 예시',
  },
  'wide-window': {
    bestFor: '추천 사용: 풍경을 크게 들이는 스테이, 카페, 상담실, 거실형 평면에서 체류감을 높일 때 좋습니다.',
    confirm: '상담 때 확인할 점: 프라이버시, 여름 일사량, 커튼이나 블라인드 계획, 구조 보강 범위를 함께 확인합니다.',
    imageAlt: '와이드 창호가 적용된 이동식주택 전면과 실내 분위기 예시',
  },
  'standard-lock': {
    bestFor: '추천 사용: 가족 별채, 현장 사무실, 관리자가 가까이 있는 공간처럼 단순하고 확실한 출입 관리가 필요한 경우에 맞습니다.',
    confirm: '상담 때 확인할 점: 비상키 관리, 카드키 수량, 우천 시 사용성, 도어 방향을 함께 확인합니다.',
    imageAlt: '표준 도어락이 적용된 출입문 디테일 예시',
  },
  'smart-lock': {
    bestFor: '추천 사용: 스테이, 무인 운영 공간, 직원 교대 공간처럼 방문자 권한을 시간 단위로 관리해야 할 때 유용합니다.',
    confirm: '상담 때 확인할 점: 앱 권한 관리 방식, 비상 출입, 배터리 교체 주기, 와이파이 또는 LTE 연결 상태를 같이 봅니다.',
    imageAlt: '스마트 도어락과 모바일 출입 제어를 보여주는 출입문 디테일 예시',
  },
  'paper-wall': {
    bestFor: '추천 사용: 기본 예산을 지키면서 밝고 편안한 실내 톤을 만들고 싶은 주말주택, 사무실, 휴게실에 적합합니다.',
    confirm: '상담 때 확인할 점: 침대 헤드월, 주방 주변, 출입구처럼 오염이 잦은 면은 보강 마감 여부를 함께 검토합니다.',
    imageAlt: '밝은 합지 벽지와 작은 실내 공간의 마감 예시',
  },
  'silk-wallpaper': {
    bestFor: '추천 사용: 사진에 자주 노출되는 숙박 공간, 상담실, 쇼룸처럼 표면 질감과 관리성이 중요한 곳에 잘 맞습니다.',
    confirm: '상담 때 확인할 점: 조명 색온도, 가구 톤, 오염 가능성이 높은 벽면 위치를 함께 정하면 마감 선택이 쉬워집니다.',
    imageAlt: '실크 벽지의 표면 질감과 창가 벽면 마감 예시',
  },
  'birch-panel': {
    bestFor: '추천 사용: 작은 평면에 따뜻한 깊이를 주고 싶은 침대 헤드월, 데스크 벽, 현관 포인트에 효과적입니다.',
    confirm: '상담 때 확인할 점: 콘센트, 스위치, 선반 고정 위치가 패널 이음선과 어색하게 겹치지 않도록 확인합니다.',
    imageAlt: '자작나무 패널로 마감된 실내 벽면과 수납 예시',
  },
  'spc-white-oak': {
    bestFor: '추천 사용: 밝고 넓어 보이는 실내를 원하는 소형 평면, 사무실, 스테이 공간에 무난합니다.',
    confirm: '상담 때 확인할 점: 현관과 욕실 앞 물 사용 구간, 걸레받이 색상, 문턱 마감 방식을 함께 결정합니다.',
    imageAlt: '화이트 오크 SPC 바닥이 적용된 밝은 실내 바닥 예시',
  },
  'spc-natural-oak': {
    bestFor: '추천 사용: 가구와 벽지 톤을 크게 가리지 않는 따뜻한 기본 바닥을 원할 때 가장 안정적인 선택입니다.',
    confirm: '상담 때 확인할 점: 실내 조명, 목재 가구 색, 데크나 현관 타일과의 연결감을 함께 보며 톤을 정합니다.',
    imageAlt: '내추럴 오크 SPC 바닥과 실내 마감이 보이는 예시',
  },
  'porcelain-tile': {
    bestFor: '추천 사용: 물과 흙, 오염이 잦은 현관, 주방, 욕실 앞, 상업 운영 공간에서 관리성을 높일 때 좋습니다.',
    confirm: '상담 때 확인할 점: 논슬립 등급, 난방 방식, 줄눈 색, 청소 동선을 함께 확인해야 실제 유지관리가 편합니다.',
    imageAlt: '포세린 타일 바닥과 욕실 앞 동선 마감 예시',
  },
  'basic-sink': {
    bestFor: '추천 사용: 간단한 조리, 설거지, 손 씻기 중심의 별채, 사무실, 스테이 기본 주방에 적합합니다.',
    confirm: '상담 때 확인할 점: 냉장고, 창문, 콘센트, 수전 위치와 하부 수납 깊이를 한 번에 맞춰야 동선이 깔끔합니다.',
    imageAlt: '기본 싱크와 하부 수납이 적용된 소형 주방 예시',
  },
  'built-in-fridge': {
    bestFor: '추천 사용: 생활가전 노출을 줄이고 주방 라인을 정돈해야 하는 숙박, 쇼룸, 상담실에 잘 맞습니다.',
    confirm: '상담 때 확인할 점: 환기 공간, 도어 열림 방향, 소음 위치, 전원 콘센트 위치를 미리 확정합니다.',
    imageAlt: '빌트인 냉장고가 주방 가구 라인에 정리된 예시',
  },
  'mini-washer': {
    bestFor: '추천 사용: 장기 체류, 숙박 운영, 작업복 세탁이 필요한 농막형·스테이형 공간에 유용합니다.',
    confirm: '상담 때 확인할 점: 급수·배수, 바닥 방수, 진동 방지, 세제 수납 위치를 함께 설계해야 합니다.',
    imageAlt: '미니 세탁기와 수납이 결합된 소형 유틸리티 공간 예시',
  },
  'basic-bathroom': {
    bestFor: '추천 사용: 샤워와 세면을 한 공간에 모아 소형 평면의 면적 효율을 높이고 싶은 기본 구성에 맞습니다.',
    confirm: '상담 때 확인할 점: 환기팬 위치, 배수 구배, 문 열림 방향, 욕실 앞 바닥 마감을 같이 봅니다.',
    imageAlt: '기본 습식 욕실과 세면 공간이 보이는 예시',
  },
  'bidet': {
    bestFor: '추천 사용: 장기 거주, 숙박 운영, 가족 별채처럼 위생 편의가 체감되는 공간에 적합합니다.',
    confirm: '상담 때 확인할 점: 방수 콘센트 위치, 전원 안전, 급수 연결, 욕실 청소 동선을 함께 확인합니다.',
    imageAlt: '비데가 설치된 욕실 변기와 주변 마감 예시',
  },
  'dry-vanity': {
    bestFor: '추천 사용: 카페, 사무실, 스테이처럼 욕실 밖에서 손 씻기와 정리가 필요한 공용 동선에 좋습니다.',
    confirm: '상담 때 확인할 점: 거울 조명, 수납 깊이, 배관 박스, 문과 통로 폭 간섭을 같이 검토합니다.',
    imageAlt: '건식 세면대와 거울, 수납이 결합된 실내 예시',
  },
  'built-in-storage': {
    bestFor: '추천 사용: 침구, 청소도구, 운영 비품을 노출하지 않고 정리해야 하는 숙박·사무 공간에 효과적입니다.',
    confirm: '상담 때 확인할 점: 보관할 물건의 깊이, 도어 열림 방식, 환기, 콘센트나 스위치 위치를 함께 맞춥니다.',
    imageAlt: '벽면 빌트인 수납장과 작은 실내 공간 예시',
  },
  'folding-table': {
    bestFor: '추천 사용: 식사, 노트북 작업, 상담 테이블을 한 면에서 해결해야 하는 3x6 소형 평면에 특히 유용합니다.',
    confirm: '상담 때 확인할 점: 접었을 때 통로 폭, 벽 보강 위치, 의자 보관 방식, 콘센트 위치를 함께 봅니다.',
    imageAlt: '접이식 벽 테이블과 소형 실내 작업 공간 예시',
  },
  'bed-frame': {
    bestFor: '추천 사용: 수면 영역을 명확히 나누고 침구나 계절 용품을 하부에 숨기고 싶을 때 적합합니다.',
    confirm: '상담 때 확인할 점: 매트리스 규격, 하부 서랍 방향, 창문과 콘센트 위치, 청소 동선을 같이 확인합니다.',
    imageAlt: '하부 수납을 갖춘 침대 프레임과 침실 공간 예시',
  },
  'solar-panel': {
    bestFor: '추천 사용: 조명, 냉난방, 냉장고처럼 상시 전력 사용이 있는 운영형 공간에서 에너지 부담을 줄이고 싶을 때 검토합니다.',
    confirm: '상담 때 확인할 점: 지붕 방향, 주변 나무·건물 음영, 인버터 위치, 계통 연계 가능 여부가 핵심입니다.',
    imageAlt: '이동식주택 지붕 위 태양광 패널과 전기 설비 예시',
  },
  'ess': {
    bestFor: '추천 사용: 정전 대응, 야간 전력 사용, 태양광 저장을 고려하는 외곽 부지나 운영형 공간에 적합합니다.',
    confirm: '상담 때 확인할 점: 배터리 설치 공간, 환기, 안전 거리, 우선 백업할 전기 부하를 먼저 정해야 합니다.',
    imageAlt: 'ESS 배터리 캐비닛과 인버터가 정리된 설비 공간 예시',
  },
  'ev-charger': {
    bestFor: '추천 사용: 숙박 이용자, 방문객, 운영자의 전기차 충전을 고려하는 주차 동선이 있는 부지에 맞습니다.',
    confirm: '상담 때 확인할 점: 충전기 위치, 차단기 여유, 케이블 길이, 사용 권한과 과금 방식까지 함께 봅니다.',
    imageAlt: '이동식주택 옆 완속 전기차 충전기와 주차 공간 예시',
  },
  'iot-package': {
    bestFor: '추천 사용: 무인 운영, 입실 전 냉난방, 원격 점검이 필요한 스테이·사무실·팝업 공간에 유용합니다.',
    confirm: '상담 때 확인할 점: 제어할 장비 목록, 네트워크 안정성, 관리자 알림 범위, 수동 조작 백업을 함께 정합니다.',
    imageAlt: '스마트 스위치와 온도 조절, 태블릿 제어가 보이는 실내 IoT 예시',
  },
  'security-package': {
    bestFor: '추천 사용: 외곽 부지, 숙박 운영, 야간 무인 공간처럼 출입과 주변 움직임을 확인해야 하는 곳에 적합합니다.',
    confirm: '상담 때 확인할 점: 촬영 범위, 이웃 사생활, 야간 조도, 저장 방식과 알림 대상자를 함께 정리합니다.',
    imageAlt: 'CCTV, 센서등, 스마트락이 보이는 출입 보안 설비 예시',
  },
  'satellite-internet': {
    bestFor: '추천 사용: 유선망이 늦게 들어오거나 LTE 품질이 흔들리는 산지·농지·외곽 부지에서 백업망으로 검토합니다.',
    confirm: '상담 때 확인할 점: 하늘 시야, 안테나 고정 위치, 케이블 인입 경로, 날씨 영향을 함께 확인해야 합니다.',
    imageAlt: '이동식주택 외벽에 설치된 위성 인터넷 안테나와 배선 예시',
  },
  'cellular-router': {
    bestFor: '추천 사용: 공사 초기, 임시 운영, 유선 인터넷 개통 전처럼 빠르게 네트워크를 열어야 할 때 적합합니다.',
    confirm: '상담 때 확인할 점: 통신사별 신호 세기, 외부 안테나 필요 여부, IoT 장비망과 고객망 분리를 같이 봅니다.',
    imageAlt: 'LTE 5G 라우터와 저전압 통신함, 안테나 배선 예시',
  },
};

export const REQUIRED_FIELDS = ['customerName', 'phone', 'region'] as const;
export type RequiredFieldName = (typeof REQUIRED_FIELDS)[number];

export type FieldRenderArgs = { id: string; describedBy: string | undefined; invalid: boolean };
