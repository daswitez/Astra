-- RLS for workspace_files (run this if table already exists)
alter table public.workspace_files enable row level security;

create policy "members can read workspace files"
on public.workspace_files for select
using (public.is_workspace_member(workspace_id));

create policy "members can upload workspace files"
on public.workspace_files for insert
with check (public.is_workspace_member(workspace_id) and uploaded_by = auth.uid());

create policy "members can delete own workspace files"
on public.workspace_files for delete
using (uploaded_by = auth.uid());
