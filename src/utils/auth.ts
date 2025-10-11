// auth.ts
export const TOKEN_KEY = "X_FR_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY) ?? "";

export function parseJwt<T = any>(token: string): T | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isExpired(token: string, skewSeconds = 15): boolean {
  const payload = parseJwt<{ exp?: number }>(token);
  if (!payload?.exp) return true; // no exp => treat as expired
  const now = Math.floor(Date.now() / 1000);
  return now >= payload.exp - skewSeconds;
}

export function msUntilExpiry(token: string): number {
  const payload = parseJwt<{ exp?: number }>(token);
  if (!payload?.exp) return 0;
  return Math.max(payload.exp * 1000 - Date.now(), 0);
}
