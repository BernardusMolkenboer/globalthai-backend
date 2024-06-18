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
exports.Entity = void 0;
const db_1 = __importDefault(require("../services/db"));
const Logs_1 = require("./Logs");
const Logger_1 = require("./Logger");
class Entity {
    setId(id) {
        this.id = id;
        return this;
    }
    getId() {
        return this.id;
    }
    static getTable() {
        return this.table;
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)(this.table).first().where("id", id);
        });
    }
    static getByColumn(column_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (column, value, one = true) {
            let qb = (0, db_1.default)(this.table).where(column, value);
            return one ? yield qb.first() : yield qb;
        });
    }
    static getByColumns(params_1) {
        return __awaiter(this, arguments, void 0, function* (params, one = true) {
            let qb = (0, db_1.default)(this.table).where(params);
            return one ? yield qb.first() : yield qb;
        });
    }
    static getQueryBuilder() {
        return (0, db_1.default)(this.table);
    }
    _save(data, table) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                const id = yield (0, db_1.default)(table)
                    .where({ id: this.id })
                    .update(data)
                    .returning("id");
                return id[0];
            }
            else {
                const id = yield (0, db_1.default)(table).insert(data).returning("id");
                this.id = id[0];
                return this.id;
            }
        });
    }
    static linkLog(id, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let linkTable = this.table + "_" + Logs_1.Logs.getTable(), entityIdField = this.table.substring(0, this.table.length - 1) + "_id", params = {};
            params[entityIdField] = id;
            ids.forEach((logId) => __awaiter(this, void 0, void 0, function* () {
                params["log_id"] = logId;
                yield (0, db_1.default)(linkTable).insert(params);
            }));
        });
    }
    static note(id, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let ids = yield Logger_1.Logger.note(...messages);
            this.linkLog(id, ids);
            return ids;
        });
    }
    static error(id, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let ids = yield Logger_1.Logger.error(...messages);
            this.linkLog(id, ids);
            return ids;
        });
    }
    static warning(id, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let ids = yield Logger_1.Logger.warning(...messages);
            this.linkLog(id, ids);
            return ids;
        });
    }
    static debug(id, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let ids = yield Logger_1.Logger.debug(...messages);
            this.linkLog(id, ids);
            return ids;
        });
    }
}
exports.Entity = Entity;
