import { Express } from "express";
import { ApiClient } from "../api-client";

const setupApiClient = (app: Express) => {
  app.use((req, _, next) => {
    req.apiClient = new ApiClient();
    next();
  });
};

export default setupApiClient;