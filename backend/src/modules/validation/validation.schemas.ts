import { z } from "zod";

export const createValidationSchema = z.object({
  issuanceId: z.number().int().positive(),
  status: z.string().min(3).optional(),
  validatedAt: z.string().datetime().optional(),
});
