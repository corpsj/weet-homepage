export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          category: string
          sub_category: 'Private' | 'Public'
          size_category: 'S' | 'M' | 'L' | 'XL' | 'SOLUTION' | 'DESIGN'
          image_url: string
          tagline: string
          description: string
          price: string | null
          structure: string | null
          roof_type: string | null
          exterior_finish: string | null
          interior_finish: string | null
          size: string | null
          floor_plan_url: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          sub_category: 'Private' | 'Public'
          size_category: 'S' | 'M' | 'L' | 'XL' | 'SOLUTION' | 'DESIGN'
          image_url: string
          tagline: string
          description: string
          price?: string | null
          structure?: string | null
          roof_type?: string | null
          exterior_finish?: string | null
          interior_finish?: string | null
          size?: string | null
          floor_plan_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          sub_category?: 'Private' | 'Public'
          size_category?: 'S' | 'M' | 'L' | 'XL' | 'SOLUTION' | 'DESIGN'
          image_url?: string
          tagline?: string
          description?: string
          price?: string | null
          structure?: string | null
          roof_type?: string | null
          exterior_finish?: string | null
          interior_finish?: string | null
          size?: string | null
          floor_plan_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// 편의를 위한 타입 별칭
export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']
