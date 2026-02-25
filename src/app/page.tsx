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
  Figma,
  Cloud,
  PenTool,
  Type,
  Share2,
  GitMerge,
  Timer,
  Focus,
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

      // App Ecosystem 3D Parallax Stack & Climax
      gsap.utils.toArray<HTMLElement>(".ecosystem-container").forEach((container) => {
        const cards = gsap.utils.toArray<HTMLElement>(".ecosystem-card", container);
        const climaxDash = container.querySelector(".climax-dashboard") as HTMLElement;
        const climaxText = container.querySelector(".climax-text") as HTMLElement;
        const heroText = container.querySelector(".ecosystem-hero-text") as HTMLElement;

        if (cards.length === 3 && climaxDash && climaxText && heroText) {
           const tl = gsap.timeline({
             scrollTrigger: {
               trigger: container,
               start: "center center",
               end: "+=4000", // Extended for climax
               scrub: 1,
               pin: true,
             }
           });

           // 1. Stack Card 2
           tl.fromTo(cards[1], { y: "30%", scale: 0.9, opacity: 0 }, { y: "5%", scale: 0.95, opacity: 1, duration: 1 }, 0);
           tl.to(cards[0], { y: "-5%", scale: 0.9, opacity: 0.5, duration: 1 }, 0);
           
           // 2. Stack Card 3
           tl.fromTo(cards[2], { y: "30%", scale: 0.9, opacity: 0 }, { y: "10%", scale: 1, opacity: 1, duration: 1 }, 1.5);
           tl.to(cards[1], { y: "-2%", scale: 0.9, opacity: 0.5, duration: 1 }, 1.5);
           tl.to(cards[0], { y: "-10%", scale: 0.85, opacity: 0.2, duration: 1 }, 1.5);

           // 3. THE CLIMAX (The Snap)
           // Fade out the initial hero text
           tl.to(heroText, { opacity: 0, y: -20, duration: 0.5 }, 3);
           
           // Pulse the cards before shattering
           tl.to(cards, { scale: 1.05, borderColor: "rgba(109, 40, 217, 0.8)", duration: 0.5, ease: "power2.inOut" }, 3);
           
           // Shatter (Drop opacity to 0 and scale up)
           tl.to(cards, { scale: 1.5, opacity: 0, duration: 0.8, ease: "power4.out", stagger: 0.05 }, 3.5);
           
           // Reveal the Master Dashboard
           tl.fromTo(climaxDash, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, 3.8);
           
           // Fade in final message
           tl.fromTo(climaxText, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 4.2);
        }
      });

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
            The Operating System for<br />
            <span className="text-gradient">the Modern Enterprise.</span>
          </h1>

          <p
            className="hero-sub text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Stop switching contexts. Astra unites your entire organization—Engineering, Sales, Marketing, and Operations—in a single zero-latency workspace.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              className="px-8 py-4 rounded-full text-white font-semibold text-base flex items-center gap-2 hover:scale-105 transition-transform"
              style={{
                background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
                boxShadow: "0 8px 30px rgba(109, 40, 217, 0.3)",
              }}
            >
              Unify Your Workspace (Free)
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
               <TriangleAlert className="w-4 h-4" /> The Organizational Silo
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
               The <span className="text-rose-500">Chaos</span> of Fragmented Work.
             </h2>
             <p className="text-xl md:text-2xl font-medium" style={{ color: "var(--color-text-secondary)" }}>
               Salesforce for reps. Jira for devs. Figma for design. Your best people aren't working—they're searching for context across 10 disjointed apps.
             </p>
           </div>

           {/* Step 2 Text */}
           <div className="narrative-step-2 absolute max-w-xl right-12 md:right-24 opacity-0 text-right flex flex-col items-end gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold w-fit">
                The Fragmentation Tax
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
               The Breaking <span className="text-yellow-500">Point.</span>
             </h2>
             <p className="text-xl md:text-2xl font-medium ml-auto" style={{ color: "var(--color-text-secondary)" }}>
               Your company loses 40% of its potential in the gaps between apps. The cognitive load of switching context is breaking your cross-functional teams.
             </p>
           </div>

           {/* Step 3 Text */}
           <div className="narrative-step-3 absolute max-w-lg left-12 md:left-24 opacity-0 flex flex-col gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold w-fit">
                <Sparkles className="w-4 h-4" /> The Singularity
             </div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
               A New <span className="text-gradient">Gravity.</span>
             </h2>
             <p className="text-lg md:text-xl font-medium" style={{ color: "var(--color-text-secondary)" }}>
               What if you didn't have to connect tools anymore? What if the workspace itself was the tool? Astra acts as a gravitational center for your entire company.
             </p>
           </div>

           {/* Step 4 Text */}
           <div className="narrative-step-4 absolute max-w-lg right-12 md:right-24 opacity-0 text-right flex flex-col items-end gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold w-fit">
                <Blocks className="w-4 h-4" /> Unity
             </div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
               A Native <span className="text-blue-500">Ecosystem.</span>
             </h2>
             <p className="text-lg md:text-xl font-medium ml-auto" style={{ color: "var(--color-text-secondary)" }}>
               Zero plugins. Zero integrations. Sales, Engineering, and Marketing all speak the same language instantly inside the same interface.
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
             <Figma className="w-8 h-8 text-pink-400" />
           </div>
           <div className="chaos-node absolute top-[35%] right-[25%] w-28 h-28 rounded-2xl glass-active flex items-center justify-center shadow-red-500/20 shadow-2xl">
             <Cloud className="w-12 h-12 text-blue-400" /> {/* Proxy for Salesforce */}
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
                Astra brings your company into focus.
              </h2>
              <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8" style={{ color: "var(--color-text-secondary)" }}>
                Native context. Zero latency. Complete organizational clarity.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Unified Org</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> Single UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CORE FEATURES (SPATIAL BENTO BOX) ========== */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">
              A workspace that works for you.
            </h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Experience the power of native context across your entire organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            
            {/* Bento 1: Unified Timeline (Tall) */}
            <div className="stagger-card glass-panel rounded-3xl p-8 flex flex-col md:row-span-2 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex-1 flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)" }}
                >
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Unified Timeline</h3>
                <p className="leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
                  Your chat is your workspace. Messages are living documents that convert into actions with one click.
                </p>
                
                {/* Mock UI: Chat to Ticket */}
                <div className="mt-auto flex flex-col gap-4 relative">
                  {/* Glowing Connection Line */}
                  <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Chat Message */}
                  <div className="glass-active rounded-xl p-4 ml-8 relative transform group-hover:-translate-y-1 transition-transform">
                     <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-blue-400" />
                     </div>
                     <div className="w-3/4 h-2 rounded bg-neutral-600 mb-2" />
                     <div className="w-1/2 h-2 rounded bg-neutral-700" />
                  </div>
                  
                  {/* Jira Ticket */}
                  <div className="glass-active rounded-xl p-4 ml-8 relative transform group-hover:-translate-y-1 transition-transform delay-75">
                     <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                        <Trello className="w-3 h-3 text-purple-400" />
                     </div>
                     <div className="flex gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">ENG-142</span>
                     </div>
                     <div className="w-full h-2 rounded bg-neutral-600 mb-2" />
                     <div className="w-2/3 h-2 rounded bg-neutral-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 2: AI Command Center (Wide) */}
            <div className="stagger-card glass-panel rounded-3xl p-8 flex flex-col md:col-span-2 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 h-full items-center">
                <div className="flex-1">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: "rgba(109, 40, 217, 0.15)", border: "1px solid rgba(109, 40, 217, 0.3)" }}
                  >
                    <BrainCircuit className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">AI Command Center</h3>
                  <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    Press ⌘K and instantly query cross-departmental data. Ask questions about sales pipelines, product roadmaps, or marketing campaigns simultaneously.
                  </p>
                </div>
                
                {/* Mock UI: ⌘K Palette */}
                <div className="flex-1 w-full max-w-sm">
                  <div className="glass-omni rounded-2xl p-4 shadow-2xl border border-violet-500/20 transform group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <div className="text-sm font-medium text-neutral-300 overflow-hidden whitespace-nowrap border-r-2 border-violet-400 animate-[typing_3s_steps(40,end)_infinite,blink_.75s_step-end_infinite]">
                        Summarize Q3 marketing...
                      </div>
                    </div>
                    {/* Results Nodes */}
                    <div className="space-y-2">
                       <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <Figma className="w-4 h-4 text-pink-400" />
                          <div className="flex-1">
                             <div className="w-1/2 h-2 rounded bg-neutral-400 mb-1" />
                             <div className="w-1/3 h-1.5 rounded bg-neutral-600" />
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <Cloud className="w-4 h-4 text-blue-400" />
                          <div className="flex-1">
                             <div className="w-2/3 h-2 rounded bg-neutral-400 mb-1" />
                             <div className="w-1/4 h-1.5 rounded bg-neutral-600" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 3: Passive Storage (Square) */}
            <div className="stagger-card glass-panel rounded-3xl p-8 flex flex-col group overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex-1 flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)" }}
                >
                  <Blocks className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Passive Storage</h3>
                <p className="leading-relaxed mb-auto text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  A complex file tree that auto-organizes itself based on context.
                </p>
                
                {/* Mock UI: Folder structure */}
                <div className="mt-8 space-y-3">
                   {/* Parent */}
                   <div className="glass-active rounded-lg p-3 flex items-center gap-3 transform group-hover:translate-x-2 transition-transform">
                     <Blocks className="w-4 h-4 text-emerald-400" />
                     <div className="w-24 h-2 rounded bg-neutral-500" />
                   </div>
                   {/* Child 1 */}
                   <div className="glass-active rounded-lg p-3 ml-6 flex items-center gap-3 transform group-hover:translate-x-4 transition-transform delay-75">
                     <div className="w-20 h-2 rounded bg-neutral-600" />
                   </div>
                   {/* Child 2 */}
                   <div className="glass-active rounded-lg p-3 ml-6 flex items-center gap-3 transform group-hover:translate-x-6 transition-transform delay-150">
                     <div className="w-16 h-2 rounded bg-neutral-600" />
                   </div>
                </div>
              </div>
            </div>

            {/* Bento 4: Live Telemetry (Square) */}
            <div className="stagger-card glass-panel rounded-3xl p-8 flex flex-col group overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex-1 flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.15)", border: "1px solid rgba(6, 182, 212, 0.3)" }}
                >
                  <Activity className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Live Telemetry</h3>
                <p className="leading-relaxed mb-auto text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Automated organizational insights and output metrics without micromanagement.
                </p>
                
                {/* Mock UI: Animated Bar Chart */}
                <div className="mt-8 h-24 flex items-end gap-2 px-2">
                   {[40, 70, 45, 90, 60].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-cyan-500/20 border border-cyan-500/30 rounded-t-sm transition-all duration-700 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        style={{ 
                          height: `${height}%`,
                          transitionDelay: `${i * 100}ms`
                        }}
                      />
                   ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">How Astra Works</h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              From onboarding to deep organizational flow in under 5 minutes.
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Create Your Organization",
                desc: "Set up your company in seconds. Invite your team through SSO or magic links. Astra automatically creates interconnected workspaces across Sales, Engineering, and Marketing.",
                icon: Globe,
              },
              {
                step: "02",
                title: "Connect Your Stack",
                desc: "Link your existing tools with a single OAuth flow. Astra begins passively collecting data, context, and deployment events—building your organizational graph automatically.",
                icon: Blocks,
              },
              {
                step: "03",
                title: "Work in Context",
                desc: "Chat with your team, draft proposals, and track sprints—all from the same interface. Convert conversations into actions instantly, maintaining total bidirectional context.",
                icon: Zap,
              },
              {
                step: "04",
                title: "Protect Your Focus",
                desc: "When it's time for deep work, activate Flow Mode. The interface physically transforms: sidebars recede, noisy notifications silence across the organization, and your critical task takes center stage.",
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
                Protect your focus.<br />
                <span className={flowModeActive ? "text-white" : "text-gradient"}>Deliver your best work.</span>
              </h2>
              <p className="scroll-fade-up text-lg leading-relaxed transition-colors duration-700" style={{ color: flowModeActive ? "#A1A1AA" : "var(--color-text-secondary)" }}>
                Every knowledge worker—from marketers to engineers—craves continuous \"Flow.\"
                Astra protects this state at the interface level. Click below to experience Flow Mode.
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
                      <p className="text-xs font-bold text-red-400">@here URGENT: Client escalated</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>From #sales-alerts</p>
                    </div>
                  </div>
                  <div className="glass-active rounded-lg p-3 w-64 shadow-lg flex items-start gap-3">
                    <Cloud className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--color-text)" }}>Opportunity Lost: Acme Corp</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Salesforce Automation</p>
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
                  className="absolute bottom-10 left-6 pointer-events-none z-0"
                >
                  <div className="glass-active rounded-lg p-3 w-56 shadow-lg flex items-start gap-3 border border-pink-500/20">
                    <Figma className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-pink-400">23 New Comments</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>Q3 Marketing Landing Page</p>
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

      {/* ========== NATIVE APP ECOSYSTEM (3D PARALLAX) ========== */}
      <section className="bg-black relative overflow-hidden ecosystem-container h-screen min-h-[700px] flex flex-col items-center justify-center py-20">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 w-full h-full max-h-[850px] flex flex-col items-center relative z-10">
            <div className="text-center mb-10 shrink-0 ecosystem-hero-text">
               <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                 Built in. <span className="text-gradient">Not bolted on.</span>
               </h2>
               <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                 Why switch contexts for brainstorming or diagramming? Astra includes high-performance, native mini-apps that live alongside your chat and tasks.
               </p>
            </div>

            <div className="relative w-full max-w-5xl flex-1 flex flex-col justify-center perspective-[2000px] min-h-[400px]">
               
               {/* --- THE APPS --- */}
               <div className="ecosystem-card absolute w-full h-[60vh] min-h-[400px] max-h-[600px] glass-panel rounded-3xl border border-white/10 p-0 overflow-hidden bg-[#09090b]/80 backdrop-blur-3xl shadow-2xl flex flex-col">
                  {/* Window Bar */}
                  <div className="h-12 border-b border-white/10 flex items-center px-6 gap-4 bg-white/5 shrink-0">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     </div>
                     <span className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-pink-400" /> Spatial Whiteboard
                     </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 relative p-12 overflow-hidden flex items-center justify-center">
                     {/* Brainstorming Mock UI */}
                     <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                        <path d="M100,200 C300,50 500,400 800,100" fill="none" stroke="url(#pink-grad)" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_3s_linear_infinite]" />
                        <defs>
                           <linearGradient id="pink-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ec4899" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                           </linearGradient>
                        </defs>
                     </svg>
                     <div className="relative z-10 flex gap-12">
                        <div className="w-64 h-64 bg-yellow-400/10 border border-yellow-400/30 rounded-lg shadow-lg rotate-[-5deg] p-6 hover:rotate-0 hover:-translate-y-2 transition-transform duration-300">
                           <Type className="w-6 h-6 text-yellow-500 mb-4" />
                           <div className="w-3/4 h-3 bg-yellow-500/40 rounded mb-3" />
                           <div className="w-full h-2 bg-yellow-500/20 rounded mb-2" />
                           <div className="w-5/6 h-2 bg-yellow-500/20 rounded" />
                        </div>
                        <div className="w-64 h-64 bg-pink-400/10 border border-pink-400/30 rounded-lg shadow-lg rotate-[8deg] p-6 hover:rotate-0 hover:-translate-y-2 transition-transform duration-300 translate-y-12">
                           <PenTool className="w-6 h-6 text-pink-500 mb-4" />
                           <div className="w-2/3 h-3 bg-pink-500/40 rounded mb-3" />
                           <div className="w-full h-2 bg-pink-500/20 rounded mb-2" />
                           <div className="w-4/5 h-2 bg-pink-500/20 rounded" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* App 2: Auto-Flowcharts */}
               <div className="ecosystem-card absolute w-full h-[60vh] min-h-[400px] max-h-[600px] glass-panel rounded-3xl border border-white/10 p-0 overflow-hidden bg-[#09090b]/90 backdrop-blur-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.8)] flex flex-col" style={{ transform: "translateY(30%) scale(0.9)", opacity: 0 }}>
                  {/* Window Bar */}
                  <div className="h-12 border-b border-white/10 flex items-center px-6 gap-4 bg-white/5 shrink-0">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-neutral-600" />
                        <div className="w-3 h-3 rounded-full bg-neutral-600" />
                     </div>
                     <span className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                        <GitMerge className="w-4 h-4 text-blue-400" /> Auto-Flowcharts
                     </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 relative p-12 flex items-center justify-center">
                     {/* Architecture Mock UI */}
                     <div className="relative w-full max-w-3xl aspect-[2/1]">
                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full opacity-40">
                           <path d="M200,100 L400,100 L400,250 L600,250" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" className="animate-[dash_1s_linear_infinite]" />
                           <path d="M200,250 L400,250 L400,100 L600,100" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" className="animate-[dash_1s_linear_infinite]" />
                        </svg>
                        
                        {/* Nodes */}
                        <div className="absolute top-[80px] left-[50px] w-48 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-pulse">
                           <div className="flex items-center gap-3 mb-2">
                              <Cloud className="w-5 h-5 text-blue-400" />
                              <span className="font-bold text-sm text-blue-200">API Gateway</span>
                           </div>
                           <div className="w-full h-1.5 bg-blue-500/30 rounded" />
                        </div>
                        
                        <div className="absolute top-[230px] left-[50px] w-48 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse" style={{ animationDelay: "0.5s" }}>
                           <div className="flex items-center gap-3 mb-2">
                              <Focus className="w-5 h-5 text-emerald-400" />
                              <span className="font-bold text-sm text-emerald-200">Auth Service</span>
                           </div>
                           <div className="w-full h-1.5 bg-emerald-500/30 rounded" />
                        </div>

                        <div className="absolute top-[155px] right-[50px] w-48 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-pulse" style={{ animationDelay: "1s" }}>
                           <div className="flex items-center gap-3 mb-2">
                              <Share2 className="w-5 h-5 text-purple-400" />
                              <span className="font-bold text-sm text-purple-200">Database Cluster</span>
                           </div>
                           <div className="w-full h-1.5 bg-purple-500/30 rounded" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* App 3: Deep Work Pomodoro */}
               <div className="ecosystem-card absolute w-full h-[60vh] min-h-[400px] max-h-[600px] glass-panel rounded-3xl border border-white/10 p-0 overflow-hidden bg-[#09090b] backdrop-blur-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.8)] flex flex-col" style={{ transform: "translateY(30%) scale(0.9)", opacity: 0 }}>
                  {/* Window Bar */}
                  <div className="h-12 border-b border-white/10 flex items-center px-6 gap-4 bg-white/5 shrink-0">
                     <span className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                        <Timer className="w-4 h-4 text-emerald-400" /> Deep Work Tracker
                     </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 relative flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-emerald-900/10">
                     {/* Circular Progress */}
                     <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                           <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                           <circle 
                              cx="128" cy="128" r="120" 
                              fill="none" 
                              stroke="#34d399" 
                              strokeWidth="8" 
                              strokeLinecap="round"
                              strokeDasharray="753"
                              strokeDashoffset="150"
                              className="transition-all duration-1000"
                           />
                        </svg>
                        <div className="text-center">
                           <div className="text-6xl font-black text-white tracking-tighter">42:15</div>
                           <div className="text-emerald-400 font-bold tracking-widest text-sm mt-1 uppercase">Deep Work</div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span className="text-neutral-300 font-medium">Distractions Blocked: <span className="text-white font-bold ml-1">14</span></span>
                     </div>
                  </div>
               </div>

               {/* --- THE CLIMAX (MASTER DASHBOARD) --- */}
               <div className="climax-dashboard absolute w-full h-[70vh] min-h-[500px] max-h-[700px] glass-panel rounded-3xl border border-purple-500/30 p-0 overflow-hidden bg-[#09090b]/40 backdrop-blur-md shadow-[0_0_100px_rgba(109,40,217,0.3)] flex flex-col z-0 pointer-events-none origin-center" style={{ opacity: 0, scale: 0.8 }}>
                  {/* Dashboard Header */}
                  <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                     <div className="flex gap-4">
                        <div className="w-4 h-4 rounded-full bg-blue-500" />
                        <div className="w-4 h-4 rounded-full bg-emerald-500" />
                        <div className="w-4 h-4 rounded-full bg-purple-500" />
                        <div className="w-4 h-4 rounded-full bg-pink-500" />
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                     </div>
                     <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase">Astra Master Node</span>
                  </div>
                  {/* Dashboard Content Grid */}
                  <div className="flex-1 p-6 grid grid-cols-3 gap-6">
                     <div className="col-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
                        <div className="w-full h-8 bg-blue-500/20 rounded mb-4" />
                        <div className="w-full h-12 bg-white/5 rounded" />
                        <div className="w-full h-12 bg-white/5 rounded" />
                        <div className="w-full h-12 bg-white/5 rounded" />
                     </div>
                     <div className="col-span-2 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
                        <div className="w-1/2 h-8 bg-purple-500/20 rounded mb-4" />
                        <div className="flex-1 w-full bg-white/5 rounded grid grid-cols-2 gap-4 p-4">
                           <div className="rounded bg-emerald-500/10 border border-emerald-500/20" />
                           <div className="rounded bg-pink-500/10 border border-pink-500/20" />
                           <div className="col-span-2 rounded bg-yellow-500/10 border border-yellow-500/20" />
                        </div>
                     </div>
                  </div>
               </div>

            </div>

            {/* Final Climax Text */}
            <div className="climax-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full z-50 pointer-events-none" style={{ opacity: 0 }}>
               <h2 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(109,40,217,0.8)]">
                 Everything <span className="text-gradient">connected.</span><br />
                 Everything native. <br />
                 Zero friction.
               </h2>
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

      {/* ========== PRICING TIERS ========== */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing.
            </h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Start for free, scale as your organization unifies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Learner */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Free Learner</h3>
                <p className="text-sm font-medium mb-6" style={{ color: "var(--color-text-secondary)" }}>For small teams getting started.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">$0</span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>/ forever</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent-light)" }} /> Up to 5 users</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent-light)" }} /> Unlimited chat & channels</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent-light)" }} /> Basic task management</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent-light)" }} /> Standard search</li>
              </ul>
              <button
                className="w-full py-4 rounded-xl font-bold transition-colors"
                style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
              >
                Get Started
              </button>
            </div>

            {/* Organization Pro */}
            <div className="glass-active rounded-3xl p-8 flex flex-col h-full transform md:-translate-y-4 border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-blue-500 text-white tracking-widest uppercase">
                Most Popular
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>Organization Pro</h3>
                <p className="text-sm font-medium mb-6" style={{ color: "var(--color-text-secondary)" }}>The complete platform for growing companies.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">$15</span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>/ user / mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-medium">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" /> Everything in Free</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" /> AI Workspace Generation</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" /> Invisible Telemetry</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" /> 3rd-Party Integrations</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" /> Priority Support</li>
              </ul>
              <button
                className="w-full py-4 rounded-xl font-bold text-white transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                Start Free Trial
              </button>
            </div>

            {/* Enterprise AI */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
              <div className="mb-8 relative z-10">
                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Enterprise AI</h3>
                <p className="text-sm font-medium mb-6" style={{ color: "var(--color-text-secondary)" }}>For large-scale, secure deployments.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">Custom</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-medium relative z-10" style={{ color: "var(--color-text-secondary)" }}>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" /> Everything in Pro</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" /> Dedicated Cross-Dept AI Models</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" /> Single Sign-On (SAML/SSO)</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" /> Advanced Audit Logs</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" /> Custom SLA</li>
              </ul>
              <button
                className="w-full py-4 rounded-xl font-bold transition-colors relative z-10"
                style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border-strong)", color: "var(--color-text)" }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA & FOOTER ========== */}
      <footer className="pt-32 pb-12 border-t mt-12 relative overflow-hidden" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
        {/* Glow effect in footer */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-6xl mx-auto px-6 text-center mb-32 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            Ready to unify your company?
          </h2>
          <button
            className="px-10 py-5 rounded-full text-white font-bold text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
              boxShadow: "0 10px 40px rgba(109, 40, 217, 0.4)",
            }}
          >
            Deploy Astra <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-sm relative z-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-6 text-white">
              <Sparkles className="w-4 h-4 text-purple-500" /> Astra
            </div>
            <p className="opacity-60 leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
              The Spatial Productivity OS for modern enterprises. Unifying context, execution, and intelligence.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-white">
             <h4 className="font-bold mb-2">Product</h4>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Features</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Pricing</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Enterprise</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Security (SOC 2)</a>
          </div>
          <div className="flex flex-col gap-4 text-white">
             <h4 className="font-bold mb-2">Resources</h4>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Documentation</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>API Reference</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Blog</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Community</a>
          </div>
          <div className="flex flex-col gap-4 text-white">
             <h4 className="font-bold mb-2">Company</h4>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>About Us</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Careers</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Contact Sales</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>Privacy Policy</a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs opacity-40 border-t relative z-10" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
           <p>© 2026 Astra Systems Inc. All rights reserved.</p>
           <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:opacity-100">Twitter</a>
             <a href="#" className="hover:opacity-100">GitHub</a>
             <a href="#" className="hover:opacity-100">LinkedIn</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
