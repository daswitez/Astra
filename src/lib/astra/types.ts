export type DashboardTaskStatus = "todo" | "in_progress" | "review" | "done";

export type DashboardTask = {
  id: string;
  title: string;
  description: string | null;
  status: DashboardTaskStatus;
  priority: "low" | "medium" | "high";
  assigneeInitials: string;
  commentCount: number;
};

export type DashboardMessage = {
  id: string;
  authorName: string;
  authorInitials: string;
  createdAtLabel: string;
  body: string;
};

export type DashboardWorkspace = {
  id: string;
  name: string;
  slug: string;
  channelId: string | null;
  channelName: string;
};

export type DashboardOrganization = {
  id: string | null;
  name: string;
  inviteCode: string | null;
};

export type DashboardFile = {
  id: string;
  name: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number | null;
  uploadedBy: string | null;
  createdAt: string;
};

export type DashboardData = {
  isSupabaseConfigured: boolean;
  needsWorkspaceSetup: boolean;
  userEmail: string | null;
  organization: DashboardOrganization;
  organizations: DashboardOrganization[];
  workspace: DashboardWorkspace;
  tasks: DashboardTask[];
  messages: DashboardMessage[];
  files: DashboardFile[];
};
