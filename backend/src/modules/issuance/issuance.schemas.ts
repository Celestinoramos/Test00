import { z } from "zod";

export const createIssuanceSchema = z.object({
  studentId: z.number().int().positive(),
  certificateId: z.number().int().positive(),
  issuedAt: z.string().datetime().optional(),
});
