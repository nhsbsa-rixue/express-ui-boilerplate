"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../../constants");
const post = async (req, res, _next) => {
    const { productId, userEmail, desiredPrice, fullDayAlert, morningAlert, nightAlert } = req.body;
    const product = req.products.find((p) => p.id === productId);
    if (!product) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }
    const user = req.users.find((u) => u.email === userEmail);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
    // Create a new watch entry
    const newWatchItem = {
        productId,
        userEmail,
        desiredPrice,
        fullDayAlert,
        nightAlert,
        dayAlert: morningAlert,
    };
    req.watching.push(newWatchItem);
    return res.status(http_status_codes_1.StatusCodes.OK).json(newWatchItem);
};
exports.post = post;
exports.default = {
    path: constants_1.CONSTANTS.WATCH_CONTROLLER_BASE_PATH,
};
//# sourceMappingURL=controller.js.map