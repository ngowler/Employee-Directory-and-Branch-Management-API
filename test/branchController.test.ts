jest.mock("../src/api/v1/services/branchService", () => ({
    createBranch: jest.fn(),
    getAllBranches: jest.fn(),
    getBranchesByField: jest.fn(),
    updateBranch: jest.fn(),
    deleteBranch: jest.fn(),
}));
import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "src/api/v1/models/branchModel";
import { HTTP_STATUS } from "../src/constants/httpConstants";

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
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Created",
                data: mockNewBranch,
                status: "success",
            });
        });
    });

    describe("getAllBranches", () => {
        it("should handle successful operation", async () => {
            const mockBranches: Branch[] = [{ 
                id: "1",
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            }];
            (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);
    
            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches Retrieved",
                data: mockBranches,
                status: "success",
            });
        });
    });

    describe("getBranchById", () => {
        it("should handle successful operation", async () => {
            const mockBranch: Branch = { 
                id: "1",
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };
            (branchService.getBranchesByField as jest.Mock).mockResolvedValue(mockBranch);

            mockReq.params = { id: "1" };
            mockReq.query = { limit: "10" };

            await branchController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `branch with ID "1" retrieved successfully`,
                data: mockBranch,
                status: "success",
            });
        });
    });

    describe("updateBranch", () => {
        it("should handle successful operation", async () => {
            const mockBranch: Branch = { 
                id: "1",
                name: "Test Name",
                address: "Test Address",
                phone: "Test Phone",
            };
            (branchService.updateBranch as jest.Mock).mockResolvedValue(mockBranch);

            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Updated",
                data: mockBranch,
                status: "success",
            });
        });
    });

    describe("deleteBranch", () => {
        it("should handle successful operation", async () => {
            
            (branchService.deleteBranch as jest.Mock).mockResolvedValueOnce(true);

            await branchController.deleteBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Branch Deleted",
                status: "success",
            });
        });
    });
});
