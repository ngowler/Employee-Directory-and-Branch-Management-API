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