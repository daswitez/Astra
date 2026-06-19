"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function createCompany(locale: string, formData: FormData) {
  if (!getSupabaseConfig()) {
    redirect(`/${locale}/onboarding`);
  }

  const companyName = String(formData.get("companyName") ?? "").trim();
  if (!companyName) {
    redirect(`/${locale}/onboarding`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { data: workspaceId, error } = await supabase.rpc("create_company_workspace", {
    company_name: companyName,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("organization_id")
    .eq("id", workspaceId)
    .single();

  revalidatePath(`/${locale}/app`);
  redirect(`/${locale}/app${workspace?.organization_id ? `?org=${workspace.organization_id}` : ""}`);
}

export async function joinCompany(locale: string, formData: FormData) {
  if (!getSupabaseConfig()) {
    redirect(`/${locale}/onboarding`);
  }

  const joinCode = String(formData.get("joinCode") ?? "").trim();
  if (!joinCode) {
    redirect(`/${locale}/onboarding`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { data: workspaceId, error } = await supabase.rpc("join_organization_by_code", {
    join_code: joinCode,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("organization_id")
    .eq("id", workspaceId)
    .single();

  revalidatePath(`/${locale}/app`);
  redirect(`/${locale}/app${workspace?.organization_id ? `?org=${workspace.organization_id}` : ""}`);
}

export async function sendMessage(locale: string, channelId: string | null, formData: FormData) {
  if (!getSupabaseConfig() || !channelId) {
    redirect(`/${locale}/app`);
  }

  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    redirect(`/${locale}/app`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { error } = await supabase.from("messages").insert({
    channel_id: channelId,
    author_id: user.id,
    body,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${locale}/app`);
}

export async function saveFileMeta(
  locale: string,
  workspaceId: string,
  fileName: string,
  storagePath: string,
  mimeType: string,
  sizeBytes: number
) {
  if (!getSupabaseConfig()) return;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);
  const { error } = await supabase.from("workspace_files").insert({
    workspace_id: workspaceId,
    uploaded_by: user.id,
    name: fileName,
    storage_path: storagePath,
    mime_type: mimeType,
    size_bytes: sizeBytes,
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/app`);
}

export async function deleteWorkspaceFile(locale: string, fileId: string) {
  if (!getSupabaseConfig()) return;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);
  const { error } = await supabase.from("workspace_files").delete().eq("id", fileId);
  if (error) throw new Error(error.message);
  revalidatePath(`/${locale}/app`);
}

export async function updateTaskStatus(locale: string, taskId: string, status: string) {
  if (!getSupabaseConfig()) return;

  const validStatuses = ["todo", "in_progress", "review", "done"];
  if (!validStatuses.includes(status)) return;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { error } = await supabase
    .from("tasks")
    .update({ status: status as "todo" | "in_progress" | "review" | "done" })
    .eq("id", taskId);
  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/app`);
}

export async function deleteTask(locale: string, taskId: string) {
  if (!getSupabaseConfig()) return;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/app`);
}

export async function createTask(locale: string, workspaceId: string, formData: FormData) {
  if (!getSupabaseConfig()) {
    redirect(`/${locale}/app`);
  }

  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    redirect(`/${locale}/app`);
  }

  const description = String(formData.get("description") ?? "").trim() || null;
  const priority = String(formData.get("priority") ?? "medium");
  const safePriority = (["low", "medium", "high"].includes(priority) ? priority : "medium") as "low" | "medium" | "high";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  await supabase.from("tasks").insert({
    workspace_id: workspaceId,
    title,
    description,
    status: "todo",
    priority: safePriority,
    created_by: user.id,
  });

  revalidatePath(`/${locale}/app`);
}
