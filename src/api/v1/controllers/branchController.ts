import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../data/branchData"

/**
 * @description Create a new branch.
 * @route POST /branch/
 * @returns {Promise<void>}
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newBranch: Branch = await branchService.createBranch(req.body);

        res.status(201).json({ message: "Branch Created", data: newBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get all branches.
 * @route GET /branch/
 * @returns {Promise<void>}
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();

        res.status(200).json({ message: "Branches Retrieved", data: branches });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get branches by id.
 * @route GET /branch/:id
 * @returns {Promise<void>}
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch: Branch = await branchService.getBranchById(req.params.id);

        res.status(200).json({ message: "Branch Retrieved", data: branch });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing branch.
 * @route PUT /branch/:id
 * @returns {Promise<void>}
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedBranch: Branch = await branchService.updateBranch(req.params.id, req.body);

        res.status(200).json({ message: "Branch Updated", data: updatedBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete a branch.
 * @route DELETE /branch/:id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await branchService.deleteBranch(req.params.id);

        res.status(200).json({ message: "Branch Deleted" });
    } catch (error) {
        next(error);
    }
};
