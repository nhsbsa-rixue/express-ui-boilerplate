import { StatusCodes } from "http-status-codes";
import { vi } from "vitest";
import * as productController from "../controller";

let req: Req;
let res: Res;
let next: Next;
const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
const getMockProducts = () => [{ id: mockUuid, name: "productName", price: 100 }];

beforeEach(() => {
  req = mockRequest({ products: getMockProducts() });
  res = mockResponse();
  next = mockNext();
});

describe("product controllers", () => {
  test("should return a list of products", async () => {
    // given /when
    await productController.list?.(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(getMockProducts());
  });

  test("should return a single product", async () => {
    // given
    req.params.id = mockUuid;

    // when
    await productController.get?.(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(getMockProducts()[0]);
  });

  test("should create a new product", async () => {
    // given
    req.body = {
      name: "productName",
      price: 100,
    };

    // when
    await productController.post?.(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      id: expect.any(String),
      name: "productName",
      price: 100,
    });
  });

  test("should update an existing product", async () => {
    // given
    req.params.id = mockUuid;
    req.body = {
      name: "productName",
      price: 101,
    };

    // when
    await productController.put?.(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      id: mockUuid,
      name: "productName",
      price: 101,
    });
  });

  test("should delete a single product", async () => {
    // given
    req.params.id = mockUuid;

    // when
    await productController.del?.(req, res, next);

    // then
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    expect(res.json).toHaveBeenCalledWith({});
  });
});
