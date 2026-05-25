import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";
import { createValidationSchema } from "./validation.schemas";
import { createValidation, getValidation, listValidations } from "./validation.service";

export async function listValidationsHandler(_req: Request, res: Response) {
  const validations = await listValidations();
  res.json(validations);
}

export async function getValidationHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const validation = await getValidation(id);

  if (!validation) {
    throw new AppError("Validation not found", 404);
  }

  res.json(validation);
}

export async function createValidationHandler(req: Request, res: Response) {
  const payload = createValidationSchema.parse(req.body);
  const validation = await createValidation({
    issuance_id: payload.issuanceId,
    status: payload.status,
    validated_at: payload.validatedAt,
    validated_by: req.user?.sub,
  });
  res.status(201).json(validation);
}
