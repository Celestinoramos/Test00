import type { Knex } from "knex";
import { hashPassword } from "../../shared/utils/hash";

export async function seed(knex: Knex): Promise<void> {
  const username = process.env.ADMIN_USER || "admin";
  const password = process.env.ADMIN_PASS || "admin123";
  const existing = await knex("users").where({ username }).first();

  if (existing) {
    return;
  }

  const passwordHash = await hashPassword(password);

  await knex("users").insert({
    username,
    password_hash: passwordHash,
    role: "admin",
  });
}
