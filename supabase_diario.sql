-- ============================================================
-- TATUAPÉ — Diário do Tatu
-- Cole este SQL no Supabase Studio > SQL Editor > New Query
-- ============================================================

-- 1. Tabela do diário
create table public.diario (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  brincadeira text,
  texto text not null,
  foto_url text,
  created_at timestamp with time zone default now()
);

alter table public.diario enable row level security;

-- Usuário vê apenas suas próprias entradas
create policy "Usuário vê próprio diário"
  on public.diario for select
  using (auth.uid() = user_id);

-- Usuário cria suas entradas
create policy "Usuário cria entradas no diário"
  on public.diario for insert
  with check (auth.uid() = user_id);

-- Usuário deleta suas próprias entradas
create policy "Usuário deleta próprias entradas"
  on public.diario for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 2. Bucket de fotos do diário
-- ============================================================

insert into storage.buckets (id, name, public)
values ('diario-fotos', 'diario-fotos', true)
on conflict do nothing;

-- Usuário faz upload na própria pasta (user_id/arquivo)
create policy "Usuário faz upload de fotos"
  on storage.objects for insert
  with check (
    bucket_id = 'diario-fotos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Fotos são públicas (para exibir no app)
create policy "Fotos são públicas"
  on storage.objects for select
  using (bucket_id = 'diario-fotos');

-- Usuário deleta apenas suas próprias fotos
create policy "Usuário deleta próprias fotos"
  on storage.objects for delete
  using (
    bucket_id = 'diario-fotos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
