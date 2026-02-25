"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import ArchitectureFlowchart from "../../../../components/ArchitectureFlowchart";

export default function FlowchartPage() {
  const router = useRouter();
  return (
    <motion.main
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.2, duration: 1 }}
      className={`relative min-h-screen pr-8 pt-8 pb-8 transition-all duration-700 ease-[0.16,1,0.3,1] pl-[100px] h-screen`}
    >
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 tracking-tight">
            Project Flowcharts
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Build and visualize project logic and team architecture.
          </p>
        </div>
      </header>

      <div className="w-full h-[calc(100vh-140px)] rounded-3xl border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
        <ArchitectureFlowchart onBack={() => router.push('/app')} />
      </div>
    </motion.main>
  );
}
