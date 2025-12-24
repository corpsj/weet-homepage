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
          sub_category: 'Private' | 'Public' | null
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
          sub_images: string[] | null
          display_order: number
          is_active: boolean
          is_signature: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          sub_category?: string | null
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
          sub_images?: string[] | null
          display_order?: number
          is_active?: boolean
          is_signature?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          sub_category?: string | null
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
          sub_images?: string[] | null
          display_order?: number
          is_active?: boolean
          is_signature?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          category: string | null
          name: string
          email: string
          phone: string | null
          message: string
          status: 'new' | 'read' | 'replied'
          reply_content: string | null
          replied_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category?: string | null
          name: string
          email: string
          phone?: string | null
          message: string
          status?: 'new' | 'read' | 'replied'
          reply_content?: string | null
          replied_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: string | null
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: 'new' | 'read' | 'replied'
          reply_content?: string | null
          replied_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          id: number
          image_url: string
          title: string
          subtitle: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          image_url: string
          title: string
          subtitle?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          image_url?: string
          title?: string
          subtitle?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
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
        Relationships: []
      }
      faqs: {
        Row: {
          id: number
          question_ko: string
          answer_ko: string
          question_en: string | null
          answer_en: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          question_ko: string
          answer_ko: string
          question_en?: string | null
          answer_en?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          question_ko?: string
          answer_ko?: string
          question_en?: string | null
          answer_en?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
        Relationships: []
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string
          sub_images: string[] | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url: string
          sub_images?: string[] | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string
          sub_images?: string[] | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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

export type Faq = Database['public']['Tables']['faqs']['Row']
export type FaqInsert = Database['public']['Tables']['faqs']['Insert']
export type FaqUpdate = Database['public']['Tables']['faqs']['Update']

export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type InquiryInsert = Database['public']['Tables']['inquiries']['Insert']
export type InquiryUpdate = Database['public']['Tables']['inquiries']['Update']
