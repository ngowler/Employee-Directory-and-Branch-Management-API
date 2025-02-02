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