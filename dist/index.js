"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.knex = void 0;
// src/index.ts
const knex_1 = require("knex");
Object.defineProperty(exports, "knex", { enumerable: true, get: function () { return knex_1.knex; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
