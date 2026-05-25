import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";
import {
  createCertificate,
  deleteCertificate,
  getCertificate,
  listCertificates,
  updateCertificate,
} from "./certificates.service";
import {
  createCertificateSchema,
  updateCertificateSchema,
} from "./certificates.schemas";

export async function listCertificatesHandler(_req: Request, res: Response) {
  const certificates = await listCertificates();
  res.json(certificates);
}

export async function getCertificateHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const certificate = await getCertificate(id);

  if (!certificate) {
    throw new AppError("Certificate not found", 404);
  }

  res.json(certificate);
}

export async function createCertificateHandler(req: Request, res: Response) {
  const payload = createCertificateSchema.parse(req.body);
  const certificate = await createCertificate(payload);
  res.status(201).json(certificate);
}

export async function updateCertificateHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const payload = updateCertificateSchema.parse(req.body);
  const updated = await updateCertificate(id, payload);

  if (!updated) {
    throw new AppError("Certificate not found", 404);
  }

  res.json(updated);
}

export async function deleteCertificateHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await deleteCertificate(id);

  if (!deleted) {
    throw new AppError("Certificate not found", 404);
  }

  res.status(204).send();
}
