/**
 * Branch Service (branchService.ts)
 *
 * This file defines functions (services) for managing branch data. These functions
 * currently store branches in-memory but could be extended to use a database.
 */
import { Branch } from "../models/branchModel"
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
} from "../repositories/firestoreRepository";
import { ServiceError } from "../errors/errors";
import {
    getErrorMessage,
    getErrorCode,
} from "../utils/errorUtils";

const COLLECTION: string = "branches";

/**
 * @description Create a new branch.
 * @param {Partial<Branch>} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
    const id: string = await createDocument(COLLECTION, branch);
    return { id, ...branch } as Branch;
};

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Branch;
    });
};

/**
 * @description Get branch by a specific ID.
 * @param {string} id - The ID of the field to filter by.
 * @returns {Promise<Branch>} The branch matching the given ID.
 * @throws {Error} If no branches with the given ID are found or if the query fails.
 */
export const getBranchById = async (
    id: string,
): Promise<Branch> => {
    try {
        const doc: FirebaseFirestore.DocumentSnapshot = await getDocumentById(COLLECTION, id);

        if (!doc.exists) {
            throw new Error(`Document with ID ${id} does not exist`);
        }

        const data: FirebaseFirestore.DocumentData | undefined = doc.data();
        if (!data) {
            throw new Error(`Failed to retrieve data for document with ID ${id}`);
        }

        return { id, ...data } as Branch;
    } catch (error: unknown) {
        throw new ServiceError(
            `Failed to get branch ${id}: ${getErrorMessage(error)}`,
            getErrorCode(error)
        );
    }
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
    id: string,
    branch: Partial<Branch>
): Promise<Branch> => {
    try {
        await updateDocument(COLLECTION, id, branch);
        return { id, ...branch } as Branch;
    } catch (error: unknown) {
        throw new ServiceError(
            `Failed to update branch ${id}: ${getErrorMessage(error)}`,
            getErrorCode(error)
        );
    }
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    try {
        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw new ServiceError(
            `Failed to delete branch ${id}: ${getErrorMessage(error)}`,
            getErrorCode(error)
        );
    }
};
