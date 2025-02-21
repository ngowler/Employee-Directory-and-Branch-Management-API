/**
 * Branch Service (branchService.ts)
 *
 * This file defines functions (services) for managing branch data. These functions
 * currently store branches in-memory but could be extended to use a database.
 */
import { Branch } from "../data/branchData"
import branches from "../data/branchData"

/**
 * @description Create a new branch.
 * @param {Partial<Branch>} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: {
    name: string,
    address: string,
    phone: string,
}): Promise<Branch> => {
    if (!branch.name || !branch.address || !branch.phone) {
        throw new Error("All fields (name, address, phone) must be provided");
    }
    const newBranch: Branch = { id: Date.now().toString(), ...branch };
    branches.push(newBranch);
    return newBranch;
};

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

/**
 * @description Get branches by a specific field value.
 * @param {string} id - The ID of the field to filter by.
 * @returns {Promise<Branch[]>} Array of branches matching the criteria.
 * @throws {Error} If no branches with the given field value are found or if the query fails.
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`)
    }

    return branches[index];
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (id: string, branch: {
    name?: string,
    address?: string,
    phone?: string,
}): Promise<Branch> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`)
    }

    const currentBranch: Branch = branches[index];

    const updatedBranch: Branch = {
        ...currentBranch,
        ...branch
    };

    return updatedBranch;
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`)
    }

    branches.splice(index, 1);
};
