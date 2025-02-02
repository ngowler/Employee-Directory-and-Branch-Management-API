import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

jest.mock("../src/api/v1/services/employeeService");

describe("Employeee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("createEmployee", () => {
        it("should handle successful operation", async () => {
            const mockNewEmployee = [{ 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            }];

            (employeeService.createEmployee as jest.Mock).mockResolvedValue(mockNewEmployee);

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockNewEmployee,
            });
        });
    });
});