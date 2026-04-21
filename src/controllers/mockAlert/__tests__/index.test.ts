import { StatusCodes } from "http-status-codes";
import { vi } from "vitest";
import * as mockAlertController from "../controller";
import { sendAlert } from "../../../cronJobs";

vi.mock("../../../cronJobs", () => ({
  sendAlert: vi.fn(),
}));

let req: Req;
let res: Res;
let next: Next;

beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
  next = mockNext();
});

describe("mockAlert controller", () => {
  test("should call sendAlert with 'day' when alertType is 'day'", async () => {
    // given
    req = mockRequest({ body: { alertType: "day" } });

    // when
    await mockAlertController.post(req, res, next);

    // then
    expect(sendAlert).toHaveBeenCalledWith("day");
    expect(sendAlert).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Alerts sent successfully",
    });
  });

  test("should call sendAlert with 'night' when alertType is 'night'", async () => {
    // given
    req = mockRequest({ body: { alertType: "night" } });

    // when
    await mockAlertController.post(req, res, next);

    // then
    expect(sendAlert).toHaveBeenCalledWith("night");
    expect(sendAlert).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Alerts sent successfully",
    });
  });

  test("should call sendAlert twice when alertType is 'fullDay'", async () => {
    // given
    req = mockRequest({ body: { alertType: "fullDay" } });

    // when
    await mockAlertController.post(req, res, next);

    // then
    expect(sendAlert).toHaveBeenCalledTimes(2);
    expect(sendAlert).toHaveBeenNthCalledWith(1, "day");
    expect(sendAlert).toHaveBeenNthCalledWith(2, "night");
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Alerts sent successfully",
    });
  });

  test("should not call sendAlert when alertType is unrecognised", async () => {
    // given
    req = mockRequest({ body: { alertType: "unknown" } });

    // when
    await mockAlertController.post(req, res, next);

    // then
    expect(sendAlert).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Alerts sent successfully",
    });
  });

  test("should export the correct path", () => {
    // given /when
    const defaultExport = mockAlertController.default;

    // then
    expect(defaultExport.path).toBeDefined();
  });
});
