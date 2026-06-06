


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."match_press_releases"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) RETURNS TABLE("id" "uuid", "origin_id" "text", "source" "text", "title" "text", "content" "text", "link" "text", "images" "jsonb", "attachments" "jsonb", "published_at" timestamp with time zone, "status" "text", "created_at" timestamp with time zone, "processed_at" timestamp with time zone, "similarity" double precision)
    LANGUAGE "sql" STABLE
    AS $$
  SELECT
    pr.id,
    pr.origin_id,
    pr.source,
    pr.title,
    pr.content,
    pr.link,
    pr.images,
    pr.attachments,
    pr.published_at,
    pr.status,
    pr.created_at,
    pr.processed_at,
    1 - (pr.embedding <=> query_embedding) AS similarity
  FROM press_releases pr
  WHERE pr.embedding IS NOT NULL
    AND 1 - (pr.embedding <=> query_embedding) >= match_threshold
  ORDER BY pr.embedding <=> query_embedding
  LIMIT match_count;
$$;


ALTER FUNCTION "public"."match_press_releases"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."articles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "press_release_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "subtitle" "text",
    "body" "text" NOT NULL,
    "images" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "category" "text" NOT NULL,
    "source" "text" NOT NULL,
    "source_url" "text" NOT NULL,
    "status" "text" DEFAULT 'generated'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "articles_category_check" CHECK (("category" = ANY (ARRAY['economy'::"text", 'politics'::"text", 'society'::"text", 'sports'::"text", 'culture'::"text", 'opinion'::"text", 'editorial'::"text"]))),
    CONSTRAINT "articles_status_check" CHECK (("status" = ANY (ARRAY['generated'::"text", 'available'::"text", 'distributed'::"text"])))
);


ALTER TABLE "public"."articles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."clients" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "api_key_hash" "text" NOT NULL,
    "webhook_url" "text",
    "webhook_secret" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "api_key_prefix" "text",
    "api_key_last4" "text",
    "description" "text",
    "last_used_at" timestamp with time zone,
    "request_count" bigint DEFAULT 0 NOT NULL,
    "deleted_at" timestamp with time zone
);


ALTER TABLE "public"."clients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."crawl_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "site_name" "text" NOT NULL,
    "site_url" "text" NOT NULL,
    "status" "text" NOT NULL,
    "articles_found" integer DEFAULT 0 NOT NULL,
    "articles_new" integer DEFAULT 0 NOT NULL,
    "error_message" "text",
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "completed_at" timestamp with time zone,
    CONSTRAINT "crawl_logs_status_check" CHECK (("status" = ANY (ARRAY['success'::"text", 'failed'::"text", 'partial'::"text"])))
);


ALTER TABLE "public"."crawl_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."crawl_settings" (
    "id" integer DEFAULT 1 NOT NULL,
    "enabled_site_ids" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "schedule_hours" integer[] DEFAULT ARRAY[6, 12, 18] NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "crawl_settings_id_check" CHECK (("id" = 1))
);


ALTER TABLE "public"."crawl_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customize_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "key" "text" NOT NULL,
    "name_ko" "text" NOT NULL,
    "name_en" "text",
    "description_ko" "text",
    "description_en" "text",
    "selection_type" "text" DEFAULT 'single'::"text" NOT NULL,
    "required" boolean DEFAULT false NOT NULL,
    "display_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "customize_categories_selection_type_check" CHECK (("selection_type" = ANY (ARRAY['single'::"text", 'multiple'::"text"])))
);


ALTER TABLE "public"."customize_categories" OWNER TO "postgres";


COMMENT ON TABLE "public"."customize_categories" IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';



