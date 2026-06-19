"use server";

import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function signUp(locale: string, formData: FormData) {
  if (!getSupabaseConfig()) {
    redirect(`/${locale}/register?error=supabase-not-configured`);
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email) redirect(`/${locale}/register?error=email-required`);
  if (password.length < 6) redirect(`/${locale}/register?error=password-too-short`);

  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    redirect(`/${locale}/register?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.user) {
    redirect(`/${locale}/register?error=signup-failed`);
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    redirect(`/${locale}/register?error=${encodeURIComponent(signInError.message)}`);
  }

  redirect(`/${locale}/onboarding`);
}
