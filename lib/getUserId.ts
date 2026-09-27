const STORAGE_KEY = "fitplate_user_id";

/**
 * Returns a unique ID for this browser TAB SESSION, creating one the
 * first time it's called and storing it in sessionStorage (not
 * localStorage). This means:
 * - Navigating between pages in the same tab keeps the same identity,
 *   so saving a meal and viewing it on the Saved page still works.
 * - Closing the tab or browser wipes it, so the next visit starts
 *   completely fresh with an empty profile — no memory carried over.
 *
 * Returns an empty string during server-side rendering (sessionStorage
 * doesn't exist there); callers should treat "" as "not ready yet" and
 * wait for the client-side value before fetching user-specific data.
 */
export function getUserId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let id = sessionStorage.getItem(STORAGE_KEY);

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(STORAGE_KEY, id);
  }

  return id;
}