import { NextRequest } from "next/server";

export function getUserId(req: NextRequest): string | null {
  const fromHeader = req.headers.get("x-user-id");
  if (fromHeader) return fromHeader;

  const { searchParams } = new URL(req.url);
  const fromQuery = searchParams.get("userId");
  if (fromQuery) return fromQuery;

  return null;
}