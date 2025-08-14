import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export type JwtUser = { id: string; email: string; role: "admin" | "user" };

declare global {
  namespace Express {
    interface Request { user?: JwtUser }
  }
}

export function signJwt(u: JwtUser) {
  return jwt.sign(u, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization");
  if (!header) return res.status(401).json({ error: "Missing Authorization header" });
  const token = header.replace(/^Bearer\s+/i, "");
  try {
    req.user = jwt.verify(token, JWT_SECRET) as JwtUser;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}
