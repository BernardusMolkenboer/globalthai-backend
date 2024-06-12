"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DATABASE_HOST || "127.0.0.1",
            port: parseInt(process.env.DATABASE_PORT || "3306", 10),
            user: process.env.DATABASE_USER || "root",
            password: process.env.DATABASE_PASS || "W4chtw00rd!23",
            database: process.env.DATABASE_DB || "realty_db",
        },
        pool: { min: 0, max: 10 },
        migrations: {
            tableName: "knex_migrations",
            directory: "./migrations",
            extension: "ts", // Ensure migrations are created as .ts files
        },
    },
    production: {
        client: "mysql2",
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || "3306", 10),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            database: process.env.DATABASE_DB,
        },
        pool: { min: 0, max: 10 },
        migrations: {
            directory: "./migrations",
            extension: "ts", // Ensure migrations are created as .ts files
        },
    },
};
exports.default = config;
