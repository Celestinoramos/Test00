import { Router } from "express";
import {
  createValidationHandler,
  getValidationHandler,
  listValidationsHandler,
} from "./validation.controller";

const router = Router();

router.get("/", listValidationsHandler);
router.get("/:id", getValidationHandler);
router.post("/", createValidationHandler);

export { router as validationRouter };
