import { Branch } from "../data/branchData"
import branches from "../data/branchData"

/**
 * @openapi
 * /branch:
 *   post:
 *     summary: Creates a new branch
 *     tags: [Branch]
 *     responses:
 *       201:
 *         description: Creates a new branch
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
 * @openapi
 * /branch:
 *   get:
 *     summary: Gets all branches
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Gets all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

/**
 * @openapi
 * /branch/{id}:
 *   get:
 *     summary: Gets a branch by id
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Gets a branch by id
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`)
    }

    return branches[index];
};

/**
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Updates a branch
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Updates a branch
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
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Deletes a branch
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Deletes a branch
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`)
    }

    branches.splice(index, 1);
};