// TEMPORARY: hardcoded user so you can build/test without auth wired up yet.
// Replace this with real session lookup once NextAuth is set up.
export async function getCurrentUserId(): Promise<string | null> {
  return "test-user-1";
}
