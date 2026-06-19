"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import type { DashboardData, DashboardFile, DashboardMessage, DashboardTask } from "@/lib/astra/types";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Coffee,
  FileText,
  FileUp,
  FolderOpen,
  GitBranch,
  Home,
  Image,
  KeyRound,
  Kanban,
  KanbanSquare,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Pause,
  PenTool,
  Play,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UserCircle,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ArchitectureFlowchart from "../ArchitectureFlowchart";

export type AppView = "home" | "chat" | "kanban" | "flowchart" | "whiteboard" | "files";
export type PomodoroState = "idle" | "running" | "paused";

type ViewSetter = (view: AppView) => void;

export function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full" />
            <div className="absolute w-20 h-20 bg-purple-500/20 blur-[40px] rounded-full" />
            <Sparkles className="w-8 h-8 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-xs font-medium tracking-[0.3em] uppercase text-white/40"
          >
            Initializing Spatial OS
          </motion.div>

          <motion.div
            className="mt-8 w-48 h-[1px] bg-white/10 overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/50"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "circInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OmniBar({
  data,
  isOpen,
  isLoading,
  onClose,
}: {
  data: DashboardData;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && !isLoading && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl"
          >
            <div className="bg-white/[0.03] border border-white/[0.1] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-3xl">
              <div className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.05]">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Ask Astra or search across your workspace..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/30"
                />
                <div className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-white/40 border border-white/5">
                  ESC
                </div>
              </div>
              <div className="p-2 bg-black/20">
                <div className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Suggested
                </div>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/90">Summarize active workspace</p>
                      <p className="text-xs text-white/40">From #{data.workspace.channelName}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/90">Create a new task</p>
                      <p className="text-xs text-white/40">Assign to #{data.workspace.channelName} backlog</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function FlowModeOverlay({
  task,
  isFlowMode,
  pomodoroState,
  setPomodoroState,
  onExit,
}: {
  task?: DashboardTask;
  isFlowMode: boolean;
  pomodoroState: PomodoroState;
  setPomodoroState: Dispatch<SetStateAction<PomodoroState>>;
  onExit: () => void;
}) {
  return (
    <AnimatePresence>
      {isFlowMode && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-20 flex items-center justify-center pointer-events-auto bg-black/40"
        >
          <motion.div
            layoutId="active-task-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-[2rem] border border-white/[0.08] bg-black/60 backdrop-blur-3xl p-8 md:p-10 flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[120px] pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded shadow-[0_0_15px_rgba(52,211,153,0.15)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  In Progress
                </span>
                <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
                  Flow Session
                </span>
              </div>
              <button
                onClick={onExit}
                className="px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/10 active:scale-95 text-xs font-medium text-white/50 hover:text-white transition-all cursor-pointer relative z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                Exit Focus (ESC)
              </button>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight mb-4 text-center">
              {task?.title ?? "Focus Session"}
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-2xl text-center mx-auto">
              {task?.description ??
                "Select an active task to enter deep work with a focused Pomodoro session."}
            </p>

            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="url(#pomodoro-gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="753.98"
                    strokeDashoffset={pomodoroState === "idle" ? "753.98" : "150"}
                    strokeLinecap="round"
                    animate={{
                      strokeDashoffset:
                        pomodoroState === "idle" ? 753.98 : pomodoroState === "running" ? 0 : 150,
                    }}
                    transition={{ duration: pomodoroState === "running" ? 1500 : 1, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="pomodoro-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center flex flex-col items-center">
                  <span className="text-6xl font-extrabold tracking-tighter text-white tabular-nums">
                    25:00
                  </span>
                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest mt-2">
                    Deep Work
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPomodoroState((prev) => (prev === "running" ? "paused" : "running"))}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  {pomodoroState === "running" ? (
                    <Pause className="w-6 h-6 fill-black" />
                  ) : (
                    <Play className="w-6 h-6 fill-black ml-1" />
                  )}
                </button>
                <button className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <Coffee className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <span className="text-xs font-medium text-indigo-300">AS</span>
                </div>
                <span className="text-sm text-white/50">Alice Smith is working on this...</span>
              </div>
              <button className="px-6 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                Complete Task
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ExecutionCanvas({
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
  activeView,
  isOmnibarOpen,
  isFlowMode,
  setActiveView,
  setIsOmnibarOpen,
  setIsFlowMode,
  onOpenFlowchart,
  onOpenWhiteboard,
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
  activeView: AppView;
  isOmnibarOpen: boolean;
  isFlowMode: boolean;
  setActiveView: ViewSetter;
  setIsOmnibarOpen: (isOpen: boolean) => void;
  setIsFlowMode: (isActive: boolean) => void;
  onOpenFlowchart: () => void;
  onOpenWhiteboard: () => void;
}) {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<DashboardTask | null>(null);

  return (
    <>
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        createTaskAction={createTaskAction}
      />
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        deleteTaskAction={deleteTaskAction}
      />
      <motion.main
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 2.8, duration: 1 }}
        className={`
          relative min-h-screen pr-8 pt-8 pb-8 transition-all duration-700 ease-[0.16,1,0.3,1]
          ${isOmnibarOpen ? "scale-[0.98] opacity-50" : ""}
          ${isFlowMode ? "pl-8 scale-95 opacity-30 brightness-50" : "pl-[100px]"}
        `}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col h-full space-y-8">
          <AppHeader
            data={data}
            locale={locale}
            createCompanyAction={createCompanyAction}
            joinCompanyAction={joinCompanyAction}
            signOutAction={signOutAction}
            activeView={activeView}
            isFlowMode={isFlowMode}
            setActiveView={setActiveView}
            onOpenOmnibar={() => setIsOmnibarOpen(true)}
          />

          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
            <MainViewPanel
              data={data}
              sendMessageAction={sendMessageAction}
              createTaskAction={createTaskAction}
              updateTaskStatusAction={updateTaskStatusAction}
              saveFileMetaAction={saveFileMetaAction}
              deleteFileAction={deleteFileAction}
              activeView={activeView}
              setActiveView={setActiveView}
              setIsFlowMode={setIsFlowMode}
              onOpenCreateTask={() => setIsCreateTaskOpen(true)}
              onSelectTask={setSelectedTask}
              onOpenFlowchart={onOpenFlowchart}
              onOpenWhiteboard={onOpenWhiteboard}
            />

            {activeView !== "flowchart" && activeView !== "whiteboard" && activeView !== "files" && (
              <ActiveContextPanel data={data} isFlowMode={isFlowMode} onStartFlow={() => setIsFlowMode(true)} />
            )}
          </div>
        </div>
      </motion.main>
    </>
  );
}

function AppHeader({
  data,
  locale,
  createCompanyAction,
  joinCompanyAction,
  signOutAction,
  activeView,
  isFlowMode,
  setActiveView,
  onOpenOmnibar,
}: {
  data: DashboardData;
  locale: string;
  createCompanyAction: (formData: FormData) => Promise<void>;
  joinCompanyAction: (formData: FormData) => Promise<void>;
  signOutAction: () => Promise<void>;
  activeView: AppView;
  isFlowMode: boolean;
  setActiveView: ViewSetter;
  onOpenOmnibar: () => void;
}) {
  return (
    <header className={`flex items-center justify-between w-full h-14 transition-opacity duration-300 ${isFlowMode ? "opacity-0" : "opacity-100"}`}>
      <div className="flex items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-white/90">
              {activeView === "home" ? data.organization.name : `#${data.workspace.channelName}`}
            </h2>
            {data.organization.inviteCode && !data.needsWorkspaceSetup && (
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                CODE {data.organization.inviteCode}
              </span>
            )}
          </div>
          <p className="text-sm text-white/40 mt-0.5">
            {activeView === "home"
              ? data.isSupabaseConfigured
                ? `Signed in${data.userEmail ? ` as ${data.userEmail}` : ""}`
                : "Demo mode: connect Supabase to persist this workspace"
              : "Central hub for team sync & execution"}
          </p>
        </div>

        {activeView !== "home" && (
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setActiveView("home")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-white/40 hover:text-white/70"
              title="Back to home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              onClick={() => setActiveView("chat")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === "chat" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button
              onClick={() => setActiveView("kanban")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === "kanban" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`}
            >
              <Kanban className="w-4 h-4" />
              Board
            </button>
            <button
              onClick={() => setActiveView("files")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === "files" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`}
            >
              <FolderOpen className="w-4 h-4" />
              Files
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenOmnibar}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-white/60" />
          <span className="text-white/60">Search OS...</span>
          <kbd className="ml-2 text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/50">⌘K</kbd>
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-4 h-4 text-white/70" />
        </button>
        <ProfileMenu
          data={data}
          locale={locale}
          createCompanyAction={createCompanyAction}
          joinCompanyAction={joinCompanyAction}
          signOutAction={signOutAction}
        />
      </div>
    </header>
  );
}

function ProfileMenu({
  data,
  locale,
  createCompanyAction,
  joinCompanyAction,
  signOutAction,
}: {
  data: DashboardData;
  locale: string;
  createCompanyAction: (formData: FormData) => Promise<void>;
  joinCompanyAction: (formData: FormData) => Promise<void>;
  signOutAction: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="w-10 h-10 rounded-full bg-white text-black hover:scale-105 flex items-center justify-center transition-transform"
        aria-label="Open profile menu"
      >
        <UserCircle className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 z-50 w-[360px] rounded-2xl border border-white/10 bg-[#080808]/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            <div className="mb-4 border-b border-white/10 pb-3">
              <p className="text-sm font-semibold text-white/90">{data.userEmail ?? "Astra user"}</p>
              <p className="mt-1 text-xs text-white/40">Profile and team access</p>
            </div>

            <div className="space-y-2">
              <p className="px-1 text-[10px] font-semibold uppercase tracking-widest text-white/35">Teams</p>
              {data.organizations.map((organization) => {
                const isActive = organization.id === data.organization.id;
                return (
                  <a
                    key={organization.id ?? organization.name}
                    href={`/${locale}/app${organization.id ? `?org=${organization.id}` : ""}`}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/5 bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <span>{organization.name}</span>
                    {organization.inviteCode && (
                      <span className="font-mono text-[10px] tracking-[0.16em] text-white/35">
                        {organization.inviteCode}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/10 pt-4">
              <form action={createCompanyAction} className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-emerald-100">
                  <Building2 className="w-4 h-4" />
                  Create another company
                </div>
                <div className="flex gap-2">
                  <input
                    name="companyName"
                    type="text"
                    required
                    placeholder="Company name"
                    className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-xs text-white outline-none placeholder:text-white/25"
                  />
                  <button type="submit" className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-semibold text-black">
                    Create
                  </button>
                </div>
              </form>

              <form action={joinCompanyAction} className="rounded-xl border border-blue-400/15 bg-blue-400/5 p-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-blue-100">
                  <KeyRound className="w-4 h-4" />
                  Join another company
                </div>
                <div className="flex gap-2">
                  <input
                    name="joinCode"
                    type="text"
                    required
                    maxLength={8}
                    placeholder="A7K2Q9"
                    className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/25 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white outline-none placeholder:text-white/25"
                  />
                  <button type="submit" className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-black">
                    Join
                  </button>
                </div>
              </form>
            </div>

            <form action={signOutAction} className="mt-4 border-t border-white/10 pt-3">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MainViewPanel({
  data,
  sendMessageAction,
  createTaskAction,
  updateTaskStatusAction,
  saveFileMetaAction,
  deleteFileAction,
  activeView,
  setActiveView,
  setIsFlowMode,
  onOpenCreateTask,
  onSelectTask,
  onOpenFlowchart,
  onOpenWhiteboard,
}: {
  data: DashboardData;
  sendMessageAction: (formData: FormData) => Promise<void>;
  createTaskAction: (formData: FormData) => Promise<void>;
  updateTaskStatusAction: (taskId: string, status: string) => Promise<void>;
  saveFileMetaAction: (fileName: string, storagePath: string, mimeType: string, sizeBytes: number) => Promise<void>;
  deleteFileAction: (fileId: string) => Promise<void>;
  activeView: AppView;
  setActiveView: ViewSetter;
  setIsFlowMode: (isActive: boolean) => void;
  onOpenCreateTask: () => void;
  onSelectTask: (task: DashboardTask) => void;
  onOpenFlowchart: () => void;
  onOpenWhiteboard: () => void;
}) {
  const isFullWidth = activeView === "flowchart" || activeView === "whiteboard" || activeView === "files";
  return (
    <div className={`${isFullWidth ? "xl:col-span-3" : "xl:col-span-2"} rounded-3xl border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent p-6 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden transition-all duration-500`}>
      <AnimatePresence mode="wait">
        {activeView === "home" && (
          <HomeHubView
            data={data}
            setActiveView={setActiveView}
            onOpenFlowchart={onOpenFlowchart}
            onOpenWhiteboard={onOpenWhiteboard}
          />
        )}
        {activeView === "chat" && (
          <ChatView messages={data.messages} channelId={data.workspace.channelId} isFlowMode={false} sendMessageAction={sendMessageAction} />
        )}
        {activeView === "kanban" && (
          <KanbanView tasks={data.tasks} onOpenCreateTask={onOpenCreateTask} onSelectTask={onSelectTask} onStartFlow={() => setIsFlowMode(true)} updateTaskStatusAction={updateTaskStatusAction} />
        )}
        {activeView === "files" && (
          <FilesView files={data.files} workspaceId={data.workspace.id} saveFileMetaAction={saveFileMetaAction} deleteFileAction={deleteFileAction} />
        )}
        {activeView === "flowchart" && (
          <motion.div
            key="flowchart-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex-1 w-full h-full relative"
          >
            <ArchitectureFlowchart onBack={() => setActiveView("home")} />
          </motion.div>
        )}
        {activeView === "whiteboard" && <WhiteboardPlaceholder onReturnHome={() => setActiveView("home")} />}
      </AnimatePresence>
    </div>
  );
}

function HomeHubView({
  data,
  setActiveView,
  onOpenFlowchart,
  onOpenWhiteboard,
}: {
  data: DashboardData;
  setActiveView: ViewSetter;
  onOpenFlowchart: () => void;
  onOpenWhiteboard: () => void;
}) {
  return (
    <motion.div
      key="home-view"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col w-full h-full"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        <ToolCard
          title="Team Board"
          description="Manage tasks, sprints, and priorities for your core department."
          meta={`${data.tasks.length} Tasks`}
          color="emerald"
          icon={<KanbanSquare className="w-6 h-6 text-emerald-400" />}
          onClick={() => setActiveView("kanban")}
        />
        <ToolCard
          title="Project Flowcharts"
          description="Visual flowcharts mirroring your logic, processes, and lifecycles."
          meta="Open Q3 Plan"
          color="blue"
          icon={<GitBranch className="w-6 h-6 text-blue-400" />}
          onClick={onOpenFlowchart}
        />
        <ToolCard
          title="Files & Assets"
          description="Upload and share images, PDFs, and workspace documents with your team."
          meta={`${data.files.length} Files`}
          color="teal"
          icon={<FolderOpen className="w-6 h-6 text-teal-400" />}
          onClick={() => setActiveView("files")}
        />
        <ToolCard
          title="Brainstorming"
          description="Freeform whiteboards for infinite canvas ideation and wireframing."
          meta="Start Session"
          color="purple"
          icon={<PenTool className="w-6 h-6 text-purple-400" />}
          onClick={onOpenWhiteboard}
        />
        <ToolCard
          title="Team Chat"
          description="Real-time communication, PR tracking, and team announcements."
          meta={`${data.messages.length} Messages`}
          color="amber"
          icon={<MessageSquare className="w-6 h-6 text-amber-400" />}
          onClick={() => setActiveView("chat")}
        />
      </div>
    </motion.div>
  );
}

function ToolCard({
  title,
  description,
  meta,
  color,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  meta: string;
  color: "emerald" | "blue" | "purple" | "amber" | "teal";
  icon: ReactNode;
  onClick: () => void;
}) {
  const colorClasses = {
    emerald: { hoverBorder: "hover:border-emerald-500/30", hoverBg: "hover:bg-emerald-500/[0.02]", glow: "bg-emerald-500/10 group-hover:bg-emerald-500/20", iconBg: "bg-emerald-500/10 border-emerald-500/20", meta: "text-emerald-400/60" },
    blue: { hoverBorder: "hover:border-blue-500/30", hoverBg: "hover:bg-blue-500/[0.02]", glow: "bg-blue-500/10 group-hover:bg-blue-500/20", iconBg: "bg-blue-500/10 border-blue-500/20", meta: "text-blue-400/60" },
    purple: { hoverBorder: "hover:border-purple-500/30", hoverBg: "hover:bg-purple-500/[0.02]", glow: "bg-purple-500/10 group-hover:bg-purple-500/20", iconBg: "bg-purple-500/10 border-purple-500/20", meta: "text-purple-400/60" },
    amber: { hoverBorder: "hover:border-amber-500/30", hoverBg: "hover:bg-amber-500/[0.02]", glow: "bg-amber-500/10 group-hover:bg-amber-500/20", iconBg: "bg-amber-500/10 border-amber-500/20", meta: "text-amber-400/60" },
    teal: { hoverBorder: "hover:border-teal-500/30", hoverBg: "hover:bg-teal-500/[0.02]", glow: "bg-teal-500/10 group-hover:bg-teal-500/20", iconBg: "bg-teal-500/10 border-teal-500/20", meta: "text-teal-400/60" },
  }[color];

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] ${colorClasses.hoverBorder} p-6 flex flex-col items-start text-left transition-all ${colorClasses.hoverBg} shadow-lg`}
    >
      <div className={`absolute -top-24 -right-24 w-48 h-48 ${colorClasses.glow} blur-[60px] rounded-full transition-colors pointer-events-none`} />
      <div className={`w-12 h-12 rounded-xl ${colorClasses.iconBg} flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white/90 mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed max-w-[80%]">{description}</p>
      <div className={`mt-auto pt-6 flex items-center gap-2 text-xs font-mono ${colorClasses.meta} uppercase tracking-widest`}>
        {meta} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

function ChatView({
  messages,
  channelId,
  isFlowMode,
  sendMessageAction,
}: {
  messages: DashboardMessage[];
  channelId: string | null;
  isFlowMode: boolean;
  sendMessageAction: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!channelId) return;
    const supabase = createClient();
    const sub = supabase
      .channel(`chat:${channelId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `channel_id=eq.${channelId}` },
        () => { router.refresh(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, [channelId, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = String(formData.get("body") ?? "").trim();
    if (!body) return;
    if (inputRef.current) inputRef.current.value = "";
    startTransition(async () => {
      await sendMessageAction(formData);
      router.refresh();
    });
  };

  return (
    <motion.div
      key="chat-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col h-full"
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pb-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center min-h-[200px]">
            <p className="text-sm text-white/20">No messages yet. Start the conversation.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              initials={message.authorInitials}
              name={message.authorName}
              time={message.createdAtLabel}
              tone={index % 2 === 0 ? "indigo" : "emerald"}
            >
              {message.body}
            </ChatMessage>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className={`pt-4 transition-opacity duration-300 ${isFlowMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-3 flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group hover:border-white/[0.15] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
            <Plus className="w-4 h-4 text-white/60" />
          </div>
          <input
            ref={inputRef}
            name="body"
            type="text"
            placeholder="Message #TeamWorkspace or type '/' for commands..."
            className="flex-1 bg-transparent outline-none text-sm text-white/90 placeholder:text-white/30"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
            <Sparkles className={`w-4 h-4 transition-colors ${isPending ? "text-white/60 animate-pulse" : "text-white/30 hover:text-white/80"}`} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function ChatMessage({
  initials,
  name,
  time,
  tone,
  children,
}: {
  initials: string;
  name: string;
  time: string;
  tone: "indigo" | "emerald";
  children: ReactNode;
}) {
  const toneClass = tone === "indigo" ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-300" : "bg-emerald-500/20 border-emerald-500/30 text-emerald-300";

  return (
    <div className="relative group self-start max-w-[85%]">
      <div className="flex items-start gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${toneClass}`}>
          <span className="text-xs font-medium">{initials}</span>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm font-medium text-white/80">{name}</span>
            <span className="text-xs text-white/30">{time}</span>
          </div>
          <div className="p-4 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-white/[0.1] transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-sm text-white/70 leading-relaxed">{children}</p>
          </div>
        </div>
      </div>
      <div className="absolute top-8 -right-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
        <button className="w-8 h-8 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function KanbanView({
  tasks,
  onOpenCreateTask,
  onSelectTask,
  onStartFlow,
  updateTaskStatusAction,
}: {
  tasks: DashboardTask[];
  onOpenCreateTask: () => void;
  onSelectTask: (task: DashboardTask) => void;
  onStartFlow: () => void;
  updateTaskStatusAction: (taskId: string, status: string) => Promise<void>;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [draggingTask, setDraggingTask] = useState<DashboardTask | null>(null);
  const [optimisticTasks, setOptimisticTasks] = useState<DashboardTask[]>(tasks);

  // Keep optimistic state in sync when server data changes
  if (tasks !== optimisticTasks && !draggingTask) {
    setOptimisticTasks(tasks);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = optimisticTasks.find((t) => t.id === event.active.id);
    setDraggingTask(task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggingTask(null);
    if (!over || active.id === over.id) return;

    const newStatus = over.id as string;
    const validStatuses = ["todo", "in_progress", "review", "done"];
    if (!validStatuses.includes(newStatus)) return;

    const taskId = active.id as string;
    const task = optimisticTasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    setOptimisticTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus as DashboardTask["status"] } : t))
    );

    startTransition(async () => {
      await updateTaskStatusAction(taskId, newStatus);
      router.refresh();
    });
  };

  const todoTasks = optimisticTasks.filter((t) => t.status === "todo");
  const activeTasks = optimisticTasks.filter((t) => t.status === "in_progress");
  const reviewTasks = optimisticTasks.filter((t) => t.status === "review");
  const doneTasks = optimisticTasks.filter((t) => t.status === "done");
  const primaryActiveTask = activeTasks[0];

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <motion.div
        key="kanban-view"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 flex gap-6 h-full overflow-x-auto pb-4 custom-scrollbar"
      >
        <KanbanColumn title="To Do" columnId="todo" count={String(todoTasks.length)} tone="white" onAdd={onOpenCreateTask}>
          {todoTasks.length === 0 ? (
            <button
              type="button"
              onClick={onOpenCreateTask}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/[0.08] py-6 text-sm text-white/25 hover:text-white/50 hover:border-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> New task
            </button>
          ) : (
            todoTasks.map((task) => <TaskCard key={task.id} task={task} onClick={() => onSelectTask(task)} />)
          )}
        </KanbanColumn>

        <KanbanColumn title="In Progress" columnId="in_progress" count={String(activeTasks.length)} tone="emerald">
          {primaryActiveTask && (
            <TaskCard
              key={primaryActiveTask.id}
              task={primaryActiveTask}
              onClick={() => onSelectTask(primaryActiveTask)}
              activeStyle
            />
          )}
        </KanbanColumn>

        <KanbanColumn title="Review" columnId="review" count={String(reviewTasks.length)} tone="blue">
          {reviewTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onSelectTask(task)} dimmed />
          ))}
        </KanbanColumn>

        <KanbanColumn title="Done" columnId="done" count={String(doneTasks.length)} tone="purple">
          {doneTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onSelectTask(task)} done />
          ))}
        </KanbanColumn>
      </motion.div>

      <DragOverlay>
        {draggingTask && (
          <div className="opacity-90 rotate-2 scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <TaskCard task={draggingTask} onClick={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumn({
  title,
  columnId,
  count,
  tone,
  onAdd,
  children,
}: {
  title: string;
  columnId: string;
  count: string;
  tone: "white" | "emerald" | "blue" | "purple";
  onAdd?: () => void;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  const toneClass = {
    white: "text-white/60",
    emerald: "text-emerald-400/80",
    blue: "text-blue-400/80",
    purple: "text-purple-400/80",
  }[tone];
  const dotClass = {
    white: "bg-white/20",
    emerald: "bg-emerald-400/50",
    blue: "bg-blue-400/50",
    purple: "bg-purple-400/50",
  }[tone];

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[280px] flex flex-col gap-4 rounded-2xl transition-colors duration-150 ${isOver ? "bg-white/[0.03] ring-1 ring-white/10" : ""}`}
    >
      <div className="flex items-center justify-between px-2 pt-2">
        <h3 className={`text-sm font-semibold ${toneClass} flex items-center gap-2`}>
          <span className={`w-2 h-2 rounded-full ${dotClass}`} /> {title}
          <span className="text-white/30 ml-2 font-mono text-xs">{count}</span>
        </h3>
        {onAdd && (
          <button type="button" onClick={onAdd} className="text-white/30 hover:text-white/70 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3 px-0 pb-2">
        {children}
      </div>
    </div>
  );
}

const priorityConfig = {
  high:   { label: "High",   classes: "bg-red-500/10 text-red-400 border-red-500/20" },
  medium: { label: "Medium", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  low:    { label: "Low",    classes: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

function TaskCard({ task, onClick, dimmed, activeStyle, done }: { task: DashboardTask; onClick: () => void; dimmed?: boolean; activeStyle?: boolean; done?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });
  const p = priorityConfig[task.priority] ?? priorityConfig.medium;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      style={{ touchAction: "none" }}
      className={`w-full text-left p-4 rounded-2xl transition-all group cursor-grab active:cursor-grabbing select-none
        ${isDragging ? "opacity-30" : ""}
        ${activeStyle ? "bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.05)]" : ""}
        ${done ? "bg-purple-500/[0.03] border border-purple-500/10" : ""}
        ${!activeStyle && !done ? "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1]" : ""}
        ${dimmed ? "opacity-60" : ""}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        {activeStyle ? (
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Flow Active
          </span>
        ) : (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${p.classes}`}>{p.label}</span>
        )}
        {dimmed && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
        {done && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
        {activeStyle && <Zap className="w-3.5 h-3.5 text-amber-400" />}
      </div>
      <h4
        className={`text-sm font-medium mb-1 transition-colors
          ${activeStyle ? "text-white/90 group-hover:text-emerald-300" : ""}
          ${done ? "text-white/40 line-through decoration-white/20" : ""}
          ${!activeStyle && !done ? "text-white/90 group-hover:text-white" : ""}
          ${dimmed ? "line-through decoration-white/20 text-white/60" : ""}
        `}
      >
        {task.title}
      </h4>
      {task.description && (
        <p className="text-xs text-white/35 line-clamp-2 leading-relaxed mt-1">{task.description}</p>
      )}
      {activeStyle && (
        <div className="flex items-center justify-between mt-4">
          <Avatar initials={task.assigneeInitials} />
        </div>
      )}
    </div>
  );
}

function TaskDetailModal({
  task,
  onClose,
  deleteTaskAction,
}: {
  task: DashboardTask | null;
  onClose: () => void;
  deleteTaskAction: (taskId: string) => Promise<void>;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    if (!task) return;
    startDeleteTransition(async () => {
      await deleteTaskAction(task.id);
      router.refresh();
      onClose();
    });
  };
  const p = task ? (priorityConfig[task.priority] ?? priorityConfig.medium) : null;

  const statusLabel: Record<string, string> = {
    todo: "To Do",
    in_progress: "In Progress",
    review: "Review",
    done: "Done",
  };

  return (
    <AnimatePresence>
      {task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2 flex-wrap">
                  {p && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${p.classes}`}>
                      {p.label}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/40">
                    {statusLabel[task.status] ?? task.status}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                <h2 className="text-lg font-semibold text-white/95 leading-snug">{task.title}</h2>
                {task.description ? (
                  <p className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">{task.description}</p>
                ) : (
                  <p className="text-sm text-white/20 italic">No description.</p>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex items-center justify-between border-t border-white/[0.05] pt-4">
                {confirming ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/40">Delete this task?</span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    >
                      {isDeleting ? "Deleting..." : "Yes, delete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(false)}
                      className="px-3 py-1.5 rounded-lg text-white/40 text-xs hover:text-white/70 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/30 text-xs hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Delete task
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/60 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FilesView({
  files,
  workspaceId,
  saveFileMetaAction,
  deleteFileAction,
}: {
  files: DashboardFile[];
  workspaceId: string;
  saveFileMetaAction: (fileName: string, storagePath: string, mimeType: string, sizeBytes: number) => Promise<void>;
  deleteFileAction: (fileId: string) => Promise<void>;
}) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

  const getPublicUrl = (storagePath: string) =>
    `${supabaseUrl}/storage/v1/object/public/workspace-files/${storagePath}`;

  const uploadFile = async (file: File) => {
    if (!file) return;
    const allowed = ["image/", "application/pdf"];
    if (!allowed.some((t) => file.type.startsWith(t))) return;
    setIsUploading(true);
    try {
      const supabase = createClient();
      const storagePath = `${workspaceId}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const { error: uploadError } = await supabase.storage
        .from("workspace-files")
        .upload(storagePath, file);
      if (uploadError) throw uploadError;
      await saveFileMetaAction(file.name, storagePath, file.type, file.size);
      router.refresh();
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDeleteFile = async (file: DashboardFile) => {
    setDeletingId(file.id);
    try {
      const supabase = createClient();
      await supabase.storage.from("workspace-files").remove([file.storagePath]);
      await deleteFileAction(file.id);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div
      key="files-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col h-full gap-6"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="sr-only"
        onChange={handleInputChange}
      />

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all py-8
          ${isDraggingOver ? "border-teal-400/50 bg-teal-400/5" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]"}
          ${isUploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-teal-400/40 border-t-teal-400 rounded-full animate-spin" />
          ) : (
            <FileUp className="w-5 h-5 text-teal-400" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/60">
            {isUploading ? "Uploading..." : isDraggingOver ? "Drop to upload" : "Click or drag to upload"}
          </p>
          <p className="text-xs text-white/25 mt-1">Images and PDFs supported</p>
        </div>
      </div>

      {/* File grid */}
      {files.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FolderOpen className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <p className="text-sm text-white/25">No files yet. Upload something to get started.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pb-2">
          {files.map((file) => {
            const isImage = file.mimeType.startsWith("image/");
            const isPdf = file.mimeType === "application/pdf";
            const url = getPublicUrl(file.storagePath);
            const isBeingDeleted = deletingId === file.id;
            return (
              <div
                key={file.id}
                className={`group relative rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden transition-all hover:border-white/10 ${isBeingDeleted ? "opacity-40 pointer-events-none" : ""}`}
              >
                <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt={file.name}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-square flex flex-col items-center justify-center gap-2 bg-white/[0.02]">
                      <FileText className="w-10 h-10 text-red-400/60" />
                      <span className="text-[10px] font-mono text-white/30 uppercase">PDF</span>
                    </div>
                  )}
                </a>
                <div className="p-2">
                  <p className="text-xs text-white/60 truncate leading-tight">{file.name}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">{file.createdAt}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteFile(file)}
                  title="Delete file"
                  className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:border-red-500/30"
                >
                  <Trash2 className="w-3 h-3 text-white/60 hover:text-red-400" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function WhiteboardPlaceholder({ onReturnHome }: { onReturnHome: () => void }) {
  return (
    <motion.div
      key="placeholder-view"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
        <PenTool className="w-8 h-8 text-purple-400/50" />
      </div>
      <h3 className="text-2xl font-bold text-white/90 tracking-tight mb-4">Infinite Whiteboard</h3>
      <p className="text-white/40 max-w-md leading-relaxed mb-8">
        This core ecosystem tool is seamlessly integrated into the Astra canvas. It will run entirely
        edge-local with zero-latency synchronization.
      </p>
      <button
        onClick={onReturnHome}
        className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white/70 transition-colors"
      >
        Return Home
      </button>
    </motion.div>
  );
}

function ActiveContextPanel({
  data,
  isFlowMode,
  onStartFlow,
}: {
  data: DashboardData;
  isFlowMode: boolean;
  onStartFlow: () => void;
}) {
  const activeTask = data.tasks.find((task) => task.status === "in_progress") ?? data.tasks[0];
  const backlogTask = data.tasks.find((task) => task.status === "todo");

  return (
    <div className={`xl:col-span-1 rounded-3xl border border-white/[0.03] bg-gradient-to-bl from-white/[0.02] to-transparent p-6 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-opacity duration-300 ${isFlowMode ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Active Context</h3>
        <button className="text-white/30 hover:text-white/80 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {activeTask && (
          <motion.div
            layoutId="active-task-card"
            onClick={onStartFlow}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                In Progress
              </span>
              <Avatar initials={activeTask.assigneeInitials} />
            </div>
            <h4 className="text-sm font-semibold text-white/90 mb-1.5 group-hover:text-blue-400 transition-colors">
              {activeTask.title}
            </h4>
            <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
              {activeTask.description ?? "No description yet."}
            </p>

            <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-emerald-400 w-1/3 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
          </motion.div>
        )}

        {backlogTask ? (
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.04] shadow-lg transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono text-white/40 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                Backlog
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white/70 mb-1 group-hover:text-white/90 transition-colors">
              {backlogTask.title}
            </h4>
          </div>
        ) : (
          <div className="p-4 rounded-2xl border border-dashed border-white/[0.06] text-center">
            <p className="text-xs text-white/25">No tasks yet. Add one from the board.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateTaskModal({
  isOpen,
  onClose,
  createTaskAction,
}: {
  isOpen: boolean;
  onClose: () => void;
  createTaskAction: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createTaskAction(formData);
      router.refresh();
      onClose();
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <KanbanSquare className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <h2 className="text-sm font-semibold text-white/90">New Task</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Title *</label>
                  <input
                    name="title"
                    type="text"
                    required
                    autoFocus
                    placeholder="What needs to be done?"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Add more context..."
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/20 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Priority</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["low", "medium", "high"] as const).map((p) => (
                      <label key={p} className="relative cursor-pointer">
                        <input type="radio" name="priority" value={p} defaultChecked={p === "medium"} className="sr-only peer" />
                        <div className={`text-center py-2 rounded-xl border text-xs font-medium transition-all
                          peer-checked:bg-white/10 peer-checked:border-white/20 peer-checked:text-white
                          border-white/[0.05] bg-white/[0.02] text-white/40 hover:text-white/60 hover:border-white/10
                          ${p === "high" ? "peer-checked:border-red-500/30 peer-checked:bg-red-500/10 peer-checked:text-red-400" : ""}
                          ${p === "low" ? "peer-checked:border-blue-500/30 peer-checked:bg-blue-500/10 peer-checked:text-blue-400" : ""}
                          ${p === "medium" ? "peer-checked:border-amber-500/30 peer-checked:bg-amber-500/10 peer-checked:text-amber-400" : ""}
                        `}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
                  >
                    {isPending ? "Creating..." : "Create task"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
      <span className="text-[9px] font-medium text-indigo-300">{initials}</span>
    </div>
  );
}
