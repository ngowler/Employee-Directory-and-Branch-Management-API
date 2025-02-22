import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import {
    postEmployeeSchema,
    getEmployeeByIdSchema,
    putEmployeeSchema,
    deleteEmployeeSchema,
    getEmployeesByBranchSchema,
    getEmployeesByDepartmentSchema, }
    from "../src/api/v1/validations/employeeValidation";

describe("validate function for employees", () => {

    describe("postEmployeeSchema", () => {
        it("should not throw an error for valid employee data", () => {
            const data = {
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
                createdAt: new Date(),
            };
            expect(() => validate(postEmployeeSchema, data)).not.toThrow();
        });

        it("should throw an error for missing name", () => {
            const data = {
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            };
            expect(() => validate(postEmployeeSchema, data)).toThrow("Name is required");
        });

        it("should throw an error for empty name", () => {
            const data = {
                name: "",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            };
            expect(() => validate(postEmployeeSchema, data)).toThrow("Name cannot be empty");
        });
    });

    describe("getEmployeeByIdSchema", () => {
        it("should not throw an error for valid ID", () => {
            const data = { id: "1" };
            expect(() => validate(getEmployeeByIdSchema, data)).not.toThrow();
        });

        it("should throw an error for missing ID", () => {
            const data = {};
            expect(() => validate(getEmployeeByIdSchema, data)).toThrow("ID is required");
        });

        it("should throw an error for empty ID", () => {
            const data = { id: "" };
            expect(() => validate(getEmployeeByIdSchema, data)).toThrow("Employee ID cannot be empty");
        });
    });

    describe("putEmployeeSchema", () => {
        it("should not throw an error for valid employee data", () => {
            const data = {
                id: "1",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
                updatedAt: new Date(),
            };
            expect(() => validate(putEmployeeSchema, data)).not.toThrow();
        });

        it("should throw an error for missing ID", () => {
            const data = {
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            };
            expect(() => validate(putEmployeeSchema, data)).toThrow("ID is required");
        });

        it("should throw an error for empty ID", () => {
            const data = {
                id: "",
                name: "John Doe",
                position: "Manager",
                department: "Sales",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                branchId: "1",
            };
            expect(() => validate(putEmployeeSchema, data)).toThrow("Employee ID cannot be empty");
        });
    });

    describe("deleteEmployeeSchema", () => {
        it("should not throw an error for valid ID", () => {
            const data = { id: "1" };
            expect(() => validate(deleteEmployeeSchema, data)).not.toThrow();
        });

        it("should throw an error for missing ID", () => {
            const data = {};
            expect(() => validate(deleteEmployeeSchema, data)).toThrow("ID is required");
        });

        it("should throw an error for empty ID", () => {
            const data = { id: "" };
            expect(() => validate(deleteEmployeeSchema, data)).toThrow("Employee ID cannot be empty");
        });
    });

    describe("getEmployeesByBranchSchema", () => {
        it("should not throw an error for valid branch ID", () => {
            const data = { branchId: "1" };
            expect(() => validate(getEmployeesByBranchSchema, data)).not.toThrow();
        });

        it("should throw an error for missing branch ID", () => {
            const data = {};
            expect(() => validate(getEmployeesByBranchSchema, data)).toThrow("Branch ID is required");
        });

        it("should throw an error for empty branch ID", () => {
            const data = { branchId: "" };
            expect(() => validate(getEmployeesByBranchSchema, data)).toThrow("Branch ID cannot be empty");
        });
    });

    describe("getEmployeesByDepartmentSchema", () => {
        it("should not throw an error for valid department", () => {
            const data = { department: "Sales" };
            expect(() => validate(getEmployeesByDepartmentSchema, data)).not.toThrow();
        });

        it("should throw an error for missing department", () => {
            const data = {};
            expect(() => validate(getEmployeesByDepartmentSchema, data)).toThrow("Department is required");
        });

        it("should throw an error for empty department", () => {
            const data = { department: "" };
            expect(() => validate(getEmployeesByDepartmentSchema, data)).toThrow
        });
    });
});

describe("validateRequest middleware for employees", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it("should call next for valid postEmployeeSchema data", () => {
        req.body = {
            name: "John Doe",
            position: "Manager",
            department: "Sales",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            branchId: "1",
            createdAt: new Date(),
        };

        validateRequest(postEmployeeSchema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid postEmployeeSchema data (missing name)", () => {
        req.body = {
            position: "Manager",
            department: "Sales",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            branchId: "1",
        };

        validateRequest(postEmployeeSchema)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Name is required",
        });
    });

    it("should call next for valid getEmployeeByIdSchema data", () => {
        req.params = { id: "1" };

        validateRequest(getEmployeeByIdSchema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid getEmployeeByIdSchema data (missing id)", () => {
        req.params = {};

        validateRequest(getEmployeeByIdSchema)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: ID is required",
        });
    });

    it("should call next for valid putEmployeeSchema data", () => {
        req.body = {
            id: "1",
            name: "John Doe",
            position: "Manager",
            department: "Sales",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            branchId: "1",
            updatedAt: new Date(),
        };

        validateRequest(putEmployeeSchema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid putEmployeeSchema data (missing id)", () => {
        req.body = {
            name: "John Doe",
            position: "Manager",
            department: "Sales",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            branchId: "1",
            updatedAt: new Date(),
        };

        validateRequest(putEmployeeSchema)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: ID is required",
        });
    });

    it("should call next for valid deleteEmployeeSchema data", () => {
        req.params = { id: "1" };

        validateRequest(deleteEmployeeSchema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid deleteEmployeeSchema data (missing id)", () => {
        req.params = {};

        validateRequest(deleteEmployeeSchema)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: ID is required",
        });
    });

    it("should call next for valid getEmployeesByBranchSchema data", () => {
        req.query = { branchId: "1" };

        validateRequest(getEmployeesByBranchSchema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid getEmployeesByBranchSchema data (missing branchId)", () => {
        req.query = {};

        validateRequest(getEmployeesByBranchSchema)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Branch ID is required",
        });
    });

    it("should call next for valid getEmployeesByDepartmentSchema data", () => {
        req.query = { department: "Sales" };

        validateRequest(getEmployeesByDepartmentSchema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 400 for invalid getEmployeesByDepartmentSchema data (missing department)", () => {
        req.query = {};

        validateRequest(getEmployeesByDepartmentSchema)(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Department is required",
        });
    });
});
