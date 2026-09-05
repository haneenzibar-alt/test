import { NextRequest } from "next/server";

// ⚠️ TODO: مؤقت بدون auth حقيقي - بياخد userId من header أو query أو body
// لما يجهز نظام تسجيل الدخول، بدّل هاد المحتوى بقراءة الـ userId من الـ session/cookie
export function getUserId(req: NextRequest): string | null {
  const fromHeader = req.headers.get("x-user-id");
  if (fromHeader) return fromHeader;

  const { searchParams } = new URL(req.url);
  const fromQuery = searchParams.get("userId");
  if (fromQuery) return fromQuery;

  return null;
}