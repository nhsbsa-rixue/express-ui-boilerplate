"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const vitest_1 = require("vitest");
const mockAlertController = __importStar(require("../controller"));
const cronJobs_1 = require("../../../cronJobs");
vitest_1.vi.mock("../../../cronJobs", () => ({
    sendAlert: vitest_1.vi.fn(),
}));
let req;
let res;
let next;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
});
describe("mockAlert controller", () => {
    test("should call sendAlert with 'day' when alertType is 'day'", async () => {
        // given
        req = mockRequest({ body: { alertType: "day" } });
        // when
        await mockAlertController.post(req, res, next);
        // then
        expect(cronJobs_1.sendAlert).toHaveBeenCalledWith("day");
        expect(cronJobs_1.sendAlert).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: "Alerts sent successfully",
        });
    });
    test("should call sendAlert with 'night' when alertType is 'night'", async () => {
        // given
        req = mockRequest({ body: { alertType: "night" } });
        // when
        await mockAlertController.post(req, res, next);
        // then
        expect(cronJobs_1.sendAlert).toHaveBeenCalledWith("night");
        expect(cronJobs_1.sendAlert).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: "Alerts sent successfully",
        });
    });
    test("should call sendAlert twice when alertType is 'fullDay'", async () => {
        // given
        req = mockRequest({ body: { alertType: "fullDay" } });
        // when
        await mockAlertController.post(req, res, next);
        // then
        expect(cronJobs_1.sendAlert).toHaveBeenCalledTimes(2);
        expect(cronJobs_1.sendAlert).toHaveBeenNthCalledWith(1, "day");
        expect(cronJobs_1.sendAlert).toHaveBeenNthCalledWith(2, "night");
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: "Alerts sent successfully",
        });
    });
    test("should not call sendAlert when alertType is unrecognised", async () => {
        // given
        req = mockRequest({ body: { alertType: "unknown" } });
        // when
        await mockAlertController.post(req, res, next);
        // then
        expect(cronJobs_1.sendAlert).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({
            message: "Alerts sent successfully",
        });
    });
    test("should export the correct path", () => {
        // given /when
        const defaultExport = mockAlertController.default;
        // then
        expect(defaultExport.path).toBeDefined();
    });
});
//# sourceMappingURL=index.test.js.map