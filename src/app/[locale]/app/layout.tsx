import GlobalNav from "../../../components/GlobalNav";
import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (getSupabaseConfig()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect(`/${locale}/login`);
    }

    const { data: membership } = await supabase
      .from("organization_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!membership) {
      redirect(`/${locale}/onboarding`);
    }
  }

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
