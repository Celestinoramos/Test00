import dotenv from "dotenv";

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";

export const env = {
  nodeEnv,
  port: Number(process.env.PORT || 5050),
  jwtSecret: process.env.JWT_SECRET || "change-me",
};
