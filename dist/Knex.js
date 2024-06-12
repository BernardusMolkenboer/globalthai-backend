"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexInstance = void 0;
require("dotenv/config");
const knex_1 = require("knex");
exports.KnexInstance = (0, knex_1.knex)({
    client: "mysql2",
    connection: {
        host: process.env.DATABASE_HOST || "127.0.0.1",
        port: parseInt(process.env.DATABASE_PORT || "3306", 10),
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASS || "W4chtw00rd!23",
        database: process.env.DATABASE_DB || "realty_db",
    },
    pool: { min: 0, max: 10 },
});
