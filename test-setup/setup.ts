import * as testUtils from '../test-setup/test-utils';

process.env.TEST = "test";
process.env.PORT = "8002";

declare global {
    var mockRequest: typeof testUtils.mockRequest;
    var mockResponse: typeof testUtils.mockResponse;
    var mockNext: typeof testUtils.mockNext;
}

for (const [key, value] of Object.entries(testUtils)) {
    if (typeof value === "function") {
        (global as Record<string, unknown>)[key] = value;
    }
}