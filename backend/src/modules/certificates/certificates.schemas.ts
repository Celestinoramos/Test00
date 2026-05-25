import { z } from "zod";

export const createCertificateSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});

export const updateCertificateSchema = createCertificateSchema.partial();
