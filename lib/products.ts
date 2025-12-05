import { supabase } from './supabase'
import { Product } from '@/types/supabase'

// 모든 활성 제품 가져오기
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

// 카테고리별 제품 가져오기
export async function getProductsByCategory(sizeCategory: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('size_category', sizeCategory)
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data || []
}

// 단일 제품 가져오기
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

// 사이드바 구조 생성 헬퍼
export function buildSidebarStructure(products: Product[]) {
  const structure: Record<string, {
    label: string
    subtitle: string
    Private?: string[]
    Public?: string[]
    items?: string[]
  }> = {
    S: { label: 'S', subtitle: '', Private: [], Public: [] },
    M: { label: 'M', subtitle: '', items: [] },
    L: { label: 'L', subtitle: '', items: [] },
    XL: { label: 'XL', subtitle: '', items: [] },
    SOLUTION: { label: 'SOLUTION', subtitle: '', items: [] },
    DESIGN: { label: 'DESIGN', subtitle: '', items: [] },
  }

  products.forEach((product) => {
    const category = product.size_category

    // S만 Private/Public 세부 카테고리 지원
    if (category === 'S') {
      if (product.sub_category === 'Private') {
        structure[category].Private?.push(product.id)
      } else {
        structure[category].Public?.push(product.id)
      }
    } else if (structure[category]) {
      // M, L, XL, SOLUTION, DESIGN은 세부 카테고리 없음
      structure[category].items?.push(product.id)
    }
  })

  return structure
}
