import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import logger from "../logger";

export class ApiClient {
  apiInstance : AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: config.API_ENDPOINT,
    });
  }

  async makeRequest(config: AxiosRequestConfig) {
    let response: AxiosResponse | undefined;
    try {
      response = await this.apiInstance.request(config);
    } catch (error) {
      logger.error(error);
    }
    return response?.data?.body || {};
  }
}
