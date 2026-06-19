import { Building2, KeyRound, LogOut, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { getCurrentUserMembership } from "@/lib/astra/membership";
import { createCompany, joinCompany } from "../app/actions";
import { signOut } from "../login/actions";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { isConfigured, user, membership } = await getCurrentUserMembership();

  if (isConfigured && !user) {
    redirect(`/${locale}/login`);
  }

  if (membership) {
    redirect(`/${locale}/app`);
  }

  const supabaseConfigured = Boolean(getSupabaseConfig());

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
            <Sparkles className="w-5 h-5 text-white/90" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Set up Astra</h1>
            <p className="text-sm text-white/45">
              Create a company or join one with a short invite code.
            </p>
          </div>
          </div>

          {user?.email && (
            <form action={signOut.bind(null, locale)} className="shrink-0">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <div className="text-right">
                  <p className="text-xs text-white/35">Signed in as</p>
                  <p className="max-w-[220px] truncate text-sm text-white/75">{user.email}</p>
                </div>
                <button
                  type="submit"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white"
                  aria-label="Use another account"
                  title="Use another account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        {!supabaseConfigured && (
          <div className="mb-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            Supabase is not configured yet. Add the environment variables before onboarding users.
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-emerald-400/20 bg-emerald-400/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-emerald-50">Create company</h2>
                <p className="text-sm text-emerald-50/65">You become the first owner.</p>
              </div>
            </div>

            <form action={createCompany.bind(null, locale)} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">Company name</span>
                <input
                  name="companyName"
                  type="text"
                  required
                  placeholder="Acme Inc."
                  className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-emerald-300/40"
                />
              </label>
              <button
                type="submit"
                disabled={!supabaseConfigured}
                className="w-full rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create company
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-blue-400/20 bg-blue-400/10 flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-50">Join company</h2>
                <p className="text-sm text-blue-50/65">Use the 6-character invite code.</p>
              </div>
            </div>

            <form action={joinCompany.bind(null, locale)} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-white/60">Company code</span>
                <input
                  name="joinCode"
                  type="text"
                  required
                  maxLength={8}
                  placeholder="A7K2Q9"
                  className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 font-mono text-sm uppercase tracking-[0.22em] text-white outline-none placeholder:text-white/25 focus:border-blue-300/40"
                />
              </label>
              <button
                type="submit"
                disabled={!supabaseConfigured}
                className="w-full rounded-xl bg-blue-100 px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Join company
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
