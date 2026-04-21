import * as expressValidator from "express-validator";
import { validator } from "../index";

vi.mock("express-validator");

const mockedValidationResult = expressValidator.validationResult as unknown as ReturnType<typeof vi.fn>;

let req: Req;
let res: Res;
let next: Next;

describe("validator middleware", () => {
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  test("should call next() when there are no validation errors", () => {
    // given
    mockedValidationResult.mockReturnValue({
      array: () => [],
    });

    // when
    validator(req, res, next);

    // then
    expect(next).toHaveBeenCalled();
  });

  test("should return a BAD_REQUEST response when there are validation errors", () => {
    // given
    const errors = [{ path: "email", msg: "Invalid email" }];
    mockedValidationResult.mockReturnValue({
      array: () => errors,
    });

    // when
    validator(req, res, next);

    // then
    expect(res.redirect).toHaveBeenCalledWith(req.route.path);
  });
});
