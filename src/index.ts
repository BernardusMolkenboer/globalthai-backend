import knex from "knex";
import knexConfig from "./knexfile";
import "dotenv/config";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const db = knex(config);

const testConnection = async () => {
  try {
    const result = await db.raw("SELECT 1+1 AS result");
    console.log("Database connected:", result[0][0].result);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

testConnection();

// Keep the application running
setInterval(() => {
  console.log("App is running...");
}, 10000); // Log a message every 10 seconds

export default db;
