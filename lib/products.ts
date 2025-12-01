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
    M: { label: 'M', subtitle: 'Small unit + Small unit', items: [] },
    L: { label: 'L', subtitle: 'Small unit + Small unit\n+ 현장 공사', items: [] },
    XL: { label: 'XL', subtitle: '단지개념', items: [] },
    SOLUTION: { label: 'SOLUTION', subtitle: '', items: [] },
    DESIGN: { label: 'DESIGN', subtitle: '', items: [] },
  }

  products.forEach((product) => {
    const category = product.size_category

    if (category === 'S') {
      if (product.sub_category === 'Private') {
        structure.S.Private?.push(product.id)
      } else {
        structure.S.Public?.push(product.id)
      }
    } else if (structure[category]) {
      structure[category].items?.push(product.id)
    }
  })

  return structure
}
