import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";
import { createIssuanceSchema } from "./issuance.schemas";
import { createIssuance, getIssuance, listIssuances } from "./issuance.service";

export async function listIssuancesHandler(_req: Request, res: Response) {
  const issuances = await listIssuances();
  res.json(issuances);
}

export async function getIssuanceHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const issuance = await getIssuance(id);

  if (!issuance) {
    throw new AppError("Issuance not found", 404);
  }

  res.json(issuance);
}

export async function createIssuanceHandler(req: Request, res: Response) {
  const payload = createIssuanceSchema.parse(req.body);
  const issuance = await createIssuance({
    student_id: payload.studentId,
    certificate_id: payload.certificateId,
    issued_at: payload.issuedAt,
    created_by: req.user?.sub,
  });
  res.status(201).json(issuance);
}
