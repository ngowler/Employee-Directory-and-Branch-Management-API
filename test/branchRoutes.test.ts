import request from "supertest";
import app from "../src/app";
import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch, }
    from "../src/api/v1/controllers/branchController"

jest.mock("../src/api/v1/controllers/branchController", () => ({
    createBranch: jest.fn((req, res) => res.status(201).send()),
    getAllBranches: jest.fn((req, res) => res.status(201).send()),
    getBranchById: jest.fn((req, res) => res.status(201).send()),
    updateBranch: jest.fn((req, res) => res.status(201).send()),
    deleteBranch: jest.fn((req, res) => res.status(201).send()),
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
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890",
            };
            await request(app).post("/api/v1/branch").send(mockNewBranch);
            expect(createBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branch", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branch");
            expect(getAllBranches).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branch/:id", () => {
        it("should call getBranchById controller", async () => {
            await request(app).get("/api/v1/branch/1");
            expect(getBranchById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branch/:id", () => {
        it("should call updateBranch controller", async () => {
            interface mockBranch {
                name: string;
                address: string;
                phone: string;
            }
            const mockBranch: mockBranch = {
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890",
            };

            await request(app).put("/api/v1/branch/1").send(mockBranch);
            expect(updateBranch).toHaveBeenCalled();
        });
    });

    describe("Delete /api/v1/branch/:id", () => {
        it("should call deleteBranch controller", async () => {
            await request(app).delete("/api/v1/branch/1");
            expect(deleteBranch).toHaveBeenCalled();
        });
    });
});
