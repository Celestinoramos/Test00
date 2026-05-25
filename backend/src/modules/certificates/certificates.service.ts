import { db } from "../../db/knex";

export async function listCertificates() {
  return db("certificates").select("*").orderBy("id", "desc");
}

export async function getCertificate(id: number) {
  return db("certificates").where({ id }).first();
}

export async function createCertificate(data: { title: string; description?: string }) {
  const [id] = await db("certificates").insert(data);
  return getCertificate(Number(id));
}

export async function updateCertificate(
  id: number,
  data: Partial<{ title: string; description?: string }>,
) {
  await db("certificates").where({ id }).update(data);
  return getCertificate(id);
}

export async function deleteCertificate(id: number) {
  return db("certificates").where({ id }).delete();
}
