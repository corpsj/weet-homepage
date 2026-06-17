-- CRITICAL security fix: legacy news-crawler tables were created without RLS,
-- leaving them fully readable/writable/deletable by the public anon key (which
-- ships in the client bundle). `clients` even holds api_key_hash / webhook_secret.
-- These tables are NOT used by the weet homepage app. Enable RLS with NO
-- anon/authenticated policies so only the server-side service role can touch them
-- (mirrors the rate_limit_events lockdown). If a separate crawler system uses
-- these tables, it must access them via the service role, not the anon key.

ALTER TABLE IF EXISTS public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.press_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.crawl_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.delivery_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.crawl_settings ENABLE ROW LEVEL SECURITY;
