import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeesByField,
    updateEmployee,
    deleteEmployee,
} from "../src/api/v1/services/employeeService";
import {
    getDocuments,
    createDocument,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByFieldValue,
} from "../src/api/v1/repositories/firestoreRepository";
import { Employee } from "../src/api/v1/models/employeeModel";
import {
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentSnapshot,
    DocumentData,
} from "firebase-admin/firestore";
import { ServiceError } from "../src/api/v1/errors/errors";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
    getDocumentsByFieldValue: jest.fn(),
}));

describe("Employee Service", () => {
    describe("createEmployee", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should create a new employee", async () => {
            const mockEmployee: Partial<Employee> = {
                name: "John Doe",
                position: "Software Engineer",
            };

            (createDocument as jest.Mock).mockResolvedValue("123");

            const result: Employee = await createEmployee(mockEmployee);

            expect(createDocument).toHaveBeenCalledWith("employees", mockEmployee);
            expect(result).toEqual({ id: "123", ...mockEmployee });
        });
    });

    describe("getAllEmployees", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return all employees", async () => {
            const mockDate = new Date();
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "employee1",
                    data: () =>
                        ({
                            name: "Employee 1",
                            position: "Manager",
                            createdAt: mockDate,
                            updatedAt: mockDate,
                        } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

            const result: Employee[] = await getAllEmployees();

            expect(getDocuments).toHaveBeenCalledWith("employees");
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: "employee1",
                name: "Employee 1",
                position: "Manager",
                createdAt: mockDate,
                updatedAt: mockDate,
            });
        });
    });

    describe("getEmployeeById", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return employee by ID", async () => {
            const mockDate = new Date();
            const mockDoc: DocumentSnapshot = {
                id: "employee1",
                exists: true,
                data: () =>
                    ({
                        name: "Employee 1",
                        position: "Manager",
                        createdAt: mockDate,
                        updatedAt: mockDate,
                    } as DocumentData),
            } as DocumentSnapshot;

            (getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

            const result: Employee = await getEmployeeById("employee1");

            expect(getDocumentById).toHaveBeenCalledWith("employees", "employee1");
            expect(result).toEqual({
                id: "employee1",
                name: "Employee 1",
                position: "Manager",
                createdAt: mockDate,
                updatedAt: mockDate,
            });
        });

        it("should handle non-existent document", async () => {
            const mockDoc: DocumentSnapshot = {
                id: "employee1",
                exists: false,
                data: () => undefined,
            } as DocumentSnapshot;

            (getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

            await expect(getEmployeeById("employee1")).rejects.toThrow(
                new ServiceError("Failed to get employee employee1: Document with ID employee1 does not exist", "ERROR_CODE")
            );

            expect(getDocumentById).toHaveBeenCalledWith("employees", "employee1");
        });

        it("should handle repository error", async () => {
            const mockError = new Error("Repository error");

            (getDocumentById as jest.Mock).mockRejectedValue(mockError);

            await expect(getEmployeeById("employee1")).rejects.toThrow(
                new ServiceError(`Failed to get employee employee1: ${mockError.message}`, "ERROR_CODE")
            );

            expect(getDocumentById).toHaveBeenCalledWith("employees", "employee1");
        });
    });

    describe("getEmployeesByField", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return employees matching the field value", async () => {
            const mockDate = new Date();
            const mockFieldName = "department";
            const mockFieldValue = "engineering";
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "employee1",
                    data: () =>
                        ({
                            name: "Engineer 1",
                            department: "engineering",
                            position: "Software Engineer",
                            createdAt: mockDate,
                            updatedAt: mockDate,
                        } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            const result: Employee[] = await getEmployeesByField(mockFieldName, mockFieldValue);

            expect(getDocumentsByFieldValue).toHaveBeenCalledWith(
                "employees",
                mockFieldName,
                mockFieldValue,
                undefined
            );
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: "employee1",
                name: "Engineer 1",
                department: "engineering",
                position: "Software Engineer",
                createdAt: mockDate,
                updatedAt: mockDate,
            });
        });

        it("should handle repository error", async () => {
            const mockFieldName = "department";
            const mockFieldValue = "nonexistent";
            const mockError = new Error("Repository error");

            (getDocumentsByFieldValue as jest.Mock).mockRejectedValue(mockError);

            await expect(getEmployeesByField(mockFieldName, mockFieldValue)).rejects.toThrow(
                new ServiceError(`Failed to get employee ${mockFieldValue}: ${mockError.message}`, "ERROR_CODE")
            );

            expect(getDocumentsByFieldValue).toHaveBeenCalledWith(
                "employees",
                mockFieldName,
                mockFieldValue,
                undefined
            );
        });
    });

    describe("updateEmployee", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should update an existing employee", async () => {
            const mockEmployee: Partial<Employee> = {
                name: "John Smith",
                position: "Senior Engineer",
            };

            const id = "employee1";
            (updateDocument as jest.Mock).mockResolvedValue(undefined);

            const result: Employee = await updateEmployee(id, mockEmployee);

            expect(updateDocument).toHaveBeenCalledWith("employees", id, mockEmployee);
            expect(result).toEqual({ id, ...mockEmployee });
        });

        it("should handle update error", async () => {
            const mockEmployee: Partial<Employee> = {
                name: "John Smith",
                position: "Senior Engineer",
            };

            const id = "employee1";
            const mockError = new Error("Repository error");

            (updateDocument as jest.Mock).mockRejectedValue(mockError);

            await expect(updateEmployee(id, mockEmployee)).rejects.toThrow(
                new ServiceError(`Failed to update employee ${id}: ${mockError.message}`, "ERROR_CODE")
            );

            expect(updateDocument).toHaveBeenCalledWith("employees", id, mockEmployee);
        });
    });

    describe("deleteEmployee", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should delete an existing employee", async () => {
            const id = "employee1";
            (deleteDocument as jest.Mock).mockResolvedValue(undefined);

            await deleteEmployee(id);

            expect(deleteDocument).toHaveBeenCalledWith("employees", id);
        });

        it("should handle delete error", async () => {
            const id = "employee1";
            const mockError = new Error("Repository error");

            (deleteDocument as jest.Mock).mockRejectedValue(mockError);

            await expect(deleteEmployee(id)).rejects.toThrow(
                new ServiceError(`Failed to delete employee ${id}: ${mockError.message}`, "ERROR_CODE")
            );

            expect(deleteDocument).toHaveBeenCalledWith("employees", id);
        });
    });
});
    