"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../../constants");
const cronJobs_1 = require("../../cronJobs");
const post = async (req, res, _next) => {
    const { alertType } = req.body;
    if (alertType === "day") {
        (0, cronJobs_1.sendAlert)("day");
    }
    else if (alertType === "night") {
        (0, cronJobs_1.sendAlert)("night");
    }
    else if (alertType === "fullDay") {
        (0, cronJobs_1.sendAlert)("day");
        (0, cronJobs_1.sendAlert)("night");
    }
    const successMessage = "Alerts sent successfully";
    return res.status(http_status_codes_1.StatusCodes.OK).json({ message: successMessage });
};
exports.post = post;
exports.default = {
    path: constants_1.CONSTANTS.MOCK_ALERT_PATH,
};
//# sourceMappingURL=controller.js.map