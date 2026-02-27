"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe } from 'lucide-react';
import GlobalNav from '../../../../components/GlobalNav';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';

// Excalidraw must be dynamically imported without SSR because it relies on window
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] text-white/40">
        <div className="animate-pulse flex items-center gap-3">
          <Globe className="w-5 h-5 animate-spin" />
          <span>Loading Spatial Canvas...</span>
        </div>
      </div>
    ),
  }
);

// Custom CSS to enforce Astra's "The Void" Aesthetic on Excalidraw
const customWhiteboardCSS = `
  /* Override Excalidraw base variables for The Void */
  .excalidraw {
    --color-bg-1: #050505 !important;
    --color-bg-2: rgba(25, 25, 25, 0.4) !important;
    --color-surface: rgba(10, 10, 10, 0.6) !important;
    --color-gray-100: rgba(255,255,255,0.9) !important;
    background-color: #050505 !important;
  }
  
  /* Apply glassmorphism to floating panels */
  .excalidraw .layer-ui__wrapper .FixedSideContainer {
    pointer-events: none;
  }
  
  .excalidraw .layer-ui__wrapper .FixedSideContainer > * {
    pointer-events: auto;
    backdrop-filter: blur(24px) !important;
    -webkit-backdrop-filter: blur(24px) !important;
    background-color: rgba(10, 10, 10, 0.6) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
  }
  
  /* Hide Excalidraw extra UI that conflicts with Astra OS */
  .excalidraw .layer-ui__wrapper .welcome-screen {
    display: none !important;
  }
  
  /* Hide unneeded Excalidraw menus for a minimalist Void UI */
  .excalidraw .layer-ui__wrapper .App-menu_top__left,   /* Hamburger */
  .excalidraw .layer-ui__wrapper .App-menu_top__right,  /* Library */
  .excalidraw .layer-ui__wrapper .App-menu_bottom__right /* Help */ {
    opacity: 0 !important;
    pointer-events: none !important;
    visibility: hidden !important;
    display: none !important;
  }
  
  /* Make the central toolbar look like Zen mode (transparent background) but keep tooltips/shortcuts */
  .excalidraw .App-toolbar {
    background: transparent !important;
    box-shadow: none !important;
  }
  
  .excalidraw .App-toolbar-content {
    background-color: rgba(10, 10, 10, 0.4) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
  }
`;

export default function WhiteboardPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen bg-[#050505] overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: customWhiteboardCSS }} />
      <GlobalNav />
      
      <main className="flex-1 relative w-full h-full">
        {/* Astra Header Overlay - Relocated to Bottom Right */}
        <div className="absolute bottom-6 right-8 z-50 flex items-center gap-4 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/[0.05] p-2 pl-6 rounded-2xl pointer-events-auto">
          <div className="text-right">
            <h3 className="text-sm font-semibold text-white/90">Infinite Brainstorming Canvas</h3>
            <p className="text-[11px] text-white/40">Freehand drafting & ideation synced from #Design</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Globe className="w-5 h-5 text-purple-400" />
          </div>
          
          <div className="h-8 w-px bg-white/10" />
          <button 
            onClick={() => router.push('/app')}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* The Excalidraw Engine */}
        <div className="absolute inset-y-0 right-0 left-[80px] z-0 bg-[#050505]" style={{ height: "100%" }}>
            <Excalidraw 
              theme="dark" 
              gridModeEnabled={false}
              UIOptions={{
                canvasActions: {
                  loadScene: false,
                  export: false,
                  saveAsImage: false
                }
              }}
            />
        </div>
      </main>
    </div>
  );
}
