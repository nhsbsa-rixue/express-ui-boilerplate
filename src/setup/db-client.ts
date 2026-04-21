import type { NextFunction, Response } from "express";
import { readCsvToArray } from "../dbRepos";

const setupDBClient = (app: App) => {
  app.use(async (req, _res: Response, next: NextFunction) => {
    req.users = await readCsvToArray<User>("src/dbRepos/users.csv");
    req.products = await readCsvToArray<Product>("src/dbRepos/products.csv");
    req.watching = await readCsvToArray<WatchEntry>("src/dbRepos/watching.csv");
    next();
  });
};

export default setupDBClient;
