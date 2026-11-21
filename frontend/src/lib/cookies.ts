export const COOKIE_CHOICE_KEY = "eternova-cookies:v1";
export const COOKIE_CHOICE_EVENT = "eternova-cookies-open";

export type CookieChoice = "all" | "necessary";

export function readCookieChoice(): CookieChoice | null {
  try {
    const value = localStorage.getItem(COOKIE_CHOICE_KEY);
    return value === "all" || value === "necessary" ? value : null;
  } catch {
    return null;
  }
}

export function saveCookieChoice(choice: CookieChoice) {
  try {
    localStorage.setItem(COOKIE_CHOICE_KEY, choice);
  } catch {
    // Private browsing can block storage. The choice still closes the notice.
  }
}

export function requestCookieChoice() {
  try {
    localStorage.removeItem(COOKIE_CHOICE_KEY);
  } catch {
    // The notice can still open if storage is blocked.
  }
  window.dispatchEvent(new Event(COOKIE_CHOICE_EVENT));
}
