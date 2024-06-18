import knex from "knex";
import knexConfig from "../knexfile";
import "dotenv/config";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const db = knex(config);

export default db;
