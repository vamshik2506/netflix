import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { uploadToS3 } from "../services/s3.js";
import { createMovie } from "../services/db.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 * 1024 } }); // 2GB

router.use(requireAuth, requireAdmin);

const metaSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["Drama","Comedy","Action","Thriller","Horror","Romance","Sci-Fi","Documentary"]).or(z.string().min(1))
});

// POST /admin/upload (multipart: file, title, description, category)
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file is required" });

  const parsed = metaSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const { title, description, category } = parsed.data;

  const key = `videos/${Date.now()}-${req.file.originalname}`;
  const contentType = req.file.mimetype || "video/mp4";
  await uploadToS3(key, req.file.buffer, contentType);

  const movie = await createMovie({ title, description, category, s3Key: key });
  res.status(201).json(movie);
});

export default router;
