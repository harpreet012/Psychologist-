-- Anjali Jakhar Psychology — Appointments schema
-- Run this once in the Supabase SQL editor for your project.

-- 1. Table -------------------------------------------------------------
create table if not exists public.appointments (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  email         text not null,
  phone         text not null,
  service       text not null,
  preferred_date date not null,
  preferred_time text not null,
  session_type  text not null check (session_type in ('online', 'in-person')),
  slot_start    timestamptz,
  slot_end      timestamptz,
  hold_expires_at timestamptz,
  message       text,
  consent_given_at timestamptz not null default now(),
  payment_status text not null default 'pending'
                  check (payment_status in ('pending', 'paid', 'failed', 'expired', 'refunded')),
  amount_paise integer,
  payment_link_id text,
  payment_link_url text,
  razorpay_payment_id text,
  paid_at timestamptz,
  google_event_id text,
  google_event_url text,
  public_token_hash text,
  status        text not null default 'pending'
                  check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.appointments
  add column if not exists consent_given_at timestamptz not null default now(),
  add column if not exists slot_start timestamptz,
  add column if not exists slot_end timestamptz,
  add column if not exists hold_expires_at timestamptz,
  add column if not exists payment_status text not null default 'pending',
  add column if not exists amount_paise integer,
  add column if not exists payment_link_id text,
  add column if not exists payment_link_url text,
  add column if not exists razorpay_payment_id text,
  add column if not exists paid_at timestamptz,
  add column if not exists google_event_id text,
  add column if not exists google_event_url text,
  add column if not exists public_token_hash text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'appointments_payment_status_check'
      and conrelid = 'public.appointments'::regclass
  ) then
    alter table public.appointments
      add constraint appointments_payment_status_check
      check (payment_status in ('pending', 'paid', 'failed', 'expired', 'refunded'));
  end if;
end $$;

create index if not exists appointments_created_at_idx on public.appointments (created_at desc);
create index if not exists appointments_status_idx on public.appointments (status);
create index if not exists appointments_payment_status_idx on public.appointments (payment_status);
create unique index if not exists appointments_active_slot_idx
  on public.appointments (slot_start)
  where slot_start is not null and status <> 'cancelled';
create unique index if not exists appointments_payment_link_idx
  on public.appointments (payment_link_id)
  where payment_link_id is not null;

-- 2. Keep updated_at current on every row update -----------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at
  before update on public.appointments
  for each row
  execute function public.set_updated_at();

-- 3. Row Level Security --------------------------------------------------
-- The public browser never writes directly to Supabase. Validated server
-- routes use the service-role client; the admin dashboard is additionally
-- protected by a signed admin session.
alter table public.appointments enable row level security;

drop policy if exists "Public can create appointments" on public.appointments;
revoke all on table public.appointments from anon;
