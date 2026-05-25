import { db } from "../../db/knex";

export async function listValidations() {
  return db("validations").select("*").orderBy("id", "desc");
}

export async function getValidation(id: number) {
  return db("validations").where({ id }).first();
}

export async function createValidation(data: {
  issuance_id: number;
  status?: string;
  validated_by?: number;
  validated_at?: string;
}) {
  const [id] = await db("validations").insert(data);
  return getValidation(Number(id));
}
