-- Schema pentru panoul de admin Folii Timișoara.
-- Rulează acest fișier o singură dată în Supabase → SQL Editor, pe proiectul nou.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  status text not null default 'active' check (status in ('active', 'coming-soon')),
  description text not null default '',
  images text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  slug text not null,
  name text not null,
  short_description text not null default '',
  price numeric(10, 2) not null default 0,
  price_before_discount numeric(10, 2),
  price_unit text not null default 'RON',
  unit_label text,
  thicknesses text[] not null default '{}',
  widths text[] not null default '{}',
  lengths text[] not null default '{}',
  description text[] not null default '{}',
  use_cases text[] not null default '{}',
  has_cart boolean not null default false,
  images text[] not null default '{}',
  sku text,
  weight text,
  colors jsonb not null default '[]',
  colors_label text,
  width_label text,
  length_label text,
  specs jsonb not null default '[]',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index products_category_id_idx on products(category_id);

-- ---------------------------------------------------------------------------
-- product_variants — combinații grosime x lățime x lungime cu preț propriu
-- (ex. folia Cristal Flex configurabilă)
-- ---------------------------------------------------------------------------
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  thickness text not null,
  width text not null,
  length text not null,
  price numeric(10, 2) not null,
  old_price numeric(10, 2),
  sku text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index product_variants_product_id_idx on product_variants(product_id);

-- ---------------------------------------------------------------------------
-- promotions — discounturi aplicate pe tot magazinul, pe categorie sau pe produs
-- ---------------------------------------------------------------------------
create table promotions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value numeric(10, 2) not null check (discount_value > 0),
  scope text not null default 'all' check (scope in ('all', 'category', 'product')),
  category_id uuid references categories(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promotion_scope_target check (
    (scope = 'all' and category_id is null and product_id is null) or
    (scope = 'category' and category_id is not null and product_id is null) or
    (scope = 'product' and product_id is not null and category_id is null)
  )
);

-- ---------------------------------------------------------------------------
-- campaigns — programarea în timp a promoțiilor (ex. Black Friday)
-- ---------------------------------------------------------------------------
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  promotion_id uuid references promotions(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'active', 'ended', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint campaign_dates check (ends_at > starts_at)
);

-- ---------------------------------------------------------------------------
-- admin_users — allowlist: doar utilizatorii de aici pot scrie date din /admin
-- ---------------------------------------------------------------------------
create table admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- updated_at automat
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger categories_set_updated_at before update on categories
  for each row execute function set_updated_at();
create trigger products_set_updated_at before update on products
  for each row execute function set_updated_at();
create trigger product_variants_set_updated_at before update on product_variants
  for each row execute function set_updated_at();
create trigger promotions_set_updated_at before update on promotions
  for each row execute function set_updated_at();
create trigger campaigns_set_updated_at before update on campaigns
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — citire publică (site-ul o folosește), scriere doar admin
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table promotions enable row level security;
alter table campaigns enable row level security;
alter table admin_users enable row level security;

create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all using (is_admin()) with check (is_admin());

create policy "products_public_read" on products for select using (true);
create policy "products_admin_write" on products for all using (is_admin()) with check (is_admin());

create policy "product_variants_public_read" on product_variants for select using (true);
create policy "product_variants_admin_write" on product_variants for all using (is_admin()) with check (is_admin());

create policy "promotions_public_read" on promotions for select using (true);
create policy "promotions_admin_write" on promotions for all using (is_admin()) with check (is_admin());

create policy "campaigns_public_read" on campaigns for select using (true);
create policy "campaigns_admin_write" on campaigns for all using (is_admin()) with check (is_admin());

-- admin_users nu e public deloc — doar admin-ii existenți se pot vedea unii pe alții,
-- iar adăugarea unui nou admin se face din Supabase SQL Editor (vezi README admin).
create policy "admin_users_self_read" on admin_users for select using (is_admin());
