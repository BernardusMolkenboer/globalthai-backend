import express from "express";
import cors from "cors";
import knex from "knex";
import knexConfig from "./knexfile";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";
import propertyRoutes from "./routes/properties";

const app = express();
const environment = process.env.NODE_ENV || "development";
const config = knexConfig[environment];
const db = knex(config);

// Function to test database connection
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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://127.0.0.1:3000", // Replace with your frontend URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
