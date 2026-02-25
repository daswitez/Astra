"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, Home, Layers, Users, Zap, Search, Settings, Plus, Command, FileText, CheckCircle2, MoreHorizontal, BrainCircuit, ArrowRight } from "lucide-react";

export default function AppPage() {
  const tGlobal = useTranslations("global");
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isOmnibarOpen, setIsOmnibarOpen] = useState(false);

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
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden selection:bg-white/20">
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
                        <p className="text-xs text-white/40">Assign to #Engineering backlog</p>
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
        ZONE A: THE GLOBAL NAV (Z: 30)
        =========================================================
      */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
        className={`fixed top-4 bottom-4 left-4 z-30 flex flex-col items-center py-6 rounded-2xl transition-all duration-500 ease-in-out border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
        style={{
          width: isSidebarExpanded ? "260px" : "64px",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="flex-shrink-0 mb-10 w-full flex justify-center">
          <Sparkles className="w-5 h-5 text-white/90" />
        </div>

        <nav className="flex-1 w-full flex flex-col gap-2 px-3">
          <NavItem icon={<Home className="w-4 h-4" />} label="Home" isExpanded={isSidebarExpanded} />
          <NavItem icon={<Layers className="w-4 h-4" />} label="Organization" isExpanded={isSidebarExpanded} />
          <NavItem icon={<Users className="w-4 h-4" />} label="Engineering" isExpanded={isSidebarExpanded} active />
          
          <div className="w-full h-px bg-white/5 my-4" />
          
          <NavItem icon={<Zap className="w-4 h-4 text-amber-400" />} label="Flow Mode" isExpanded={isSidebarExpanded} />
        </nav>

        <div className="mt-auto w-full px-3">
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" isExpanded={isSidebarExpanded} />
        </div>
      </motion.aside>

      {/* 
        =========================================================
        ZONE B: THE EXECUTION CANVAS (Z: 10)
        =========================================================
      */}
      <motion.main
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 2.8, duration: 1 }}
        className={`relative min-h-screen pl-[100px] pr-8 pt-8 pb-8 transition-all duration-500 ${isOmnibarOpen ? 'scale-[0.98] opacity-50' : ''}`}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col h-full space-y-8">
          
          {/* Top Bar inside Canvas */}
          <header className="flex items-center justify-between w-full h-14">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white/90">#Engineering</h2>
              <p className="text-sm text-white/40 mt-0.5">Global team sync & execution</p>
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
            
            {/* The Conversation Stream */}
            <div className="xl:col-span-2 rounded-3xl border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent p-6 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex-1 flex flex-col justify-end gap-6 overflow-hidden relative">
                
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

              </div>
              
              {/* Input Area */}
              <div className="mt-8 pt-4">
                <div className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-3 flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group hover:border-white/[0.15] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                    <Plus className="w-4 h-4 text-white/60" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Message #Engineering or type '/' for commands..." 
                    className="flex-1 bg-transparent outline-none text-sm text-white/90 placeholder:text-white/30"
                  />
                  <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                    <Sparkles className="w-4 h-4 text-white/30 hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* The Context/Task Pool */}
            <div className="xl:col-span-1 rounded-3xl border border-white/[0.03] bg-gradient-to-bl from-white/[0.02] to-transparent p-6 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
               {/* Ambient Glow */}
               <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
               
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Active Context</h3>
                 <button className="text-white/30 hover:text-white/80 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
               </div>
               
               <div className="flex flex-col gap-4 relative z-10">
                 
                 {/* Task Card Example */}
                 <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05] shadow-lg transition-all cursor-pointer group">
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
                 </div>

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

          </div>
        </div>
      </motion.main>
    </div>
  );
}

// Sub-component for nav items
function NavItem({ icon, label, isExpanded, active = false }: { icon: React.ReactNode; label: string; isExpanded: boolean; active?: boolean }) {
  return (
    <button 
      className={`
        w-full h-10 rounded-xl flex items-center gap-3 px-3 transition-all duration-300 relative group overflow-hidden
        ${active ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'text-white/50 hover:bg-white/[0.05] hover:text-white/90'}
      `}
    >
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
        />
      )}
      <div className="shrink-0 flex items-center justify-center w-5">
        {icon}
      </div>
      <span 
        className={`whitespace-nowrap text-sm font-medium transition-all duration-300 
          ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none w-0'}`}
      >
        {label}
      </span>
    </button>
  );
}
