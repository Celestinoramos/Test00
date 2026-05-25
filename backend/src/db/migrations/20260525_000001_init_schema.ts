import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 64).notNullable().unique();
    table.string("password_hash", 255).notNullable();
    table.string("role", 32).notNullable().defaultTo("admin");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("students", (table) => {
    table.increments("id").primary();
    table.string("name", 120).notNullable();
    table.string("email", 120);
    table.string("document", 60);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("certificates", (table) => {
    table.increments("id").primary();
    table.string("title", 120).notNullable();
    table.text("description");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("issuances", (table) => {
    table.increments("id").primary();
    table
      .integer("student_id")
      .notNullable()
      .references("id")
      .inTable("students")
      .onDelete("CASCADE");
    table
      .integer("certificate_id")
      .notNullable()
      .references("id")
      .inTable("certificates")
      .onDelete("CASCADE");
    table
      .integer("created_by")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.timestamp("issued_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("validations", (table) => {
    table.increments("id").primary();
    table
      .integer("issuance_id")
      .notNullable()
      .references("id")
      .inTable("issuances")
      .onDelete("CASCADE");
    table.string("status", 30).notNullable().defaultTo("pending");
    table
      .integer("validated_by")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.timestamp("validated_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("history", (table) => {
    table.increments("id").primary();
    table.string("action", 50).notNullable();
    table.string("entity", 50).notNullable();
    table.integer("entity_id");
    table
      .integer("actor_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.text("metadata");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("settings", (table) => {
    table.increments("id").primary();
    table.string("key", 80).notNullable().unique();
    table.text("value");
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("settings");
  await knex.schema.dropTableIfExists("history");
  await knex.schema.dropTableIfExists("validations");
  await knex.schema.dropTableIfExists("issuances");
  await knex.schema.dropTableIfExists("certificates");
  await knex.schema.dropTableIfExists("students");
  await knex.schema.dropTableIfExists("users");
}
