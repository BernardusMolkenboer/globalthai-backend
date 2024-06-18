import express from "express";
import cors from "cors";
import knex from "knex";
import knexConfig from "./knexfile";
import "dotenv/config";
import authRoutes from "./routes/auth";
import propertyRoutes from "./routes/properties";

const app = express();
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

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for your frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
