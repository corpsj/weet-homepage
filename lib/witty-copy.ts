/**
 * Centralized witty Korean copy system
 * 배민/야놀자/토스 스타일 — 자연스럽고 위트있는 한국어 카피
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
  M: '주말마다 떠나는 내 집, 이제 가능해요',
  L: '온 가족이 함께하는 넉넉한 일상',
  XL: '꿈꿔왔던 그 집, 이제 현실로',
};

/** 섹션 헤드라인 — personality 있는 */
export const sectionHeadlines = {
  hero: '시스템건축의 새로운 기준',
  heroSub: '이동식주택과 현장건축 — 위트가 만드는 공간',
  comparison: '어떤 사이즈가 맞을까요?',
  comparisonSub: '라이프스타일에 딱 맞는 사이즈를 찾아보세요',
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
  quoteSub: '간단한 정보만 알려주시면 맞춤 견적을 보내드려요',
  modular: '공장에서 태어난 집',
  modularSub: '모듈러 건축의 모든 것',
} as const;

/** CTA 텍스트 변형 — 자연스러운 한국어 */
export const ctaVariations = {
  consult: '상담 신청',
  consultKakao: '카카오톡 상담',
  consultFriendly: '궁금한 거 다 물어보세요',
  quote: '견적 받기',
  quoteFriendly: '얼마인지 알아보기',
  viewProducts: '제품 보기',
  viewDetail: '자세히 보기',
  viewMore: '더 알아보기',
  viewProjects: '시공사례 보기',
  start: '지금 시작하기',
  callToAction: '위트있는 집, 지금 시작하세요',
} as const;

/** 에러 메시지 — 딱딱하지 않게 */
export const errorMessages = {
  generic: '이런, 뭔가 잘못됐어요. 다시 한 번 시도해주세요.',
  network: '네트워크 연결이 불안정해요. 잠시 후 다시 시도해주세요.',
  formRequired: '필수 항목을 입력해주세요.',
  formPhone: '올바른 전화번호를 입력해주세요.',
  formEmail: '올바른 이메일 주소를 입력해주세요.',
  submitFailed: '문의 등록 중 오류가 발생했어요. 다시 시도해주세요.',
} as const;

/** 성공 메시지 */
export const successMessages = {
  inquiry: '상담 신청이 완료되었어요! 빠른 시일 내에 연락드릴게요 :)',
  quote: '견적 요청이 접수되었어요! 맞춤 견적을 준비해서 연락드릴게요.',
} as const;

/** 빈 상태 메시지 */
export const emptyStates = {
  noProducts: '아직 이 카테고리에 등록된 제품이 없어요.',
  noProjects: '시공사례가 곧 업데이트될 예정이에요.',
  noResults: '검색 결과가 없어요. 다른 조건으로 찾아보세요.',
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
  scrollEnd: '여기까지 보셨으면, 이미 반쯤 이사하신 거예요 :)',
  notFound: '이 집은 아직 지어지지 않았어요',
  notFoundSub: '찾으시는 페이지가 존재하지 않아요. 홈으로 돌아가서 다시 찾아보세요.',
  footerTagline: '시스템건축의 새로운 기준',
} as const;

/** 랜덤 로딩 메시지 반환 */
export function getRandomLoadingState(): string {
  return loadingStates[Math.floor(Math.random() * loadingStates.length)];
}