CREATE TABLE IF NOT EXISTS "public"."customize_consultations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "customer_name" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "region" "text" NOT NULL,
    "purchase_timeline" "text",
    "land_type" "text",
    "install_address" "text",
    "budget_range" "text",
    "memo" "text",
    "status" "text" DEFAULT '신규'::"text" NOT NULL,
    "internal_memo" "text",
    "selected_model_id" "text",
    "selected_option_ids" "uuid"[] DEFAULT ARRAY[]::"uuid"[] NOT NULL,
    "estimated_total" integer DEFAULT 0 NOT NULL,
    "config_query" "text",
    "config_snapshot" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "customize_consultations_estimated_total_check" CHECK (("estimated_total" >= 0)),
    CONSTRAINT "customize_consultations_status_check" CHECK (("status" = ANY (ARRAY['신규'::"text", '진행중'::"text", '완료'::"text", '보류'::"text"])))
);


ALTER TABLE "public"."customize_consultations" OWNER TO "postgres";


COMMENT ON TABLE "public"."customize_consultations" IS 'Public users can insert new consultation requests only. Reads, updates, and deletes are performed through requireAdmin-protected server actions using the service role.';



CREATE TABLE IF NOT EXISTS "public"."customize_included_specs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "model_id" "text",
    "key" "text" NOT NULL,
    "name_ko" "text" NOT NULL,
    "name_en" "text",
    "description_ko" "text",
    "description_en" "text",
    "category_key" "text",
    "icon_name" "text",
    "display_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."customize_included_specs" OWNER TO "postgres";


COMMENT ON TABLE "public"."customize_included_specs" IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';



CREATE TABLE IF NOT EXISTS "public"."customize_models" (
    "id" "text" NOT NULL,
    "code" "text" NOT NULL,
    "name_ko" "text" NOT NULL,
    "name_en" "text",
    "width_m" numeric(4,1) NOT NULL,
    "length_m" numeric(4,1) NOT NULL,
    "area_sqm" numeric(5,1) NOT NULL,
    "base_price" integer NOT NULL,
    "floorplan_image_path" "text",
    "floorplan_overlay_path" "text",
    "display_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "customize_models_base_price_check" CHECK (("base_price" >= 0))
);


ALTER TABLE "public"."customize_models" OWNER TO "postgres";


COMMENT ON TABLE "public"."customize_models" IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';



CREATE TABLE IF NOT EXISTS "public"."customize_option_conflicts" (
    "option_id" "uuid" NOT NULL,
    "conflicts_with_option_id" "uuid" NOT NULL,
    "reason_ko" "text",
    "reason_en" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "customize_option_conflicts_check" CHECK (("option_id" <> "conflicts_with_option_id"))
);


ALTER TABLE "public"."customize_option_conflicts" OWNER TO "postgres";


COMMENT ON TABLE "public"."customize_option_conflicts" IS 'Public users can read conflicts for active options only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';



CREATE TABLE IF NOT EXISTS "public"."customize_options" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "category_id" "uuid" NOT NULL,
    "key" "text" NOT NULL,
    "name_ko" "text" NOT NULL,
    "name_en" "text",
    "short_description_ko" "text" NOT NULL,
    "short_description_en" "text",
    "detail_description_ko" "text",
    "detail_description_en" "text",
    "price_type" "text" DEFAULT 'fixed'::"text" NOT NULL,
    "price" integer DEFAULT 0 NOT NULL,
    "is_default" boolean DEFAULT false NOT NULL,
    "available_model_ids" "text"[] DEFAULT ARRAY[]::"text"[] NOT NULL,
    "image_path" "text",
    "overlay_image_path" "text",
    "overlay_label_ko" "text",
    "overlay_label_en" "text",
    "display_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "customize_options_price_check" CHECK (("price" >= 0)),
    CONSTRAINT "customize_options_price_type_check" CHECK (("price_type" = ANY (ARRAY['included'::"text", 'fixed'::"text", 'consult'::"text"])))
);


ALTER TABLE "public"."customize_options" OWNER TO "postgres";


COMMENT ON TABLE "public"."customize_options" IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';



