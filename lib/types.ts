// V2 이동식주택 제품 카테고리 (DB size_category 값, SOLUTION/DESIGN 제외)
export type SizeCategory = 'S' | 'M' | 'L' | 'XL'

// V2 용도별 카테고리 (UX 레이어 — DB에 없음)
export type PurposeCategory =
  | 'FARMHOUSE_SHELTER'   // 농막·체류형 쉼터 → S, M
  | 'SECOND_HOUSE'        // 세컨하우스·주말주택 → M, L
  | 'PRIMARY_HOME'        // 본 주거·단독주택 → L, XL
  | 'COMMERCIAL'          // 상업·사무 → 비스포크 (링크)

export const PURPOSE_TO_SIZE_MAP: Record<Exclude<PurposeCategory, 'COMMERCIAL'>, SizeCategory[]> = {
  FARMHOUSE_SHELTER: ['S', 'M'],
  SECOND_HOUSE: ['M', 'L'],
  PRIMARY_HOME: ['L', 'XL'],
}

export const PURPOSE_LABELS: Record<PurposeCategory, string> = {
  FARMHOUSE_SHELTER: '농막·체류형 쉼터',
  SECOND_HOUSE: '세컨하우스·주말주택',
  PRIMARY_HOME: '본 주거·단독주택',
  COMMERCIAL: '상업·사무 공간',
}

export const SIZE_LABELS: Record<SizeCategory, { label: string; range: string; use: string }> = {
  S: { label: 'S', range: '9~16㎡', use: '농막, 쉼터, 1인 공간' },
  M: { label: 'M', range: '17~33㎡', use: '세컨하우스, 주말주택' },
  L: { label: 'L', range: '34~66㎡', use: '단독주택, 소형 주거' },
  XL: { label: 'XL', range: '67㎡~', use: '대형 주거, 복층' },
}

export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface PageMeta {
  title: string
  description: string
  ogImage?: string
}
