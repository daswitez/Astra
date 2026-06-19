"use server";

import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function signInWithEmail(locale: string, formData: FormData) {
  if (!getSupabaseConfig()) {
    redirect(`/${locale}/login?error=supabase-not-configured`);
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email) redirect(`/${locale}/login?error=email-required`);
  if (!password) redirect(`/${locale}/login?error=password-required`);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/${locale}/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/${locale}/onboarding`);
}

export async function signOut(locale: string) {
  if (getSupabaseConfig()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect(`/${locale}/login`);
}
