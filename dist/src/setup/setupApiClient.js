import { ApiClient } from "../api-client";
const setupApiClient = (app) => {
    app.use((req, _, next) => {
        req.apiClient = new ApiClient();
        next();
    });
};
export default setupApiClient;
//# sourceMappingURL=setupApiClient.js.map