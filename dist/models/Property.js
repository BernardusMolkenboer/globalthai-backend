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
exports.Property = void 0;
const Entity_1 = require("./Entity");
const db_1 = __importDefault(require("../services/db"));
class Property extends Entity_1.Entity {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)(this.table).select("*");
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)(this.table).where({ id }).first();
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [id] = yield (0, db_1.default)(this.table).insert(data).returning("id");
            return id;
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedId] = yield (0, db_1.default)(this.table)
                .where({ id })
                .update(data)
                .returning("id");
            return updatedId;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.default)(this.table).where({ id }).delete();
        });
    }
}
exports.Property = Property;
Property.table = "properties";
