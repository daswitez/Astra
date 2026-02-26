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
      className={`relative w-full h-screen bg-[#050505] transition-all duration-700 ease-[0.16,1,0.3,1] pl-[96px]`}
    >
      <div className="w-full h-full relative">
        <ArchitectureFlowchart onBack={() => router.push('/app')} />
      </div>
    </motion.main>
  );
}
