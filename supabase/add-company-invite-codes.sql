alter table public.organizations
add column if not exists invite_code text;

create or replace function public.generate_invite_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
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

do $$
declare
  org_record record;
  new_code text;
begin
  for org_record in select id from public.organizations where invite_code is null loop
    loop
      new_code := public.generate_invite_code();
      exit when not exists (select 1 from public.organizations where invite_code = new_code);
    end loop;

    update public.organizations
    set invite_code = new_code
    where id = org_record.id;
  end loop;
end;
$$;

alter table public.organizations
alter column invite_code set not null;

create unique index if not exists organizations_invite_code_idx
on public.organizations(invite_code);

create or replace function public.create_company_workspace(company_name text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
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

  insert into public.channels (workspace_id, name, kind)
  values
    (new_workspace_id, 'TeamWorkspace', 'chat'),
    (new_workspace_id, 'StorageVault', 'storage');

  insert into public.tasks (workspace_id, title, description, status, priority, assignee_id, created_by)
  values
    (new_workspace_id, 'Update Marketing Homepage Assets', null, 'todo', 'medium', auth.uid(), auth.uid()),
    (new_workspace_id, 'Optimize DB Query for User Fetch', null, 'todo', 'medium', null, auth.uid()),
    (new_workspace_id, 'Fix WebGL Context Leak', 'The parallax ecosystem cards are leaving orphaned contexts on unmount in mobile Safari.', 'in_progress', 'high', auth.uid(), auth.uid()),
    (new_workspace_id, 'Implement Zone A Sidebar', null, 'review', 'low', auth.uid(), auth.uid()),
    (new_workspace_id, 'Implement Omni-Bar AI Search', null, 'todo', 'medium', auth.uid(), auth.uid());

  return new_workspace_id;
end;
$$;

create or replace function public.create_personal_workspace(org_name text default 'Astra Workspace')
returns uuid
language plpgsql
security definer
set search_path = public
as $$
begin
  return public.create_company_workspace(org_name);
end;
$$;

create or replace function public.join_organization_by_code(join_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
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
