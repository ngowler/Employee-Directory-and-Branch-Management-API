jest.mock("../src/api/v1/services/employeeService", () => ({
    createEmployee: jest.fn(),
    getAllEmployees: jest.fn(),
    getEmployeesByField: jest.fn(),
    updateEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "src/api/v1/models/employeeModel";
import { HTTP_STATUS } from "../src/constants/httpConstants";

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
            const mockNewEmployee: Employee = { 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };
            (employeeService.createEmployee as jest.Mock).mockResolvedValue(mockNewEmployee);

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockNewEmployee,
                status: "success",
            });
        });
    });

    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employee[] = [{ 
                id: "1",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            }];
            (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
                status: "success",
            });
        });
    });

    describe("getEmployeeById", () => {
        it("should handle successful operation", async () => {
            const mockEmployee: Employee = { 
                id: "1",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            };
            (employeeService.getEmployeesByField as jest.Mock).mockResolvedValue(mockEmployee);

            mockReq.params = { id: "1" };
            mockReq.query = { limit: "10" };

            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `employee with ID "1" retrieved successfully`,
                data: mockEmployee,
                status: "success",
            });
        });
    });

    describe("updateEmployee", () => {
        it("should handle successful operation", async () => {
            const mockEmployee: Employee = { 
                id: "1",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            };
            (employeeService.updateEmployee as jest.Mock).mockResolvedValue(mockEmployee);

            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Updated",
                data: mockEmployee,
                status: "success",
            });
        });
    });

    describe("deleteEmployee", () => {
        it("should handle successful operation", async () => {
            
            (employeeService.deleteEmployee as jest.Mock).mockResolvedValueOnce(true);

            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: "Employee Deleted",
                status: "success",
            });
        });
    });
    
    //Additional endpoints tests
    describe("getEmployeesByBranch", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employee[] = [{ 
                id: "1",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            }];
            (employeeService.getEmployeesByField as jest.Mock).mockResolvedValue(mockEmployees);

            mockReq.params = { branchId: "1" };
            mockReq.query = { limit: "10" };

            await employeeController.getEmployeesByBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `employees with branch ID "1" retrieved successfully`,
                data: mockEmployees,
                status: "success",
            });
        });
    });

    describe("getEmployeesByDepartment", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employee[] = [{ 
                id: "1",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            }];
            (employeeService.getEmployeesByField as jest.Mock).mockResolvedValue(mockEmployees);

            mockReq.params = { department: "Sales" };
            mockReq.query = { limit: "10" };

            await employeeController.getEmployeesByDepartment(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `employees in department "Sales" retrieved successfully`,
                data: mockEmployees,
                status: "success",
            });
        });
    });
});
