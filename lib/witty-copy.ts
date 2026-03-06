// Product model taglines
export const productTaglines = {
  S: {
    headline: '작지만 위트있게',
    sub: '나만의 작은 공간, 위트있게 시작하세요',
    cta: '이 집 구경하기',
  },
  M: {
    headline: '딱 좋은 크기, 딱 좋은 삶',
    sub: '넉넉하지만 부담 없는 공간',
    cta: '이 집 구경하기',
  },
  L: {
    headline: '넉넉하게, 위트있게',
    sub: '가족을 위한 첫 번째 집',
    cta: '이 집 구경하기',
  },
  XL: {
    headline: '여유있게, 격이 다르게',
    sub: '넓고 프리미엄한 모듈러 하우스',
    cta: '이 집 구경하기',
  },
} as const;

// Section headlines — each page section needs personality
export const sectionHeadlines = {
  hero: '위트있는 집이 온다',
  comparison: '어떤 크기가 나한테 맞을까?',
  trust: '위트를 믿어주신 분들',
  process: '공장에서 태어난 집',
  modular: {
    whatIs: '모듈러 건축이 뭐예요?',
    howLong: '얼마나 걸려요?',
    strong: '튼튼한가요?',
    eco: '환경에 좋은가요?',
  },
  shelter: '체류형 쉼터, 이렇게 쉬워도 되나요?',
  quote: '견적, 3분이면 충분해요',
  bespoke: '당신만의 집, 처음부터 끝까지',
  company: '위트있는 사람들',
  support: '궁금한 거 다 물어보세요',
} as const;

// CTA variations — not boring "문의하기" but something human
export const ctaVariations = {
  primary: '상담 신청하기',
  secondary: '견적 받아보기',
  kakao: '카카오톡으로 물어보기',
  phone: '전화로 물어보기',
  casual: '궁금한 거 다 물어보세요',
  urgent: '지금 바로 상담받기',
  gentle: '편하게 연락주세요',
  scrollEnd: '여기까지 보셨으면, 이미 반쯤 이사하신 거예요 :)',
} as const;

// Error messages with personality
export const errorMessages = {
  generic: '이런, 뭔가 잘못됐어요. 다시 한 번 해볼까요?',
  network: '인터넷이 좀 느린 것 같아요. 잠시 후 다시 시도해주세요.',
  notFound: '이 집은 아직 지어지지 않았어요 🏗️',
  form: {
    required: '이 칸은 꼭 채워주세요!',
    email: '이메일 주소를 다시 확인해주세요',
    phone: '전화번호를 다시 확인해주세요',
    success: '상담 신청이 완료되었어요! 빠른 시일 내에 연락드릴게요 :)',
  },
} as const;

// Empty states
export const emptyStates = {
  noProducts: '아직 준비 중인 제품이에요. 조금만 기다려주세요!',
  noResults: '검색 결과가 없어요. 다른 키워드로 찾아볼까요?',
  noProjects: '아직 프로젝트가 없어요. 첫 번째가 되어보세요!',
} as const;

// Loading states — rotating messages
export const loadingStates = [
  '집 짓는 중...',
  '모듈 조립하는 중...',
  '인테리어 마무리 중...',
  '거의 다 왔어요...',
  '기초 공사 중...',
] as const;

// Scroll prompts
export const scrollPrompts = {
  start: '스크롤하여 더 보기',
  continue: '더 내려가 볼까요?',
  end: '여기까지 보셨으면, 이미 반쯤 이사하신 거예요 :)',
} as const;

// Stats copy
export const statsCopy = {
  projects: { value: 50, suffix: '+', label: '시공 완료' },
  years: { value: 5, suffix: '년+', label: '업력' },
  satisfaction: { value: 98, suffix: '%', label: '고객 만족' },
} as const;
