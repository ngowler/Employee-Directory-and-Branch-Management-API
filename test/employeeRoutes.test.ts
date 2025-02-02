import request from "supertest";
import app from "../src/app";
import {
    createEmployee }
    from "../src/api/v1/controllers/employeeController"

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send()),
}));

describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", async () => {
            const mockItem = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };

            await request(app).post("/api/v1/employees").send(mockItem);
            expect(createEmployee).toHaveBeenCalled();
        });
    });
});