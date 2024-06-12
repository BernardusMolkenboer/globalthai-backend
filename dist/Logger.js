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
exports.Logger = void 0;
const app_1 = __importDefault(require("./app"));
const Logs_1 = require("./Logs");
class Logger {
    static insert(level, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = (0, app_1.default)(Logs_1.Logs.getTable());
            let insertedIds = [];
            for (let i = 0; i < messages.length; i++) {
                let id = yield table.insert({ message: messages[i], level: level });
                insertedIds.push(id[0]);
            }
            return insertedIds;
        });
    }
    static note(...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            return Logger.insert("note", ...messages);
        });
    }
    static error(...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            return Logger.insert("error", ...messages);
        });
    }
    static warning(...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            return Logger.insert("warning", ...messages);
        });
    }
    static debug(...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            return Logger.insert("debug", ...messages);
        });
    }
}
exports.Logger = Logger;
