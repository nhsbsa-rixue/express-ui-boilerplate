"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../page");
let req;
let res;
let next;
beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
});
describe("Name page controllers", () => {
    describe("get", () => {
        test("should render the name page with the correct template name", async () => {
            // given /when
            await (0, page_1.get)(req, res, next);
            // then
            expect(res.renderPage).toHaveBeenCalledTimes(1);
        });
    });
    describe("post", () => {
        test("should redirect the page to the correct path", async () => {
            // given /when
            await (0, page_1.post)(req, res, next);
            // then
            expect(res.redirectPageTo).toHaveBeenCalledTimes(1);
            expect(res.redirectPageTo).toHaveBeenCalledWith("name");
        });
    });
});
//# sourceMappingURL=page.test.js.map