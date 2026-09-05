import { createSupabaseServerClient } from "./supabase/server";

/**
 * بترجع الـ userId تبع المستخدم المسجل دخوله حالياً (Supabase Auth).
 * بترجع null إذا ما في مستخدم مسجل دخول (Unauthorized).
 *
 * ملاحظة: الـ userId يلي بترجعه هون هو نفسه auth.users.id بجدول Supabase،
 * فلازم يكون Foreign Key بجدول User بالـ Prisma Schema مطابق لنفس الـ id.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}
