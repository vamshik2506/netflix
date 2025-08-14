import { useState } from "react";
import { authHeader, API_BASE } from "../utils/auth";

const CATS = ["Drama","Comedy","Action","Thriller","Horror","Romance","Sci-Fi","Documentary"];

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setErr(null);
    if (!file) { setErr("Choose a video file"); return; }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);

    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: "POST",
      headers: { ...authHeader() },
      body: fd
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error || "Upload failed"); return; }
    setMsg("Uploaded!");
    setTitle(""); setDescription(""); setCategory(CATS[0]); setFile(null);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Upload Video</h1>
      {msg && <div className="text-green-400">{msg}</div>}
      {err && <div className="text-red-400">{err}</div>}
      <form className="space-y-3 max-w-xl" onSubmit={submit}>
        <input className="w-full p-2 rounded bg-zinc-800" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full p-2 rounded bg-zinc-800" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <select className="w-full p-2 rounded bg-zinc-800" value={category} onChange={e=>setCategory(e.target.value)}>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="w-full p-2 rounded bg-zinc-800" type="file" accept="video/*" onChange={e=>setFile(e.target.files?.[0] || null)} />
        <button className="p-2 rounded bg-red-600 hover:bg-red-700">Upload</button>
      </form>
    </div>
  );
}
