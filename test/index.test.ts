import logger from "../src/logger/index.js";

describe("Router", () => {
  it("NODE_ENV test", async () => {
    logger.info("Before all tests");

    expect(process.env.NODE_ENV).toBe("test");
  });

  it("test", async () => {
    expect(process.env.TEST).toBe("test");
  });
});
