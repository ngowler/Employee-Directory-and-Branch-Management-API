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
    getDocumentsByFieldValue,
} from "../repositories/firestoreRepository";
import { ServiceError } from "../errors/errors";
import {
    getErrorMessage,
    getErrorCode,
} from "../utils/errorUtils";

const COLLECTION = "branches";

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
 * @description Get branches by a specific field value.
 * @param {string} id - The ID of the field to filter by.
 * @returns {Promise<Branch[]>} Array of branches matching the criteria.
 * @throws {Error} If no branches with the given field value are found or if the query fails.
 */
export const getBranchesByField = async (
    fieldName: string,
    fieldValue: any,
    limit?: number
): Promise<Branch[]> => {
    try {
        const snapshot: FirebaseFirestore.QuerySnapshot =
            await getDocumentsByFieldValue(
                COLLECTION,
                fieldName,
                fieldValue,
                limit
            );

        return snapshot.docs.map((doc) => {
            const data: FirebaseFirestore.DocumentData = doc.data();
            return { id: doc.id, ...data } as Branch;
        });
    } catch (error: unknown) {
        throw new ServiceError(
            `Failed to get branch ${fieldValue}: ${getErrorMessage(error)}`,
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
