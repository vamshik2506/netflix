import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import moviesRoutes from "./routes/movies.js";
import adminRoutes from "./routes/admin.js";

config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/movies", moviesRoutes);
app.use("/admin", adminRoutes);

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`Backend listening on :${PORT}`));
