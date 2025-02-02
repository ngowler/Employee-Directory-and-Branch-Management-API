import request from "supertest";
import app from "../src/app";
import {
    createBranch, }
    from "../src/api/v1/controllers/branchController"

jest.mock("../src/api/v1/controllers/branchController", () => ({
    createBranch: jest.fn((req, res) => res.status(201).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/branch", () => {
        it("should call createBranch controller", async () => {
            interface newBranch {
                name: string;
                address: string;
                phone: string;
            }
            const mockNewBranch: newBranch = {
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };
            await request(app).post("/api/v1/branch").send(mockNewBranch);
            expect(createBranch).toHaveBeenCalled();
        });
    });
});