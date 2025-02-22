/**
 * Branch Controller (branchController.ts)
 *
 * This file defines functions (controllers) for handling incoming requests related to branches.
 * These functions interact with the branch service (branchService.ts) to perform the actual
 * logic for CRUD operations on branches.
 */
import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel"
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

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

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch Created")
        );
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

        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches Retrieved")
        );
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
        const { id } = req.params;
        const limit = req.query.limit
            ? parseInt(req.query.limit as string)
            : undefined;

        const branch: Branch[] = await branchService.getBranchesByField(
            "id",
            id,
            limit
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                branch,
                `branch with ID "${id}" retrieved successfully`
            )
        );
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
        const updatedBranch: Branch = await branchService.updateBranch(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branch Updated")
        );
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

        res.status(HTTP_STATUS.OK).json(successResponse("Branch Deleted"));
    } catch (error) {
        next(error);
    }
};
