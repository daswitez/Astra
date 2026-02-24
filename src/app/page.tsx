"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  LayoutTemplate,
  Zap,
  Bot,
  Shield,
  BarChart3,
  Users,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon,
  Globe,
  Blocks,
  Eye,
  BrainCircuit,
  TriangleAlert,
  Frown,
  Activity,
  Github,
  Trello,
  Slack,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [flowModeActive, setFlowModeActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const singularityRef = useRef<HTMLDivElement>(null);

  // Toggle theme
  const toggleTheme = () => {
    document.documentElement.classList.add("theme-transition");
    setIsDark(!isDark);
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 500);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-headline", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".hero-badge", {
        y: 15,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.from(mockupRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.6,
        delay: 0.5,
        ease: "power4.out",
      });

      // ScrollTrigger for each section
      gsap.utils.toArray<HTMLElement>(".scroll-fade-up").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger-card").forEach((el, i) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el.parentElement, start: "top 80%" },
        });
      });

      // Chaos Web & Singularity ScrollTrigger Narrative (5 Steps)
      if (chaosRef.current && singularityRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chaosRef.current,
            start: "top top",
            end: "+=6000", // Extended scroll for 5-step story
            scrub: 1,
            pin: true,
          }
        });

        // STEP 1: The Problem (Chaos)
        tl.to(".chaos-node", {
          x: "random(-30, 30)",
          y: "random(-30, 30)",
          rotation: "random(-20, 20)",
          duration: 2,
          ease: "none"
        }, 0);
        
        tl.to(".chaos-thread", {
          stroke: "#ef4444",
          strokeWidth: 4,
          opacity: 1,
          duration: 2
        }, 0);
        
        tl.fromTo(".narrative-step-1", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 }, 0.5);

        // STEP 2: The Breaking Point (Disconnection)
        tl.to(".narrative-step-1", { opacity: 0, x: 50, duration: 1 }, 3);
        tl.fromTo(".narrative-step-2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 }, 3.5);
        
        tl.to(".chaos-thread", {
          opacity: 0,
          scale: 1.5,
          duration: 0.5,
          ease: "power2.out"
        }, 3.5);

        tl.to(".chaos-node", {
          x: "random(-200, 200)",
          y: "random(-200, 200)",
          scale: 0.5,
          opacity: 0.3,
          duration: 2,
          ease: "power3.out"
        }, 3.5);

        // STEP 3: The Gravity (Astra Pulls)
        tl.to(".narrative-step-2", { opacity: 0, x: 50, duration: 1 }, 6.5);
        tl.fromTo(".narrative-step-3", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 }, 7);
        
        // Spawn the Astra gravity core
        tl.fromTo(".astra-core", {
          scale: 0,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.5)"
        }, 7);

        // Nodes get pulled toward the center
        tl.to(".chaos-node", {
          x: 0,
          y: 0,
          scale: 0, // Gets sucked into the core
          opacity: 0,
          duration: 2,
          ease: "power4.in"
        }, 7.5);

        // STEP 4: The System (Native Integration)
        tl.to(".narrative-step-3", { opacity: 0, y: -20, duration: 1 }, 10);
        tl.fromTo(".narrative-step-4", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, 10.5);

        // Core expands slightly and projects native nodes
        tl.to(".astra-core", {
          scale: 1.5,
          boxShadow: "0 0 150px rgba(109,40,217,0.8)",
          duration: 1,
          ease: "power2.out"
        }, 10.5);

        // Native nodes shoot out and orbit
        tl.fromTo(".native-node", {
          scale: 0,
          opacity: 0,
          x: 0,
          y: 0
        }, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(1.5)"
        }, 11);

        // Position nodes in a circle
        tl.to(".native-node-1", { x: -120, y: -120, duration: 1 }, 11);
        tl.to(".native-node-2", { x: 120, y: -120, duration: 1 }, 11);
        tl.to(".native-node-3", { x: -120, y: 120, duration: 1 }, 11);
        tl.to(".native-node-4", { x: 120, y: 120, duration: 1 }, 11);

        // Slowly rotate native nodes container
        tl.to(".native-node-container", {
          rotation: 90,
          duration: 3,
          ease: "none"
        }, 11.5);

        // STEP 5: The Singularity
        tl.to(".narrative-step-4", { opacity: 0, y: -20, duration: 1 }, 14.5);
        tl.to(".native-node, .astra-core", { scale: 0, opacity: 0, duration: 0.5 }, 15);
        
        tl.fromTo(singularityRef.current, {
          scale: 0.5,
          opacity: 0,
          rotationY: 45
        }, {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 2,
          ease: "power4.out"
        }, 15.5);
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 3D Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(mockupRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      ease: "power2.out",
      duration: 0.6,
    });
  };
  const handleMouseLeave = () => {
    if (!mockupRef.current) return;
    gsap.to(mockupRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "elastic.out(1, 0.4)",
      duration: 1.2,
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* ========== NAVBAR ========== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          backgroundColor: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
            }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Astra</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          <a href="#features" className="hover:opacity-100 opacity-70 transition-opacity">Features</a>
          <a href="#how-it-works" className="hover:opacity-100 opacity-70 transition-opacity">How It Works</a>
          <a href="#pricing" className="hover:opacity-100 opacity-70 transition-opacity">Pricing</a>
          <a href="#faq" className="hover:opacity-100 opacity-70 transition-opacity">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "var(--color-surface-elevated)",
              border: "1px solid var(--color-border)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity hidden sm:block"
          >
            Sign In
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6d28d9, #3b82f6)" }}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              backgroundColor: "var(--color-surface-elevated)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
            Introducing the Spatial Productivity OS
          </div>

          <h1 className="hero-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8">
            One workspace.<br />
            <span className="text-gradient">Zero context switching.</span>
          </h1>

          <p
            className="hero-sub text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Astra unifies your team&apos;s chat, documents, tasks, and AI intelligence into a single
            spatial interface. Built for engineering teams who refuse to lose 40% of their day
            switching between apps.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              className="px-8 py-4 rounded-full text-white font-semibold text-base flex items-center gap-2 hover:scale-105 transition-transform"
              style={{
                background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
                boxShadow: "0 8px 30px rgba(109, 40, 217, 0.3)",
              }}
            >
              Start Your Workspace — Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="px-8 py-4 rounded-full font-medium text-base flex items-center gap-2 transition-colors"
              style={{
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-text-secondary)",
              }}
            >
              Watch 2-min Demo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className="hero-cta mt-12 flex items-center justify-center gap-6 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> 5 users free forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> SOC 2 compliant
            </span>
          </div>
        </div>

        {/* App Mockup */}
        <div
          className="max-w-6xl mx-auto mt-20"
          style={{ perspective: "2000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={mockupRef}
            className="glass-omni rounded-2xl overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Mockup Top Bar */}
            <div
              className="flex items-center justify-between px-5 h-12"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-border-strong)" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-border-strong)" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-border-strong)" }} />
              </div>
              <div
                className="w-72 h-7 rounded-full flex items-center justify-center text-xs"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-muted)",
                }}
              >
                Ask Astra AI… ⌘K
              </div>
              <div className="w-20" />
            </div>

            {/* Body */}
            <div className="flex" style={{ minHeight: "360px" }}>
              {/* Sidebar */}
              <div
                className="w-56 p-5 space-y-3 hidden md:flex flex-col"
                style={{ borderRight: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Engineering
                </div>
                <div
                  className="glass-active rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-2"
                >
                  <LayoutTemplate className="w-3.5 h-3.5" /> # Storage
                </div>
                <div
                  className="px-3 py-2 text-xs font-medium flex items-center gap-2 rounded-lg"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> # Chat
                </div>
                <div
                  className="px-3 py-2 text-xs font-medium flex items-center gap-2 rounded-lg"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <BarChart3 className="w-3.5 h-3.5" /> # Metrics
                </div>
              </div>

              {/* Main Area - Kanban */}
              <div className="flex-1 p-8 grid grid-cols-3 gap-5">
                {["To Do", "In Progress", "Done"].map((label, colIdx) => (
                  <div key={label} className="flex flex-col gap-3">
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {label}
                    </div>
                    {[0, 1].map((cardIdx) => (
                      <div
                        key={cardIdx}
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: "var(--color-surface-elevated)",
                          border: "1px solid var(--color-border)",
                          boxShadow: "var(--edge-shadow)",
                          height: cardIdx === 0 ? "80px" : "100px",
                        }}
                      >
                        <div
                          className="w-3/4 h-3 rounded"
                          style={{ backgroundColor: "var(--color-border-strong)" }}
                        />
                        <div
                          className="w-1/2 h-2 rounded mt-2"
                          style={{ backgroundColor: "var(--color-border)" }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF BAR ========== */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="scroll-fade-up text-sm font-medium uppercase tracking-widest mb-10"
            style={{ color: "var(--color-text-muted)" }}
          >
            Built for teams who ship fast
          </p>
          <div className="scroll-fade-up flex flex-wrap items-center justify-center gap-12">
            {["YCombinator", "TechStars", "Stripe", "Vercel", "Linear"].map((name) => (
              <span
                key={name}
                className="text-2xl font-bold tracking-tight opacity-20"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NARRATIVE: THE PROBLEM & SOLUTION ========== */}
      <section
        ref={chaosRef}
        className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        {/* Storytelling Static UI Layers */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center px-12 md:px-24">
          {/* Step 1 Text */}
          <div className="narrative-step-1 absolute max-w-xl left-12 md:left-24 opacity-0 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold w-fit">
              <TriangleAlert className="w-4 h-4" /> The Real Bottleneck
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              The <span className="text-rose-500">Chaos</span> of Fragmented Work.
            </h2>
            <p className="text-xl md:text-2xl font-medium" style={{ color: "var(--color-text-secondary)" }}>
              Slack for chat. Jira for tasks. Docs scattered in the wind. Engineers don't code, they search for context across 10 different tabs.
            </p>
          </div>

          {/* Step 2 Text */}
          <div className="narrative-step-2 absolute max-w-xl right-12 md:right-24 opacity-0 text-right flex flex-col items-end gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold w-fit">
               The Cost of Context Switching
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              The Breaking <span className="text-yellow-500">Point.</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium ml-auto" style={{ color: "var(--color-text-secondary)" }}>
              Every time you jump tools, it takes 23 minutes to refocus. Connections snap. Context is lost. High-performing teams are dragged down by their own infrastructure.
            </p>
          </div>

          {/* Step 3 Text */}
          <div className="narrative-step-3 absolute max-w-lg left-12 md:left-24 opacity-0 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold w-fit">
               <Sparkles className="w-4 h-4" /> The Paradigm Shift
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              A New <span className="text-gradient">Gravity.</span>
            </h2>
            <p className="text-lg md:text-xl font-medium" style={{ color: "var(--color-text-secondary)" }}>
              What if you didn't have to connect tools anymore? What if the workspace itself was the tool? Astra acts as a gravitational center for your workflow.
            </p>
          </div>

          {/* Step 4 Text */}
          <div className="narrative-step-4 absolute max-w-lg right-12 md:right-24 opacity-0 text-right flex flex-col items-end gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold w-fit">
               <Blocks className="w-4 h-4" /> Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              A Native <span className="text-blue-500">Ecosystem.</span>
            </h2>
            <p className="text-lg md:text-xl font-medium ml-auto" style={{ color: "var(--color-text-secondary)" }}>
              Zero plugins. Zero integrations. Chat, Kanban, Storage, and Metrics are built natively into the same engine. They speak the same language instantly.
            </p>
          </div>
        </div>

        {/* Abstract 3D/Nodes representing chaos */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <svg className="absolute w-full h-full opacity-30 chaos-thread transition-all duration-300">
            <path d="M 300,300 Q 600,400 900,300 T 1500,400" stroke="var(--color-border-strong)" strokeWidth="2" fill="none" />
            <path d="M 400,700 Q 700,500 1100,600 T 1700,500" stroke="var(--color-border-strong)" strokeWidth="2" fill="none" />
            <path d="M 200,500 Q 600,200 1000,400 T 1600,700" stroke="var(--color-border-strong)" strokeWidth="2" fill="none" />
          </svg>
          
          <div className="chaos-node absolute top-[25%] left-[20%] w-24 h-24 rounded-2xl glass-active flex items-center justify-center shadow-2xl">
            <Slack className="w-10 h-10 text-rose-400" />
          </div>
          <div className="chaos-node absolute top-[65%] left-[30%] w-20 h-20 rounded-2xl glass-active flex items-center justify-center shadow-xl">
            <Github className="w-8 h-8 text-neutral-400" />
          </div>
          <div className="chaos-node absolute top-[35%] right-[25%] w-28 h-28 rounded-2xl glass-active flex items-center justify-center shadow-red-500/20 shadow-2xl">
            <Trello className="w-12 h-12 text-blue-400" />
          </div>
          <div className="chaos-node absolute top-[60%] right-[35%] w-20 h-20 rounded-2xl glass-active flex items-center justify-center shadow-lg">
            <TriangleAlert className="w-8 h-8 text-yellow-500" />
          </div>

          <div className="native-node-container absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Native Nodes - Spawn centrally and move outward in step 4 */}
            <div className="native-node native-node-1 absolute w-16 h-16 rounded-2xl glass-active flex items-center justify-center shadow-lg border-blue-500/30 border opacity-0">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div className="native-node native-node-2 absolute w-16 h-16 rounded-2xl glass-active flex items-center justify-center shadow-lg border-purple-500/30 border opacity-0">
              <Blocks className="w-6 h-6 text-purple-400" />
            </div>
            <div className="native-node native-node-3 absolute w-16 h-16 rounded-2xl glass-active flex items-center justify-center shadow-lg border-emerald-500/30 border opacity-0">
              <LayoutTemplate className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="native-node native-node-4 absolute w-16 h-16 rounded-2xl glass-active flex items-center justify-center shadow-lg border-cyan-500/30 border opacity-0">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          {/* The Gravity Core (Astra Logo pulling things in Step 3/4) */}
          <div className="astra-core absolute w-32 h-32 rounded-full flex items-center justify-center z-10 opacity-0 shadow-[0_0_100px_rgba(109,40,217,0.5)]" style={{ background: "linear-gradient(135deg, #6d28d9, #3b82f6)" }}>
             <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* The Singularity (Solution) */}
        <div
          ref={singularityRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
          style={{
            opacity: 0,
            scale: 0,
            backgroundColor: "var(--color-bg)",
            backgroundImage: "radial-gradient(circle at center, rgba(180, 159, 112, 0.05) 0%, transparent 70%)"
          }}
        >
          <div className="glass-omni rounded-3xl p-12 max-w-4xl w-full text-center relative overflow-hidden backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center shadow-2xl" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-accent-light)" }}>
                <Sparkles className="w-8 h-8" style={{ color: "var(--color-accent)" }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Astra brings it all home.
              </h2>
              <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8" style={{ color: "var(--color-text-secondary)" }}>
                Native context. Zero latency. Complete clarity.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Unified Search</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Single UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">
              Four pillars. One OS.
            </h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Everything your team needs, without the fragmentation tax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Native Departmental Channels",
                desc: "Your chat is your workspace. Every department gets dedicated channels — #General, #Chat, #Storage, #Metrics — all inside Astra. No more Slack tabs. Messages are living documents that convert into tasks with one click.",
                color: "#3b82f6",
              },
              {
                icon: Zap,
                title: "Zero-Latency Text-to-Task",
                desc: "Highlight any message or document block and morph it into a tracked execution card instantly. The task keeps a living link back to the original conversation. Context is never lost.",
                color: "#8b5cf6",
              },
              {
                icon: Eye,
                title: "Invisible Telemetry (DORA + SPACE)",
                desc: "Automated engineering metrics that never ask your team to fill out forms. Deployment frequency, lead time, change failure rate — all captured passively from your GitHub integration.",
                color: "#06b6d4",
              },
              {
                icon: BrainCircuit,
                title: "Cross-Departmental AI Agent",
                desc: "Press ⌘K and ask anything. Astra's AI reads across every department's Storage and Chat channels to generate instant, contextual summaries. No more asking 'where is that document?'",
                color: "#6d28d9",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="stagger-card glass-panel rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">How Astra Works</h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              From onboarding to deep flow in under 5 minutes.
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Create Your Organization",
                desc: "Set up your org in seconds. Invite your team through SSO or magic links. Astra automatically creates your department workspace with all five native channels: #General, #Chat, #Information, #Storage, and #Notifications.",
                icon: Globe,
              },
              {
                step: "02",
                title: "Connect Your Tools",
                desc: "Link your GitHub repositories with a single OAuth flow. Astra begins passively collecting deployment events, PR metadata, and CI/CD signals — building your telemetry dashboard without any manual configuration.",
                icon: Blocks,
              },
              {
                step: "03",
                title: "Work in Context",
                desc: "Chat with your team, create documents, and track tasks — all from the same interface. Convert messages into tasks with one click. Every artifact maintains a living bidirectional link to its origin.",
                icon: Zap,
              },
              {
                step: "04",
                title: "Enter Flow Mode",
                desc: "When it's time for deep work, activate Flow Mode. The interface physically transforms: sidebars recede, notifications silence, and your task takes center stage. Your brain gets the uninterrupted focus it needs.",
                icon: Shield,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="scroll-fade-up flex items-start gap-8">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
                  style={{
                    backgroundColor: "var(--color-surface-elevated)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-accent)",
                  }}
                >
                  {step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
                    {title}
                  </h3>
                  <p className="leading-relaxed max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FLOW MODE INTERACTIVE STORY ========== */}
      <section className="py-32 px-6 transition-colors duration-700 relative overflow-hidden" style={{ backgroundColor: flowModeActive ? "#000000" : "var(--color-bg)" }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="scroll-fade-up text-4xl md:text-5xl font-bold leading-tight" style={{ color: flowModeActive ? "#ffffff" : "var(--color-text)" }}>
                Silence the noise.<br />
                <span className={flowModeActive ? "text-white" : "text-gradient"}>Protect your focus.</span>
              </h2>
              <p className="scroll-fade-up text-lg leading-relaxed transition-colors duration-700" style={{ color: flowModeActive ? "#A1A1AA" : "var(--color-text-secondary)" }}>
                Developers need 23 minutes to recover from a single interruption.
                Astra fixes this at the interface level. Click below to experience Flow Mode.
              </p>

              <button
                onClick={() => setFlowModeActive(!flowModeActive)}
                className="scroll-fade-up px-8 py-4 rounded-full font-bold transition-all duration-500 hover:scale-105"
                style={{
                  backgroundColor: flowModeActive ? "var(--color-surface)" : "var(--color-accent)",
                  color: flowModeActive ? "var(--color-text)" : "#ffffff",
                  boxShadow: flowModeActive ? "none" : "0 10px 30px rgba(180, 159, 112, 0.4)",
                  border: flowModeActive ? "1px solid var(--color-border)" : "none"
                }}
              >
                {flowModeActive ? "Exit Flow Mode" : "Simulate Flow Mode"}
              </button>
            </div>

            <div className="flex-1 relative w-full aspect-[4/3]">
              <div
                className="absolute inset-0 rounded-2xl p-8 overflow-hidden transition-all duration-700"
                style={{
                  backgroundColor: flowModeActive ? "rgba(255,255,255,0.02)" : "var(--color-surface-omni)",
                  border: flowModeActive ? "1px solid rgba(255,255,255,0.05)" : "1px solid var(--color-border)",
                  boxShadow: flowModeActive ? "0 0 100px rgba(180, 159, 112, 0.1)" : "none"
                }}
              >
                {/* Dummy Notifications (The Noise) */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: flowModeActive ? 0 : 1,
                    y: flowModeActive ? -50 : 0,
                    scale: flowModeActive ? 0.9 : 1,
                    filter: flowModeActive ? "blur(10px)" : "blur(0px)"
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute top-6 right-6 space-y-3 pointer-events-none"
                >
                  <div className="glass-active rounded-lg p-3 w-64 shadow-lg flex items-start gap-3 border border-red-500/20">
                    <Slack className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-red-400">@here URGENT: Server down</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>From #devops-alerts</p>
                    </div>
                  </div>
                  <div className="glass-active rounded-lg p-3 w-64 shadow-lg flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--color-text)" }}>Can you review my PR?</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>From Sarah in #frontend</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: flowModeActive ? 0 : 1,
                    x: flowModeActive ? -50 : 0,
                    scale: flowModeActive ? 0.9 : 1,
                    filter: flowModeActive ? "blur(10px)" : "blur(0px)"
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
                  className="absolute bottom-10 left-6 pointer-events-none"
                >
                  <div className="glass-active rounded-lg p-3 w-56 shadow-lg flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--color-text)" }}>Meeting in 5 min</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Sprint Planning</p>
                    </div>
                  </div>
                </motion.div>

                {/* The Focused Task */}
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 70, damping: 15 }}
                  className="absolute p-6 rounded-xl"
                  style={{
                    top: flowModeActive ? "50%" : "30%",
                    left: flowModeActive ? "50%" : "30%",
                    x: "-50%",
                    y: "-50%",
                    scale: flowModeActive ? 1.2 : 1,
                    backgroundColor: flowModeActive ? "#18181B" : "var(--color-bg)",
                    border: flowModeActive ? "1px solid rgba(180, 159, 112, 0.3)" : "1px solid var(--color-border)",
                    boxShadow: flowModeActive ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(180, 159, 112, 0.1)" : "var(--edge-shadow)",
                    width: "280px"
                  }}
                >
                  <div className="w-16 h-2 rounded-full mb-4" style={{ backgroundColor: "var(--color-accent)", opacity: flowModeActive ? 1 : 0.3 }} />
                  <h4 className="text-lg font-bold mb-2 transition-colors" style={{ color: flowModeActive ? "#fff" : "var(--color-text)" }}>Refactor Authentication</h4>
                  <p className="text-xs leading-relaxed transition-colors" style={{ color: flowModeActive ? "#A1A1AA" : "var(--color-text-muted)" }}>
                    Migrate session tokens to JWT-based auth across all microservices carefully.
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: flowModeActive ? 1 : 0 }}
                    className="mt-6 flex items-center justify-between pointer-events-none"
                  >
                    <div className="text-[10px] font-mono text-emerald-400/70 border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 rounded">
                      BLOCKING ALL NOTIFICATIONS
                    </div>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="pricing" className="py-24 px-6" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="scroll-fade-up text-lg mb-16" style={{ color: "var(--color-text-secondary)" }}>
            Start free. Scale when you&apos;re ready. AI credits included.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <div className="stagger-card glass-panel rounded-2xl p-8 text-left">
              <h3 className="text-xl font-bold mb-1">Learner</h3>
              <div className="text-4xl font-extrabold mb-1">$0</div>
              <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>Free forever for small squads.</p>
              <button className="w-full py-3 rounded-full text-sm font-semibold transition-colors" style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-text)" }}>
                Start Free
              </button>
              <ul className="mt-8 space-y-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Up to 5 users</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> All 5 native channels</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> 100 AI queries/mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Basic task management</li>
              </ul>
            </div>

            {/* Pro */}
            <div
              className="stagger-card rounded-2xl p-8 text-left relative md:-translate-y-4"
              style={{
                background: "linear-gradient(135deg, rgba(109,40,217,0.05), rgba(59,130,246,0.05))",
                border: "2px solid var(--color-accent)",
                boxShadow: "0 20px 60px rgba(109, 40, 217, 0.12)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold text-white tracking-widest uppercase" style={{ background: "linear-gradient(135deg, #6d28d9, #3b82f6)" }}>
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-1">Organization Pro</h3>
              <div className="text-4xl font-extrabold mb-1">$12<span className="text-lg font-normal" style={{ color: "var(--color-text-muted)" }}>/seat/mo</span></div>
              <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>For scaling agile teams.</p>
              <button className="w-full py-3 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #6d28d9, #3b82f6)" }}>
                Start 14-Day Trial
              </button>
              <ul className="mt-8 space-y-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Unlimited users</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Unlimited channels &amp; storage</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> DORA &amp; SPACE telemetry</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> 2,000 AI queries/seat/mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Flow Mode with Slack sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> GitHub integration</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="stagger-card glass-panel rounded-2xl p-8 text-left">
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <div className="text-4xl font-extrabold mb-1">Custom</div>
              <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>For uncompromising security.</p>
              <button className="w-full py-3 rounded-full text-sm font-semibold transition-colors" style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-text)" }}>
                Contact Sales
              </button>
              <ul className="mt-8 space-y-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> SSO (SAML) &amp; SCIM</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Dedicated AI instances</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Custom data retention</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Priority support &amp; SLA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "How is Astra different from Slack + Jira + Notion?",
              a: "Those tools were designed for individual jobs. Astra was designed as one unified OS. Chat messages become tasks. Documents link bidirectionally to execution cards. Metrics flow automatically. There's no context switching because everything lives in the same spatial workspace.",
            },
            {
              q: "Does Astra replace our existing tools?",
              a: "For most teams, yes — over time. Astra covers chat, task management, documentation, and engineering metrics in one platform. During transition, we integrate with GitHub, Slack, and Jira so you can migrate at your own pace.",
            },
            {
              q: "How does Flow Mode work technically?",
              a: "Flow Mode alters the interface at the rendering level. Sidebars animate away, notification listeners are suspended, and only your active task is displayed. Incoming messages are queued server-side and delivered in a batch when you exit Flow Mode.",
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Enterprise plans include SOC 2 Type II compliance, SSO via SAML, and custom data retention policies. We never train AI models on your data.",
            },
            {
              q: "What AI capabilities are included?",
              a: "Every plan includes AI querying via the ⌘K Omni-Bar. The AI can search across all your departments' channels and documents to provide contextual summaries, risk signals, and priority suggestions. Enterprise plans get dedicated AI instances.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="scroll-fade-up py-8"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <h3 className="text-lg font-semibold mb-3">{q}</h3>
              <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="scroll-fade-up text-4xl md:text-6xl font-extrabold mb-6">
            Stop switching.<br />
            <span className="text-gradient">Start flowing.</span>
          </h2>
          <p className="scroll-fade-up text-lg mb-12" style={{ color: "var(--color-text-secondary)" }}>
            Join the teams who have already consolidated their stack into one spatial OS.
          </p>
          <button
            className="scroll-fade-up px-10 py-5 rounded-full text-lg font-bold text-white hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
              boxShadow: "0 12px 40px rgba(109, 40, 217, 0.3)",
            }}
          >
            Deploy Astra — Free
          </button>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6d28d9, #3b82f6)" }}>
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm">Astra</span>
          </div>
          <div className="flex gap-8 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
            <span>Status</span>
          </div>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            © 2025 Astra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
