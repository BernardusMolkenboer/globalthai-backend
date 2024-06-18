"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Load environment variables from .env file
const config = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DEV_DATABASE_HOST || "127.0.0.1",
            port: parseInt(process.env.DATABASE_PORT || "3306", 10),
            user: process.env.DEV_DATABASE_USER || "root",
            password: process.env.DEV_DATABASE_PASS || "W4chtw00rd!23",
            database: process.env.DEV_DATABASE_DB || "realty_db",
        },
        pool: { min: 0, max: 10 },
        migrations: {
            tableName: "knex_migrations",
            directory: path_1.default.resolve(__dirname, "src", "migrations"), // Adjust as per your project structure
            extension: "ts", // Use TypeScript extension for development
        },
    },
    production: {
        client: "mysql2",
        connection: {
            host: process.env.PROD_DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT || "3306", 10),
            user: process.env.PROD_DATABASE_USER,
            password: process.env.PROD_DATABASE_PASS,
            database: process.env.PROD_DATABASE_DB,
        },
        pool: { min: 0, max: 10 },
        migrations: {
            directory: path_1.default.resolve(__dirname, "dist", "migrations"), // Absolute path to the dist migrations directory
            extension: "js", // Use JavaScript extension for production
        },
    },
};
exports.default = config;
