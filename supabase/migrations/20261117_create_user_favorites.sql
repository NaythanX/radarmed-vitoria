-- RadarMed V1.2: dados pessoais separados por usuário.
-- Execute somente em projeto Supabase EXCLUSIVO para o RadarMed.
create table if not exists public.user_favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  vacancy_id text not null check (length(vacancy_id) between 1 and 200),
  created_at timestamptz not null default now(),
  primary key (user_id, vacancy_id)
);

alter table public.user_favorites enable row level security;

revoke all on public.user_favorites from anon;
grant select, insert, delete on public.user_favorites to authenticated;

create policy "Ler apenas meus favoritos"
  on public.user_favorites for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Criar apenas meus favoritos"
  on public.user_favorites for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "Excluir apenas meus favoritos"
  on public.user_favorites for delete to authenticated
  using (user_id = (select auth.uid()));
