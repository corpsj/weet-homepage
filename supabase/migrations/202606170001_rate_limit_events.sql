-- Durable rate-limit store for public form submissions.
-- The previous throttle was a per-process in-memory Map, which is ineffective on
-- Vercel serverless (each instance has its own memory). This table lets the
-- server-side guard enforce a shared sliding-window limit across instances. (F30)

create table if not exists public.rate_limit_events (
  id uuid primary key default gen_random_uuid(),
  scope_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_events_scope_time_idx
  on public.rate_limit_events (scope_key, created_at desc);

-- Only the service role (used by the server-side submission guard) accesses this
-- table. RLS is enabled with no policies, so anon/authenticated clients have no
-- access; the service role bypasses RLS.
alter table public.rate_limit_events enable row level security;
