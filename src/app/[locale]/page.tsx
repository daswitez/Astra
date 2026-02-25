"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
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
  Target,
  Code2,
  Layers,
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tP = useTranslations("problem");
  const tEco = useTranslations("ecosystem");
  const tCli = useTranslations("climax");
  const tBento = useTranslations("bento");
  const tHow = useTranslations("how");
  const tFlow = useTranslations("flow");
  const tFaq = useTranslations("faq");
  const tPricing = useTranslations("pricing");
  const tFooter = useTranslations("footer");
  const tGlobal = useTranslations("global");
  const tMockup = useTranslations("mockup");
  const tFlowMode = useTranslations("flowMode");
  const tLeadership = useTranslations("leadership");
  
  const [isDark, setIsDark] = useState(false);
  const [flowModeActive, setFlowModeActive] = useState(false);
  const [activeTab, setActiveTab] = useState("ceo");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

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
               end: "+=6000", // Much longer scroll distance for slower transitions
               scrub: 1,
               pin: true,
             }
           });

           // 1. Stack Card 2
           // Added more time (duration: 2) and delayed the next step so users can see it clearly
           tl.fromTo(cards[1], { y: "30%", scale: 0.9, opacity: 0 }, { y: "5%", scale: 0.95, opacity: 1, duration: 2 }, 0);
           tl.to(cards[0], { y: "-5%", scale: 0.9, opacity: 0.5, duration: 2 }, 0);
           
           // 2. Stack Card 3
           tl.fromTo(cards[2], { y: "30%", scale: 0.9, opacity: 0 }, { y: "10%", scale: 1, opacity: 1, duration: 2 }, 3);
           tl.to(cards[1], { y: "-2%", scale: 0.9, opacity: 0.5, duration: 2 }, 3);
           tl.to(cards[0], { y: "-10%", scale: 0.85, opacity: 0.2, duration: 2 }, 3);

           // 3. THE CLIMAX (The Snap)
           // Add a pause before the climax starts so they can admire the stack
           tl.to(heroText, { opacity: 0, y: -20, duration: 1 }, 6);
           
           // Pulse the cards before shattering
           tl.to(cards, { scale: 1.05, borderColor: "rgba(109, 40, 217, 0.8)", duration: 1, ease: "power2.inOut" }, 6);
           
           // Shatter (Drop opacity to 0 and scale up)
           tl.to(cards, { scale: 1.5, opacity: 0, duration: 1.5, ease: "power4.out", stagger: 0.2 }, 7.5);
           
           // Reveal the Master Dashboard
           tl.fromTo(climaxDash, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.2)" }, 8.5);
           
           // Fade in final message
           tl.fromTo(climaxText, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, 9.5);
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
          <a href="#features" className="hover:opacity-100 opacity-70 transition-opacity">{tNav("features")}</a>
          <a href="#how-it-works" className="hover:opacity-100 opacity-70 transition-opacity">{tNav("howItWorks")}</a>
          <a href="#pricing" className="hover:opacity-100 opacity-70 transition-opacity">{tNav("pricing")}</a>
          <a href="#faq" className="hover:opacity-100 opacity-70 transition-opacity">{tNav("faq")}</a>
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
          
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border)",
              }}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
            </button>
            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-32 rounded-xl shadow-lg py-1 z-50 overflow-hidden"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Link href="/" locale="en" className="block px-4 py-2 text-sm hover:bg-neutral-500/10">English</Link>
                <Link href="/" locale="es" className="block px-4 py-2 text-sm hover:bg-neutral-500/10">Español</Link>
                <Link href="/" locale="fr" className="block px-4 py-2 text-sm hover:bg-neutral-500/10">Français</Link>
              </div>
            )}
          </div>

          <button
            className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity hidden sm:block"
          >
            {tNav("signIn")}
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6d28d9, #3b82f6)" }}
          >
            {tNav("getStarted")}
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
            {tHero("badge")}
          </div>

          <h1 className="hero-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8">
            {tHero("title1")}<br />
            <span className="text-gradient">{tHero("title2")}</span>
          </h1>

          <p
            className="hero-sub text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {tHero("subtitle")}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              className="px-8 py-4 rounded-full text-white font-semibold text-base flex items-center gap-2 hover:scale-105 transition-transform"
              style={{
                background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
                boxShadow: "0 8px 30px rgba(109, 40, 217, 0.3)",
              }}
            >
              {tHero("cta")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="px-8 py-4 rounded-full font-medium text-base flex items-center gap-2 transition-colors"
              style={{
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-text-secondary)",
              }}
            >
              {tHero("enterprise")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className="hero-cta mt-12 flex items-center justify-center gap-6 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> {tGlobal("trust1")}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> {tGlobal("trust2")}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> {tGlobal("trust3")}
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
                {tMockup("search")}
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
                  {tMockup("engineering")}
                </div>
                <div
                  className="glass-active rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-2"
                >
                  <LayoutTemplate className="w-3.5 h-3.5" /> # {tMockup("storage")}
                </div>
                <div
                  className="px-3 py-2 text-xs font-medium flex items-center gap-2 rounded-lg"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> # {tMockup("chat")}
                </div>
                <div
                  className="px-3 py-2 text-xs font-medium flex items-center gap-2 rounded-lg"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <BarChart3 className="w-3.5 h-3.5" /> # {tMockup("metrics")}
                </div>
              </div>

              {/* Main Area - Kanban */}
              <div className="flex-1 p-8 grid grid-cols-3 gap-5">
                {[tMockup("todo"), tMockup("inProgress"), tMockup("done")].map((label, colIdx) => (
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
            {tGlobal("builtFor")}
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
               <TriangleAlert className="w-4 h-4" /> {tP("step1")}
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
               {tP("chaos1")} <span className="text-rose-500">{tP("chaos2")}</span> {tP("chaos3")}
             </h2>
             <p className="text-xl md:text-2xl font-medium" style={{ color: "var(--color-text-secondary)" }}>
               {tP("subtitle")}
             </p>
           </div>

           {/* Step 2 Text */}
           <div className="narrative-step-2 absolute max-w-xl right-12 md:right-24 opacity-0 text-right flex flex-col items-end gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold w-fit">
                {tP("title")}
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
               {tP("break1")} <span className="text-yellow-500">{tP("break2")}</span>
             </h2>
             <p className="text-xl md:text-2xl font-medium ml-auto" style={{ color: "var(--color-text-secondary)" }}>
               {tP("breakDesc")}
             </p>
           </div>

           {/* Step 3 Text */}
           <div className="narrative-step-3 absolute max-w-lg left-12 md:left-24 opacity-0 flex flex-col gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold w-fit">
                <Sparkles className="w-4 h-4" /> {tP("step3")}
             </div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
               {tP("grav1")} <span className="text-gradient">{tP("grav2")}</span>
             </h2>
             <p className="text-lg md:text-xl font-medium" style={{ color: "var(--color-text-secondary)" }}>
               {tP("gravDesc")}
             </p>
           </div>

           {/* Step 4 Text */}
           <div className="narrative-step-4 absolute max-w-lg right-12 md:right-24 opacity-0 text-right flex flex-col items-end gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold w-fit">
                <Blocks className="w-4 h-4" /> {tP("step4")}
             </div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
               {tP("eco1")} <span className="text-blue-500">{tP("eco2")}</span>
             </h2>
             <p className="text-lg md:text-xl font-medium ml-auto" style={{ color: "var(--color-text-secondary)" }}>
               {tP("ecoDesc")}
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
                {tP("focus1")}
              </h2>
              <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8" style={{ color: "var(--color-text-secondary)" }}>
                {tP("focus2")}
              </p>
              <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> {tP("check1")}</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-accent)" }} /> {tP("check2")}</span>
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
              {tBento("title")}
            </h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              {tBento("subtitle")}
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
                <h3 className="text-2xl font-bold mb-3">{tBento("timelineTitle")}</h3>
                <p className="leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
                  {tBento("timelineDesc")}
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
                  <h3 className="text-2xl font-bold mb-3">{tBento("aiTitle")}</h3>
                  <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {tBento("aiDesc")}
                  </p>
                </div>
                
                {/* Mock UI: ⌘K Palette */}
                <div className="flex-1 w-full max-w-sm">
                  <div className="glass-omni rounded-2xl p-4 shadow-2xl border border-violet-500/20 transform group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <div className="text-sm font-medium text-neutral-300 overflow-hidden whitespace-nowrap border-r-2 border-violet-400 animate-[typing_3s_steps(40,end)_infinite,blink_.75s_step-end_infinite]">
                        {tBento("aiSearch")}
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
                <h3 className="text-xl font-bold mb-3">{tBento("storageTitle")}</h3>
                <p className="leading-relaxed mb-auto text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {tBento("storageDesc")}
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
                <h3 className="text-xl font-bold mb-3">{tBento("telemetryTitle")}</h3>
                <p className="leading-relaxed mb-auto text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {tBento("telemetryDesc")}
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

      {/* ========== LEADERSHIP SECTION ========== */}
      <section id="leadership" className="py-24 px-6 border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--color-text)" }}>{tLeadership("title")}</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              {tLeadership("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Interactive Tabs */}
            <div className="lg:col-span-4 space-y-4">
              {[
                { id: "ceo", label: tLeadership("tabExecutive"), icon: Target },
                { id: "cto", label: tLeadership("tabEngineering"), icon: Code2 },
                { id: "pm", label: tLeadership("tabProduct"), icon: Layers },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full text-left p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 ${
                    activeTab === id
                      ? "glass-active border-[var(--color-accent)] ring-1 ring-[var(--color-accent)] scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ 
                    borderColor: activeTab === id ? "var(--color-accent)" : "var(--color-border)",
                    backgroundColor: activeTab === id ? "var(--color-surface-elevated)" : "transparent"
                  }}
                >
                  <div className="p-3 rounded-xl" style={{ backgroundColor: activeTab === id ? "var(--color-surface)" : "var(--color-surface-elevated)" }}>
                     <Icon className="w-6 h-6" style={{ color: activeTab === id ? "var(--color-accent)" : "var(--color-text-muted)" }} />
                  </div>
                  <span className="text-lg font-bold" style={{ color: activeTab === id ? "var(--color-text)" : "var(--color-text-muted)" }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Right: Dynamic UI Mockups */}
            <div className="lg:col-span-8 relative h-[500px] w-full perspective-1000">
              <AnimatePresence mode="wait">
                {activeTab === "ceo" && (
                  <motion.div
                    key="ceo"
                    initial={{ opacity: 0, y: 20, rotateX: 5 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: -5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl p-8 shadow-xl overflow-hidden border"
                    style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                         {tLeadership("ceoTitle")}
                       </h3>
                       <p className="text-base mb-10 max-w-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{tLeadership("ceoDesc")}</p>
                       <div className="grid grid-cols-3 gap-6">
                         <div className="p-5 rounded-2xl text-center border overflow-hidden relative group transition-colors" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-[11px] uppercase font-extrabold tracking-widest mb-3" style={{ color: "var(--color-accent)" }}>{tLeadership("ceoMetric1")}</p>
                            <p className="text-4xl font-black" style={{ color: "var(--color-text)" }}>+42%</p>
                         </div>
                         <div className="p-5 rounded-2xl text-center border transition-colors" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                            <p className="text-[11px] uppercase font-extrabold tracking-widest text-blue-500 mb-3">{tLeadership("ceoMetric2")}</p>
                            <p className="text-4xl font-black" style={{ color: "var(--color-text)" }}>A+</p>
                         </div>
                         <div className="p-5 rounded-2xl text-center border transition-colors" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                            <p className="text-[11px] uppercase font-extrabold tracking-widest text-orange-500 mb-3">{tLeadership("ceoMetric3")}</p>
                            <p className="text-4xl font-black" style={{ color: "var(--color-text)" }}>-1.5h</p>
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "cto" && (
                  <motion.div
                    key="cto"
                    initial={{ opacity: 0, y: 20, rotateX: 5 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: -5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl p-8 shadow-xl overflow-hidden border"
                    style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                         {tLeadership("ctoTitle")}
                       </h3>
                       <p className="text-base mb-10 max-w-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{tLeadership("ctoDesc")}</p>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="flex items-center justify-between p-4 rounded-xl text-sm font-mono font-bold border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                              <span className="text-blue-500">API Gateway ~ #1204</span>
                              <span style={{ color: "var(--color-text-muted)" }}>PROD</span>
                              <span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">DEPLOYED</span>
                           </div>
                           <div className="flex items-center justify-between p-4 rounded-xl text-sm font-mono font-bold border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                              <span className="text-orange-500">Auth Service ~ #1198</span>
                              <span style={{ color: "var(--color-text-muted)" }}>STG</span>
                              <span className="text-orange-500 bg-orange-500/10 px-3 py-1 rounded border border-orange-500/20">WAITING</span>
                           </div>
                           <div className="flex items-center gap-4 mt-6">
                              <div className="flex-1 p-4 rounded-xl text-center border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                                 <span className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>{tLeadership("ctoMetric1")}</span>
                                 <span className="text-3xl font-black" style={{ color: "var(--color-text)" }}>43</span>
                              </div>
                              <div className="flex-1 p-4 rounded-xl text-center border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                                 <span className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-text-muted)" }}>{tLeadership("ctoMetric2")}</span>
                                 <span className="text-3xl font-black" style={{ color: "var(--color-text)" }}>28</span>
                              </div>
                              <div className="flex-1 p-4 rounded-xl text-center border border-emerald-500/30 bg-emerald-500/5">
                                 <span className="block text-xs font-bold tracking-widest uppercase text-emerald-500 mb-2">{tLeadership("ctoMetric3")}</span>
                                 <span className="text-3xl font-black text-emerald-500">HEALTHY</span>
                              </div>
                           </div>
                        </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "pm" && (
                  <motion.div
                    key="pm"
                    initial={{ opacity: 0, y: 20, rotateX: 5 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: -5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl p-8 shadow-xl overflow-hidden border"
                    style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                         {tLeadership("pmTitle")}
                       </h3>
                       <p className="text-base mb-10 max-w-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{tLeadership("pmDesc")}</p>
                       <div className="flex gap-8 h-48">
                          {/* Mock Spec Editor */}
                          <div className="flex-1 rounded-2xl p-6 flex flex-col gap-4 border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                             <div className="w-1/2 h-5 rounded bg-pink-500/30" />
                             <div className="w-3/4 h-3 rounded mt-2" style={{ backgroundColor: "var(--color-border-strong)" }} />
                             <div className="w-full h-3 rounded" style={{ backgroundColor: "var(--color-border-strong)" }} />
                             <div className="w-5/6 h-3 rounded" style={{ backgroundColor: "var(--color-border-strong)" }} />
                             <div className="w-2/3 h-3 rounded" style={{ backgroundColor: "var(--color-border-strong)" }} />
                          </div>
                          {/* Live Metrics */}
                          <div className="w-1/3 flex flex-col gap-4">
                             <div className="rounded-2xl p-4 flex-1 flex flex-col justify-center text-center border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                                <span className="block text-[11px] font-extrabold tracking-widest mb-2 uppercase" style={{ color: "var(--color-text-muted)" }}>{tLeadership("pmMetric1")}</span>
                                <span className="text-4xl font-black text-pink-500">12</span>
                             </div>
                             <div className="rounded-2xl p-4 flex-1 flex flex-col justify-center text-center border" style={{ backgroundColor: "var(--color-surface-elevated)", borderColor: "var(--color-border)" }}>
                                <span className="block text-[11px] font-extrabold tracking-widest mb-2 uppercase" style={{ color: "var(--color-text-muted)" }}>{tLeadership("pmMetric2")}</span>
                                <span className="text-4xl font-black text-pink-500">8</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">{tHow("title")}</h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              {tHow("subtitle")}
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: tHow("step1Title"),
                desc: tHow("step1Desc"),
                icon: Globe,
              },
              {
                step: "02",
                title: tHow("step2Title"),
                desc: tHow("step2Desc"),
                icon: Blocks,
              },
              {
                step: "03",
                title: tHow("step3Title"),
                desc: tHow("step3Desc"),
                icon: Zap,
              },
              {
                step: "04",
                title: tHow("step4Title"),
                desc: tHow("step4Desc"),
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
                {tFlow("title1")}<br />
                <span className={flowModeActive ? "text-white" : "text-gradient"}>{tFlow("title2")}</span>
              </h2>
              <p className="scroll-fade-up text-lg leading-relaxed transition-colors duration-700" style={{ color: flowModeActive ? "#A1A1AA" : "var(--color-text-secondary)" }}>
                {tFlow("subtitle1")}
                {tFlow("subtitle2")}
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
                {flowModeActive ? tFlow("exit") : tFlow("simulate")}
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
                      <p className="text-xs font-bold text-red-400">{tFlowMode("slackAlert")}</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{tFlowMode("slack")}</p>
                    </div>
                  </div>
                  <div className="glass-active rounded-lg p-3 w-64 shadow-lg flex items-start gap-3">
                    <Cloud className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--color-text)" }}>{tFlowMode("sfAlert")}</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{tFlowMode("salesforce")}</p>
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
                      <p className="text-xs font-bold text-pink-400">{tFlowMode("figmaAlert")}</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{tFlowMode("figma")}</p>
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
                  <h4 className="text-lg font-bold mb-2 transition-colors" style={{ color: flowModeActive ? "#fff" : "var(--color-text)" }}>{tFlowMode("taskTitle")}</h4>
                  <p className="text-xs leading-relaxed transition-colors" style={{ color: flowModeActive ? "#A1A1AA" : "var(--color-text-muted)" }}>
                    {tFlowMode("taskDesc")}
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: flowModeActive ? 1 : 0 }}
                    className="mt-6 flex items-center justify-between pointer-events-none"
                  >
                    <div className="text-[10px] font-mono text-emerald-400/70 border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 rounded">
                      {tFlowMode("blocking")}
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
                 {tEco("title1")}<span className="text-gradient">{tEco("title2")}</span>
               </h2>
               <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                 {tEco("subtitle")}
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
                        <PenTool className="w-4 h-4 text-pink-400" /> {tEco("app1")}
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
                        <GitMerge className="w-4 h-4 text-blue-400" /> {tEco("app2")}
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
                              <span className="font-bold text-sm text-blue-200">{tEco("gateway")}</span>
                           </div>
                           <div className="w-full h-1.5 bg-blue-500/30 rounded" />
                        </div>
                        
                        <div className="absolute top-[230px] left-[50px] w-48 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse" style={{ animationDelay: "0.5s" }}>
                           <div className="flex items-center gap-3 mb-2">
                              <Focus className="w-5 h-5 text-emerald-400" />
                              <span className="font-bold text-sm text-emerald-200">{tEco("auth")}</span>
                           </div>
                           <div className="w-full h-1.5 bg-emerald-500/30 rounded" />
                        </div>

                        <div className="absolute top-[155px] right-[50px] w-48 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-pulse" style={{ animationDelay: "1s" }}>
                           <div className="flex items-center gap-3 mb-2">
                              <Share2 className="w-5 h-5 text-purple-400" />
                              <span className="font-bold text-sm text-purple-200">{tEco("db")}</span>
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
                        <Timer className="w-4 h-4 text-emerald-400" /> {tEco("app3")}
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
                           <div className="text-emerald-400 font-bold tracking-widest text-sm mt-1 uppercase">{tEco("pomodoro")}</div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span className="text-neutral-300 font-medium">{tEco("blocked")} <span className="text-white font-bold ml-1">14</span></span>
                     </div>
                  </div>
               </div>

               {/* --- THE CLIMAX (MASTER DASHBOARD) --- */}
               <div className="climax-dashboard absolute w-full max-w-4xl h-[60vh] min-h-[400px] max-h-[600px] glass-panel rounded-3xl border border-purple-500/30 p-0 overflow-hidden bg-[#09090b]/40 backdrop-blur-md shadow-[0_0_100px_rgba(109,40,217,0.3)] flex flex-col z-0 pointer-events-none origin-center" style={{ opacity: 0, scale: 0.8 }}>
                  {/* Dashboard Header */}
                  <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                     <div className="flex gap-4">
                        <div className="w-4 h-4 rounded-full bg-blue-500" />
                        <div className="w-4 h-4 rounded-full bg-emerald-500" />
                        <div className="w-4 h-4 rounded-full bg-purple-500" />
                        <div className="w-4 h-4 rounded-full bg-pink-500" />
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                     </div>
                     <span className="text-sm font-bold tracking-widest text-neutral-400 uppercase">{tCli("badge")}</span>
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
                 {tCli("text1")}<span className="text-gradient">{tCli("text2")}</span><br />
                 {tCli("text3")}<br />
                 {tCli("text4")}
               </h2>
            </div>
         </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold text-center mb-16">
            {tFaq("title")}
          </h2>
          {[
            {
              q: tFaq("q1"),
              a: tFaq("a1"),
            },
            {
              q: tFaq("q2"),
              a: tFaq("a2"),
            },
            {
              q: tFaq("q3"),
              a: tFaq("a3"),
            },
            {
              q: tFaq("q4"),
              a: tFaq("a4"),
            },
            {
              q: tFaq("q5"),
              a: tFaq("a5"),
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
            {tFlow("final1")}<br />
            <span className="text-gradient">{tFlow("final2")}</span>
          </h2>
          <p className="scroll-fade-up text-lg mb-12" style={{ color: "var(--color-text-secondary)" }}>
            {tFlow("finalSub")}
          </p>
          <button
            className="scroll-fade-up px-10 py-5 rounded-full text-lg font-bold text-white hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
              boxShadow: "0 12px 40px rgba(109, 40, 217, 0.3)",
            }}
          >
            {tFlow("finalBtn")}
          </button>
        </div>
      </section>

      {/* ========== PRICING TIERS ========== */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-4">
              {tPricing("title")}
            </h2>
            <p className="scroll-fade-up text-lg" style={{ color: "var(--color-text-secondary)" }}>
              {tPricing("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Learner */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>{tPricing("free.title")}</h3>
                <p className="text-sm font-medium mb-6" style={{ color: "var(--color-text-secondary)" }}>{tPricing("free.desc")}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">{tPricing("free.price")}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>{tPricing("free.period")}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                {tPricing.raw("free.features").map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent-light)" }} /> {feat}</li>
                ))}
              </ul>
              <button
                className="w-full py-4 rounded-xl font-bold transition-colors"
                style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
              >
                {tPricing("free.btn")}
              </button>
            </div>

            {/* Organization Pro */}
            <div className="glass-active rounded-3xl p-8 flex flex-col h-full transform md:-translate-y-4 border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-blue-500 text-white tracking-widest uppercase">
                {tPricing("pro.badge")}
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>{tPricing("pro.title")}</h3>
                <p className="text-sm font-medium mb-6" style={{ color: "var(--color-text-secondary)" }}>{tPricing("pro.desc")}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">{tPricing("pro.price")}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>{tPricing("pro.period")}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-medium">
                {tPricing.raw("pro.features").map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" /> {feat}</li>
                ))}
              </ul>
              <button
                className="w-full py-4 rounded-xl font-bold text-white transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                {tPricing("pro.btn")}
              </button>
            </div>

            {/* Enterprise AI */}
            <div className="glass-panel rounded-3xl p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
              <div className="mb-8 relative z-10">
                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{tPricing("ent.title")}</h3>
                <p className="text-sm font-medium mb-6" style={{ color: "var(--color-text-secondary)" }}>{tPricing("ent.desc")}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{tPricing("ent.price")}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-medium relative z-10" style={{ color: "var(--color-text-secondary)" }}>
                {tPricing.raw("ent.features").map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" /> {feat}</li>
                ))}
              </ul>
              <button
                className="w-full py-4 rounded-xl font-bold transition-colors relative z-10"
                style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border-strong)", color: "var(--color-text)" }}
              >
                {tPricing("ent.btn")}
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
            {tFooter("ctaTitle")}
          </h2>
          <button
            className="px-10 py-5 rounded-full text-white font-bold text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
              boxShadow: "0 10px 40px rgba(109, 40, 217, 0.4)",
            }}
          >
            {tFooter("ctaBtn")} <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-sm relative z-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-6 text-white">
              <Sparkles className="w-4 h-4 text-purple-500" /> Astra
            </div>
            <p className="opacity-60 leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
              {tFooter("desc")}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-white">
             <h4 className="font-bold mb-2">{tFooter("links.product")}</h4>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.features")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.pricing")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.enterprise")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.security")}</a>
          </div>
          <div className="flex flex-col gap-4 text-white">
             <h4 className="font-bold mb-2">{tFooter("links.resources")}</h4>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.docs")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.api")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.blog")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.community")}</a>
          </div>
          <div className="flex flex-col gap-4 text-white">
             <h4 className="font-bold mb-2">{tFooter("links.company")}</h4>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.about")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.careers")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.contact")}</a>
             <a href="#" className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--color-text-secondary)" }}>{tFooter("links.privacy")}</a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs opacity-40 border-t relative z-10" style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}>
           <p>{tFooter("copy")}</p>
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
