import { db } from "../../db/knex";

export async function listIssuances() {
  return db("issuances").select("*").orderBy("id", "desc");
}

export async function getIssuance(id: number) {
  return db("issuances").where({ id }).first();
}

export async function createIssuance(data: {
  student_id: number;
  certificate_id: number;
  created_by?: number;
  issued_at?: string;
}) {
  const [id] = await db("issuances").insert(data);
  return getIssuance(Number(id));
}
