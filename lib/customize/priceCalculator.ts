/**
 * 위트 커스터마이징 가격 계산 엔진
 * 모델 기본가와 선택 옵션 가격을 합산하고 포맷팅합니다.
 */

import { Model, OptionItem } from './config';

/**
 * 총 가격 계산
 * @param baseModel - 선택된 모델
 * @param selectedOptions - 선택된 옵션 아이템 목록
 * @returns 총 가격 (원)
 */
export function calculateTotalPrice(
  baseModel: Model,
  selectedOptions: OptionItem[]
): number {
  const optionsTotal = selectedOptions.reduce((sum, item) => sum + item.price, 0);
  return baseModel.basePrice + optionsTotal;
}

/**
 * 가격을 원화 포맷으로 변환
 * @param price - 가격 (원)
 * @returns "₩XX,XXX,XXX" 형식의 문자열
 */
export function formatPrice(price: number): string {
  return `₩${price.toLocaleString('ko-KR')}`;
}
