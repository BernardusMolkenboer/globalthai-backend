import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("blog_posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("slug").notNullable().unique();
    table.text("description");
    table.text("content");
    table.string("thumbnail_image");
    table.string("header_image");
    table.string("meta_title");
    table.text("meta_description");
    table.integer("author_id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("blog_posts");
}
