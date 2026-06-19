import AppDashboardClient from "@/components/app-dashboard/AppDashboardClient";
import { getDashboardData } from "@/lib/astra/data";
import { createCompany, createTask, deleteTask, deleteWorkspaceFile, joinCompany, saveFileMeta, sendMessage, updateTaskStatus } from "./actions";
import { signOut } from "../login/actions";

export default async function AppPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ org?: string }>;
}) {
  const { locale } = await params;
  const { org } = await searchParams;
  const data = await getDashboardData(org);
  return (
    <AppDashboardClient
      data={data}
      locale={locale}
      createCompanyAction={createCompany.bind(null, locale)}
      joinCompanyAction={joinCompany.bind(null, locale)}
      sendMessageAction={sendMessage.bind(null, locale, data.workspace.channelId)}
      createTaskAction={createTask.bind(null, locale, data.workspace.id)}
      deleteTaskAction={deleteTask.bind(null, locale)}
      updateTaskStatusAction={updateTaskStatus.bind(null, locale)}
      saveFileMetaAction={saveFileMeta.bind(null, locale, data.workspace.id)}
      deleteFileAction={deleteWorkspaceFile.bind(null, locale)}
      signOutAction={signOut.bind(null, locale)}
    />
  );
}
