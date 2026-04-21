import { StatusCodes } from "http-status-codes";
import { CONSTANTS } from "../../constants";

export const list: Controller = async (req, res, _next) => {
  return res.status(StatusCodes.OK).json(req.users);
};

export default {
  path: CONSTANTS.USER_CONTROLLER_BASE_PATH,
};
