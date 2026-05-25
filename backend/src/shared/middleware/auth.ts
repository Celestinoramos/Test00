import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export interface AuthPayload {
  sub: number;
  role: string;
}

export function authRequired(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}
