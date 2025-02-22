import {
    createBranch,
    getAllBranches,
    getBranchesByField,
    updateBranch,
    deleteBranch,
} from "../src/api/v1/services/branchService";
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByFieldValue,
} from "../src/api/v1/repositories/firestoreRepository";
import { Branch } from "../src/api/v1/models/branchModel";
import {
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentData,
} from "firebase-admin/firestore";
import { RepositoryError, ServiceError } from "../src/api/v1/errors/errors";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
    getDocumentsByFieldValue: jest.fn(),
}));

describe("Branch Service", () => {
    describe("createBranch", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should create a new branch", async () => {
            const mockBranch: Partial<Branch> = {
                name: "Main Branch",
                address: "123 Main Street",
            };

            (createDocument as jest.Mock).mockResolvedValue("123");

            const result: Branch = await createBranch(mockBranch);

            expect(createDocument).toHaveBeenCalledWith("branches", mockBranch);
            expect(result).toEqual({ id: "123", ...mockBranch });
        });
    });

    describe("getAllBranches", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return all branches", async () => {
            const mockDate = new Date();
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "branch1",
                    data: () =>
                        ({
                            name: "Branch 1",
                            location: "Location 1",
                            createdAt: mockDate,
                            updatedAt: mockDate,
                        } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

            const result: Branch[] = await getAllBranches();

            expect(getDocuments).toHaveBeenCalledWith("branches");
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: "branch1",
                name: "Branch 1",
                location: "Location 1",
                createdAt: mockDate,
                updatedAt: mockDate,
            });
        });
    });

    describe("getBranchesByField", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return branches matching the field value", async () => {
            const mockDate = new Date();
            const mockFieldName = "location";
            const mockFieldValue = "Downtown";
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "branch1",
                    data: () =>
                        ({
                            name: "Branch 1",
                            location: "Downtown",
                            createdAt: mockDate,
                            updatedAt: mockDate,
                        } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            const result: Branch[] = await getBranchesByField(mockFieldName, mockFieldValue);

            expect(getDocumentsByFieldValue).toHaveBeenCalledWith(
                "branches",
                mockFieldName,
                mockFieldValue,
                undefined
            );
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: "branch1",
                name: "Branch 1",
                location: "Downtown",
                createdAt: mockDate,
                updatedAt: mockDate,
            });
        });

        it("should handle repository error", async () => {
            const mockFieldName = "location";
            const mockFieldValue = "nonexistent";
            const mockError = new Error("Repository error");

            (getDocumentsByFieldValue as jest.Mock).mockRejectedValue(mockError);

            await expect(getBranchesByField(mockFieldName, mockFieldValue)).rejects.toThrow(
                new ServiceError(`Failed to get branch ${mockFieldValue}: ${mockError.message}`, "ERROR_CODE")
            );

            expect(getDocumentsByFieldValue).toHaveBeenCalledWith(
                "branches",
                mockFieldName,
                mockFieldValue,
                undefined
            );
        });
    });

    describe("updateBranch", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should update an existing branch", async () => {
            const mockBranch: Partial<Branch> = {
                name: "Main Branch - Updated",
                address: "123 Main Street",
            };

            const id = "branch1";
            (updateDocument as jest.Mock).mockResolvedValue(undefined);

            const result: Branch = await updateBranch(id, mockBranch);

            expect(updateDocument).toHaveBeenCalledWith("branches", id, mockBranch);
            expect(result).toEqual({ id, ...mockBranch });
        });

        it("should handle update error", async () => {
            const mockBranch: Partial<Branch> = {
                name: "Main Branch - Updated",
                address: "123 Main Street",
            };

            const id = "branch1";
            const mockError = new Error("Repository error");

            (updateDocument as jest.Mock).mockRejectedValue(mockError);

            await expect(updateBranch(id, mockBranch)).rejects.toThrow(
                new ServiceError(`Failed to update branch ${id}: ${mockError.message}`, "ERROR_CODE")
            );

            expect(updateDocument).toHaveBeenCalledWith("branches", id, mockBranch);
        });
    });

    describe("deleteBranch", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should delete an existing branch", async () => {
            const id = "branch1";
            (deleteDocument as jest.Mock).mockResolvedValue(undefined);

            await deleteBranch(id);

            expect(deleteDocument).toHaveBeenCalledWith("branches", id);
        });

        it("should handle delete error", async () => {
            const id = "branch1";
            const mockError = new Error("Repository error");
        
            (deleteDocument as jest.Mock).mockRejectedValue(mockError);
        
            await expect(deleteBranch(id)).rejects.toThrow(
                new ServiceError(`Failed to delete branch ${id}: ${mockError.message}`, "ERROR_CODE")
            );
        
            expect(deleteDocument).toHaveBeenCalledWith("branches", id);
        });
    });
});