CREATE TABLE IF NOT EXISTS "public"."delivery_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "article_ids" "uuid"[] DEFAULT '{}'::"uuid"[] NOT NULL,
    "article_count" integer DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'success'::"text" NOT NULL,
    "error_message" "text",
    "delivered_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."delivery_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."faqs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "question" "text",
    "answer" "text",
    "category" "text" DEFAULT 'general'::"text",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "question_ko" "text",
    "answer_ko" "text",
    "question_en" "text",
    "answer_en" "text",
    "order_index" integer DEFAULT 0
);


ALTER TABLE "public"."faqs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gallery" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "image_url" "text" NOT NULL,
    "display_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "sub_images" "text"[] DEFAULT ARRAY[]::"text"[]
);


ALTER TABLE "public"."gallery" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."hero_slides" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "title" "text" NOT NULL,
    "subtitle" "text",
    "image_url" "text" NOT NULL,
    "link_url" "text",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."hero_slides" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."inquiries" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "message" "text" NOT NULL,
    "status" "text" DEFAULT 'new'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "answer" "text",
    "replied_at" timestamp with time zone,
    "category" "text",
    "reply_content" "text",
    CONSTRAINT "inquiries_status_check" CHECK (("status" = ANY (ARRAY['new'::"text", 'read'::"text", 'replied'::"text"])))
);


ALTER TABLE "public"."inquiries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notices" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "is_pinned" boolean DEFAULT false,
    "is_active" boolean DEFAULT true,
    "view_count" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."notices" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."press_releases" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "origin_id" "text" NOT NULL,
    "source" "text" NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "link" "text" NOT NULL,
    "images" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "attachments" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "published_at" timestamp with time zone NOT NULL,
    "embedding" "public"."vector"(1024),
    "status" "text" DEFAULT 'collected'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "processed_at" timestamp with time zone,
    CONSTRAINT "press_releases_status_check" CHECK (("status" = ANY (ARRAY['collected'::"text", 'embedded'::"text", 'processed'::"text", 'failed'::"text"])))
);


ALTER TABLE "public"."press_releases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "text" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "sub_category" "text",
    "size_category" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "tagline" "text" NOT NULL,
    "description" "text" NOT NULL,
    "price" "text",
    "structure" "text",
    "roof_type" "text",
    "exterior_finish" "text",
    "interior_finish" "text",
    "size" "text",
    "display_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "hover_image_url" "text",
    "is_signature" boolean DEFAULT false,
    "floor_plan_url" "text",
    "sub_images" "text"[] DEFAULT '{}'::"text"[],
    CONSTRAINT "products_size_category_check" CHECK (("size_category" = ANY (ARRAY['S'::"text", 'M'::"text", 'L'::"text", 'XL'::"text", 'SOLUTION'::"text", 'DESIGN'::"text"]))),
    CONSTRAINT "products_sub_category_check" CHECK (("sub_category" = ANY (ARRAY['Private'::"text", 'Public'::"text"])))
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "client" "text",
    "location" "text",
    "completed_at" "date",
    "description" "text",
    "images" "text"[],
    "tags" "text"[],
    "status" "text" DEFAULT 'completed'::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."solutions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "image_url" "text",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."solutions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."articles"
    ADD CONSTRAINT "articles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_api_key_hash_key" UNIQUE ("api_key_hash");



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."crawl_logs"
    ADD CONSTRAINT "crawl_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."crawl_settings"
    ADD CONSTRAINT "crawl_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customize_categories"
    ADD CONSTRAINT "customize_categories_key_key" UNIQUE ("key");



ALTER TABLE ONLY "public"."customize_categories"
    ADD CONSTRAINT "customize_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customize_consultations"
    ADD CONSTRAINT "customize_consultations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customize_included_specs"
    ADD CONSTRAINT "customize_included_specs_model_id_key_key" UNIQUE ("model_id", "key");



ALTER TABLE ONLY "public"."customize_included_specs"
    ADD CONSTRAINT "customize_included_specs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customize_models"
    ADD CONSTRAINT "customize_models_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."customize_models"
    ADD CONSTRAINT "customize_models_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customize_option_conflicts"
    ADD CONSTRAINT "customize_option_conflicts_pkey" PRIMARY KEY ("option_id", "conflicts_with_option_id");



