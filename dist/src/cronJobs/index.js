"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCronJobs = exports.sendAlert = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dbRepos_1 = require("../dbRepos");
const logger_1 = __importDefault(require("../logger"));
const mockEmailService = (emailsToSend) => {
    emailsToSend.forEach((email) => {
        logger_1.default.info(`Sending email to: ${email.to}`);
        logger_1.default.info(`Subject: ${email.subject}`);
        logger_1.default.info(`Body: ${email.body}`);
    });
};
const sendAlert = async (alertType) => {
    logger_1.default.info(`${alertType === "day" ? "Morning" : "Night"} alert`);
    const products = await (0, dbRepos_1.readCsvToArray)("src/dbRepos/products.csv");
    const watching = await (0, dbRepos_1.readCsvToArray)("src/dbRepos/watching.csv");
    const filtered = watching.filter((record) => record.fullDayAlert === "true" || record[`${alertType}Alert`] === "true");
    const emailsToSend = [];
    for (const watch of filtered) {
        const product = products.find((p) => p.id === watch.productId);
        if (product && watch.desiredPrice > product.price) {
            logger_1.default.info(`Sending ${alertType} alert for product ${product.name}`);
            emailsToSend.push({
                to: watch.userEmail,
                subject: `Price Alert: ${product.name}`,
                body: `The price of ${product.name} has dropped below your desired price of ${watch.desiredPrice}. Current price: ${product.price}.`,
            });
        }
    }
    mockEmailService(emailsToSend);
};
exports.sendAlert = sendAlert;
const setupCronJobs = () => {
    // Job 1: Runs every morning at 8am
    node_cron_1.default.schedule("0 8 * * *", () => sendAlert("day"));
    // Job 2: Runs every day at midnight
    node_cron_1.default.schedule("0 0 * * *", () => sendAlert("night"));
};
exports.setupCronJobs = setupCronJobs;
//# sourceMappingURL=index.js.map