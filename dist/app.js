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
// src/app.ts
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../src/knexfile"));
require("dotenv/config");
const environment = process.env.NODE_ENV || "development";
const config = knexfile_1.default[environment];
const db = (0, knex_1.default)(config);
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.raw("SELECT 1+1 AS result");
        console.log("Database connected:", result[0][0].result);
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
    finally {
        db.destroy();
    }
});
testConnection();
exports.default = db;
