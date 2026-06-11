import request from "supertest";
import express from "express";
import { StatusCodes } from "http-status-codes";
import setupDBClient from "../../src/setup/db-client";
import { list } from "../../src/controllers/users/controller";

function createIntegrationApp() {
    const testApp = express();
    setupDBClient(testApp as App);
    testApp.get("/api/users", list);
    return testApp;
}

describe("Users integration", () => {
    test("should return 200 with users from the real CSV data source", async () => {
        // given
        const testApp = createIntegrationApp();

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    test("should return users with correct structure from CSV", async () => {
        // given
        const testApp = createIntegrationApp();

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("email");
    });

    test("should return actual user data matching the CSV file", async () => {
        // given
        const testApp = createIntegrationApp();
        const expectedUsers = [
            { id: "62fe9fe4-c7fc-47d4-8290-55e8ed20e258", email: "example1@email.com" },
            { id: "aa1c8680-0ffc-4ad3-8fa9-ffaa40864bd2", email: "example2@email.com" },
        ];

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(expectedUsers);
    });

    test("should exercise full request lifecycle through db middleware and controller", async () => {
        // given
        const testApp = createIntegrationApp();

        // when
        const response = await request(testApp).get("/api/users");

        // then
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toBeInstanceOf(Array);
        for (const user of response.body) {
            expect(typeof user.id).toBe("string");
            expect(typeof user.email).toBe("string");
            expect(user.email).toMatch(/@/);
        }
    });
});
