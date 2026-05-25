import type { Request, Response } from "express";
import { loginSchema } from "./auth.schemas";
import { login } from "./auth.service";

export async function loginHandler(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const result = await login(payload.username, payload.password);
  res.json(result);
}
