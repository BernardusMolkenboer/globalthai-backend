import "dotenv/config";
import { knex } from "knex";

export const KnexInstance = knex({
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
