"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("users");
    });
}
exports.down = down;
