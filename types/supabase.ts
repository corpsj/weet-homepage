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
          is_signature: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          sub_category: string
          size_category: string
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
          is_signature?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          sub_category?: string
          size_category?: string
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
          is_signature?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: 'new' | 'read' | 'replied'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          status?: 'new' | 'read' | 'replied'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: 'new' | 'read' | 'replied'
          created_at?: string
          updated_at?: string
        }
      }
      hero_slides: {
        Row: {
          id: number
          image_url: string
          title: string
          subtitle: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          image_url: string
          title: string
          subtitle?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          image_url?: string
          title?: string
          subtitle?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      solutions: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      notices: {
        Row: {
          id: string
          title: string
          content: string
          is_pinned: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          is_pinned?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          is_pinned?: boolean
          is_active?: boolean
          created_at?: string
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
