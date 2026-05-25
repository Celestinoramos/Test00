import { Router } from "express";
import { createHistoryHandler, listHistoryHandler } from "./history.controller";

const router = Router();

router.get("/", listHistoryHandler);
router.post("/", createHistoryHandler);

export { router as historyRouter };