ALTER TABLE ONLY "public"."customize_options"
    ADD CONSTRAINT "customize_options_category_id_key_key" UNIQUE ("category_id", "key");



ALTER TABLE ONLY "public"."customize_options"
    ADD CONSTRAINT "customize_options_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."delivery_logs"
    ADD CONSTRAINT "delivery_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gallery"
    ADD CONSTRAINT "gallery_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."hero_slides"
    ADD CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inquiries"
    ADD CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notices"
    ADD CONSTRAINT "notices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."press_releases"
    ADD CONSTRAINT "press_releases_origin_id_key" UNIQUE ("origin_id");



ALTER TABLE ONLY "public"."press_releases"
    ADD CONSTRAINT "press_releases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."solutions"
    ADD CONSTRAINT "solutions_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_articles_category" ON "public"."articles" USING "btree" ("category");



CREATE INDEX "idx_articles_press_release_id" ON "public"."articles" USING "btree" ("press_release_id");



CREATE INDEX "idx_articles_status" ON "public"."articles" USING "btree" ("status");



CREATE INDEX "idx_clients_api_key_prefix" ON "public"."clients" USING "btree" ("api_key_prefix") WHERE ("api_key_prefix" IS NOT NULL);



CREATE INDEX "idx_clients_deleted_at" ON "public"."clients" USING "btree" ("deleted_at") WHERE ("deleted_at" IS NULL);



CREATE INDEX "idx_clients_is_active" ON "public"."clients" USING "btree" ("is_active");



CREATE INDEX "idx_crawl_logs_started_at" ON "public"."crawl_logs" USING "btree" ("started_at" DESC);



CREATE INDEX "idx_crawl_logs_status" ON "public"."crawl_logs" USING "btree" ("status");



CREATE INDEX "idx_customize_categories_public_order" ON "public"."customize_categories" USING "btree" ("is_active", "display_order", "created_at");



CREATE INDEX "idx_customize_consultations_status_created" ON "public"."customize_consultations" USING "btree" ("status", "created_at" DESC);



CREATE UNIQUE INDEX "idx_customize_included_specs_global_key" ON "public"."customize_included_specs" USING "btree" ("key") WHERE ("model_id" IS NULL);



CREATE INDEX "idx_customize_included_specs_order" ON "public"."customize_included_specs" USING "btree" ("model_id", "is_active", "display_order", "created_at");



CREATE INDEX "idx_customize_models_public_order" ON "public"."customize_models" USING "btree" ("is_active", "display_order", "created_at");



CREATE INDEX "idx_customize_options_available_models" ON "public"."customize_options" USING "gin" ("available_model_ids");



CREATE INDEX "idx_customize_options_category_order" ON "public"."customize_options" USING "btree" ("category_id", "is_active", "display_order", "created_at");



CREATE INDEX "idx_delivery_logs_client_id" ON "public"."delivery_logs" USING "btree" ("client_id");



CREATE INDEX "idx_delivery_logs_delivered_at" ON "public"."delivery_logs" USING "btree" ("delivered_at" DESC);



CREATE INDEX "idx_press_releases_embedding_hnsw" ON "public"."press_releases" USING "hnsw" ("embedding" "public"."vector_cosine_ops") WITH ("m"='16', "ef_construction"='64');



CREATE INDEX "idx_press_releases_published_at" ON "public"."press_releases" USING "btree" ("published_at" DESC);



CREATE INDEX "idx_press_releases_source" ON "public"."press_releases" USING "btree" ("source");



CREATE INDEX "idx_press_releases_status" ON "public"."press_releases" USING "btree" ("status");



