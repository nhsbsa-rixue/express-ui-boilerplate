import { StatusCodes } from "http-status-codes";
import { CONSTANTS } from "../../constants";

export const post: Controller = async (req, res, _next) => {
  const { productId, userEmail, desiredPrice, fullDayAlert, morningAlert, nightAlert } = req.body;

  const product = req.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
  }

  const user = req.users.find((u) => u.email === userEmail);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
  }

  // Create a new watch entry
  const newWatchItem: WatchEntry = {
    productId,
    userEmail,
    desiredPrice,
    fullDayAlert,
    nightAlert,
    dayAlert: morningAlert,
  };

  req.watching.push(newWatchItem);

  return res.status(StatusCodes.OK).json(newWatchItem);
};

export default {
  path: CONSTANTS.WATCH_CONTROLLER_BASE_PATH,
};
