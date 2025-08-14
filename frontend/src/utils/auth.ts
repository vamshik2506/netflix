export function saveToken(token: string) { localStorage.setItem("token", token); }
export function getToken() { return localStorage.getItem("token"); }
export function clearToken() { localStorage.removeItem("token"); }
export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