CREATE OR REPLACE TRIGGER "update_customize_categories_updated_at" BEFORE UPDATE ON "public"."customize_categories" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_customize_consultations_updated_at" BEFORE UPDATE ON "public"."customize_consultations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_customize_included_specs_updated_at" BEFORE UPDATE ON "public"."customize_included_specs" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_customize_models_updated_at" BEFORE UPDATE ON "public"."customize_models" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_customize_options_updated_at" BEFORE UPDATE ON "public"."customize_options" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."articles"
    ADD CONSTRAINT "articles_press_release_id_fkey" FOREIGN KEY ("press_release_id") REFERENCES "public"."press_releases"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."customize_consultations"
    ADD CONSTRAINT "customize_consultations_selected_model_id_fkey" FOREIGN KEY ("selected_model_id") REFERENCES "public"."customize_models"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."customize_included_specs"
    ADD CONSTRAINT "customize_included_specs_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."customize_models"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."customize_option_conflicts"
    ADD CONSTRAINT "customize_option_conflicts_conflicts_with_option_id_fkey" FOREIGN KEY ("conflicts_with_option_id") REFERENCES "public"."customize_options"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."customize_option_conflicts"
    ADD CONSTRAINT "customize_option_conflicts_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "public"."customize_options"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."customize_options"
    ADD CONSTRAINT "customize_options_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."customize_categories"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."delivery_logs"
    ADD CONSTRAINT "delivery_logs_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE;



CREATE POLICY "Admin can delete gallery" ON "public"."gallery" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Admin can insert gallery" ON "public"."gallery" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Admin can update gallery" ON "public"."gallery" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "Admins can manage faqs" ON "public"."faqs" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can manage hero slides" ON "public"."hero_slides" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can manage notices" ON "public"."notices" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can manage solutions" ON "public"."solutions" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Anyone can insert customize consultations" ON "public"."customize_consultations" FOR INSERT TO "authenticated", "anon" WITH CHECK (("status" = '신규'::"text"));



CREATE POLICY "Anyone can insert inquiries" ON "public"."inquiries" FOR INSERT WITH CHECK (true);



CREATE POLICY "Anyone can view active customize categories" ON "public"."customize_categories" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Anyone can view active customize conflicts" ON "public"."customize_option_conflicts" FOR SELECT TO "authenticated", "anon" USING (((EXISTS ( SELECT 1
   FROM "public"."customize_options" "options"
  WHERE (("options"."id" = "customize_option_conflicts"."option_id") AND ("options"."is_active" = true)))) AND (EXISTS ( SELECT 1
   FROM "public"."customize_options" "options"
  WHERE (("options"."id" = "customize_option_conflicts"."conflicts_with_option_id") AND ("options"."is_active" = true))))));



CREATE POLICY "Anyone can view active customize included specs" ON "public"."customize_included_specs" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Anyone can view active customize models" ON "public"."customize_models" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Anyone can view active customize options" ON "public"."customize_options" FOR SELECT TO "authenticated", "anon" USING ((("is_active" = true) AND (EXISTS ( SELECT 1
   FROM "public"."customize_categories" "categories"
  WHERE (("categories"."id" = "customize_options"."category_id") AND ("categories"."is_active" = true))))));



CREATE POLICY "Anyone can view products" ON "public"."products" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Authenticated users can delete inquiries" ON "public"."inquiries" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can update inquiries" ON "public"."inquiries" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "Authenticated users can view inquiries" ON "public"."inquiries" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Enable all access for authenticated users" ON "public"."hero_slides" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Enable read access for all users" ON "public"."hero_slides" FOR SELECT USING (true);



CREATE POLICY "Public Read Access" ON "public"."projects" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public can view active faqs" ON "public"."faqs" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public can view active hero slides" ON "public"."hero_slides" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public can view active notices" ON "public"."notices" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public can view active solutions" ON "public"."solutions" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Public can view gallery" ON "public"."gallery" FOR SELECT USING (true);



CREATE POLICY "Service Role Full Access" ON "public"."projects" TO "service_role" USING (true) WITH CHECK (true);



