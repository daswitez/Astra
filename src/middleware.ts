import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getSupabaseConfig } from './lib/supabase/config';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  const config = getSupabaseConfig();

  if (!config) {
    return response;
  }

  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const localeMatch = request.nextUrl.pathname.match(/^\/(en|es|fr)(\/.*)?$/);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;
  const localizedPath = localeMatch?.[2] ?? request.nextUrl.pathname;
  const isProtectedAppRoute = localizedPath.startsWith('/app');
  const isOnboardingRoute = localizedPath.startsWith('/onboarding');
  const isLoginRoute = localizedPath.startsWith('/login');

  if ((isProtectedAppRoute || isOnboardingRoute) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/login`;
    redirectUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/onboarding`;
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|fr)/:path*']
};
