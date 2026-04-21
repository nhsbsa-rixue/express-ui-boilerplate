import { StatusCodes } from "http-status-codes";
import { post } from "../controller";

let req: Req;
let res: Res;
let next: Next;

describe("watching controller post", () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();

    req.products = [];
    req.users = [];
    req.watching = [];
  });

  test("should return NOT_FOUND when product does not exist", async () => {
    // given
    req.body = {
      productId: "product-1",
      userEmail: "user@example.com",
      desiredPrice: 199.99,
      fullDayAlert: true,
      morningAlert: false,
      nightAlert: true,
    };
    req.products = [{ id: "product-2" } as Product];
    req.users = [{ email: "user@example.com" } as User];

    // when
    await post(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    expect(req.watching).toHaveLength(0);
  });

  test("should return NOT_FOUND when user does not exist", async () => {
    // given
    req.body = {
      productId: "product-1",
      userEmail: "missing@example.com",
      desiredPrice: 150,
      fullDayAlert: false,
      morningAlert: true,
      nightAlert: false,
    };
    req.products = [{ id: "product-1" } as Product];
    req.users = [{ email: "user@example.com" } as User];

    // when
    await post(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    expect(req.watching).toHaveLength(0);
  });

  test("should create a watch entry and return OK when product and user exist", async () => {
    // given
    req.body = {
      productId: "product-1",
      userEmail: "user@example.com",
      desiredPrice: 99.5,
      fullDayAlert: true,
      morningAlert: true,
      nightAlert: false,
    };
    req.products = [{ id: "product-1" } as Product];
    req.users = [{ email: "user@example.com" } as User];

    const expectedWatchEntry: WatchEntry = {
      productId: "product-1",
      userEmail: "user@example.com",
      desiredPrice: 99.5,
      fullDayAlert: true,
      nightAlert: false,
      dayAlert: true,
    };

    // when
    await post(req, res, next);

    // then
    expect(req.watching).toHaveLength(1);
    expect(req.watching[0]).toEqual(expectedWatchEntry);
    expect(req.watching[0]).not.toHaveProperty("morningAlert");
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(expectedWatchEntry);
  });

  test("should map morningAlert false to dayAlert false", async () => {
    // given
    req.body = {
      productId: "product-1",
      userEmail: "user@example.com",
      desiredPrice: 88.8,
      fullDayAlert: false,
      morningAlert: false,
      nightAlert: true,
    };
    req.products = [{ id: "product-1" } as Product];
    req.users = [{ email: "user@example.com" } as User];

    // when
    await post(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      productId: "product-1",
      userEmail: "user@example.com",
      desiredPrice: 88.8,
      fullDayAlert: false,
      nightAlert: true,
      dayAlert: false,
    });
  });
});
