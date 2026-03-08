-- ============================================================
-- TATUAPÉ — Setup do banco de dados no Supabase
-- Cole este SQL no painel do Supabase > SQL Editor > New Query
-- ============================================================

-- 1. Tabela de perfis de usuários
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nome text,
  email text,
  sementes integer default 0,
  progresso jsonb default '{}',
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Usuário vê próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuário atualiza próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Criar perfil automaticamente quando usuário se cadastra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', 'Explorador'),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Tabela de e-mails da newsletter
create table public.newsletter_emails (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default now()
);

alter table public.newsletter_emails enable row level security;

create policy "Qualquer pessoa pode assinar a newsletter"
  on public.newsletter_emails for insert
  with check (true);
