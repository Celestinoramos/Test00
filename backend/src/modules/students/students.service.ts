import { db } from "../../db/knex";

export async function listStudents() {
  return db("students").select("*").orderBy("id", "desc");
}

export async function getStudent(id: number) {
  return db("students").where({ id }).first();
}

export async function createStudent(data: {
  name: string;
  email?: string;
  document?: string;
}) {
  const [id] = await db("students").insert(data);
  return getStudent(Number(id));
}

export async function updateStudent(
  id: number,
  data: Partial<{ name: string; email?: string; document?: string }>,
) {
  await db("students").where({ id }).update(data);
  return getStudent(id);
}

export async function deleteStudent(id: number) {
  return db("students").where({ id }).delete();
}
