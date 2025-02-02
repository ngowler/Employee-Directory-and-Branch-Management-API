import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../data/branchData"

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