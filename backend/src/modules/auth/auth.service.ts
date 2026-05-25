import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { db } from "../../db/knex";
import { AppError } from "../../shared/errors/app-error";
import { verifyPassword } from "../../shared/utils/hash";

export async function login(username: string, password: string) {
  const user = await db("users").where({ username }).first();

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: "8h",
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
}
