"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.list = exports.get = void 0;
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
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
    const newProduct = { id: (0, uuid_1.v4)(), name, price };
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