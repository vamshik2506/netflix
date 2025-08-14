import { useEffect, useState } from "react";
import { authHeader, clearToken, API_BASE } from "../utils/auth";
import { Link } from "react-router-dom";

type Movie = { id: string; title: string; description?: string; category: string };

const CATS = ["All","Drama","Comedy","Action","Thriller","Horror","Romance","Sci-Fi","Documentary"];

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  async function loadMovies() {
    const url = cat === "All" ? `${API_BASE}/movies` : `${API_BASE}/movies?category=${encodeURIComponent(cat)}`;
    const res = await fetch(url, { headers: { ...authHeader() } });
    if (res.ok) setMovies(await res.json());
  }
  async function search() {
    const url = `${API_BASE}/movies/search?q=${encodeURIComponent(q)}${cat!=="All" ? `&category=${encodeURIComponent(cat)}` : ""}`;
    const res = await fetch(url, { headers: { ...authHeader() } });
    if (res.ok) setMovies(await res.json());
  }
  async function play(id: string) {
    const res = await fetch(`${API_BASE}/movies/${id}`, { headers: { ...authHeader() } });
    if (!res.ok) return;
    const data = await res.json();
    // quick open; replace with <video> modal if you prefer
    window.open(data.streamUrl, "_blank");
  }

  useEffect(() => { loadMovies(); }, [cat]);

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4 items-center">
        <select className="bg-zinc-800 p-2 rounded" value={cat} onChange={e=>setCat(e.target.value)}>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="bg-zinc-800 p-2 rounded" placeholder="Search title..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="bg-red-600 p-2 rounded" onClick={search}>Search</button>
        <Link className="ml-auto underline" to="/admin/upload">Admin Upload</Link>
        <button className="bg-zinc-700 p-2 rounded" onClick={()=>{ clearToken(); window.location.href="/login"; }}>Logout</button>
      </div>

      <ul className="space-y-2">
        {movies.map(m => (
          <li key={m.id} className="bg-zinc-900 p-3 rounded flex justify-between">
            <div>
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm text-zinc-400">{m.category}</div>
              {m.description && <div className="text-xs text-zinc-500">{m.description}</div>}
            </div>
            <button className="bg-red-600 p-2 rounded h-10 my-auto" onClick={() => play(m.id)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
