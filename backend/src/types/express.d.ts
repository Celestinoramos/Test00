import type { AuthPayload } from "../shared/middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};
