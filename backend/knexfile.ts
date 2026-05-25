import dotenv from "dotenv";
import type { Knex } from "knex";

dotenv.config();

const sqliteFilename = process.env.DB_FILENAME || "./data/dev.sqlite";

const mysqlConfig: Knex.MySql2ConnectionConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "gce",
};

const config: Record<string, Knex.Config> = {
  development: {
    client: "sqlite3",
    connection: {
      filename: sqliteFilename,
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
  production: {
    client: "mysql2",
    connection: mysqlConfig,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
};

export default config;
