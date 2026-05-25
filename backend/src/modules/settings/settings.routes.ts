import { Router } from "express";
import { getSettingHandler, setSettingHandler } from "./settings.controller";

const router = Router();

router.get("/:key", getSettingHandler);
router.put("/:key", setSettingHandler);

export { router as settingsRouter };
