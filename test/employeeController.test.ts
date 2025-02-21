import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "src/api/v1/data/employeeData";

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
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockNewEmployee,
            });
        });
    });

    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employee[] = [{ 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            }];
            (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });
        });
    });

    describe("getEmployeeById", () => {
        it("should handle successful operation", async () => {
            const mockEmployee: Employee = { 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };
            (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Retrieved",
                data: mockEmployee,
            });
        });
    });

    describe("updateEmployee", () => {
        it("should handle successful operation", async () => {
            const mockEmployee: Employee = { 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };
            (employeeService.updateEmployee as jest.Mock).mockResolvedValue(mockEmployee);

            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Updated",
                data: mockEmployee,
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
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Deleted",
            });
        });
    });
    
    //Additional endpoints tests
    describe("getEmployeesByBranch", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employee[] = [{ 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            }];
            (employeeService.getEmployeesByBranch as jest.Mock).mockResolvedValue(mockEmployees);

            await employeeController.getEmployeesByBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });
        });
    });

    describe("getEmployeesByDepartment", () => {
        it("should handle successful operation", async () => {
            const mockEmployees: Employee[] = [{ 
                id: "1",
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            }];
            (employeeService.getEmployeesByDepartment as jest.Mock).mockResolvedValue(mockEmployees);

            await employeeController.getEmployeesByDepartment(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });
        });
    });
});
