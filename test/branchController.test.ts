import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "src/api/v1/data/branchData";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("createBranch", () => {
        it("should handle successful operation", async () => {
            const mockNewBranch: Branch = { 
                id: "1",
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };
            (branchService.createBranch as jest.Mock).mockResolvedValue(mockNewBranch);

            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Created",
                data: mockNewBranch,
            });
        });
    });
});