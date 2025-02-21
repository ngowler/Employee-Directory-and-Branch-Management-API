import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    getAllEmployees: jest.fn((req, res) => res.status(200).send()),
    getEmployeeById: jest.fn((req, res) => res.status(200).send()),
    updateEmployee: jest.fn((req, res) => res.status(200).send()),
    deleteEmployee: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByBranch: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByDepartment: jest.fn((req, res) => res.status(200).send()),
}));

describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/employee", () => {
        it("should call createEmployee controller", async () => {
            interface NewEmployee {
                name: string;
                position: string;
                department: string;
                email: string;
                phone: string;
                branchId: string;
            }
            const mockNewEmployee: NewEmployee = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };
            await request(app).post("/api/v1/employee").send(mockNewEmployee);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employee", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employee");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employee/:id", () => {
        it("should call getEmployeeById controller", async () => {
            await request(app).get("/api/v1/employee/1");
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employee/:id", () => {
        it("should call updateEmployee controller", async () => {
            interface MockEmployee {
                name: string;
                position: string;
                department: string;
                email: string;
                phone: string;
                branchId: string;
            }
            const mockEmployee: MockEmployee = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };

            await request(app).put("/api/v1/employee/1").send(mockEmployee);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/employee/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employee/1");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });

    //Additional endpoints tests
    describe("GET /api/v1/employee/branch/:branchId", () => {
        it("should call getEmployeesByBranch controller", async () => {
            await request(app).get("/api/v1/employee/branch/1");
            expect(employeeController.getEmployeesByBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employee/department/:department", () => {
        it("should call getEmployeesByDepartment controller", async () => {
            await request(app).get("/api/v1/employee/department/Test Department");
            expect(employeeController.getEmployeesByDepartment).toHaveBeenCalled();
        });
    });
});
