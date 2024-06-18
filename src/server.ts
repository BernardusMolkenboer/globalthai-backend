import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for your frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Route handlers
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
