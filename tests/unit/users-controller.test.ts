import { StatusCodes } from "http-status-codes";
import * as usersController from "../../src/controllers/users/controller";

let req: Req;
let res: Res;
let next: Next;

const getMockUsers = (): User[] => [
    { id: "user-001", email: "alice@example.com" },
    { id: "user-002", email: "bob@example.com" },
];

beforeEach(() => {
    req = mockRequest({ users: getMockUsers() });
    res = mockResponse();
    next = mockNext();
});

describe("users controller", () => {
    describe("list", () => {
        test("should return 200 with all users", async () => {
            // given / when
            await usersController.list(req, res, next);

            // then
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(getMockUsers());
        });

        test("should return 200 with empty array when no users exist", async () => {
            // given
            req = mockRequest({ users: [] });

            // when
            await usersController.list(req, res, next);

            // then
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith([]);
        });

        test("should return the users attached to the request", async () => {
            // given
            const singleUser: User[] = [{ id: "user-999", email: "solo@example.com" }];
            req = mockRequest({ users: singleUser });

            // when
            await usersController.list(req, res, next);

            // then
            expect(res.json).toHaveBeenCalledWith(singleUser);
        });
    });

    describe("default export", () => {
        test("should expose the correct base path", () => {
            // given / when
            const config = usersController.default;

            // then
            expect(config.path).toBe("/users");
        });
    });
});
