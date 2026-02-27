"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { Sparkles, Home, Layers, Users, Zap, Settings } from "lucide-react";

export default function GlobalNav() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const pathname = usePathname();

  // Helper to determine if a route is active
  const isActive = (path: string) => {
    if (path === '/app' && pathname === '/app') return true;
    if (path !== '/app' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className={`fixed top-4 bottom-4 left-4 z-[100] flex flex-col items-center py-6 rounded-2xl transition-all duration-500 ease-in-out border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
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
        <NavItem 
          href="/app"
          icon={<Home className="w-4 h-4" />} 
          label="Home" 
          isExpanded={isSidebarExpanded} 
          active={isActive('/app')}
        />

        <NavItem 
          href="/app"
          icon={<Users className="w-4 h-4" />} 
          label="Team Workspace" 
          isExpanded={isSidebarExpanded} 
          active={false} // Will act as a link back to app for MVP
        />
        
        <div className="w-full h-px bg-white/5 my-4" />
        
        <button 
          className={`
            w-full h-10 rounded-xl flex items-center gap-3 px-3 transition-all duration-300 relative group overflow-hidden
            text-white/50 hover:bg-white/[0.05] hover:text-white/90
          `}
        >
          <div className="shrink-0 flex items-center justify-center w-5">
            <Zap className="w-4 h-4 text-amber-400/70 group-hover:text-amber-400" />
          </div>
          <span 
            className={`whitespace-nowrap text-sm font-medium transition-all duration-300 
              ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none w-0'}`}
          >
            Enter Flow Mode
          </span>
        </button>
      </nav>

      <div className="mt-auto w-full px-3">
        <NavItem 
          href="#"
          icon={<Settings className="w-4 h-4" />} 
          label="Settings" 
          isExpanded={isSidebarExpanded} 
          active={false}
        />
      </div>
    </motion.aside>
  );
}

// Sub-component for nav items using Next.js Link
function NavItem({ 
  icon, 
  label, 
  isExpanded, 
  active = false,
  href
}: { 
  icon: React.ReactNode; 
  label: string; 
  isExpanded: boolean; 
  active?: boolean;
  href: string;
}) {
  return (
    <Link 
      href={href}
      className={`
        w-full h-10 rounded-xl flex items-center gap-3 px-3 transition-all duration-300 relative group overflow-hidden
        ${active ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'text-white/50 hover:bg-white/[0.05] hover:text-white/90'}
      `}
    >
      {active && (
        <motion.div 
          layoutId="global-nav-indicator"
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
    </Link>
  );
}
