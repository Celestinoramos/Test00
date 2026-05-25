import { Router } from "express";
import {
  createIssuanceHandler,
  getIssuanceHandler,
  listIssuancesHandler,
} from "./issuance.controller";

const router = Router();

router.get("/", listIssuancesHandler);
router.get("/:id", getIssuanceHandler);
router.post("/", createIssuanceHandler);

export { router as issuanceRouter };
