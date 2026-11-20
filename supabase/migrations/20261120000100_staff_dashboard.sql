create table if not exists public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null check (role in ('admin','manager','agent')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_enquiries (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique,
  service_line text not null default 'vehicle-rental' check (service_line = 'vehicle-rental'),
  locale text not null check (locale in ('en','id','zh')),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  company text not null default '',
  wechat_id text not null default '',
  preferred_channel text not null default 'email',
  journey jsonb not null default '{}'::jsonb,
  vehicle jsonb not null default '{}'::jsonb,
  message text not null default '',
  marketing_consent boolean not null default false,
  consent_at timestamptz not null default now(),
  source_path text not null default '',
  status text not null default 'New' check (status in ('New','Reviewing','Replied','Quote sent','Closed')),
  assigned_to uuid references public.staff_members(user_id) on delete set null,
  staff_notes text not null default '',
  notification_status text not null default 'pending' check (notification_status in ('pending','sent','failed')),
  received_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiry_status_history (
  id bigint generated always as identity primary key,
  enquiry_id uuid not null references public.vehicle_enquiries(id) on delete cascade,
  actor_id uuid references public.staff_members(user_id) on delete set null,
  old_status text,
  new_status text not null check (new_status in ('New','Reviewing','Replied','Quote sent','Closed')),
  note text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists vehicle_enquiries_received_idx on public.vehicle_enquiries (received_at desc);
create index if not exists vehicle_enquiries_status_received_idx on public.vehicle_enquiries (status, received_at desc);
create index if not exists vehicle_enquiries_assigned_idx on public.vehicle_enquiries (assigned_to, received_at desc);
create index if not exists enquiry_status_history_enquiry_idx on public.enquiry_status_history (enquiry_id, created_at desc);

alter table public.staff_members enable row level security;
alter table public.vehicle_enquiries enable row level security;
alter table public.enquiry_status_history enable row level security;

revoke all on table public.staff_members, public.vehicle_enquiries, public.enquiry_status_history from anon, authenticated;
grant all on table public.staff_members, public.vehicle_enquiries, public.enquiry_status_history to service_role;
grant usage, select on sequence public.enquiry_status_history_id_seq to service_role;
