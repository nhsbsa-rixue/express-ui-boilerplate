import cron from "node-cron";
import { readCsvToArray } from "../dbRepos";
import logger from "../logger";

const mockEmailService = (emailsToSend: Array<EmailTemplate>) => {
  emailsToSend.forEach((email) => {
    logger.info(`Sending email to: ${email.to}`);
    logger.info(`Subject: ${email.subject}`);
    logger.info(`Body: ${email.body}`);
  });
};

const sendAlert = async (alertType: AlertType) => {
  logger.info(`${alertType === "day" ? "Morning" : "Night"} alert`);
  const products = await readCsvToArray("src/dbRepos/products.csv");
  const watching = await readCsvToArray("src/dbRepos/watching.csv");

  const filtered = watching.filter(
    (record) => record.fullDayAlert === "true" || record[`${alertType}Alert`] === "true",
  );

  const emailsToSend: Array<EmailTemplate> = [];

  for (const watch of filtered) {
    const product = products.find((p) => p.id === watch.productId);

    if (product && watch.desiredPrice > product.price) {
      logger.info(`Sending ${alertType} alert for product ${product.name}`);
      emailsToSend.push({
        to: watch.userEmail,
        subject: `Price Alert: ${product.name}`,
        body: `The price of ${product.name} has dropped below your desired price of ${watch.desiredPrice}. Current price: ${product.price}.`,
      });
    }
  }
  mockEmailService(emailsToSend);
};

const setupCronJobs = () => {
  // Job 1: Runs every morning at 8am
  cron.schedule("0 8 * * *", () => sendAlert("day"));

  // Job 2: Runs every day at midnight
  cron.schedule("0 0 * * *", () => sendAlert("night"));
};

export { sendAlert, setupCronJobs };
