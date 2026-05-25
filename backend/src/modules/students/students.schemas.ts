import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  document: z.string().min(3).optional(),
});

export const updateStudentSchema = createStudentSchema.partial();
