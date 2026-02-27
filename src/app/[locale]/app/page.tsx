"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Sparkles, Home, Layers, Users, Zap, Search, Settings, Plus, Command, FileText, CheckCircle2, MoreHorizontal, BrainCircuit, ArrowRight, Code2, Kanban, MessageSquare, Timer, Pause, Play, Volume2, Coffee, KanbanSquare, GitBranch, PenTool, LayoutDashboard, Clock } from "lucide-react";
import ArchitectureFlowchart from "../../../components/ArchitectureFlowchart";

export default function AppPage() {
  const tGlobal = useTranslations("global");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOmnibarOpen, setIsOmnibarOpen] = useState(false);
  const [isFlowMode, setIsFlowMode] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'chat' | 'kanban' | 'flowchart' | 'whiteboard'>('home');
  const [pomodoroState, setPomodoroState] = useState<'idle' | 'running' | 'paused'>('idle');

  useEffect(() => {
    // Artificial delay for the sleek loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOmnibarOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOmnibarOpen(false);
        setIsFlowMode(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* 
        =========================================================
        THE LOADING SEQUENCE (Z: 50)
        =========================================================
      */}
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
              {/* Core Glow */}
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
            
            {/* Minimal loading bar */}
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

      {/* 
        =========================================================
        ZONE C: THE AI OMNI-BAR (Z: 45)
        =========================================================
      */}
      <AnimatePresence>
        {isOmnibarOpen && !isLoading && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
              onClick={() => setIsOmnibarOpen(false)}
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
                  <div className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-white/40 border border-white/5">ESC</div>
                </div>
                <div className="p-2 bg-black/20">
                  <div className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-widest">Suggested</div>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <FileText className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90">Summarize Q3 Marketing Plan</p>
                        <p className="text-xs text-white/40">From #Marketing Strategy doc</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors text-left group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <Users className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90">Create a new task for John Doe</p>
                        <p className="text-xs text-white/40">Assign to #TeamWorkspace backlog</p>
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



      {/* 
        =========================================================
        FLOW MODE OVERLAY & ACTIVE CONTEXT (Z: 20)
        =========================================================
      */}
      <AnimatePresence>
        {isFlowMode && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-20 flex items-center justify-center pointer-events-auto bg-black/40"
          >
            {/* The giant focus task card */}
            <motion.div
              layoutId="active-task-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-[2rem] border border-white/[0.08] bg-black/60 backdrop-blur-3xl p-8 md:p-10 flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
            >
              {/* Intense Focus Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[120px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded shadow-[0_0_15px_rgba(52,211,153,0.15)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    In Progress
                  </span>
                  <span className="text-xs text-white/40 font-mono tracking-widest uppercase">Flow Session</span>
                </div>
                <button 
                  onClick={() => setIsFlowMode(false)}
                  className="px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/10 active:scale-95 text-xs font-medium text-white/50 hover:text-white transition-all cursor-pointer relative z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                >
                  Exit Focus (ESC)
                </button>
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight mb-4 text-center">Fix WebGL Context Leak</h1>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-2xl text-center mx-auto">
                The parallax ecosystem cards are leaving orphaned contexts on unmount in mobile Safari resulting in a crash. Need to hook into the useEffect cleanup phase and manually dump the Three.js renderer contexts.
              </p>

              {/* Pomodoro Engine */}
              <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Timer Circle */}
                <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="none" />
                    <motion.circle 
                      cx="128" cy="128" r="120" 
                      stroke="url(#pomodoro-gradient)" 
                      strokeWidth="4" fill="none" 
                      strokeDasharray="753.98" 
                      strokeDashoffset={pomodoroState === 'idle' ? "753.98" : "150"} 
                      strokeLinecap="round"
                      animate={{ strokeDashoffset: pomodoroState === 'idle' ? 753.98 : (pomodoroState === 'running' ? 0 : 150) }}
                      transition={{ duration: pomodoroState === 'running' ? 1500 : 1, ease: "linear" }}
                    />
                    <defs>
                      <linearGradient id="pomodoro-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center flex flex-col items-center">
                    <span className="text-6xl font-extrabold tracking-tighter text-white tabular-nums">25:00</span>
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest mt-2">Deep Work</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                  <button className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setPomodoroState(prev => prev === 'running' ? 'paused' : 'running')}
                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    {pomodoroState === 'running' ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
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

      {/* 
        =========================================================
        ZONE B: THE EXECUTION CANVAS (Z: 10)
        =========================================================
      */}
      <motion.main
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ 
          opacity: 1, 
          filter: "blur(0px)",
        }}
        transition={{ delay: 2.8, duration: 1 }}
        className={`
          relative min-h-screen pr-8 pt-8 pb-8 transition-all duration-700 ease-[0.16,1,0.3,1]
          ${isOmnibarOpen ? 'scale-[0.98] opacity-50' : ''}
          ${isFlowMode ? 'pl-8 scale-95 opacity-30 brightness-50' : 'pl-[100px]'}
        `}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col h-full space-y-8">
          
          {/* Top Bar inside Canvas */}
          <header className={`flex items-center justify-between w-full h-14 transition-opacity duration-300 ${isFlowMode ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white/90">
                  {activeView === 'home' ? 'Home Hub' : '#TeamWorkspace'}
                </h2>
                <p className="text-sm text-white/40 mt-0.5">
                  {activeView === 'home' ? 'Your personal ecosystem dashboard' : 'Central hub for team sync & execution'}
                </p>
              </div>
              
              {/* Ecosystem Toggle (Only show in Engineering) */}
              {activeView !== 'home' && (
                <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                  <button 
                    onClick={() => setActiveView('chat')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'chat' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </button>
                  <button 
                    onClick={() => setActiveView('kanban')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'kanban' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                  >
                    <Kanban className="w-4 h-4" />
                    Board
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsOmnibarOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-white/60" />
                <span className="text-white/60">Search OS...</span>
                <kbd className="ml-2 text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/50">⌘K</kbd>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </header>

          {/* The Grid Body */}
          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* The Main View: Home, Chat, OR Kanban */}
            <div className={`${activeView === 'flowchart' || activeView === 'whiteboard' ? 'xl:col-span-3' : 'xl:col-span-2'} rounded-3xl border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent p-6 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden transition-all duration-500`}>
              <AnimatePresence mode="wait">
                
                {/* 1. HOME HUB VIEW */}
                {activeView === 'home' && (
                  <motion.div 
                    key="home-view"
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col w-full h-full"
                  >
                    <div className="grid grid-cols-2 gap-4 h-full">
                      
                      {/* Tool Card: Kanban */}
                      <button 
                        onClick={() => setActiveView('kanban')}
                        className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/30 p-6 flex flex-col items-start text-left transition-all hover:bg-emerald-500/[0.02] shadow-lg"
                      >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
                          <KanbanSquare className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white/90 mb-2">Team Board</h3>
                        <p className="text-sm text-white/40 leading-relaxed max-w-[80%]">Manage tasks, sprints, and priorities for your core department.</p>
                        <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-mono text-emerald-400/60 uppercase tracking-widest">
                          3 Active Sprints <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>

                      {/* Tool Card: Flowchart */}
                      <button 
                        onClick={() => router.push('/app/flowchart')}
                        className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 p-6 flex flex-col items-start text-left transition-all hover:bg-blue-500/[0.02] shadow-lg"
                      >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-colors pointer-events-none" />
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6 group-hover:scale-110 transition-transform">
                          <GitBranch className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white/90 mb-2">Project Flowcharts</h3>
                        <p className="text-sm text-white/40 leading-relaxed max-w-[80%]">Visual flowcharts mirroring your logic, processes, and lifecycles.</p>
                        <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-mono text-blue-400/60 uppercase tracking-widest">
                          Open Q3 Plan <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>

                      {/* Tool Card: Whiteboard */}
                      <button 
                        onClick={() => router.push('/app/whiteboard')}
                        className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 p-6 flex flex-col items-start text-left transition-all hover:bg-purple-500/[0.02] shadow-lg"
                      >
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-colors pointer-events-none" />
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform">
                          <PenTool className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white/90 mb-2">Brainstorming</h3>
                        <p className="text-sm text-white/40 leading-relaxed max-w-[80%]">Freeform whiteboards for infinite canvas ideation and wireframing.</p>
                        <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-mono text-purple-400/60 uppercase tracking-widest">
                          Start Session <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>

                      {/* Tool Card: Chat */}
                      <button 
                        onClick={() => setActiveView('chat')}
                        className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 p-6 flex flex-col items-start text-left transition-all hover:bg-amber-500/[0.02] shadow-lg"
                      >
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full group-hover:bg-amber-500/20 transition-colors pointer-events-none" />
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white/90 mb-2">Team Chat</h3>
                        <p className="text-sm text-white/40 leading-relaxed max-w-[80%]">Real-time communication, PR tracking, and team announcements.</p>
                        <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-mono text-amber-400/60 uppercase tracking-widest">
                          2 Unread <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>

                    </div>
                  </motion.div>
                )}

                {/* 2. CHAT VIEW */}
                {activeView === 'chat' && (
                  <motion.div 
                    key="chat-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-end gap-6 h-full"
                  >
                    {/* Message 1 */}
                    <div className="relative group self-start max-w-[85%]">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                          <span className="text-xs font-medium text-indigo-300">JD</span>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-medium text-white/80">John Doe</span>
                            <span className="text-xs text-white/30">10:42 AM</span>
                          </div>
                          <div className="p-4 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-white/[0.1] transition-colors relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <p className="text-sm text-white/70 leading-relaxed">
                              Just pushed the initial routing architecture for the frontend MVP. It's looking really clean. 
                              We still need to resolve the WebGL context memory leak on scaling though. Should we track that?
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Task Creation Action */}
                      <div className="absolute top-8 -right-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <button className="w-8 h-8 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Event Marker */}
                    <div className="flex items-center justify-center gap-4 my-2 opacity-50">
                      <div className="h-px w-12 bg-white/10" />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Task Created from message</span>
                      <div className="h-px w-12 bg-white/10" />
                    </div>

                    {/* Message 2 */}
                    <div className="relative group self-start max-w-[85%]">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                          <span className="text-xs font-medium text-emerald-300">AS</span>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-medium text-white/80">Alice Smith</span>
                            <span className="text-xs text-white/30">11:05 AM</span>
                          </div>
                          <div className="p-4 rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-white/[0.1] transition-colors">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <p className="text-sm text-white/70 leading-relaxed">
                              Good catch! I've converted that into a task in the active context. I'll pick it up after I finish the Omni-Bar implementation. 🚀
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className={`mt-8 pt-4 transition-opacity duration-300 ${isFlowMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      <div className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-3 flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group hover:border-white/[0.15] transition-colors">
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                          <Plus className="w-4 h-4 text-white/60" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Message #TeamWorkspace or type '/' for commands..." 
                          className="flex-1 bg-transparent outline-none text-sm text-white/90 placeholder:text-white/30"
                        />
                        <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                          <Sparkles className="w-4 h-4 text-white/30 hover:text-white/80 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. KANBAN VIEW */}
                {activeView === 'kanban' && (
                  <motion.div 
                    key="kanban-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex-1 flex gap-6 h-full overflow-x-auto pb-4 custom-scrollbar"
                  >
                    {/* Column 1 */}
                    <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                      <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-semibold text-white/60 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-white/20" /> To Do <span className="text-white/30 ml-2 font-mono text-xs">3</span>
                        </h3>
                        <button className="text-white/30 hover:text-white/70"><Plus className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors group cursor-grab">
                         <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Design</span>
                         </div>
                         <h4 className="text-sm text-white/90 font-medium mb-2">Update Marketing Homepage Assets</h4>
                         <div className="flex items-center justify-between mt-4">
                           <div className="flex -space-x-2">
                             <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 z-10"><span className="text-[9px] font-medium text-pink-300">SJ</span></div>
                           </div>
                           <span className="text-xs text-white/30 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 2</span>
                         </div>
                      </div>

                      <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors group cursor-grab">
                         <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Backend</span>
                         </div>
                         <h4 className="text-sm text-white/90 font-medium mb-2">Optimize DB Query for User Fetch</h4>
                         <div className="flex items-center justify-between mt-4">
                           <div className="w-6 h-6 rounded-full border border-dashed border-white/30 flex items-center justify-center text-white/30">
                             <Plus className="w-3 h-3" />
                           </div>
                         </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                      <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-semibold text-emerald-400/80 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400/50" /> In Progress <span className="text-emerald-400/30 ml-2 font-mono text-xs">2</span>
                        </h3>
                        <button className="text-white/30 hover:text-white/70"><Plus className="w-4 h-4" /></button>
                      </div>

                      {/* Active Flow Task */}
                      <motion.div 
                        layoutId="active-task-card"
                        className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl shadow-[0_0_20px_rgba(52,211,153,0.05)] cursor-pointer group"
                        onClick={() => setIsFlowMode(true)}
                      >
                         <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded flex items-center gap-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse relative">
                               <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-50" />
                             </span>
                             Flow Active
                           </span>
                           <Zap className="w-3.5 h-3.5 text-amber-400" />
                         </div>
                         <h4 className="text-sm text-white/90 font-medium mb-1.5 group-hover:text-emerald-300 transition-colors">Fix WebGL Context Leak</h4>
                         <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">The parallax ecosystem cards are leaving orphaned contexts on unmount in mobile Safari...</p>
                         <div className="flex items-center justify-between mt-4">
                           <div className="relative">
                             <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 z-10 relative">
                               <span className="text-[9px] font-medium text-indigo-300">AS</span>
                             </div>
                             <div className="absolute -inset-1 rounded-full border border-amber-400/50 animate-[spin_4s_linear_infinite] pointer-events-none" />
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="text-[10px] font-mono text-emerald-400">12:45 / 25:00</span>
                           </div>
                         </div>
                      </motion.div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                      <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-semibold text-blue-400/80 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400/50" /> Review <span className="text-blue-400/30 ml-2 font-mono text-xs">1</span>
                        </h3>
                        <button className="text-white/30 hover:text-white/70"><Plus className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl hover:bg-white/[0.04] transition-colors group cursor-grab opacity-60">
                         <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Frontend</span>
                         </div>
                         <h4 className="text-sm text-white/90 font-medium mb-2 line-through decoration-white/30">Implement Zone A Sidebar</h4>
                         <div className="flex items-center justify-between mt-4">
                           <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"><span className="text-[9px] font-medium text-indigo-300">JD</span></div>
                           <CheckCircle2 className="w-4 h-4 text-blue-400" />
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. ARCHITECTURE FLOWCHART VIEW */}
                {activeView === 'flowchart' && (
                  <motion.div 
                    key="flowchart-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 w-full h-full relative"
                  >
                    <ArchitectureFlowchart onBack={() => setActiveView('home')} />
                  </motion.div>
                )}

                {/* 5. UNBUILT TOOL PLACEHOLDERS (Whiteboard) */}
                {activeView === 'whiteboard' && (
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
                    <h3 className="text-2xl font-bold text-white/90 tracking-tight mb-4">
                      Infinite Whiteboard
                    </h3>
                    <p className="text-white/40 max-w-md leading-relaxed mb-8">
                      This core ecosystem tool is seamlessly integrated into the Astra canvas. It will run entirely edge-local with zero-latency synchronization.
                    </p>
                    <button 
                      onClick={() => setActiveView('home')}
                      className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white/70 transition-colors"
                    >
                      Return Home
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The Context/Task Pool */}
            {activeView !== 'flowchart' && activeView !== 'whiteboard' && (
              <div className={`xl:col-span-1 rounded-3xl border border-white/[0.03] bg-gradient-to-bl from-white/[0.02] to-transparent p-6 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-opacity duration-300 ${isFlowMode ? 'opacity-0' : 'opacity-100'}`}>
                 {/* Ambient Glow */}
                 <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
               
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Active Context</h3>
                 <button className="text-white/30 hover:text-white/80 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
               </div>
               
               <div className="flex flex-col gap-4 relative z-10">
                 
                 {/* Task Card Example */}
                 <motion.div 
                    layoutId="active-task-card"
                    onClick={() => setIsFlowMode(true)}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] shadow-lg transition-all cursor-pointer group"
                 >
                   <div className="flex justify-between items-start mb-3">
                     <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(52,211,153,0.1)]">In Progress</span>
                     <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                       <span className="text-[9px] font-medium text-indigo-300">AS</span>
                     </div>
                   </div>
                   <h4 className="text-sm font-semibold text-white/90 mb-1.5 group-hover:text-blue-400 transition-colors">Fix WebGL Context Leak</h4>
                   <p className="text-xs text-white/50 leading-relaxed line-clamp-2">The parallax ecosystem cards are leaving orphaned contexts on unmount in mobile Safari resulting in a crash.</p>
                   
                   <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                     <div className="h-full bg-emerald-400 w-1/3 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                   </div>
                 </motion.div>

                 {/* Document Card Example */}
                 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.04] shadow-lg transition-all cursor-pointer group flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                     <FileText className="w-5 h-5 text-blue-400" />
                   </div>
                   <div>
                     <h4 className="text-sm font-semibold text-white/90 mb-1 group-hover:text-white transition-colors">Q3 Architecture Draft</h4>
                     <p className="text-[11px] text-white/40">Updated 2 hrs ago by J. Doe</p>
                   </div>
                 </div>

                 {/* Task Card Example 2 */}
                 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.04] shadow-lg transition-all cursor-pointer group">
                   <div className="flex justify-between items-start mb-3">
                     <span className="text-[10px] font-mono text-white/40 bg-white/5 border border-white/5 px-2 py-0.5 rounded">Backlog</span>
                   </div>
                   <h4 className="text-sm font-semibold text-white/70 mb-1 group-hover:text-white/90 transition-colors">Implement Omni-Bar AI Search</h4>
                 </div>

               </div>
              </div>
            )}

          </div>
        </div>
      </motion.main>
    </>
  );
}
