import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { signInWithEmail } from "./actions";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;
  const isConfigured = Boolean(getSupabaseConfig());

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
            <Sparkles className="w-5 h-5 text-white/90" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Sign in to Astra</h1>
            <p className="text-sm text-white/40">Welcome back</p>
          </div>
        </div>

        {!isConfigured && (
          <div className="mb-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            Supabase is not configured. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>.
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
            {decodeURIComponent(error)}
          </div>
        )}

        <form action={signInWithEmail.bind(null, locale)} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Work email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Your password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
            />
          </label>
          <button
            type="submit"
            disabled={!isConfigured}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/40">
          Don&apos;t have an account?{" "}
          <Link href="/register" locale={locale} className="text-white/70 hover:text-white transition-colors underline underline-offset-2">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
