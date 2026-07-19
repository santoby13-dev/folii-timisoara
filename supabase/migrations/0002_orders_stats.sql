-- Comenzi + început-de-checkout, pentru statisticile din /admin (vânzări,
-- valoare medie comandă, rată de conversie coș → comandă).
-- Rulează o singură dată în Supabase → SQL Editor, după 0001_init.sql.
--
-- Scrierea se face doar din server (Route Handlers), cu service role key —
-- ocolește RLS, deci NU există policy de INSERT public aici. Citirea e
-- permisă doar adminilor.

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  address text not null,
  items jsonb not null default '[]',
  total_price numeric(10, 2) not null,
  payment_method text not null,
  status text not null default 'nou',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index orders_created_at_idx on orders(created_at);

create table checkout_starts (
  id uuid primary key default gen_random_uuid(),
  total_price numeric(10, 2) not null,
  item_count int not null,
  created_at timestamptz not null default now()
);

create index checkout_starts_created_at_idx on checkout_starts(created_at);

alter table orders enable row level security;
alter table checkout_starts enable row level security;

create policy "orders_admin_read" on orders for select using (is_admin());
create policy "checkout_starts_admin_read" on checkout_starts for select using (is_admin());
