export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          body: string
          category: string
          created_at: string
          id: string
          images: Json
          press_release_id: string
          source: string
          source_url: string
          status: string
          subtitle: string | null
          title: string
        }
        Insert: {
          body: string
          category: string
          created_at?: string
          id?: string
          images?: Json
          press_release_id: string
          source: string
          source_url: string
          status?: string
          subtitle?: string | null
          title: string
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          id?: string
          images?: Json
          press_release_id?: string
          source?: string
          source_url?: string
          status?: string
          subtitle?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_press_release_id_fkey"
            columns: ["press_release_id"]
            isOneToOne: false
            referencedRelation: "press_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          api_key_hash: string
          api_key_last4: string | null
          api_key_prefix: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          last_used_at: string | null
          name: string
          request_count: number
          updated_at: string
          webhook_secret: string | null
          webhook_url: string | null
        }
        Insert: {
          api_key_hash: string
          api_key_last4?: string | null
          api_key_prefix?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          name: string
          request_count?: number
          updated_at?: string
          webhook_secret?: string | null
          webhook_url?: string | null
        }
        Update: {
          api_key_hash?: string
          api_key_last4?: string | null
          api_key_prefix?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          name?: string
          request_count?: number
          updated_at?: string
          webhook_secret?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      crawl_logs: {
        Row: {
          articles_found: number
          articles_new: number
          completed_at: string | null
          error_message: string | null
          id: string
          site_name: string
          site_url: string
          started_at: string
          status: string
        }
        Insert: {
          articles_found?: number
          articles_new?: number
          completed_at?: string | null
          error_message?: string | null
          id?: string
          site_name: string
          site_url: string
          started_at?: string
          status: string
        }
        Update: {
          articles_found?: number
          articles_new?: number
          completed_at?: string | null
          error_message?: string | null
          id?: string
          site_name?: string
          site_url?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      crawl_settings: {
        Row: {
          enabled_site_ids: string[]
          id: number
          schedule_hours: number[]
          updated_at: string
        }
        Insert: {
          enabled_site_ids?: string[]
          id?: number
          schedule_hours?: number[]
          updated_at?: string
        }
        Update: {
          enabled_site_ids?: string[]
          id?: number
          schedule_hours?: number[]
          updated_at?: string
        }
        Relationships: []
      }
      customize_categories: {
        Row: {
          created_at: string
          description_en: string | null
          description_ko: string | null
          display_order: number
          id: string
          is_active: boolean
          key: string
          name_en: string | null
          name_ko: string
          required: boolean
          selection_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_ko?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          key: string
          name_en?: string | null
          name_ko: string
          required?: boolean
          selection_type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_ko?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          key?: string
          name_en?: string | null
          name_ko?: string
          required?: boolean
          selection_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      customize_consultations: {
        Row: {
          budget_range: string | null
          config_query: string | null
          config_snapshot: Json
          created_at: string
          customer_name: string
          estimated_total: number
          id: string
          install_address: string | null
          internal_memo: string | null
          land_type: string | null
          memo: string | null
          phone: string
          purchase_timeline: string | null
          region: string
          selected_model_id: string | null
          selected_option_ids: string[]
          status: string
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          config_query?: string | null
          config_snapshot: Json
          created_at?: string
          customer_name: string
          estimated_total?: number
          id?: string
          install_address?: string | null
          internal_memo?: string | null
          land_type?: string | null
          memo?: string | null
          phone: string
          purchase_timeline?: string | null
          region: string
          selected_model_id?: string | null
          selected_option_ids?: string[]
          status?: string
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          config_query?: string | null
          config_snapshot?: Json
          created_at?: string
          customer_name?: string
          estimated_total?: number
          id?: string
          install_address?: string | null
          internal_memo?: string | null
          land_type?: string | null
          memo?: string | null
          phone?: string
          purchase_timeline?: string | null
          region?: string
          selected_model_id?: string | null
          selected_option_ids?: string[]
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customize_consultations_selected_model_id_fkey"
            columns: ["selected_model_id"]
            isOneToOne: false
            referencedRelation: "customize_models"
            referencedColumns: ["id"]
          },
        ]
      }
      customize_included_specs: {
        Row: {
          category_key: string | null
          created_at: string
          description_en: string | null
          description_ko: string | null
          display_order: number
          icon_name: string | null
          id: string
          is_active: boolean
          key: string
          model_id: string | null
          name_en: string | null
          name_ko: string
          updated_at: string
        }
        Insert: {
          category_key?: string | null
          created_at?: string
          description_en?: string | null
          description_ko?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean
          key: string
          model_id?: string | null
          name_en?: string | null
          name_ko: string
          updated_at?: string
        }
        Update: {
          category_key?: string | null
          created_at?: string
          description_en?: string | null
          description_ko?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean
          key?: string
          model_id?: string | null
          name_en?: string | null
          name_ko?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customize_included_specs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "customize_models"
            referencedColumns: ["id"]
          },
        ]
      }
      customize_models: {
        Row: {
          area_sqm: number
          base_price: number
          code: string
          created_at: string
          display_order: number
          floorplan_image_path: string | null
          floorplan_overlay_path: string | null
          id: string
          is_active: boolean
          length_m: number
          name_en: string | null
          name_ko: string
          updated_at: string
          width_m: number
        }
        Insert: {
          area_sqm: number
          base_price: number
          code: string
          created_at?: string
          display_order?: number
          floorplan_image_path?: string | null
          floorplan_overlay_path?: string | null
          id: string
          is_active?: boolean
          length_m: number
          name_en?: string | null
          name_ko: string
          updated_at?: string
          width_m: number
        }
        Update: {
          area_sqm?: number
          base_price?: number
          code?: string
          created_at?: string
          display_order?: number
          floorplan_image_path?: string | null
          floorplan_overlay_path?: string | null
          id?: string
          is_active?: boolean
          length_m?: number
          name_en?: string | null
          name_ko?: string
          updated_at?: string
          width_m?: number
        }
        Relationships: []
      }
      customize_option_conflicts: {
        Row: {
          conflicts_with_option_id: string
          created_at: string
          option_id: string
          reason_en: string | null
          reason_ko: string | null
        }
        Insert: {
          conflicts_with_option_id: string
          created_at?: string
          option_id: string
          reason_en?: string | null
          reason_ko?: string | null
        }
        Update: {
          conflicts_with_option_id?: string
          created_at?: string
          option_id?: string
          reason_en?: string | null
          reason_ko?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customize_option_conflicts_conflicts_with_option_id_fkey"
            columns: ["conflicts_with_option_id"]
            isOneToOne: false
            referencedRelation: "customize_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customize_option_conflicts_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "customize_options"
            referencedColumns: ["id"]
          },
        ]
      }
      customize_options: {
        Row: {
          available_model_ids: string[]
          category_id: string
          created_at: string
          detail_description_en: string | null
          detail_description_ko: string | null
          display_order: number
          id: string
          image_path: string | null
          is_active: boolean
          is_default: boolean
          key: string
          name_en: string | null
          name_ko: string
          overlay_image_path: string | null
          overlay_label_en: string | null
          overlay_label_ko: string | null
          price: number
          price_type: string
          short_description_en: string | null
          short_description_ko: string
          updated_at: string
        }
        Insert: {
          available_model_ids?: string[]
          category_id: string
          created_at?: string
          detail_description_en?: string | null
          detail_description_ko?: string | null
          display_order?: number
          id?: string
          image_path?: string | null
          is_active?: boolean
          is_default?: boolean
          key: string
          name_en?: string | null
          name_ko: string
          overlay_image_path?: string | null
          overlay_label_en?: string | null
          overlay_label_ko?: string | null
          price?: number
          price_type?: string
          short_description_en?: string | null
          short_description_ko: string
          updated_at?: string
        }
        Update: {
          available_model_ids?: string[]
          category_id?: string
          created_at?: string
          detail_description_en?: string | null
          detail_description_ko?: string | null
          display_order?: number
          id?: string
          image_path?: string | null
          is_active?: boolean
          is_default?: boolean
          key?: string
          name_en?: string | null
          name_ko?: string
          overlay_image_path?: string | null
          overlay_label_en?: string | null
          overlay_label_ko?: string | null
          price?: number
          price_type?: string
          short_description_en?: string | null
          short_description_ko?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customize_options_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "customize_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_logs: {
        Row: {
          article_count: number
          article_ids: string[]
          client_id: string
          delivered_at: string
          error_message: string | null
          id: string
          status: string
        }
        Insert: {
          article_count?: number
          article_ids?: string[]
          client_id: string
          delivered_at?: string
          error_message?: string | null
          id?: string
          status?: string
        }
        Update: {
          article_count?: number
          article_ids?: string[]
          client_id?: string
          delivered_at?: string
          error_message?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_logs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string | null
          answer_en: string | null
          answer_ko: string | null
          category: string | null
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          question: string | null
          question_en: string | null
          question_ko: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          answer?: string | null
          answer_en?: string | null
          answer_ko?: string | null
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question?: string | null
          question_en?: string | null
          question_ko?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string | null
          answer_en?: string | null
          answer_ko?: string | null
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question?: string | null
          question_en?: string | null
          question_ko?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          sub_images: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          sub_images?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          sub_images?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean | null
          link_url: string | null
          sort_order: number | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean | null
          link_url?: string | null
          sort_order?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          link_url?: string | null
          sort_order?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          answer: string | null
          category: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          reply_content: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          reply_content?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          reply_content?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notices: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          is_pinned: boolean | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_pinned?: boolean | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_pinned?: boolean | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      press_releases: {
        Row: {
          attachments: Json
          content: string
          created_at: string
          embedding: string | null
          id: string
          images: Json
          link: string
          origin_id: string
          processed_at: string | null
          published_at: string
          source: string
          status: string
          title: string
        }
        Insert: {
          attachments?: Json
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          images?: Json
          link: string
          origin_id: string
          processed_at?: string | null
          published_at: string
          source: string
          status?: string
          title: string
        }
        Update: {
          attachments?: Json
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          images?: Json
          link?: string
          origin_id?: string
          processed_at?: string | null
          published_at?: string
          source?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          exterior_finish: string | null
          floor_plan_url: string | null
          hover_image_url: string | null
          id: string
          image_url: string
          interior_finish: string | null
          is_active: boolean | null
          is_signature: boolean | null
          name: string
          price: string | null
          roof_type: string | null
          size: string | null
          size_category: string
          structure: string | null
          sub_category: string | null
          sub_images: string[] | null
          tagline: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          exterior_finish?: string | null
          floor_plan_url?: string | null
          hover_image_url?: string | null
          id?: string
          image_url: string
          interior_finish?: string | null
          is_active?: boolean | null
          is_signature?: boolean | null
          name: string
          price?: string | null
          roof_type?: string | null
          size?: string | null
          size_category: string
          structure?: string | null
          sub_category?: string | null
          sub_images?: string[] | null
          tagline: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          exterior_finish?: string | null
          floor_plan_url?: string | null
          hover_image_url?: string | null
          id?: string
          image_url?: string
          interior_finish?: string | null
          is_active?: boolean | null
          is_signature?: boolean | null
          name?: string
          price?: string | null
          roof_type?: string | null
          size?: string | null
          size_category?: string
          structure?: string | null
          sub_category?: string | null
          sub_images?: string[] | null
          tagline?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          client: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          location: string | null
          status: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          client?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          client?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      solutions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_press_releases: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          attachments: Json
          content: string
          created_at: string
          id: string
          images: Json
          link: string
          origin_id: string
          processed_at: string
          published_at: string
          similarity: number
          source: string
          status: string
          title: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

export type Product = Tables<"products">
export type ProductInsert = TablesInsert<"products">
export type ProductUpdate = TablesUpdate<"products">

export type Project = Tables<"projects">
export type ProjectInsert = TablesInsert<"projects">
export type ProjectUpdate = TablesUpdate<"projects">

export type GalleryItem = Tables<"gallery">
export type GalleryInsert = TablesInsert<"gallery">
export type GalleryUpdate = TablesUpdate<"gallery">

export type Faq = Tables<"faqs">
export type FaqInsert = TablesInsert<"faqs">
export type FaqUpdate = TablesUpdate<"faqs">

export type Inquiry = Tables<"inquiries">
export type InquiryInsert = TablesInsert<"inquiries">
export type InquiryUpdate = TablesUpdate<"inquiries">
