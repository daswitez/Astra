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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

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

      {/* ========== THE PROBLEM ========== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="scroll-fade-up text-3xl md:text-5xl font-bold mb-6">
            Your team is drowning in tools
          </h2>
          <p className="scroll-fade-up text-lg leading-relaxed max-w-2xl mx-auto mb-16" style={{ color: "var(--color-text-secondary)" }}>
            The average company manages 305 SaaS applications. Engineers switch between 10 apps daily,
            losing 40% of productive time. Every app switch costs 20 minutes of deep focus recovery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, stat: "23 min", desc: "Average recovery time after each context switch" },
              { icon: Blocks, stat: "305", desc: "Average SaaS apps per enterprise organization" },
              { icon: Users, stat: "40%", desc: "Of productive time lost to tool fragmentation daily" },
            ].map(({ icon: Icon, stat, desc }) => (
              <div key={stat} className="stagger-card glass-panel rounded-2xl p-8 text-center">
                <Icon className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--color-accent)" }} />
                <div className="text-4xl font-extrabold mb-2">{stat}</div>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{desc}</p>
              </div>
            ))}
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

      {/* ========== FLOW MODE SPOTLIGHT ========== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="scroll-fade-up text-4xl md:text-5xl font-bold leading-tight">
                Silence the noise.<br />
                <span className="text-gradient">Enter Flow Mode.</span>
              </h2>
              <p className="scroll-fade-up text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Research shows a developer needs 23 minutes to recover from a single interruption.
                68% of workers report not having enough uninterrupted time. Astra fixes this at the
                interface level.
              </p>
              <ul className="scroll-fade-up space-y-4">
                {[
                  "Sidebars organically recede from view",
                  "Non-critical notifications are silenced and batched",
                  "Your active task takes center stage under a spotlight",
                  "All missed messages are queued for post-flow review",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="scroll-fade-up glass-omni rounded-2xl p-8 relative overflow-hidden" style={{ minHeight: "320px" }}>
                <div className="glass-active rounded-xl p-6 max-w-sm mx-auto relative z-10">
                  <div className="w-16 h-3 rounded-full mb-4" style={{ backgroundColor: "var(--color-accent)", opacity: 0.3 }} />
                  <h4 className="text-lg font-bold mb-2">Refactor Authentication Logic</h4>
                  <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    Migrate session tokens to JWT-based auth across all microservices
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}>Backend</span>
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}>High Priority</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span style={{ color: "var(--color-text-muted)" }}>Flow Active · 42:15</span>
                </div>
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
