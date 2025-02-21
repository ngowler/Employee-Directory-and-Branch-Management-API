/**
 * Branch Routes (branchRoutes.ts)
 * 
 * This file defines the routes for managing branches in our application.
 * It uses the Express framework for routing and makes calls to the branch controller
 * (branchController.ts) to handle the logic for each route.
 */
import express, { Router } from "express";
import * as branchController from "../controllers/branchController"
import { validateRequest } from "../middleware/validate";
import {
    postBranchSchema,
    getBranchByIdSchema,
    putBranchSchema,
    deleteBranchSchema,
} from "../validations/branchValidation";

const router: Router = express.Router();

/**
 * @route POST /branch
 * @description Create a new branch.
 * 
 * @openapi
 * /branch:
 *   post:
 *     summary: Creates a new branch
 *     tags: [Branch]
 *     responses:
 *       201:
 *         description: Creates a new branch
 */
router.post("/", branchController.createBranch);

/**
 * @route GET /branch
 * @description Get all branches.
 * 
 * @openapi
 * /branch:
 *   get:
 *     summary: Gets all branches
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Gets all branches
 */
router.get("/", branchController.getAllBranches);

/**
 * @route GET /branch/:id
 * @description Get branch by id.
 *
 * @openapi
 * /branch/{id}:
 *   get:
 *     summary: Gets a branch by id
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Gets a branch by id
 */
router.get("/:id", branchController.getBranchById);

/**
 * @route PUT /branch/:id
 * @description Update an existing branch.
 * 
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Updates a branch
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Updates a branch
 */
router.put("/:id", branchController.updateBranch);

/**
 * @route DELETE /:id
 * @description Delete a branch.
 *
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Deletes a branch
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Deletes a branch
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
