import { Router } from "express";
import {
  createCertificateHandler,
  deleteCertificateHandler,
  getCertificateHandler,
  listCertificatesHandler,
  updateCertificateHandler,
} from "./certificates.controller";

const router = Router();

router.get("/", listCertificatesHandler);
router.get("/:id", getCertificateHandler);
router.post("/", createCertificateHandler);
router.put("/:id", updateCertificateHandler);
router.delete("/:id", deleteCertificateHandler);

export { router as certificatesRouter };
