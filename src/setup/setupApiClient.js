import { ApiClient } from "../api-client/index.js";

const setupApiClient = (app) => {
  app.use((req, _, next) => {
    req.apiClient = new ApiClient();
    next();
  });
};

export default setupApiClient;