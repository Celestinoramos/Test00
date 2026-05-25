import { db } from "../../db/knex";

export async function getSetting(key: string) {
  return db("settings").where({ key }).first();
}

export async function setSetting(key: string, value?: string) {
  const existing = await getSetting(key);

  if (existing) {
    await db("settings").where({ key }).update({ value, updated_at: db.fn.now() });
    return getSetting(key);
  }

  const [id] = await db("settings").insert({ key, value });
  return db("settings").where({ id }).first();
}
