-- Site-wide operator-editable settings (contact channels, hours, trust facts).
-- Values are plain text; empty string means "not set" and the UI hides the item.
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  label text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  using (true);

-- Writes go through admin server actions using the service role; no public write policy.

insert into public.site_settings (key, value, label) values
  ('contact_phone', '010-9645-2348', '대표 연락처'),
  ('consult_hours', '', '상담 가능 시간 (예: 평일 09:00–18:00)'),
  ('kakao_channel_url', '', '카카오톡 채널 URL'),
  ('contact_email', '', '문의 이메일'),
  ('naver_blog_url', 'https://blog.naver.com/we-et', '네이버 블로그 URL'),
  ('instagram_url', 'https://www.instagram.com/weet_kr/', '인스타그램 URL'),
  ('daangn_url', 'https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/', '당근 프로필 URL'),
  ('trust_founded_year', '', '설립 연도 (예: 2021)'),
  ('trust_units_built', '', '누적 제작 대수 (검증된 숫자만)'),
  ('lead_time_note', '', '평균 제작 기간 안내 문구 (예: 계약 후 4–6주)')
on conflict (key) do nothing;
