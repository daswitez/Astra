import { getSupabaseConfig } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserMembership() {
  if (!getSupabaseConfig()) {
    return { isConfigured: false, user: null, membership: null };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isConfigured: true, user: null, membership: null };
  }

  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  return { isConfigured: true, user, membership };
}

