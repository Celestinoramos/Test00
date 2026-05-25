import { z } from "zod";

export const createHistorySchema = z.object({
  action: z.string().min(2),
  entity: z.string().min(2),
  entityId: z.number().int().positive().optional(),
  metadata: z.record(z.unknown()).optional(),
});
