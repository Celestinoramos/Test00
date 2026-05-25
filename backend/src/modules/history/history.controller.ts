import type { Request, Response } from "express";
import { createHistorySchema } from "./history.schemas";
import { createHistory, listHistory } from "./history.service";

export async function listHistoryHandler(_req: Request, res: Response) {
  const history = await listHistory();
  res.json(history);
}

export async function createHistoryHandler(req: Request, res: Response) {
  const payload = createHistorySchema.parse(req.body);
  const record = await createHistory({
    action: payload.action,
    entity: payload.entity,
    entity_id: payload.entityId,
    actor_id: req.user?.sub,
    metadata: payload.metadata ? JSON.stringify(payload.metadata) : undefined,
  });
  res.status(201).json(record);
}
