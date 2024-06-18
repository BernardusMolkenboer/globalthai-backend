import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.string("role").notNullable().defaultTo("user"); // User role
    table.string("profile_picture").nullable(); // Profile picture URL
    table.string("phone_number").nullable(); // Phone number
    table.string("address").nullable(); // Address
    table.string("city").nullable(); // City
    table.string("country").nullable(); // Country
    table.timestamp("last_logged_in").nullable(); // Last login timestamp
    table.timestamp("password_changed_at").nullable(); // Password changed timestamp
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Creation timestamp
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Update timestamp
    table.boolean("is_active").notNullable().defaultTo(true); // Account active status
    table.boolean("is_verified").notNullable().defaultTo(false); // Email verification status
    table.string("verification_token").nullable(); // Email verification token
    table.timestamp("verification_token_expires").nullable(); // Email verification toke expiration
    table.string("reset_password_token").nullable(); // Password reset token
    table.timestamp("reset_password_token_expires").nullable(); // Password reset token expiration
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
