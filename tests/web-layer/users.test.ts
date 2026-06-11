/// <reference types="vitest/globals" />
/// <reference path="../../src/@types/index.d.ts" />
import request from "supertest";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { list } from "../../src/controllers/users/controller";

const mockUsers: User[] = [
    { id: "user-001", email: "alice@example.com" },
    { id: "user-002", email: "bob@example.com" },
];

function createTestApp() {
    const testApp = express();
    testApp.use((req, _res, next) => {
        (req as unknown as Req).users = mockUsers;
        next();
    });
    testApp.get("/api/users", list as express.RequestHandler);
    return testApp;
}

describe("GET /api/users", () => {
    test("should return 200 with JSON content type", async () => {
        // given
        const testApp = createTestApp();

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    test("should return an array of users from the db middleware", async () => {
        // given
        const testApp = createTestApp();

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(response.status).toBe(StatusCodes.OK);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(mockUsers);
    });

    test("should return correct user structure with id and email", async () => {
        // given
        const testApp = createTestApp();

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("email");
    });
});
