"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
require("dotenv/config");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const properties_1 = __importDefault(require("./routes/properties"));
const app = (0, express_1.default)();
const environment = process.env.NODE_ENV || "development";
const config = knexfile_1.default[environment];
const db = (0, knex_1.default)(config);
// Function to test database connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.raw("SELECT 1+1 AS result");
        console.log("Database connected:", result[0][0].result);
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
});
testConnection();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:3000", // Replace with your frontend URL
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
// Route handlers
app.use("/api/auth", authRoutes_1.default);
app.use("/api/properties", properties_1.default);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
