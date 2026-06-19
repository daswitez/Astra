-- ============================================================
-- RESET: drops everything and recreates from scratch
-- Run this in Supabase SQL Editor
-- ============================================================

-- Drop functions
drop function if exists public.join_organization_by_code(text) cascade;
drop function if exists public.create_company_workspace(text) cascade;
drop function if exists public.create_personal_workspace(text) cascade;
drop function if exists public.generate_invite_code() cascade;
drop function if exists public.is_channel_member(uuid) cascade;
drop function if exists public.is_workspace_member(uuid) cascade;
drop function if exists public.is_org_member(uuid) cascade;
drop function if exists public.touch_updated_at() cascade;

-- Drop tables (order matters: children before parents)
drop table if exists public.workspace_files cascade;
drop table if exists public.whiteboards cascade;
drop table if exists public.flowcharts cascade;
drop table if exists public.tasks cascade;
drop table if exists public.messages cascade;
drop table if exists public.channels cascade;
drop table if exists public.workspaces cascade;
drop table if exists public.organization_members cascade;
drop table if exists public.organizations cascade;

-- Drop types
drop type if exists public.task_priority cascade;
drop type if exists public.task_status cascade;
drop type if exists public.channel_kind cascade;
drop type if exists public.org_role cascade;

-- ============================================================
-- RECREATE
-- ============================================================

create extension if not exists "pgcrypto";

create type public.org_role as enum ('owner', 'admin', 'member');
create type public.channel_kind as enum ('chat', 'system', 'storage');
create type public.task_status as enum ('todo', 'in_progress', 'review', 'done');
create type public.task_priority as enum ('low', 'medium', 'high');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  invite_code text not null unique,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.org_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table public.channels (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  kind public.channel_kind not null default 'chat',
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.channels(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  description text,
  status public.task_status not null default 'todo',
  priority public.task_priority not null default 'medium',
  assignee_id uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.flowcharts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  data jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.whiteboards (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  scene jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index organization_members_user_id_idx on public.organization_members(user_id);
create index organizations_invite_code_idx on public.organizations(invite_code);
create index workspaces_organization_id_idx on public.workspaces(organization_id);
create index channels_workspace_id_idx on public.channels(workspace_id);
create index messages_channel_id_created_at_idx on public.messages(channel_id, created_at);
create index tasks_workspace_id_status_idx on public.tasks(workspace_id, status);
create index flowcharts_workspace_id_idx on public.flowcharts(workspace_id);
create index whiteboards_workspace_id_idx on public.whiteboards(workspace_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tasks_touch_updated_at
before update on public.tasks
for each row execute function public.touch_updated_at();

create trigger flowcharts_touch_updated_at
before update on public.flowcharts
for each row execute function public.touch_updated_at();

create trigger whiteboards_touch_updated_at
before update on public.whiteboards
for each row execute function public.touch_updated_at();

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = target_organization_id and user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.workspaces w
    join public.organization_members om on om.organization_id = w.organization_id
    where w.id = target_workspace_id and om.user_id = auth.uid()
  );
$$;

create or replace function public.is_channel_member(target_channel_id uuid)
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.channels c
    join public.workspaces w on w.id = c.workspace_id
    join public.organization_members om on om.organization_id = w.organization_id
    where c.id = target_channel_id and om.user_id = auth.uid()
  );
$$;

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.workspaces enable row level security;
alter table public.channels enable row level security;
alter table public.messages enable row level security;
alter table public.tasks enable row level security;
alter table public.flowcharts enable row level security;
alter table public.whiteboards enable row level security;

create policy "members can read organizations" on public.organizations for select using (public.is_org_member(id));
create policy "members can read memberships" on public.organization_members for select using (public.is_org_member(organization_id));
create policy "members can read workspaces" on public.workspaces for select using (public.is_org_member(organization_id));
create policy "members can read channels" on public.channels for select using (public.is_workspace_member(workspace_id));
create policy "members can read messages" on public.messages for select using (public.is_channel_member(channel_id));
create policy "members can create messages" on public.messages for insert with check (public.is_channel_member(channel_id) and author_id = auth.uid());
create policy "members can read tasks" on public.tasks for select using (public.is_workspace_member(workspace_id));
create policy "members can create tasks" on public.tasks for insert with check (public.is_workspace_member(workspace_id) and created_by = auth.uid());
create policy "members can update tasks" on public.tasks for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "members can delete tasks" on public.tasks for delete using (public.is_workspace_member(workspace_id));
create policy "members can read flowcharts" on public.flowcharts for select using (public.is_workspace_member(workspace_id));
create policy "members can write flowcharts" on public.flowcharts for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "members can read whiteboards" on public.whiteboards for select using (public.is_workspace_member(workspace_id));
create policy "members can write whiteboards" on public.whiteboards for all using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create table public.workspace_files (id uuid primary key default gen_random_uuid(), workspace_id uuid not null references public.workspaces(id) on delete cascade, uploaded_by uuid references auth.users(id) on delete set null, name text not null, storage_path text not null, mime_type text not null default 'application/octet-stream', size_bytes bigint, created_at timestamptz not null default now());
alter table public.workspace_files enable row level security;
create policy "members can read workspace files" on public.workspace_files for select using (public.is_workspace_member(workspace_id));
create policy "members can upload workspace files" on public.workspace_files for insert with check (public.is_workspace_member(workspace_id) and uploaded_by = auth.uid());
create policy "members can delete own workspace files" on public.workspace_files for delete using (uploaded_by = auth.uid());

create or replace function public.generate_invite_code()
returns text language plpgsql security definer set search_path = public as $$
declare
  alphabet text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code text := '';
  i int;
begin
  for i in 1..6 loop
    code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
  end loop;
  return code;
end;
$$;

create or replace function public.create_company_workspace(company_name text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  new_org_id uuid;
  new_workspace_id uuid;
  base_slug text;
  new_invite_code text;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  base_slug := lower(trim(both '-' from regexp_replace(company_name, '[^a-zA-Z0-9]+', '-', 'g'))) || '-' || substr(auth.uid()::text, 1, 8);

  loop
    new_invite_code := public.generate_invite_code();
    exit when not exists (select 1 from public.organizations where invite_code = new_invite_code);
  end loop;

  insert into public.organizations (name, slug, invite_code)
  values (company_name, base_slug, new_invite_code)
  returning id into new_org_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (new_org_id, auth.uid(), 'owner');

  insert into public.workspaces (organization_id, name, slug)
  values (new_org_id, 'TeamWorkspace', 'team-workspace')
  returning id into new_workspace_id;

  return new_workspace_id;
end;
$$;

create or replace function public.create_personal_workspace(org_name text default 'Astra Workspace')
returns uuid language plpgsql security definer set search_path = public as $$
begin
  return public.create_company_workspace(org_name);
end;
$$;

create or replace function public.join_organization_by_code(join_code text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  target_org_id uuid;
  first_workspace_id uuid;
  normalized_code text;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  normalized_code := upper(regexp_replace(join_code, '[^A-Za-z0-9]', '', 'g'));

  select id into target_org_id
  from public.organizations
  where invite_code = normalized_code
  limit 1;

  if target_org_id is null then
    raise exception 'invalid company code';
  end if;

  insert into public.organization_members (organization_id, user_id, role)
  values (target_org_id, auth.uid(), 'member')
  on conflict (organization_id, user_id) do nothing;

  select id into first_workspace_id
  from public.workspaces
  where organization_id = target_org_id
  order by created_at asc
  limit 1;

  return first_workspace_id;
end;
$$;
