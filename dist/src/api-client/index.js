import axios from "axios";
import config from "../config";
import logger from "../logger";
export class ApiClient {
    apiInstance;
    constructor() {
        this.apiInstance = axios.create({
            baseURL: config.API_ENDPOINT,
        });
    }
    async makeRequest(config) {
        let response = {};
        try {
            response = await this.apiInstance.request(config);
        }
        catch (error) {
            logger.error(error);
        }
        return response.data?.body || {};
    }
}
//# sourceMappingURL=index.js.map