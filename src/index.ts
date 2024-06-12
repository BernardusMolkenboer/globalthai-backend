import http from "http";
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

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("App is running...\n");
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

export default db;
