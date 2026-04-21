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
const productController = __importStar(require("../controller"));
let req;
let res;
let next;
const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
const getMockProducts = () => [{ id: mockUuid, name: "productName", price: 100 }];
vitest_1.vi.mock("uuid", () => ({
    v4: () => mockUuid,
}));
beforeEach(() => {
    req = mockRequest({ products: getMockProducts() });
    res = mockResponse();
    next = mockNext();
});
describe("product controllers", () => {
    test("should return a list of products", async () => {
        // given /when
        await productController.list?.(req, res, next);
        // then
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(getMockProducts());
    });
    test("should return a single product", async () => {
        // given
        req.params.id = mockUuid;
        // when
        await productController.get?.(req, res, next);
        // then
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(getMockProducts()[0]);
    });
    test("should create a new product", async () => {
        // given
        req.body = {
            name: "productName",
            price: 100,
        };
        // when
        await productController.post?.(req, res, next);
        // then
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith({
            id: mockUuid,
            name: "productName",
            price: 100,
        });
    });
    test("should update an existing product", async () => {
        // given
        req.params.id = mockUuid;
        req.body = {
            name: "productName",
            price: 101,
        };
        // when
        await productController.put?.(req, res, next);
        // then
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({
            id: mockUuid,
            name: "productName",
            price: 101,
        });
    });
    test("should delete a single product", async () => {
        // given
        req.params.id = mockUuid;
        // when
        await productController.del?.(req, res, next);
        // then
        expect(res.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.NO_CONTENT);
        expect(res.json).toHaveBeenCalledWith({});
    });
});
//# sourceMappingURL=index.test.js.map