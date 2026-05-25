import { db } from "../../db/knex";

export async function listHistory() {
  return db("history").select("*").orderBy("id", "desc");
}

export async function createHistory(data: {
  action: string;
  entity: string;
  entity_id?: number;
  actor_id?: number;
  metadata?: string;
}) {
  const [id] = await db("history").insert(data);
  return db("history").where({ id }).first();
}