ALTER TABLE "public"."customize_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customize_consultations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customize_included_specs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customize_models" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customize_option_conflicts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customize_options" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."faqs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."gallery" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."hero_slides" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."inquiries" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."solutions" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."match_press_releases"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."match_press_releases"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."match_press_releases"("query_embedding" "public"."vector", "match_threshold" double precision, "match_count" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON TABLE "public"."articles" TO "anon";
GRANT ALL ON TABLE "public"."articles" TO "authenticated";
GRANT ALL ON TABLE "public"."articles" TO "service_role";



GRANT ALL ON TABLE "public"."clients" TO "anon";
GRANT ALL ON TABLE "public"."clients" TO "authenticated";
GRANT ALL ON TABLE "public"."clients" TO "service_role";



GRANT ALL ON TABLE "public"."crawl_logs" TO "anon";
GRANT ALL ON TABLE "public"."crawl_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."crawl_logs" TO "service_role";



GRANT ALL ON TABLE "public"."crawl_settings" TO "anon";
GRANT ALL ON TABLE "public"."crawl_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."crawl_settings" TO "service_role";



GRANT ALL ON TABLE "public"."customize_categories" TO "anon";
GRANT ALL ON TABLE "public"."customize_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."customize_categories" TO "service_role";



GRANT ALL ON TABLE "public"."customize_consultations" TO "anon";
GRANT ALL ON TABLE "public"."customize_consultations" TO "authenticated";
GRANT ALL ON TABLE "public"."customize_consultations" TO "service_role";



GRANT ALL ON TABLE "public"."customize_included_specs" TO "anon";
GRANT ALL ON TABLE "public"."customize_included_specs" TO "authenticated";
GRANT ALL ON TABLE "public"."customize_included_specs" TO "service_role";



GRANT ALL ON TABLE "public"."customize_models" TO "anon";
GRANT ALL ON TABLE "public"."customize_models" TO "authenticated";
GRANT ALL ON TABLE "public"."customize_models" TO "service_role";



GRANT ALL ON TABLE "public"."customize_option_conflicts" TO "anon";
GRANT ALL ON TABLE "public"."customize_option_conflicts" TO "authenticated";
GRANT ALL ON TABLE "public"."customize_option_conflicts" TO "service_role";



GRANT ALL ON TABLE "public"."customize_options" TO "anon";
GRANT ALL ON TABLE "public"."customize_options" TO "authenticated";
GRANT ALL ON TABLE "public"."customize_options" TO "service_role";



GRANT ALL ON TABLE "public"."delivery_logs" TO "anon";
GRANT ALL ON TABLE "public"."delivery_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."delivery_logs" TO "service_role";



GRANT ALL ON TABLE "public"."faqs" TO "anon";
GRANT ALL ON TABLE "public"."faqs" TO "authenticated";
GRANT ALL ON TABLE "public"."faqs" TO "service_role";



GRANT ALL ON TABLE "public"."gallery" TO "anon";
GRANT ALL ON TABLE "public"."gallery" TO "authenticated";
GRANT ALL ON TABLE "public"."gallery" TO "service_role";



GRANT ALL ON TABLE "public"."hero_slides" TO "anon";
GRANT ALL ON TABLE "public"."hero_slides" TO "authenticated";
GRANT ALL ON TABLE "public"."hero_slides" TO "service_role";



GRANT ALL ON TABLE "public"."inquiries" TO "anon";
GRANT ALL ON TABLE "public"."inquiries" TO "authenticated";
GRANT ALL ON TABLE "public"."inquiries" TO "service_role";



GRANT ALL ON TABLE "public"."notices" TO "anon";
GRANT ALL ON TABLE "public"."notices" TO "authenticated";
GRANT ALL ON TABLE "public"."notices" TO "service_role";



GRANT ALL ON TABLE "public"."press_releases" TO "anon";
GRANT ALL ON TABLE "public"."press_releases" TO "authenticated";
GRANT ALL ON TABLE "public"."press_releases" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";



GRANT ALL ON TABLE "public"."solutions" TO "anon";
GRANT ALL ON TABLE "public"."solutions" TO "authenticated";
GRANT ALL ON TABLE "public"."solutions" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







