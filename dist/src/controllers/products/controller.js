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
exports.del = exports.put = exports.post = exports.list = exports.get = void 0;
const http_status_codes_1 = require("http-status-codes");
const crypto = __importStar(require("node:crypto"));
const constants_1 = require("../../constants");
const get = async (req, res, _next) => {
    const product = req.products.find((item) => item.id === req.params.id);
    if (!product) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(product);
};
exports.get = get;
const list = async (req, res, _next) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json(req.products);
};
exports.list = list;
const post = async (req, res, _next) => {
    const { name, price } = req.body;
    const newProduct = { id: crypto.randomUUID(), name, price };
    req.products.push(newProduct);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(newProduct);
};
exports.post = post;
const put = async (req, res, _next) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const productIndex = req.products.findIndex((item) => item.id === id);
    if (productIndex === -1) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }
    req.products[productIndex] = { ...req.products[productIndex], name, price };
    return res.status(http_status_codes_1.StatusCodes.OK).json(req.products[productIndex]);
};
exports.put = put;
const del = async (req, res, _next) => {
    const { id } = req.params;
    const productIndex = req.products.findIndex((item) => item.id === id);
    if (productIndex === -1) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }
    req.products.splice(productIndex, 1);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({});
};
exports.del = del;
exports.default = { path: constants_1.CONSTANTS.PRODUCT_CONTROLLER_BASE_PATH };
//# sourceMappingURL=controller.js.map