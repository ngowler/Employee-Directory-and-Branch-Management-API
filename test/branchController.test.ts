jest.mock("../src/api/v1/services/branchService", () => ({
    createBranch: jest.fn(),
    getAllBranches: jest.fn(),
    getBranchById: jest.fn(),
    updateBranch: jest.fn(),
    deleteBranch: jest.fn(),
}));
import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "src/api/v1/models/branchModel";

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
            expect(mockRes.status).toHaveBeenCalledWith(200);
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
            (branchService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

            await branchController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Retrieved",
                data: mockBranch,
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
            expect(mockRes.status).toHaveBeenCalledWith(200);
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
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Branch Deleted",
                status: "success",
            });
        });
    });
});
