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
export async function getProductsByCategory(sizeCategory: Product['size_category']): Promise<Product[]> {
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
