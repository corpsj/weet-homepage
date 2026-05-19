/**
 * 컨피규레이터 상태 관리 타입 정의
 */

/**
 * 제품 모델
 */
export interface Model {
  id: string
  name: string
  size: 'S' | 'M' | 'L' | 'XL' | 'SOLUTION' | 'DESIGN'
  area: number
  basePrice: number
  baseImagePath: string
}

/**
 * 옵션 항목
 */
export interface OptionItem {
  id: string
  name: string
  price: number
  imagePath?: string
  color?: string
}

/**
 * 옵션 카테고리
 */
export interface OptionCategory {
  id: string
  name: string
  items: OptionItem[]
  type: 'single' | 'multiple'
}

/**
 * 컨피규레이터 상태
 */
export interface ConfiguratorState {
  selectedModel: Model | null
  selectedOptions: Record<string, string[]>
  totalPrice: number
}
