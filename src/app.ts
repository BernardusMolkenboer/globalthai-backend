import express from "express";
import cors from "cors";
import knex from "knex";
import knexConfig from "./knexfile";
import "dotenv/config";
import authRoutes from "./routes/auth";
import propertyRoutes from "./routes/properties";

const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const db = knex(config);

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.globalthairealty.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// Test database connection
const testConnection = async () => {
  try {
    const result = await db.raw("SELECT 1+1 AS result");
    console.log("Database connected:", result[0][0].result);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

testConnection();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

export default db;
