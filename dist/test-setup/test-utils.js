"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRequest = mockRequest;
exports.mockResponse = mockResponse;
exports.mockNext = mockNext;
const vitest_1 = require("vitest");
/**
 * Creates a mock Express Request with sensible defaults.
 * Pass overrides for any property your test needs.
 */
function mockRequest(overrides = {}) {
    const req = {
        route: { path: "/" },
        body: {},
        params: {},
        query: {},
        headers: {},
        session: {
            validationErrors: undefined,
            formData: undefined,
            destroy: vitest_1.vi.fn((cb) => cb?.()),
            ...overrides.session,
        },
        t: vitest_1.vi.fn((key) => key),
        protocol: "http",
        originalUrl: "/",
        ...overrides,
    };
    return req;
}
/**
 * Creates a mock Express Response where status/redirect/json/send
 * all return `res` for chaining, and are individually assertable.
 */
function mockResponse() {
    const res = {
        status: vitest_1.vi.fn().mockReturnThis(),
        json: vitest_1.vi.fn().mockReturnThis(),
        send: vitest_1.vi.fn().mockReturnThis(),
        redirect: vitest_1.vi.fn().mockReturnThis(),
        render: vitest_1.vi.fn().mockReturnThis(),
        renderPage: vitest_1.vi.fn().mockReturnThis(),
        set: vitest_1.vi.fn().mockReturnThis(),
        redirectPageTo: vitest_1.vi.fn().mockReturnThis(),
        locals: {},
    };
    return res;
}
/**
 * Creates a mock NextFunction.
 */
function mockNext() {
    return vitest_1.vi.fn();
}
//# sourceMappingURL=test-utils.js.map