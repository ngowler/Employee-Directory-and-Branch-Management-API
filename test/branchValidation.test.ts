import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import {
    postBranchSchema,
    getBranchByIdSchema,
    putBranchSchema,
    deleteBranchSchema, }
    from "../src/api/v1/validations/branchValidation";

describe("validate function for branches", () => {

    describe("postBranchSchema", () => {
        it("should not throw an error for valid branch data", () => {
            const data = {
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890",
                createdAt: new Date(),
            };
            expect(() => validate(postBranchSchema, data)).not.toThrow();
        });

        it("should throw an error for missing name", () => {
            const data = {
                address: "123 Main St",
                phone: "123-456-7890",
            };
            expect(() => validate(postBranchSchema, data)).toThrow("Name is required");
        });

        it("should throw an error for empty name", () => {
            const data = {
                name: "",
                address: "123 Main St",
                phone: "123-456-7890",
            };
            expect(() => validate(postBranchSchema, data)).toThrow("Name cannot be empty");
        });
    });

    describe("getBranchByIdSchema", () => {
        it("should not throw an error for valid ID", () => {
            const data = { id: "1" };
            expect(() => validate(getBranchByIdSchema, data)).not.toThrow();
        });

        it("should throw an error for missing ID", () => {
            const data = {};
            expect(() => validate(getBranchByIdSchema, data)).toThrow("ID is required");
        });

        it("should throw an error for empty ID", () => {
            const data = { id: "" };
            expect(() => validate(getBranchByIdSchema, data)).toThrow("Branch ID cannot be empty");
        });
    });

    describe("putBranchSchema", () => {
        it("should not throw an error for valid branch data", () => {
            const data = {
                id: "1",
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890",
                updatedAt: new Date(),
            };
            expect(() => validate(putBranchSchema, data)).not.toThrow();
        });

        it("should throw an error for missing ID", () => {
            const data = {
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890",
            };
            expect(() => validate(putBranchSchema, data)).toThrow("ID is required");
        });

        it("should throw an error for empty ID", () => {
            const data = {
                id: "",
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890",
            };
            expect(() => validate(putBranchSchema, data)).toThrow("ID cannot be empty");
        });
    });

    describe("deleteBranchSchema", () => {
        it("should not throw an error for valid ID", () => {
            const data = { id: "1" };
            expect(() => validate(deleteBranchSchema, data)).not.toThrow();
        });

        it("should throw an error for missing ID", () => {
            const data = {};
            expect(() => validate(deleteBranchSchema, data)).toThrow("ID is required");
        });

        it("should throw an error for empty ID", () => {
            const data = { id: "" };
            expect(() => validate(deleteBranchSchema, data)).toThrow("Branch ID cannot be empty");
        });
    });
});