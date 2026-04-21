"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../../constants");
const list = async (req, res, _next) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json(req.users);
};
exports.list = list;
exports.default = {
    path: constants_1.CONSTANTS.USER_CONTROLLER_BASE_PATH,
};
//# sourceMappingURL=controller.js.map