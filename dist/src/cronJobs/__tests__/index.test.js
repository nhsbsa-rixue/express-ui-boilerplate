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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const dbRepo = __importStar(require("../../dbRepos"));
const logger_1 = __importDefault(require("../../logger"));
const __1 = require("../");
const loggerSpy = vitest_1.vi.spyOn(logger_1.default, "info");
const readSpy = vitest_1.vi.spyOn(dbRepo, "readCsvToArray");
vitest_1.vi.mock("../../dbRepos");
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
        await (0, __1.sendAlert)("day");
        expect(loggerSpy).toHaveBeenCalledWith("Morning alert");
        expect(loggerSpy).toHaveBeenCalledWith("Sending day alert for product Product1");
        expect(loggerSpy).toHaveBeenCalledWith("Sending email to: user1@email.com");
        expect(loggerSpy).toHaveBeenCalledWith("Subject: Price Alert: Product1");
        expect(loggerSpy).toHaveBeenCalledWith("Body: The price of Product1 has dropped below your desired price of 60. Current price: 50.");
    });
    it("should send emails for matching alerts (night)", async () => {
        await (0, __1.sendAlert)("night");
        expect(loggerSpy).toHaveBeenCalledWith("Night alert");
        expect(loggerSpy).toHaveBeenCalledWith("Sending night alert for product Product2");
        expect(loggerSpy).toHaveBeenCalledWith("Sending email to: user2@email.com");
        expect(loggerSpy).toHaveBeenCalledWith("Subject: Price Alert: Product2");
        expect(loggerSpy).toHaveBeenCalledWith("Body: The price of Product2 has dropped below your desired price of 90. Current price: 80.");
    });
});
//# sourceMappingURL=index.test.js.map