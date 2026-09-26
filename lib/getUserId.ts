const STORAGE_KEY = "fitplate_user_id";

/**
 * Returns a unique ID for this browser, creating and persisting one in
 * localStorage the first time it's called. This lets each visitor have
 * their own separate profile, saved meals, and plan — without needing a
 * real login system.
 *
 * Returns an empty string during server-side rendering (localStorage
 * doesn't exist there); callers should treat "" as "not ready yet" and
 * wait for the client-side value before fetching user-specific data.
 */
export function getUserId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let id = localStorage.getItem(STORAGE_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }

  return id;
}
