import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client للاستخدام جوا Client Components ("use client").
 * منستخدمه بصفحات زي Login / Signup.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
