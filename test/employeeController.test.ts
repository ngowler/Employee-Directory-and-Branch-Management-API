import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "src/api/v1/models/employeeModel";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { successResponse } from "../src/api/v1/models/responseModel";

jest.mock("../src/api/v1/services/employeeService");

describe("Employeee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {}, query: {} };
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
            expect(mockRes.json).toHaveBeenCalledWith(
                successResponse(mockNewEmployee, "Employee Created")
            );
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error creating employee";
            (employeeService.createEmployee as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
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
            expect(mockRes.json).toHaveBeenCalledWith(
                successResponse(mockEmployees, "Employees Retrieved")
            );
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error retrieving employees";
            (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
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
            (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

            mockReq.params = { id: "1" };

            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith(
                successResponse(mockEmployee, `employee with ID "1" retrieved successfully`)
            );
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error retrieving employee";
            (employeeService.getEmployeeById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            mockReq.params = { id: "1" };

            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
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

            mockReq.params = { id: "1" };
            mockReq.body = mockEmployee;

            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith(
                successResponse(mockEmployee, "Employee Updated")
            );
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error updating employee";
            (employeeService.updateEmployee as jest.Mock).mockRejectedValue(new Error(errorMessage));

            mockReq.params = { id: "1" };
            mockReq.body = { name: "Jane Doe" };

            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
        });
    });

    describe("deleteEmployee", () => {
        it("should handle successful operation", async () => {
            (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(true);

            mockReq.params = { id: "1" };

            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith(successResponse("Employee Deleted"));
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error deleting employee";
            (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(new Error(errorMessage));

            mockReq.params = { id: "1" };

            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
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
            expect(mockRes.json).toHaveBeenCalledWith(
                successResponse(mockEmployees, `employees with branch ID "1" retrieved successfully`)
            );
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error retrieving employees by branch";
            (employeeService.getEmployeesByField as jest.Mock).mockRejectedValue(new Error(errorMessage));

            mockReq.params = { branchId: "1" };

            await employeeController.getEmployeesByBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
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
            expect(mockRes.json).toHaveBeenCalledWith(
                successResponse(mockEmployees, `employees in department "Sales" retrieved successfully`)
            );
        });

        it("should handle error scenario", async () => {
            const errorMessage = "Error retrieving employees by department";
            (employeeService.getEmployeesByField as jest.Mock).mockRejectedValue(new Error(errorMessage));

            mockReq.params = { department: "Sales" };

            await employeeController.getEmployeesByDepartment(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );
            expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
        });
    });
});
