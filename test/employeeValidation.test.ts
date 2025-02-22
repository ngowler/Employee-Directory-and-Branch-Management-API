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
import {
    postBranchSchema,
    getBranchByIdSchema,
    putBranchSchema,
    deleteBranchSchema, }
    from "../src/api/v1/validations/branchValidation";
import { Branch } from "../src/api/v1/data/branchData"
import { Employee } from "../src/api/v1/data/employeeData"

describe("employee validation schemas", () => {

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
