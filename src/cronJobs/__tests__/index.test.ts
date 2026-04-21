import { vi } from "vitest";
import * as dbRepo from "../../dbRepos";
import logger from "../../logger";
import { sendAlert } from "../";

const loggerSpy = vi.spyOn(logger, "info");
const readSpy = vi.spyOn(dbRepo, "readCsvToArray");

vi.mock("../../dbRepos");

const mockProducts = [
  { id: "c58ad216-386c-472a-96d4-f38729202fda", name: "Product1", price: 50 },
  { id: "db65c533-7539-46d5-a1a6-d75e09efebc7", name: "Product2", price: 80 },
];

const mockWatching = [
  {
    userEmail: "user1@email.com",
    productId: "c58ad216-386c-472a-96d4-f38729202fda",
    desiredPrice: 60,
    fullDayAlert: "false",
    dayAlert: "true",
    nightAlert: "false",
  },
  {
    userEmail: "user2@email.com",
    productId: "db65c533-7539-46d5-a1a6-d75e09efebc7",
    desiredPrice: 90,
    fullDayAlert: "false",
    dayAlert: "false",
    nightAlert: "true",
  },
];

beforeEach(() => {
  readSpy.mockImplementationOnce(() => Promise.resolve(mockProducts));
  readSpy.mockImplementationOnce(() => Promise.resolve(mockWatching));
});

describe("sendAlert", () => {
  it("should send emails for matching alerts (day)", async () => {
    await sendAlert("day");

    expect(loggerSpy).toHaveBeenCalledWith("Morning alert");
    expect(loggerSpy).toHaveBeenCalledWith("Sending day alert for product Product1");
    expect(loggerSpy).toHaveBeenCalledWith("Sending email to: user1@email.com");

    expect(loggerSpy).toHaveBeenCalledWith("Subject: Price Alert: Product1");

    expect(loggerSpy).toHaveBeenCalledWith(
      "Body: The price of Product1 has dropped below your desired price of 60. Current price: 50.",
    );
  });

  it("should send emails for matching alerts (night)", async () => {
    await sendAlert("night");

    expect(loggerSpy).toHaveBeenCalledWith("Night alert");
    expect(loggerSpy).toHaveBeenCalledWith("Sending night alert for product Product2");

    expect(loggerSpy).toHaveBeenCalledWith("Sending email to: user2@email.com");

    expect(loggerSpy).toHaveBeenCalledWith("Subject: Price Alert: Product2");

    expect(loggerSpy).toHaveBeenCalledWith(
      "Body: The price of Product2 has dropped below your desired price of 90. Current price: 80.",
    );
  });
});
