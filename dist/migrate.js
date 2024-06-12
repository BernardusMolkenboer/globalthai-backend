"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/migrate.ts
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile")); // Adjusted path
const environment = process.env.NODE_ENV || "development";
const config = knexfile_1.default[environment];
const db = (0, knex_1.default)(config);
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
