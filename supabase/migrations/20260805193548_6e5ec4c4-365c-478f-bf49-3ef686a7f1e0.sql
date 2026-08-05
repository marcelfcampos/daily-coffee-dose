create type public.coffee_size as enum ('small','medium','large');
create type public.coffee_roast as enum ('light','medium','dark');
create type public.coffee_species as enum ('arabica','robusta','other');
create type public.brewing_method as enum ('coado','moka','prensa','espresso','aeropress','v60','chemex','sifao','turco');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Users manage own profile" on public.profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create table public.coffee_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  size public.coffee_size not null,
  volume_ml integer not null,
  roast public.coffee_roast not null,
  species public.coffee_species not null,
  species_custom text,
  brewing_method public.brewing_method not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.coffee_entries to authenticated;
grant all on public.coffee_entries to service_role;
alter table public.coffee_entries enable row level security;
create policy "Users manage own entries" on public.coffee_entries for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger update_coffee_entries_updated_at before update on public.coffee_entries
for each row execute function public.update_updated_at_column();
create trigger update_profiles_updated_at before update on public.profiles
for each row execute function public.update_updated_at_column();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();