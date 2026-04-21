"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../logger"));
class ApiClient {
    apiInstance;
    constructor() {
        this.apiInstance = axios_1.default.create({
            baseURL: config_1.default.API_ENDPOINT,
        });
    }
    async makeRequest(config) {
        let response;
        try {
            response = await this.apiInstance.request(config);
        }
        catch (error) {
            logger_1.default.error(error);
        }
        return response?.data?.body || {};
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=index.js.map