import GlobalNav from "../../../components/GlobalNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden selection:bg-white/20">
      {/* 
        =========================================================
        ZONE A: UNIVERSAL GLOBAL NAVIGATION (Z: 30)
        =========================================================
      */}
      <GlobalNav />
      
      {/* Render the specific page content (Home Hub or Flowchart) */}
      {children}
    </div>
  );
}
