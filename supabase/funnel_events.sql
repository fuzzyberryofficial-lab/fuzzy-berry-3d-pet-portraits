-- Anonymous funnel counts: how many visits reach each step of the site.
-- No cookies, no IP address, no visitor ID: one row = "someone reached step X
-- on day Y", plus a coarse source (instagram / facebook / google / direct …)
-- and device type. Run once in the Supabase dashboard:
-- SQL Editor -> New query -> paste -> Run.

create table if not exists public.funnel_events (
  id bigint generated always as identity primary key,
  day date not null default (now() at time zone 'Europe/Vienna')::date,
  step text not null,
  source text not null default 'direct',
  device text not null default 'desktop' check (device in ('mobile', 'desktop')),
  lang text not null default 'en' check (lang in ('en', 'de')),
  created_at timestamptz not null default now()
);

create index if not exists funnel_events_day_idx on public.funnel_events (day, step);

-- Only the website's server (service role key) may read or write this table.
alter table public.funnel_events enable row level security;
