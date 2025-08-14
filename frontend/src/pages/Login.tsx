import { useState } from "react";
import { saveToken, API_BASE } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string| null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      saveToken(data.token);
      window.location.href = "/";
    } catch (e: any) {
      setErr(e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={submit} className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {err && <div className="text-red-400">{err}</div>}
        <input className="w-full p-2 rounded bg-zinc-800" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 rounded bg-zinc-800" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full p-2 rounded bg-red-600 hover:bg-red-700">{loading ? "Signing in..." : "Sign In"}</button>
      </form>
    </div>
  );
}
