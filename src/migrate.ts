import knex from "knex";
import knexConfig from "./knexfile"; // Ensure this path is correct

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const db = knex(config);

async function runMigrations() {
  try {
    await db.migrate.latest({
      directory: "./dist/migrations", // Ensure this path matches your actual structure
    });
    console.log("Migrations are finished.");
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    await db.destroy();
  }
}

runMigrations();
