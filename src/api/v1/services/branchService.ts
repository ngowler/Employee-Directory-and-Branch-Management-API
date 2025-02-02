import branches, { Branch } from "../data/branchData"
import branchs from "../data/branchData"

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