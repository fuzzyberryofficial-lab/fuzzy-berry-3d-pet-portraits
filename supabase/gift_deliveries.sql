-- Gift vouchers that are emailed to the recipient on a chosen day.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.gift_deliveries (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  recipient_email text not null,
  recipient_name text not null default '',
  sender_name text not null default '',
  message text not null default '',
  lang text not null default 'en' check (lang in ('en', 'de')),
  -- The calendar day (Europe/Berlin) the email should go out on.
  send_on date not null,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  attempts integer not null default 0,
  last_error text
);

-- The daily job looks up "not sent yet and due".
create index if not exists gift_deliveries_due_idx
  on public.gift_deliveries (send_on)
  where sent_at is null;

-- Only the website's server (service role key) may read or write this table.
alter table public.gift_deliveries enable row level security;
