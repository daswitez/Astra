"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import type { DashboardData } from "@/lib/astra/types";
import {
  AppView,
  ExecutionCanvas,
  FlowModeOverlay,
  LoadingScreen,
  OmniBar,
  PomodoroState,
} from "./AppDashboardSections";

export default function AppDashboardClient({
  data,
  locale,
  createCompanyAction,
  joinCompanyAction,
  sendMessageAction,
  createTaskAction,
  deleteTaskAction,
  updateTaskStatusAction,
  saveFileMetaAction,
  deleteFileAction,
  signOutAction,
}: {
  data: DashboardData;
  locale: string;
  createCompanyAction: (formData: FormData) => Promise<void>;
  joinCompanyAction: (formData: FormData) => Promise<void>;
  sendMessageAction: (formData: FormData) => Promise<void>;
  createTaskAction: (formData: FormData) => Promise<void>;
  deleteTaskAction: (taskId: string) => Promise<void>;
  updateTaskStatusAction: (taskId: string, status: string) => Promise<void>;
  saveFileMetaAction: (fileName: string, storagePath: string, mimeType: string, sizeBytes: number) => Promise<void>;
  deleteFileAction: (fileId: string) => Promise<void>;
  signOutAction: () => Promise<void>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOmnibarOpen, setIsOmnibarOpen] = useState(false);
  const [isFlowMode, setIsFlowMode] = useState(false);
  const [activeView, setActiveView] = useState<AppView>("home");
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>("idle");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOmnibarOpen((isOpen) => !isOpen);
      }

      if (event.key === "Escape") {
        setIsOmnibarOpen(false);
        setIsFlowMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <OmniBar
        data={data}
        isOpen={isOmnibarOpen}
        isLoading={isLoading}
        onClose={() => setIsOmnibarOpen(false)}
      />
      <FlowModeOverlay
        task={data.tasks.find((task) => task.status === "in_progress") ?? data.tasks[0]}
        isFlowMode={isFlowMode}
        pomodoroState={pomodoroState}
        setPomodoroState={setPomodoroState}
        onExit={() => setIsFlowMode(false)}
      />
      <ExecutionCanvas
        data={data}
        locale={locale}
        createCompanyAction={createCompanyAction}
        joinCompanyAction={joinCompanyAction}
        sendMessageAction={sendMessageAction}
        createTaskAction={createTaskAction}
        deleteTaskAction={deleteTaskAction}
        updateTaskStatusAction={updateTaskStatusAction}
        saveFileMetaAction={saveFileMetaAction}
        deleteFileAction={deleteFileAction}
        signOutAction={signOutAction}
        activeView={activeView}
        isOmnibarOpen={isOmnibarOpen}
        isFlowMode={isFlowMode}
        setActiveView={setActiveView}
        setIsOmnibarOpen={setIsOmnibarOpen}
        setIsFlowMode={setIsFlowMode}
        onOpenFlowchart={() => router.push("/app/flowchart")}
        onOpenWhiteboard={() => router.push("/app/whiteboard")}
      />
    </>
  );
}
