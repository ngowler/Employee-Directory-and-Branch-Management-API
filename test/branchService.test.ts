import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
} from "../src/api/v1/services/branchService";
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
} from "../src/api/v1/repositories/firestoreRepository";
import { Branch } from "../src/api/v1/models/branchModel";
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
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
    getDocumentById: jest.fn(),
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
            const mockDate: Date = new Date();
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

    describe("getBranchById", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        it("should return the branch matching the given ID", async () => {
            const mockDate: Date = new Date();
            const mockId: string = "branch1";
            const mockDoc: DocumentSnapshot = {
                id: mockId,
                exists: true,
                data: () =>
                    ({
                        name: "Branch 1",
                        location: "Location 1",
                        createdAt: mockDate,
                        updatedAt: mockDate,
                    } as DocumentData),
            } as DocumentSnapshot;
    
            (getDocumentById as jest.Mock).mockResolvedValue(mockDoc);
    
            const result: Branch = await getBranchById(mockId);
    
            expect(getDocumentById).toHaveBeenCalledWith("branches", mockId);
            expect(result).toEqual({
                id: mockId,
                name: "Branch 1",
                location: "Location 1",
                createdAt: mockDate,
                updatedAt: mockDate,
            });
        });
    
        it("should handle non-existent document error", async () => {
            const mockId: string = "nonexistent";
    
            const mockDoc: DocumentSnapshot = {
                id: mockId,
                exists: false,
                data: () => undefined,
            } as DocumentSnapshot;
    
            (getDocumentById as jest.Mock).mockResolvedValue(mockDoc);
    
            await expect(getBranchById(mockId)).rejects.toThrow(
                new ServiceError(
                    `Failed to get branch ${mockId}: Document with ID ${mockId} does not exist`,
                    "ERROR_CODE"
                )
            );
    
            expect(getDocumentById).toHaveBeenCalledWith("branches", mockId);
        });
    
        it("should handle repository error", async () => {
            const mockId: string = "branch1";
            const mockError: Error = new Error("Repository error");
    
            (getDocumentById as jest.Mock).mockRejectedValue(mockError);
    
            await expect(getBranchById(mockId)).rejects.toThrow(
                new ServiceError(`Failed to get branch ${mockId}: ${mockError.message}`, "ERROR_CODE")
            );
    
            expect(getDocumentById).toHaveBeenCalledWith("branches", mockId);
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

            const id: string = "branch1";
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

            const id: string = "branch1";
            const mockError: Error = new Error("Repository error");

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
            const id: string = "branch1";
            (deleteDocument as jest.Mock).mockResolvedValue(undefined);

            await deleteBranch(id);

            expect(deleteDocument).toHaveBeenCalledWith("branches", id);
        });

        it("should handle delete error", async () => {
            const id: string = "branch1";
            const mockError: Error = new Error("Repository error");

            (deleteDocument as jest.Mock).mockRejectedValue(mockError);

            await expect(deleteBranch(id)).rejects.toThrow(
                new ServiceError(`Failed to delete branch ${id}: ${mockError.message}`, "ERROR_CODE")
            );

            expect(deleteDocument).toHaveBeenCalledWith("branches", id);
        });
    });
});
