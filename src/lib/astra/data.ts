import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { demoDashboardData } from "./demo-data";
import type { DashboardData, DashboardFile, DashboardOrganization, DashboardTask } from "./types";

function initialsFromEmail(email: string | null | undefined) {
  if (!email) return "AS";
  const [name] = email.split("@");
  return name
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AS";
}

export async function getDashboardData(activeOrganizationId?: string): Promise<DashboardData> {
  if (!getSupabaseConfig()) {
    return demoDashboardData;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ...demoDashboardData, isSupabaseConfigured: true };
  }

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (!memberships?.length) {
    return {
      ...demoDashboardData,
      isSupabaseConfigured: true,
      needsWorkspaceSetup: true,
      userEmail: user.email ?? null,
      tasks: [],
      messages: [],
      files: [],
    };
  }

  const membershipOrganizationIds = memberships.map((membership) => membership.organization_id);
  const requestedOrganizationId = activeOrganizationId && membershipOrganizationIds.includes(activeOrganizationId)
    ? activeOrganizationId
    : membershipOrganizationIds[0];

  const [{ data: organizations }, { data: workspace }] = await Promise.all([
    supabase
      .from("organizations")
      .select("id,name,invite_code")
      .in("id", membershipOrganizationIds)
      .order("created_at", { ascending: true }),
    supabase
    .from("workspaces")
    .select("id,name,slug")
    .eq("organization_id", requestedOrganizationId)
    .order("created_at", { ascending: true })
    .limit(1)
      .single(),
  ]);

  const organizationList: DashboardOrganization[] =
    organizations?.map((organization) => ({
      id: organization.id,
      name: organization.name,
      inviteCode: organization.invite_code,
    })) ?? [];
  const organization = organizationList.find((item) => item.id === requestedOrganizationId) ?? organizationList[0];

  if (!organization || !workspace) {
    return {
      ...demoDashboardData,
      isSupabaseConfigured: true,
      needsWorkspaceSetup: true,
      userEmail: user.email ?? null,
      tasks: [],
      messages: [],
      files: [],
    };
  }

  const { data: channel } = await supabase
    .from("channels")
    .select("id,name")
    .eq("workspace_id", workspace.id)
    .eq("kind", "chat")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const [{ data: tasks }, { data: messages }, { data: files }] = await Promise.all([
    supabase
      .from("tasks")
      .select("id,title,description,status,priority,assignee_id")
      .eq("workspace_id", workspace.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("messages")
      .select("id,body,created_at,author_id")
      .eq("channel_id", channel?.id ?? "00000000-0000-0000-0000-000000000000")
      .order("created_at", { ascending: true })
      .limit(20),
    supabase
      .from("workspace_files")
      .select("id,name,storage_path,mime_type,size_bytes,uploaded_by,created_at")
      .eq("workspace_id", workspace.id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    isSupabaseConfigured: true,
    needsWorkspaceSetup: false,
    userEmail: user.email ?? null,
    organization: {
      id: organization.id,
      name: organization.name,
      inviteCode: organization.inviteCode,
    },
    organizations: organizationList,
    workspace: {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      channelId: channel?.id ?? null,
      channelName: channel?.name ?? "TeamWorkspace",
    },
    tasks:
      tasks?.map<DashboardTask>((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigneeInitials: task.assignee_id ? "AS" : "+",
        commentCount: 0,
      })) ?? [],
    messages:
      messages?.map((message) => ({
        id: message.id,
        authorName: message.author_id === user.id ? "You" : "Team Member",
        authorInitials: message.author_id === user.id ? initialsFromEmail(user.email) : "TM",
        createdAtLabel: new Date(message.created_at).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        body: message.body,
      })) ?? [],
    files:
      files?.map<DashboardFile>((f) => ({
        id: f.id,
        name: f.name,
        storagePath: f.storage_path,
        mimeType: f.mime_type,
        sizeBytes: f.size_bytes,
        uploadedBy: f.uploaded_by,
        createdAt: new Date(f.created_at).toLocaleDateString([], { month: "short", day: "numeric" }),
      })) ?? [],
  };
}
