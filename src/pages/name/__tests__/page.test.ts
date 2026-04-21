import { get, post } from "../page";

let req: Req;
let res: Res;
let next: Next;

beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
  next = mockNext();
});

describe("name page controllers", () => {
  describe("get", () => {
    test("should render the name page with the correct template name", async () => {
      // given / when
      await get(req, res, next);

      // then
      expect(res.renderPage).toHaveBeenCalledTimes(1);
    });
  });

  describe("post", () => {
    test("should redirect to the name page on successful submission", async () => {
      // given / when
      await post(req, res, next);

      // then
      expect(res.redirectPageTo).toHaveBeenCalledTimes(1);
      expect(res.redirectPageTo).toHaveBeenCalledWith("name");
    });
  });
});
