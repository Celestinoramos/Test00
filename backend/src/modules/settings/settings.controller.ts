import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";
import { getSetting, setSetting } from "./settings.service";
import { setSettingSchema } from "./settings.schemas";

export async function getSettingHandler(req: Request, res: Response) {
  const key = req.params.key;
  const setting = await getSetting(key);

  if (!setting) {
    throw new AppError("Setting not found", 404);
  }

  res.json(setting);
}

export async function setSettingHandler(req: Request, res: Response) {
  const key = req.params.key;
  const payload = setSettingSchema.parse(req.body);
  const setting = await setSetting(key, payload.value);
  res.json(setting);
}
