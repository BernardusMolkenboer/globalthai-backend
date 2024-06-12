import knex from "knex";
import knexConfig from "./knexfile";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const db = knex(config);

db.migrate
  .latest()
  .then(() => {
    console.log("Migrations are finished.");
    return db.destroy();
  })
  .catch((err) => {
    console.error("Error running migrations:", err);
    return db.destroy();
  });
