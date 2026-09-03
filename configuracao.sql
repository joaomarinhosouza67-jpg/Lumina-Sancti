-- ============================================================
--  LUMINA SANCTI — Configuração do Supabase (IA + Contas)
-- ============================================================
-- Cole este arquivo inteiro no Editor SQL do seu projeto
-- Supabase (menu "SQL Editor" → "New query") e clique em "Run".
-- Pode rodar de novo sem problema — todos os comandos são
-- seguros para repetir (if not exists / or replace).

-- ------------------------------------------------------------
-- PERFIS — um perfil público por conta (nome de exibição etc.),
-- ligado 1-para-1 com a conta de autenticação do Supabase.
-- ------------------------------------------------------------
create table if not exists perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  criado_em timestamptz not null default now()
);

alter table perfis enable row level security;

drop policy if exists "usuario_ve_proprio_perfil" on perfis;
create policy "usuario_ve_proprio_perfil" on perfis
  for select using (auth.uid() = id);

drop policy if exists "usuario_cria_proprio_perfil" on perfis;
create policy "usuario_cria_proprio_perfil" on perfis
  for insert with check (auth.uid() = id);

drop policy if exists "usuario_edita_proprio_perfil" on perfis;
create policy "usuario_edita_proprio_perfil" on perfis
  for update using (auth.uid() = id);

-- Cria o perfil sozinho, automaticamente, assim que alguém se
-- cadastra — assim o site nunca precisa se preocupar em criar
-- essa linha manualmente.
create or replace function criar_perfil_ao_cadastrar()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfis (id, nome)
  values (new.id, coalesce(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists ao_cadastrar_criar_perfil on auth.users;
create trigger ao_cadastrar_criar_perfil
  after insert on auth.users
  for each row execute function criar_perfil_ao_cadastrar();

-- ------------------------------------------------------------
-- PERGUNTAS À IA POR CONTA — substitui o controle por IP:
-- agora a IA exige login, e cada conta tem direito a um número
-- limitado de perguntas por dia (5, por padrão — ver o número
-- exato dentro da Edge Function perguntar-sobre-santo).
-- ------------------------------------------------------------
create table if not exists ia_perguntas_usuario (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  criado_em timestamptz not null default now()
);

create index if not exists ia_perguntas_usuario_user_dia_idx
  on ia_perguntas_usuario (user_id, criado_em);

alter table ia_perguntas_usuario enable row level security;

-- Ninguém pelo navegador escreve aqui diretamente — só a Edge
-- Function (com a chave de serviço, que ignora RLS). A pessoa
-- pode enxergar só a contagem das próprias perguntas, se quiser.
drop policy if exists "usuario_ve_proprias_perguntas" on ia_perguntas_usuario;
create policy "usuario_ve_proprias_perguntas" on ia_perguntas_usuario
  for select using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- (Antiga tabela por IP: mantida por compatibilidade, mas não é
-- mais usada agora que a IA passou a exigir conta. Pode apagar
-- manualmente se preferir: drop table if exists ia_perguntas_log;)
-- ------------------------------------------------------------
create table if not exists ia_perguntas_log (
  id bigint generated always as identity primary key,
  ip text not null,
  criado_em timestamptz not null default now()
);
alter table ia_perguntas_log enable row level security;