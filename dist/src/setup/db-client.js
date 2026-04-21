"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbRepos_1 = require("../dbRepos");
const setupDBClient = (app) => {
    app.use(async (req, _res, next) => {
        req.users = await (0, dbRepos_1.readCsvToArray)("src/dbRepos/users.csv");
        req.products = await (0, dbRepos_1.readCsvToArray)("src/dbRepos/products.csv");
        req.watching = await (0, dbRepos_1.readCsvToArray)("src/dbRepos/watching.csv");
        next();
    });
};
exports.default = setupDBClient;
//# sourceMappingURL=db-client.js.map