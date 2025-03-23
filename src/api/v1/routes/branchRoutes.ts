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
    deleteBranchSchema, }
    from "../validations/branchValidation";

const router: Router = express.Router();

/**
 * @route POST /branch
 * @description Create a new branch.
 * 
 * @openapi
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input provided
 *       500:
 *         description: Server error
 */
router.post("/", validateRequest(postBranchSchema), branchController.createBranch);

/**
 * @route GET /branch
 * @description Get all branches.
 * 
 * @openapi
 * /branch:
 *   get:
 *     summary: Retrieve a list of branches
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       500:
 *         description: Server error
 */
router.get("/", branchController.getAllBranches);

/**
 * @route GET /branch/:id
 * @description Get branch by id.
 *
 * @openapi
 * /branch/{id}:
 *   get:
 *     summary: Get branch by id
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to retrieve
 *     responses:
 *       200:
 *         description: Branch details matching the ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found with the specified ID
 *       500:
 *         description: Server error
 */
router.get("/:id", validateRequest(getBranchByIdSchema), branchController.getBranchById);

/**
 * @route PUT /branch/:id
 * @description Update an existing branch.
 * 
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Update an branch by ID
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input provided
 *       404:
 *         description: Branch not found with the specified ID
 *       500:
 *         description: Server error
 */
router.put("/:id", validateRequest(putBranchSchema), branchController.updateBranch);

/**
 * @route DELETE /branch/:id
 * @description Delete a branch.
 *
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branch]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to delete
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found with the specified ID
 *       500:
 *         description: Server error
 */
router.delete("/:id", validateRequest(deleteBranchSchema), branchController.deleteBranch);

export default router;
