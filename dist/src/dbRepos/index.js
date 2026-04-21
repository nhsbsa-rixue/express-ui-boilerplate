"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCsvToArray = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
/**
 * This assignment uses csv-parser
 * Use csv as mock DB services
 *
 * In actual implementation, replace this with a real database service
 *
 * @param filePath
 * @returns
 */
const readCsvToArray = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        node_fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
};
exports.readCsvToArray = readCsvToArray;
//# sourceMappingURL=index.js.map