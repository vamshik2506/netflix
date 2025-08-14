import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getMovieById, listMovies, searchMovies } from "../services/db.js";
import { presign } from "../services/s3.js";

const router = Router();
router.use(requireAuth);

// GET /movies?category=Drama
router.get("/", async (req, res) => {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const items = await listMovies(category);
  res.json(items);
});

// GET /movies/search?q=term&category=Drama
router.get("/search", async (req, res) => {
  const q = String(req.query.q || "").trim();
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  if (!q) return res.status(400).json({ error: "q is required" });
  const items = await searchMovies(q, category);
  res.json(items);
});

// GET /movies/:id -> details + signed stream URL
router.get("/:id", async (req, res) => {
  const movie = await getMovieById(req.params.id);
  if (!movie) return res.status(404).json({ error: "Not found" });
  const url = await presign(movie.s3Key);
  res.json({ ...movie, streamUrl: url });
});

export default router;
