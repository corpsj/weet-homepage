/**
 * Centralized Korean copy system
 * 자연스럽고 간결한 한국어 카피 — 위트는 있되 가볍지 않게
 */

import type { SizeCategory } from './types';

/** 모델별 태그라인 */
export const productTaglines: Record<SizeCategory, string> = {
  S: '작지만 위트있게',
  M: '딱 좋은 사이즈',
  L: '넉넉하게, 위트있게',
  XL: '크게 살아볼까요',
};

/** 모델별 서브카피 */
export const productSubcopy: Record<SizeCategory, string> = {
  S: '건축 허가 없이도 시작할 수 있는 나만의 공간',
  M: '주말마다 떠나는 내 집, 이제 현실입니다',
  L: '온 가족이 함께하는 넉넉한 일상',
  XL: '꿈꿔왔던 그 집, 이제 현실로',
};

/** 섹션 헤드라인 — personality 있는 */
export const sectionHeadlines = {
  hero: '시스템건축의 새로운 기준',
  heroSub: '이동식주택과 현장건축 — 위트가 만드는 공간',
  comparison: '어떤 사이즈가 맞을까요?',
  comparisonSub: '라이프스타일에 맞는 사이즈를 비교하세요',
  trust: '위트의 신뢰',
  trustSub: '미디어와 인증이 말해줍니다',
  products: '이동식주택 라인업',
  productsSub: '용도에 맞는 사이즈를 선택하세요',
  system: '시스템건축이란?',
  systemSub: '공장 제작과 현장 시공을 결합한 위트만의 건축 방식',
  whyWeet: '왜 위트인가',
  whyWeetSub: '시스템건축의 장점을 최대한 살린 위트만의 차별점',
  bespoke: '비스포크 맞춤 설계',
  bespokeSub: '원하는 대로, 위트답게',
  shelter: '체류형 쉼터',
  shelterSub: '건축 허가 없이, 내 땅에 놓는 작은 쉼터',
  quote: '견적 받기',
  quoteSub: '용도와 사양을 선택하면 예상 견적을 바로 확인할 수 있습니다',
  modular: '공장에서 태어난 집',
  modularSub: '모듈러 건축의 모든 것',
} as const;

/** CTA 텍스트 변형 — 자연스러운 한국어 */
export const ctaVariations = {
  consult: '상담 신청',
  consultKakao: '카카오톡 상담',
  consultFriendly: '무엇이든 문의하세요',
  quote: '견적 받기',
  quoteFriendly: '예상 비용 확인하기',
  viewProducts: '제품 보기',
  viewDetail: '자세히 보기',
  viewMore: '더 알아보기',
  viewProjects: '시공사례 보기',
  start: '지금 시작하기',
  callToAction: '위트있는 집, 지금 시작하세요',
} as const;

/** 에러 메시지 — 딱딱하지 않게 */
export const errorMessages = {
  generic: '일시적인 오류가 발생했습니다. 다시 시도해주세요.',
  network: '네트워크 연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
  formRequired: '필수 항목을 입력해주세요.',
  formPhone: '올바른 전화번호를 입력해주세요.',
  formEmail: '올바른 이메일 주소를 입력해주세요.',
  submitFailed: '문의 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
} as const;

/** 성공 메시지 */
export const successMessages = {
  inquiry: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.',
  quote: '견적 요청이 접수되었습니다. 맞춤 견적을 준비하여 연락드리겠습니다.',
} as const;

/** 빈 상태 메시지 */
export const emptyStates = {
  noProducts: '이 카테고리에 등록된 제품이 아직 없습니다.',
  noProjects: '시공사례가 곧 업데이트될 예정입니다.',
  noResults: '검색 결과가 없습니다. 다른 조건으로 찾아보세요.',
} as const;

/** 로딩 메시지 — 랜덤 변형 */
export const loadingStates = [
  '집 짓는 중...',
  '도면 그리는 중...',
  '자재 준비하는 중...',
  '기초 공사 중...',
  '마감 작업 중...',
] as const;

/** 기타 위트있는 카피 */
export const miscCopy = {
  scrollEnd: '여기까지 보셨으면, 이미 반쯤 이사하신 겁니다.',
  notFound: '이 페이지는 아직 준비되지 않았습니다',
  notFoundSub: '찾으시는 페이지가 존재하지 않습니다. 홈으로 돌아가 주세요.',
  footerTagline: '시스템건축의 새로운 기준',
} as const;

/** 랜덤 로딩 메시지 반환 */
export function getRandomLoadingState(): string {
  return loadingStates[Math.floor(Math.random() * loadingStates.length)];
}
