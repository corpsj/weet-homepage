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
      bespoke_option_groups: {
        Row: {
          id: string
          key: string
          title: string
          description: string | null
          selection_type: 'single' | 'multiple'
          required: boolean
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          title: string
          description?: string | null
          selection_type?: 'single' | 'multiple'
          required?: boolean
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          title?: string
          description?: string | null
          selection_type?: 'single' | 'multiple'
          required?: boolean
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      bespoke_options: {
        Row: {
          id: string
          group_id: string
          label: string
          description: string | null
          price_delta: number
          lead_time_note: string | null
          badge: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          group_id: string
          label: string
          description?: string | null
          price_delta?: number
          lead_time_note?: string | null
          badge?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          label?: string
          description?: string | null
          price_delta?: number
          lead_time_note?: string | null
          badge?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bespoke_options_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "bespoke_option_groups"
            referencedColumns: ["id"]
          }
        ]
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
      projects: {
        Row: {
          id: string
          title: string
          client: string | null
          location: string | null
          completed_at: string | null
          description: string | null
          images: string[] | null
          tags: string[] | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          client?: string | null
          location?: string | null
          completed_at?: string | null
          description?: string | null
          images?: string[] | null
          tags?: string[] | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          client?: string | null
          location?: string | null
          completed_at?: string | null
          description?: string | null
          images?: string[] | null
          tags?: string[] | null
          status?: string
          created_at?: string
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

export type BespokeOptionGroup = Database['public']['Tables']['bespoke_option_groups']['Row']
export type BespokeOptionGroupInsert = Database['public']['Tables']['bespoke_option_groups']['Insert']
export type BespokeOptionGroupUpdate = Database['public']['Tables']['bespoke_option_groups']['Update']
export type BespokeOption = Database['public']['Tables']['bespoke_options']['Row']
export type BespokeOptionInsert = Database['public']['Tables']['bespoke_options']['Insert']
export type BespokeOptionUpdate = Database['public']['Tables']['bespoke_options']['Update']
export type BespokeOptionGroupWithOptions = BespokeOptionGroup & {
  options: BespokeOption[]
}

export type Faq = Database['public']['Tables']['faqs']['Row']
export type FaqInsert = Database['public']['Tables']['faqs']['Insert']
export type FaqUpdate = Database['public']['Tables']['faqs']['Update']

export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type InquiryInsert = Database['public']['Tables']['inquiries']['Insert']
export type InquiryUpdate = Database['public']['Tables']['inquiries']['Update']

export type GalleryItem = Database['public']['Tables']['gallery']['Row']
export type GalleryInsert = Database['public']['Tables']['gallery']['Insert']
export type GalleryUpdate = Database['public']['Tables']['gallery']['Update']

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
