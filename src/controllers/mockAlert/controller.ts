import { StatusCodes } from "http-status-codes";
import { CONSTANTS } from "../../constants";
import { sendAlert } from "../../cronJobs";

export const post: Controller = async (req, res, _next) => {
  const { alertType } = req.body;

  if (alertType === "day") {
    sendAlert("day");
  } else if (alertType === "night") {
    sendAlert("night");
  } else if (alertType === "fullDay") {
    sendAlert("day");
    sendAlert("night");
  }

  const successMessage = "Alerts sent successfully";
  return res.status(StatusCodes.OK).json({ message: successMessage });
};

export default {
  path: CONSTANTS.MOCK_ALERT_PATH,
};
